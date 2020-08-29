import apiUser from "@/api/user"

const user = {
    state: {
        userInfo: {},
        hasLogin: false,
        hasAuth: 0
    },
    actions: {
        loginByInfo ({ commit }, data) {
            return new Promise((resolve, reject) => {
                apiUser.loginByInfo(data).then((result) => {
                    if (result.code === 200) {
                        commit('setUser', result.data)
                        commit('setLogin', true)
                        commit('setToken', result.data.token)
                        commit('setAuth', result.data.authority || 0)
                        resolve(result.data);
                    } else {
                        resolve(false);
                    }

                }).catch((error) => {
                    reject(error);
                })
            });

        },
        loginByToken ({ commit }) {
            return new Promise((resolve, reject) => {
                apiUser.loginByToken().then((result) => {
                    if (result.code === 200) {
                        commit('setUser', result.data)
                        commit('setLogin', true)
                        commit('setAuth', result.data.authority || 0)
                        resolve(result.data);
                    } else {
                        resolve(false);
                    }
                }).catch((error) => {
                    reject(error);
                })
            });

        },
        logout ({ commit }) {
            commit('setUser', {})
            commit('setLogin', false)
            commit('setLogin', "")
        },
    },
    mutations: {
        setUser (state, payload) {
            state.userInfo = payload
        },
        setLogin (state, payload) {
            state.hasLogin = payload
        },
        setAuth (state, payload) {
            state.hasAuth = payload
        },
        setToken (state, payload) {
            localStorage.userToken = payload
        },
    },
    getters: {
        getHasLogin (state) {
            return state.hasLogin
        },
        getHasAuth (state) {
            return state.hasAuth
        }
    }
}


export default user