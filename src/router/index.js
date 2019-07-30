import Vue from 'vue'
import Router from 'vue-router'
import bodymain from '../components/WalletList.vue'
import Login from '../components/login/Login.vue'
import FindPassWord from '../components/login/FindPassword.vue'
import ChangePassword from '../components/login/ChangePassword.vue'
import Wallet from '../components/wallet/Wallet.vue'
import ErrorPage from '../components/error/ErrorPage.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: bodymain,
      children : [
        {path:'login',components : {contentLayout :  Login}},
        {path:'findPassword',components : {contentLayout :  FindPassWord}},
        {path:'changePassword',components : {contentLayout :  ChangePassword}},
        {path:'wallet',components : {contentLayout :  Wallet}},
        {path:'error',components : {contentLayout :  ErrorPage}},
        {path:'/*',components : {contentLayout :  ErrorPage}}
      ]
    },
    {
      path: '/prc',
      component: prcdata,
      children : [
        {path:'prcid',components : {contentLayout :  prcid}},
        {path:'ss',components : {contentLayout :  ss}},
        {path:'data',components : {contentLayout :  data}},
        {path:'error',components : {contentLayout :  ErrorPage}},
        {path:'/*',components : {contentLayout :  ErrorPage}}
      ]
    },
  ]
})
