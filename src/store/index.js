import { createStore } from 'vuex'

export default createStore({
  state: {
      loading: false,
      token: '',
      user: {},
  },
  getters: {
  },
  mutations: {
    increment(state) {
      if (localStorage.getItem('token')) {
        state.token = localStorage.getItem('token')
        state.user = localStorage.getItem('user')
      } else {
        state.token = ''
        state.user = {}
      }
    },
    setLoading(state, status) {
      state.loading = status
    },
    setToken(state, token) {
      state.token = token
    },
    removeToken(state) {
      state.token = ''
    },
    setUser(state, user) {
      state.user = user
    },

  },
  actions: {
  },
  modules: {
  }
})
