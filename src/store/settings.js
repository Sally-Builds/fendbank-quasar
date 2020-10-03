import {Notify, Cookies, Loading, LocalStorage} from 'quasar'
import axios from 'axios'

const state = {
    currencyConverter: false
}

const getters = {
    currencyConverter(state) {
        return state.currencyConverter
    }

}

const mutations = {
    setCurrencyConverterStatus(state, payload) {
        state.currencyConverter = payload
        LocalStorage.set('currencyConverter', payload)

    },
    initialLoadCurrency(state) {
        state.currencyConverter = LocalStorage.getItem('currencyConverter')
    }
}

const actions = {
    getCurrencyConverterStatus({commit}, payload) {
        commit('setCurrencyConverterStatus', payload)
    },
    initialLoadCurrency({commit}) {
        commit('initialLoadCurrency')
    },
    async updateUser({commit, dispatch}, payload) {
        try{
            Loading.show()
            const formData = new FormData()
            for(const [key, value] of Object.entries(payload)){
                if(payload[key] == null || payload[key] == ''){
                    delete payload[key]
                }
            }
            for(const [key, value] of Object.entries(payload)){
                formData.append(`${key}`, value)
            }
            const res = await axios({
                method: 'PATCH',
                data: formData,
                url: 'api/v1/users/updateme',
                withCredentials: true
            })
            dispatch('auth/getUser', null, {root: true})
            Loading.hide()
            Notify.create({
                color: 'green-5',
                textColor: 'white',
                icon: 'check',
                message: 'updated successfully!'
              })
        }catch(err) {
            Loading.hide()
            console.log(err.response)
            Notify.create({
                color: 'red-5',
                textColor: 'white',
                icon: 'cancel',
                message: err.response.data.message
              })
        }
    },
    async updatePassword({commit, dispatch}, payload) {
        try{
            Loading.show()
            const res = await axios({
                method: 'PATCH',
                data: payload,
                url: 'api/v1/users/updatepassword',
            })
            Notify.create({
                color: 'green-5',
                textColor: 'white',
                icon: 'check',
                message: 'password updated successfully'
              })
            dispatch('auth/passwordUpdated', res.data.data.user, {root: true})
            Loading.hide()
        }catch(err) {
            Loading.hide()
            console.log(err)
            Notify.create({
                color: 'red-5',
                textColor: 'white',
                icon: 'cancel',
                message: err.response.data.message
              })
        }
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}