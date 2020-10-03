import axios from 'axios'
import {Notify, Cookies, LocalStorage, Loading} from 'quasar'
import router from 'src/router'

const state = {
    user: null,
    isLoggedIn: null       
}

const getters = {
    accountBalance(state) {
        return state.user.account.balance
    },
    user(state) {
        return state.user
    }
}

const mutations = {
    setUser(state, payload) {
        state.user = payload
        state.isLoggedIn = true
    },
    logoutUser(state) {
        state.user = null
        state.isLoggedIn = false
    },
    addAccount(state, payload) {
        Object.assign(state.user, payload)
    }
}

const actions = {
    async createAccount({commit, dispatch}){
        try{
                await axios({
                method: 'POST',
                data: {},
                url: 'api/v1/accounts',
                withCredentials: true
            })
            await dispatch('getUser')
        }catch(e) {
            console.log(e.response.data)
        }
    },
    async signup({commit, dispatch}, data) {
        try {
            Loading.show()
            const res = await axios({
                method: 'POST',
                data: data,
                url: 'api/v1/users/signup',
                withCredentials: true
            })
            // commit('setUser', res.data.data.user)
            Cookies.set('jwt', res.data.token)
            LocalStorage.set('isLoggedIn', true)
            await dispatch('createAccount')
            Loading.hide()
            this.$router.push('/dashboard')
        }catch(err) {
            Loading.hide()
            Notify.create({
                color: 'red-5',
                textColor: 'white',
                icon: 'warning',
                message: err.response.data.message
            })
        }
    },
    async login({commit}, data){
        try {
            Loading.show()
            const res = await axios({
                method: 'POST',
                data: data,
                url: 'api/v1/users/login',
                withCredentials: true
            })
            commit('setUser', res.data.data.user)
            Cookies.set('jwt', res.data.token)
            LocalStorage.set('isLoggedIn', true)
            Loading.hide()
            this.$router.push('/dashboard')
        }catch(err) {
            Loading.hide()
            Notify.create({
                color: 'red-5',
                textColor: 'white',
                icon: 'warning',
                message: err.response.data.message
              })
        }
    },
    logout({commit}, data) {
        Loading.show()
        axios({
            method: 'GET',
            url: 'api/v1/users/logout',
            withCredentials: true
            }).then(res => {
            Cookies.remove('jwt')
            LocalStorage.remove('isLoggedIn')
            Loading.hide()
            this.$router.replace('/')
        }).catch((err) => {
            Loading.hide()
            console.log(err.response.message)
        })
    },
    getUser({commit}){
            Loading.show()
            axios({
                method: 'GET',
                url: 'api/v1/users/me',
                withCredentials: true
            }).then(res => {
                commit('setUser', res.data.user)
                Loading.hide()
            }).catch((err) => {
            Loading.hide()
            console.log(err.response.data.message)
            })
    },
    passwordUpdated({commit}, payload) {
        commit('setUser',payload)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}