<template>
    <div class="preloader preloader__no-load"  >
        <div class="container preloader__wrapper">
            <div class="preloader__row show"  v-for="item in counterRow" :key="item.id">
                <div class="preloader__box" v-for="item in counterRowElements" :key="item.id">
    
                    <svg width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="12" width="2" height="25" fill="#353535"/>
                        <rect x="0.5" y="13.5" width="2" height="25" transform="rotate(-90 0.5 13.5)" fill="#353535"/>
                    </svg>
                        
                </div>
            </div>
        </div>
    </div>
    <section class="no-load-app-sec no-active-app-sec">
        <div class="container">
            <div class="no-load-app-sec__wrapper">
                <h1 class="no-load-app-sec__title">This viewing room <br>is no longer active.</h1>
                <div class="no-load-app-sec__container-info">
                    <div class="tab__photo-wrapper">
                        <img :src="user__photo" alt="user avatar" class="tab__photo">
                    </div>
                    <ul class="header-meny__contacts">
                        <template v-for="item in user__phones" :key="item">
                            <li class="header-meny__contact-element" v-if="item.value.length > 5">
                                <a :href="`tel:${item.value}`" class="header-meny__contact-link">{{ item.value }}</a>
                            </li>
                        </template>
                        
                        <template v-for="item in user__emails" :key="item">
                            <li class="header-meny__contact-element" v-if="item.value.length > 3">
                                <a :href="`mailto:${item.value}`" class="header-meny__contact-link">{{ item.value }}</a>
                            </li>
                        </template>

                        <template v-for="item in user__socials" :key="item">
                            
                            <component__social :itemData="item"  v-if="getSocial(item.description).length > 0"/>

                        </template>
                    </ul>
                </div>
            </div>
        </div>
    </section>
</template>


<script>
import component__social from '@/components/component__social.vue'
export default {
  props: {

  },
  components: {

        component__social,
    },
  data() {
    return {
        counterRowElements: 24,
        counterRow: 17,

        //data user
        user__title_page: '',
        user__first_name: '',
        user__last_name: '',
        user__counter_work: 0,
        user__photo: '',
        user__emails: [],
        user__phones: [],
        user__socials: [],
        user__origin_country: '',
    }
  },
  methods: {
     animateRows() {
        let mediaQuery1240 = window.matchMedia('(max-width: 1240px)')
        let mediaQuery850 = window.matchMedia('(max-width: 850px)')
        let mediaQuery750 = window.matchMedia('(max-width: 750px)')

        if (mediaQuery1240.matches) {
            this.counterRowElements = 16;
            this.counterRow = 21;
        }

        if (mediaQuery850.matches) {
            this.counterRowElements = 12;
            this.counterRow = 21;
        }

        if (mediaQuery750.matches) {
            this.counterRowElements = 7;
            this.counterRow = 18;
        }
    },

    //load data user header
    header__data_user(){
        if(this.$store.state.allDataServer != null){
            //load title website
            if(this.$store.state.allDataServer.data.viewingRoomGetWeb.title != null){
                this.user__title_page = this.$store.state.allDataServer.data.viewingRoomGetWeb.title 
            }
            else{
                this.user__title_page = ''
            }

            //load first name
            if(this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.first_name != null){
                this.user__first_name = this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.first_name 
            }
            else{
                this.user__first_name = ''
            }
            
            //load last name
            if(this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.last_name != null){
                this.user__last_name = this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.last_name    
            }
            else{
                this.user__last_name = ''
            }

            //load counter work
            this.user__counter_work = this.$store.state.allDataServer.data.viewingRoomGetWeb.artworks_data.length

            //load photo
            if(this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.image_data != null &&
            this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.image_data.image_url){
                this.user__photo = this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.image_data.image_url   
            }
            else{
                this.user__photo =  require('@/assets/img/no-photo.jpg');
            }

            
            //load emails
            if(this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.emails.length > 0){
                this.user__emails = this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.emails    
            }
            else{
                this.user__emails = []
            }

            //load phones
            if(this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.phones.length > 0){
                this.user__phones = this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.phones    
            }
            else{
                this.user__phones = []
            }

            //load socials
            if(this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.socials.length > 0){
                this.user__socials = this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.socials    
            }
            else{
                this.user__socials = []
            }

            // //load country
            // if(this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.residence_country.length != null){
            //     this.user__origin_country = this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.residence_country    
            // }
            // else{
            //     this.user__origin_country = ''
            // }  

            // //load country
            // if(this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.residence_country.length > 0){
            //     this.user__origin_country = this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.residence_country    
            // }
            // else{
            //     this.user__origin_country = ''
            // }
        }
        
    },

    //url convert for social link

    getSocial(alias) {
        let social = this.user__socials.find(
            (el) => el.description && el.description === alias
        )
        console.log('GGG', social)
        let result

        if(social != null && social != undefined  && social.value != null){
            result = social.value
        }
        else{
            result = ''
        }

        console.log(result)
        return result
        },
  },
  mounted() {
    this.animateRows()
    this.header__data_user()
  },

  computed: {
    watchServerDataChange() {
      return this.$store.state.allDataServer
    }

  },
  watch: {
    //watch theme status
    watchServerDataChange(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.header__data_user()
      }
    },

  }  

};
</script>