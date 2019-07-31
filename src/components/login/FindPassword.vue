<template>
     <div class="user-page-box">
        <div class="user_page_title_box">
                <p><span>Enter the email you entered<br/>when you signed up.</span></p>
        </div>
            <div class="find_email_box">
                <div class="input-box">
                    <input v-model="userEmail" class="input_email" type="text" placeholder="E-mail Address"/>
                </div>
            </div>
            
            <div class="main_btn_box">
                <div class="sub_btn_box">
                    <a @click="emailSend(userEmail)" class="btn btn-lg btn-alt wallet_btn" v-html="btnMessage">
                    </a>
                </div>
            </div>
            <!--비활성화 예정-->
            <div class="find_email_box" v-bind:class="[emailCheck ? 'disShow':'disHide']">
                <div class="input-box">
                    <input  v-model="authNum" class="input_auth" type="text" name="auth" placeholder="Authorization number"/>
                </div>
            </div>
            <div class="main_btn_box" v-bind:class="[emailCheck ? 'disShow':'disHide']">
                <div class="sub_btn_box">
                    <a @click="authNumCheck(authNum)" class="btn btn-lg btn-alt wallet_btn">
                        <label for="auth_btn_label_box">
                            <span id="auth_btn_label_box">Comfirm</span>
                        </label>
                    </a>
                </div>
            </div>                                       
    </div>
</template>

<script>
import { eventBus } from '../../main.js';
export default {
        
    data () {
        return {
            message : `Get an authorization number`,
            userEmail : '',
            emailCheck : false,
            authNum : ''
        }
    },
    computed : {
         btnMessage : function(){
             return this.message;//this.message.replace(/(?:\r\n|\r|\n)/g, '<br />');
         },  
    },
    methods : {
        emailSend(userEmail) {
            eventBus.$emit('event','loading');
            var keyName = this.$store.state.keyName;
            if(this.userEmail !== ''){
              toastLong(`Authentication code has been sent Please enter the authentication number after checking the mail`)
              //  eventBus.$emit('eventPopup','Please re-enter e-mail address')
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
                    this.$store.dispatch('EMAILSEND', {accessToken,userEmail})
                    .then(() => {
                            if(this.$store.state.emailAuthInfo.success){
                                this.emailCheck = true;
                            }
                            else{
                                eventBus.$emit('eventPopup','Please re-enter e-mail address')
                                //alert('Please re-enter e-mail address.');
                            }
                    })
                    .catch(({message}) => {
                        eventBus.$emit('event','error');
                    })
                }).catch((message)=>{
                    eventBus.$emit('event','error');
                })
            }else{
                eventBus.$emit('eventPopup','Please enter an email to receive the authentication number')
                //alert('Please enter an email to receive\n the authentication number');
                return false;
            }
        //인증이후
        },
        authNumCheck(authNum){
            //eventBus.$emit('event','loading');
            var keyName = this.$store.state.keyName;
            
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
               this.$store.dispatch('AUTHNUMCHECK', {accessToken,authNum})
                .then(() => {
                        if(this.$store.state.emailAuthNum.success){
                            eventBus.$emit('completeEvent','The authentication number has been verified as normal.','changePassWord')        
                            //this.goToPages();
                        }
                        else{
                            alert('The authentication number is incorrect');
                        }
                    })
                .catch(({message}) => {
                    eventBus.$emit('event','error');
                })
            }).catch((message)=>{
                    console.log('확인'+message);
                eventBus.$emit('event','error');
            })
            
        },
        goToPages () {
            this.$router.push({
            path: 'changePassWord'
            })
        }
    },
    create (){
        /*eventBus.$emit('backStatus',true);
        console.log('find created');*/
    },
    mounted() {
        eventBus.$emit('backStatus',true);
        console.log('find created');
    },
    updated (){
        this.message = `Get an authorization number`//\n(Retry)
    },
    make() {
        eventBus.$emit('makeStatus', true);
        console.log('make sattus);
    }
}
</script>
