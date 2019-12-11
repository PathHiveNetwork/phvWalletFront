<template>
     <div class="user-page-box">
        <div class="user_page_logo_box">
            <p><img src="../../common/images/Logo.png" alt="로고이미지"></p>
        </div>
        <!--<form @submit.prevent="onLoginCheck(userEmail,password)">-->
        <form>
            <div class="main_login_box">
                <div class="id_box input-box">
                    <input type="text" v-model="email" placeholder="E-mail address" />
                </div> 
                <div class="pw_box input-box">
                    <input type="password" v-model="password" placeholder="Password" />
                </div>
            </div>
            <div class="main_btn_box">
                <div class="sub_btn_box" @click="onLoginCheck(email,password, securityVal)">
                    <span type="submit" value="Login">LOGIN</span>
                </div>      
            </div>
            <div class="findMsgDiv">   
                <router-link to="findPassword" class="routerlink"><span>{{findMsg}}</span></router-link> 
            </div>  
            <span id="securityVal" />
        </form>
    </div> 
</template>

<script>
/*const resourceHost = 'http://localhost:3000';
var abc = 'abc';
import axios from 'axios'
var axiosCheck =false;*/
import mapGetters from '../../store'
import { eventBus } from '../../main.js';


export default {
    data() {
        return {
            email: '',
            password: '',
            securityVal: '',
            msg: '',
            findMsg : 'Forgotten your password?',
            check : false
        }
    },
    methods: {
        onLoginCheck(email, password, securityVal) {
            var keyName = this.$store.state.keyName;
            // LOGIN 액션 실행     
            if(this.email !== '' && this.password !== '' && this.securityVal !== ''){
                eventBus.$emit('event','loading');
                function getToken(callback){
                    return new Promise(function(resolve,reject){
                        getAccessToken(keyName,function(res){
                            if(res){
                                resolve(res);
                            }
                            else{
                                reject(new Error('TokenError'));
                            }
                        })
                    })
                }
                getToken().then((accessToken)=>{
                    this.$store.dispatch('LOGIN', {accessToken,email, password, securityVal})
                    .then(() =>{
                        //console.log(this.$store.state.test.check);
                        if(this.$store.state.loginInfo.success){
                            eventBus.$emit('loginToken',this.$store.state.loginInfo.access_token,false);
                            //this.goToPages();
                        }else{
                            eventBus.$emit('eventPopup','Login information is different Please try again');
                            //alert('Login information is different\nPlease try again');
                        }
                    })
                    .catch(({message}) => {
                        eventBus.$emit('event','error');
                    })
                }).catch((error) => {
                    eventBus.$emit('event','error');     
                })
            }else{
                eventBus.$emit('eventPopup','Please enter your email and password');
            }
        },
        goToPages () {
            this.$router.push({
            path: 'wallet'
            })
        }
    },
    created() {
        eventBus.$emit('backStatus',false);   
    },
    mounted() {
        eventBus.$on('walletGo',this.goToPages);

    }, 
}
</script>
