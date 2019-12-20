/**
 * Created by mingli on 20191219.
 */

export function getGlobal(p1,p2) {
    console.log("p1="+p1+"|p2="+p2);
    return "test";
}

/*
 import('@client/components/App'),
 import 'vuetify/dist/vuetify.min.css'

export default {
  clear () {
    localStorage.removeItem(TOKEN_LABEL)
    this.clearRepCode()

    return true
  },
  getToken () {
    let token = localStorage.getItem('token')

    if (token) {
      return JSON.parse(token)
    }

    return null
  },
  setToken (payload) {
    localStorage.setItem(TOKEN_LABEL, JSON.stringify(payload))
  },
  clearRepCode () {
    const arrlocalStorageKeys = Object.keys(localStorage)
    arrlocalStorageKeys.forEach((item) => {
      if (item.includes(CLIENT_REP_CODE_PREFIX) === true) {
        localStorage.removeItem(item)
      }
    })
  }
}

*/