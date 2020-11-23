import Vue from "vue"
import Vuex from 'vuex'

Vue.use(Vuex)

const userLocalStorage = window.localStorage.getItem("access_token")

const store = new Vuex.Store({
    state: {
        loading: false,
        accessToken: userLocalStorage ? JSON.parse(userLocalStorage) : null
    },
    mutations: {
        setLoading(state, payload) {
            state.loading = payload
        },
        setAccessToken(_, token) {
            setUserLocalStorage(token)
        },
        unsetAccessToken(state) {
            state.accessToken = {}
            emptyUserLocalStorage()
        }
    },
    getters: {
        hasAuth: (state) => {
            return !!state.accessToken
        }
    }
})

const setUserLocalStorage = (accessToken) => {
    window.localStorage.setItem("access_token", JSON.stringify(accessToken))
}

const emptyUserLocalStorage = () => {
    window.localStorage.removeItem("access_token")
}

export default store