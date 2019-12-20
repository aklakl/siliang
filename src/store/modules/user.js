import { loginByMobile, refreshToken, loginByWX } from "@/api/login";
import { setToken, setrefreshToken, getToken } from '@/utils/auth'
const user = {
  state: {
    token: '',
    refreshtoken: ''
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_REFRESHTOKEN: (state, token) => {
      state.refreshtoken = token
    },
  },

  actions: {
    // 微信登录
    WXLogin({ commit }, code) {
      return new Promise((resolve, reject) => {
        loginByWX(code)
          .then(response => {
            localStorage.setItem('openId', response.openId)
            if(!getToken()){
            const tokenData = response.openId + '$' + response.expires_in
            setToken(tokenData)
            setrefreshToken(response.refresh_token)
            // setType('wx')
            commit('SET_TOKEN', tokenData)
            commit('SET_REFRESHTOKEN', response.refresh_token)
            }
            resolve()
          })
          .catch(err => {
            reject(err)
          });
      })
    },
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        loginByMobile(userInfo)
          .then(response => {
            setToken('Bearer ' + response.access_token)
            setrefreshToken(response.refresh_token)
            // setType('lc')
            commit('SET_TOKEN', response.access_token)
            commit('SET_REFRESHTOKEN', response.refresh_token)
            resolve()
          })
          .catch(err => {
            reject(err)
          });
      })
    },
    // 刷新token
    RefreshToken({ commit }, freshtoken, type) {
      return new Promise((resolve, reject) => {
        refreshToken(freshtoken)
          .then(response => {
            setToken(response.access_token)
            setrefreshToken(response.refresh_token)
            commit('SET_TOKEN', response.access_token)
            commit('SET_REFRESHTOKEN', response.refresh_token)
            resolve()
            window.location.reload()
          })
          .catch(err => {
            reject(err)
          });
      })
    },
  }
}

export default user
