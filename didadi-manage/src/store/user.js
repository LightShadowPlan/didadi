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
                    if (result.code === 201) {
                        commit('setUser', result.data)
                        commit('setLogin', true)
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
                    if (result.code === 201) {
                        commit('setUser', result.data)
                        commit('setLogin', true)
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
        },
    },
    mutations: {
        setUser (state, payload) {
            state.userInfo = payload
        },
        setLogin (state, payload) {
            state.hasLogin = payload
        },
        setToken (state, payload) {
            localStorage.userToken = payload
        },
    },
    getters: {
        getHasLogin (state) {
            return state.hasLogin
        },
    }
}


export default user