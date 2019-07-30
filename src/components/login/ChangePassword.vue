<template>
     <div class="user-page-box">
        <div class="user_page_title_box">
                <p><span>Please enter a<br/>new password to change</span></p>
        </div>
        <div class="pw_change_box">
            <div class="input-box">
                <input type="password" v-model="newPassword" name="newPassword" placeholder="New Password"/>
            </div>
            <div class="input-box">
                <input type="password" v-model="confirmPassword" name="confirmPassword" placeholder="Retype new"/>
            </div>
        </div>
        <div class="main_btn_box">
            <div class="sub_btn_box">
                    <span @click="changePw(newPassword,confirmPassword)" class="btn btn-alt wallet_btn">Change Password</span>
            </div>    
        </div>
    </div>
</template>

<script>
import { eventBus } from '../../main.js';

const passwordCheck = function(pw){
    const regExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{30,}$/
    let regSuccess = false
    if(regExp.test(pw)){
        regSuccess = true
    }
    else{
        regSuccess = false
    }
    return regSuccess;
}

export default {
    data (){
        return {
            newPassword : '',
            confirmPassword : ''
        }
    },
    methods : {
        changePw(newPassword,confirmPassword) {
            //const check1 = passwordCheck(newPassword);
            //const check2 = passwordCheck(confirmPassword);
            var keyName = this.$store.state.keyName;
            //eventBus.$emit('event','loading');
            if(this.newPassword !== '' && this.confirmPassword !== ''){
                if(this.newPassword === this.confirmPassword){
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
                
                getToken().then((accessToken) =>{
                    this.$store.dispatch('CHANGEPW', {accessToken,confirmPassword})
                        .then(() => {
                            if(this.$store.state.changePwStatus.success){
                                eventBus.$emit('completeEvent','Your password has been changed','login')    
                                //this.goToPages();
                            }
                            else{
                                eventBus.$emit('eventPopup','Incorrect password entered Please try again');
                                //alert('Incorrect password entered Please try again');
                            }
                        })
                        .catch(({message}) => {
                            eventBus.$emit('event','error');
                        })
                    }).catch((message)=>{
                            eventBus.$emit('event','error');
                    })
                }else{
                    eventBus.$emit('eventPopup','Passwords do not match each other');
                    //alert('Passwords do not match each other');
                    return false;
                }
            }else{
                alert('Please enter your password');
                return false;
            }
        },
        goToPages () {
            this.$router.push({
            path: 'login'
            })
        }    
    },
    mounted() {
        eventBus.$emit('backStatus',false); 
    },
}
</script>
