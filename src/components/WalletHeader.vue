<template>
    <header class="header" id="header">
        <div class="headerLeft">
            <span @click="backPage()">
                <img src="../common/images/backBtn.png" alt="backPage">
            </span>
        </div>
    </header>
</template>

<script>
import { eventBus } from '../main.js';

export default {
    data(){
        return {
        }
    },
    methods :{
        backPage() {
            this.$router.go(-1);
        },
        accessTokenUpdate (loginToken,loginCheck) {

            let keyName = this.$store.state.keyName;

            function setKey(callback){
                return new Promise((resolve,reject)=>{
                    setAccessToken(keyName,loginToken,(result)=>{
                        if(result){
                            resolve(loginCheck);
                        }
                        else{
                            reject(new Error('Not key Set Fail'));
                        }
                    }) 
                })
            }
           setKey().then((loginCheck)=>{
               if(loginCheck){
                  eventBus.$emit('newWalletLoad');
                  eventBus.$emit('event','modalHide');
                  eventBus.$emit('eventPopup','My wallet was registered')
               }else{
                  eventBus.$emit('walletGo');
               }
           }).then(()=>{
                setEmailAddr(this.$store.state.userEmail,(cb) =>{

                    if(cb){
                           
                    }
                }) 
           })
           .catch((message) =>{
               console.log(message);
           }) 
        },
        logout() {
            function logoutProcess(callback){
                return new Promise(function(resolve,reject){
                    removeAccessToken(this.priveteAccessKey,function(result){
                         if(result){
                             resolve();
                         }
                         else{
                             reject(new Error('Fail'));
                         }   
                    })
                })
            }
            logoutProcess().then(()=>{
                this.$router.push({
                    path : 'login'
                })
            }).catch((errMsg)=>{
                console.log(errMsg);
                alert('Please try logging out again')
            })
        }
    },
    mounted() {

        eventBus.$on('loginToken',this.accessTokenUpdate);
    },
}
</script>
