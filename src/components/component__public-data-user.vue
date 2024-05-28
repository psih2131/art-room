<template>
    <section class="publick-user-data">

    
        <div class="container">
            <div class="publick-user-data__wrapper">
                <p class="publick-user-data__title">{{roomData.title}}</p>
                <p class="publick-user-data__subtitle">Online Exhibition</p>

                <div class="publick-user-data__form">
                    <p class="publick-user-data__form-title">Please register to view the exhibition</p>

                    <div class="publick-user-data__inp-container form-inp-container" :class="{'erorEmail': errorNameStatus, 'hoverInp': nameHover}">
                        <p class="form-inp-container__title">Your name</p>
                        <div class="form-inp-container__inp">
                            <input type="text"  
                            class="form-inp-container__inp-element" 
                            @focus="nameHover = true" 
                            @blur="nameHover = false" 
                            placeholder="Your Name" 
                            v-model="userData.name">
                        </div>
                        <p v-if="errorNameStatus == true" class="form-inp-container__error">check if you entered your name correctly</p>
                    </div>
                    
                    <div class="publick-user-data__inp-container form-inp-container" :class="{'erorEmail': errorEmailStatus, 'hoverInp': emailHover}">
                        <p class="form-inp-container__title">Email address</p>
                        <div class="form-inp-container__inp">
                            <input type="text"  class="form-inp-container__inp-element" 
                            placeholder="Email address" 
                            v-model="userData.email"
                            @focus="emailHover = true" @blur="emailHover = false">
                        </div>
                        <p v-if="errorEmailStatus == true" class="form-inp-container__error">check if you entered your email address correctly</p>
                    </div>

                    <div class="publick-user-data__inp-container form-inp-container form-inp-container__phone" :class="{'hoverInp': phoneHover}">
                        <p class="form-inp-container__title">Phone number</p>
                        <div class="form-inp-container__inp">
                            <input type="text"  
                            class="form-inp-container__inp-element" 
                            placeholder="PHONE NUMBER (OPTIONAL)" 
                            v-model="userData.phone"
                            @focus="phoneHover = true" @blur="phoneHover = false">
                        </div>
                    </div>

                    <div class="form-inp-btn-container">
                        <button class="form-inp-btn-container__btn" @click="checkData()">Enter</button>
                    </div>

                    <p class="publick-user-data__form-text">By clicking Enter you agree to ArtUp’s <a href="">Terms & Conditions</a> and <a href="">Privacy Policy</a></p>

                </div>
            </div>
        </div>

        <div v-if="errorEmailStatus || loadStatus == false || errorNameStatus" class="publick-user-data__fixed-error">Unfortunately, we couldn’t process your registration at this time. Please try again</div>
    </section>
</template>


<script>


export default {

    props: {
      
    },
    
    data() {
        return {
           userData:{
            'name': '',
            'email': '',
            'phone': '',
           },
           errorNameStatus: null,

           errorEmailStatus: null,
           roomData: this.$store.state.allDataServer.data.viewingRoomGetWeb,

           nameHover: false,
           emailHover: false,
           phoneHover: false,
           loadStatus: null,
        }
    },

    components: {
    
    },

    methods: {
        checkEmail(){
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!this.userData.email.match(emailPattern) || this.userData.email.length < 5) {
                this.errorEmailStatus = true
            } else {
                this.errorEmailStatus = false
            }
        },


        checkName(){
            if(this.userData.name.length < 1){
                this.errorNameStatus = true
            }
            else{
                this.errorNameStatus = false
            }
        },

        checkData(){
            this.checkEmail()
            this.checkName()

            if(this.errorEmailStatus == false && this.errorNameStatus == false){
                this.dataSendServerDone()
            }
        },

        dataSendServerDone(){
            
         
            let dataForStore = this.userData

            if(dataForStore.name == ''){
                dataForStore.name = null
            }

            if(dataForStore.email == ''){
                dataForStore.email = null
            }

            if(dataForStore.phone == ''){
                dataForStore.phone = null
            }

            this.$store.commit('changeUserTokenData', dataForStore)
            this.USER_TOKEN();
            
        },



        USER_TOKEN(){
        if(this.$store.state.publickStatus == true){

            const url = 'https://ma-artist-api-dev.herokuapp.com/graphql';

            const query = `
            query Query($publicUser: publicUserParam) {
                publicViewingRoomUserGet(publicUser: $publicUser) {
                    email
                    name
                    phone
                    user_token
                    location
                }
            }

            `;

            const variables = {
                "publicUser": {
                    "user_email": this.$store.state.userTokenData.email,
                    "user_name": this.$store.state.userTokenData.name,
                    "user_phone": this.$store.state.userTokenData.phone,
                }
            }


            fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                variables: variables,
            }),
            })
            .then((response) => response.json())
            .then((data) => this.tokenServerResponse(data))
            .catch((error) => function(){
                
                console.error('Ошибка:', error)
                this.loadStatus = false
            });

            }

        },


        tokenServerResponse(data){
            this.loadStatus = true

            let NEW_TOKEN = data.data.publicViewingRoomUserGet.user_token

            this.$store.commit('changeUserToken', NEW_TOKEN)
            console.log(data.data.publicViewingRoomUserGet.user_token)

            //сохраняем токен в локалсторедж
            localStorage.setItem('USER_TOKEN', NEW_TOKEN)

            this.$store.commit('changePublicDataUserStatus', true)
        }
    },

    computed: {

    },

    watch: {

    },

    mounted(){
        console.log('data S', this.roomData)
    },

}
</script>