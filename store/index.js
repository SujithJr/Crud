import Vuex from 'vuex'
import axios from 'axios'
import globalAxios from 'axios'

const createStore = () => {
    return new Vuex.Store({
        state: {
            idToken: null,
            userId: null,
            user: null,
            albumData: null,
            loading: false
        },
        mutations: {
            authUser(state, userData) {
                state.idToken = userData.token
                state.userId = userData.userId
            },
            storeUser(state, payload) {
                state.albumData = payload
            },
            clearAuth(state) {
                state.idToken = null,
                state.userId = null
            },
            updatedAlbum(state, payload) {
                const album =  state.albumData.find(album => {
                    return album.id === payload.id
                })
                if (album === undefined || album === '') {
                    return
                } else {
                    if (payload.artistName) {
                        album.artistName = payload.artistName
                    }
                    if (payload.albumName) {
                        album.albumName = payload.albumName
                    }
                    if (payload.genre) {
                        album.genre = payload.genre
                    }
                }
            },
            setLoading(state, payload) {
                state.loading =  payload
            }
        },
        actions: {
            signup({commit,dispatch}, formData) {
            commit('setLoading', true)
            axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCfJjw60IR0DvphSiz5MBZ6rIAmOBP0QqE', {
                    email: formData.email,
                    password: formData.password,
                    returnSecureToken: true
                })
                .then((res) => {
                    console.log(res)
                    commit('setLoading', false)
                    commit('authUser', {
                        token: res.data.idToken,
                        userId: res.data.localId,
                        user: res.data.email
                    })
                    const now = new Date()
                    const expiration = new Date(now.getTime() + res.data.expiresIn * 1000)
                    this.$warehouse.set('expiration', expiration)
                    this.$warehouse.set('token', res.data.idToken)
                    this.$warehouse.set('userId', res.data.localId)
                    // this.$warehouse.set('user', res.data.email)
                    // dispatch('storeUser', formData)
                    this.$router.replace('/')
                }).catch((error) => {
                    commit('setLoading', false)
                    console.log(error)
                })
            },
            login({commit, dispatch, state}, authData) {
                commit('setLoading', true)
                axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCfJjw60IR0DvphSiz5MBZ6rIAmOBP0QqE', {
                        email: authData.email,
                        password: authData.password,
                        returnSecureToken: true
                    })
                    .then((res) => {
                        console.log(res)
                        commit('setLoading', false)
                        const now = new Date()
                        const expiration = new Date(now.getTime() + res.data.expiresIn * 1000)
                        this.$warehouse.set('expiration', expiration)
                        this.$warehouse.set('token', res.data.idToken)
                        this.$warehouse.set('userId', res.data.localId)
                        // this.$warehouse.set('user', res.data.email)

                        commit('authUser', {
                            token: res.data.idToken,
                            userId: res.data.localId,
                            // user: res.data.email
                        })
                        // dispatch('storeUser', authData)
                        this.$router.replace('/')
                    }).catch((error) => {
                        commit('setLoading', false)
                        console.log(error)
                    })
            },
            storeUser({commit,state}, userData) {
                if (!state.idToken) {
                    return
                }
                commit('setLoading', true)
                console.log(userData)
                globalAxios.post('https://crud-e5523.firebaseio.com/users.json' + '?auth=' + state.idToken, userData)
                    .then((res) => {
                        console.log(res)
                        commit('setLoading', false)
                        const data = res.data.name
                        const users = []
                        for (let key in data) {
                            const user = data[key]
                            user.id = key
                            users.push(user)
                        }
                        console.log(users)
                        // commit('storeUser', userData.email)
                    }).catch((error) => {
                        commit('setLoading', false)
                        console.log(error)
                    })
            },
            logout({commit}) {
                commit('setLoading', true)
                commit('clearAuth')
                this.$warehouse.clearAll()
                commit('setLoading', false)
                this.$router.replace('/')
            },
            tryAutoLogin({commit}) {
                let token = this.$warehouse.get('token')
                if (!token) {
                    return
                }
                let expiresDate = this.$warehouse.get('expiration')
                const now = new Date()
                if (now >= expiresDate) {
                    return
                }
                let userId = this.$warehouse.get('userId')
                let user = this.$warehouse.get('user')
                commit('authUser', {
                    token: token,
                    userId: userId,
                    // user: user
                })
            },
            fetchData({commit, state}, payload) {
                if (!state.idToken) {
                    return
                }
                commit('setLoading', true)
                globalAxios.get('https://crud-e5523.firebaseio.com/users.json' + '?auth=' + state.idToken)
                .then((res) => {
                    commit('setLoading', false)
                    console.log(res.id)
                    console.log(res.data)
                    const data = res.data
                    const users = []
                    for (let key in data) {
                        const user = data[key]
                        user.id = key
                        users.push(user)
                    }
                    console.log(users)
                    commit('storeUser', users)
                })
                .catch((error) => {
                    commit('setLoading', false)
                    console.log(error)
                })
            },
            updatedAlbum({commit, state}, payload) {
                commit('setLoading', true)
                const updateObj = {}
                if (payload.artistName) {
                    updateObj.artistName = payload.artistName
                }
                if (payload.albumName) {
                    updateObj.albumName = payload.albumName
                }
                if (payload.genre) {
                    updateObj.genre = payload.genre
                }
                globalAxios.put('https://crud-e5523.firebaseio.com/users/' + `${payload.id}` + '.json?auth=' + state.idToken, updateObj)
                .then((res) => {
                    console.log(res)
                    commit('setLoading', false)
                    commit('updatedAlbum', payload)
                }).catch((err) => {
                    commit('setLoading', false)
                    console.log(err)
                })
            },
            deletedAlbum({commit, state}, payload) {
                commit('setLoading', true)
                globalAxios.delete('https://crud-e5523.firebaseio.com/users/' + `${payload.id}` + '.json?auth=' + state.idToken, payload.id)
                .then((res) => {
                    console.log(res)
                    commit('setLoading', false)
                    commit('updatedAlbum', payload)
                }).catch((err) => {
                    commit('setLoading', false)
                    console.log(err)
                })
            },
        },
        getters: {
            albumData(state) {
                return state.albumData
            },
            userId(state) {
                return state.userId
            },
            loading(state) {
                return state.loading
            }
        }
    })
}

export default createStore
