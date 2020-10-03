import {Notify, Cookies} from 'quasar'
import axios from 'axios'
import {channelT} from 'boot/pusher'

const state = {
    paymentDialog: {
        dialog: false,
        name: ''
    },
}

const getters = {
    getTransactions(state, getters, rootState, rootGetters) {
        return (rootGetters['auth/user'].account.transactions)
    }

}

const mutations = {
    showDialog(state, payload) {
        state.paymentDialog.dialog = payload.show
        state.paymentDialog.name = payload.name
    }
}

const actions = {
    showDialog({commit}, payload) {
        commit('showDialog', payload)
    },
    async depositFunds({commit, dispatch}, payload) {
        try{
                await axios({
                method: 'POST',
                data: payload,
                url: 'api/v1/transactions',
                withCredentials: true
            })
            dispatch('auth/getUser', null, {root: true})
        }catch(e) {
            Notify.create({
                color: 'red-5',
                textColor: 'white',
                icon: 'cancel',
                message: 'error! something went wrong'
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