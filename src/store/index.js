import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const resourceHost = 'http://localhost:3000'

const coinHost = 'http://127.0.0.1:7000/api/coin'


const authHost = 'http://127.0.0.1:7000/api/auth'


export default new Vuex.Store({
  
  state: {
    securityVal: '',
    accessToken: [],
    loginInfo : [],
    emailAuthInfo : [],
    emailAuthNum : [],
    changePwStatus : [],
    walletInfo : [],
    newAddressToken : [],
    keyName : 'accessToken',
    userEmail : ''
  },
  getters: {
    
  },
  mutations: {
    LOGIN (state, result,email, securityVal) {
      state.userEmail = email
      state.loginInfo = result
      state.securityVal = securityVal;
      //고유 보안 토큰 설정 예정

    },
    EMAILSEND (state,result) {
      state.emailAuthInfo = result
    },
    AUTHNUMCHECK (state,result) {
      state.emailAuthNum = result
    },
    CHANGEPW (state,result) {
      state.changePwStatus = result
    },
    WALLET (state, result) {
      state.walletInfo = result
      //localStorage.walletInfo = result;
    },
    CREATEWALLET (state, result) {
      state.newAddressToken = result
      //localStorage.walletInfo = result;
    },
  },
  actions: {
    LOGIN ({commit}, {accessToken,email, password}) {
      let token = 'Bearer'+' '+accessToken
      return axios.post(`${authHost}/login`, {'email' : email,'password': password, 'scval':securityVal},{headers:{Authorization : token}})
      .then(({data}) => {
        commit('LOGIN', data,email)
        }
      ).catch((msg)=>{
        console.log(msg);
      })
     
    },
    EMAILSEND ({commit},{accessToken,userEmail}) {
      return axios.post(`${authHost}/getAuthNum`,{'email' : userEmail},{headers:{Authorization : 'Bearer '+accessToken}})
      .then(({data}) => {
        commit('EMAILSEND', data)
        }
      ).catch((msg) =>{
        console.log(msg);
      })
    },
    AUTHNUMCHECK ({commit},{accessToken,authNum}) {
      return axios.post(`${authHost}/confirmAuthNum`,{'auth_num' : authNum},{headers:{Authorization : 'Bearer '+accessToken}})
      .then(({data}) => {
        commit('AUTHNUMCHECK', data)
        }
      ).catch((msg) =>{
        console.log(msg);
      })
    },
    CHANGEPW ({commit},{accessToken,confirmPassword}) {
      return axios.post(`${authHost}/chgPwd`,{'password' : confirmPassword},{headers:{Authorization : 'Bearer '+accessToken}})
      .then(({data}) => {
        commit('CHANGEPW', data)
        }
      ).catch((msg) =>{
        console.log(msg);
      })
    },
    WALLET ({commit},{accessToken}) {
      return axios.get(`${coinHost}/balance/getBalanceAndStatus`, 
        {
          headers : 
                {
                  Authorization : 'Bearer '+accessToken
                }
          })
      .then(({data}) => {
        commit('WALLET', data)
        }
      ).catch((error) => {
        console.log(error);
      })
    },
    CREATEWALLET ({commit},{accessToken,newAddress}) {
      return axios.post(`${authHost}/regWalletAddr`,{'addr':newAddress}, 
        {
          headers : 
                {
                  Authorization : 'Bearer '+accessToken
                }
          })
      .then(({data}) => {
        commit('CREATEWALLET', data)
        }
      ).catch((error) => {
        console.log(error);
      })
    },    
    WRITELOG ({commit},{thispath}){
      console.log({thispath});
      axios.post(`/users/api/log/write`,{thispath})
    },
    ERRORLOG ({commit},{thispath,errMsg}){
      axios.post(`/users/api/log/error`,{thispath,errMsg})
    },
    //미처리
    LOGOUT ({commit}) {
      commit('LOGOUT')
    },
  }
})
