<template>
    

    <header class="header" :class="{fullAnimation : header__full_anim, 'headerHide': header__show, 'showElementHeader': header__show_element,'hideHeaderAll':header__show_all, 'header-hide-scrol-more-100': header__scroll_more_100} ">
        <div class="container">
            <div class="header__left">
                <transition name="show-header-info">
                    <div  v-if="show__header_info" class="header__info-text-box">
                        <h1 class="header__title">{{user__title_page}}</h1>
                        <p class="header__subtitle" >by {{user__first_name}} {{ user__last_name }}</p>
                    </div>
                </transition>

                <transition name="show-header-name">
                    <div v-if="show__header_name" class="header__info-text-box-name info-text-box-name" >
                        <div class="info-text-box-name__first-name text-header-title">{{truncateString(user__first_name)}}</div>
                        <div class="info-text-box-name__last-name">
                            <div class="info-text-box-name-text text-header-title">{{ user__last_name }}</div>
                            <div class="info-text-box-name__dop">{{ user__counter_work }} selected works</div>
                        </div>

                        <transition name="show__until">
                            <p v-if="show__until" class="header__until">Until {{ user__until_date }}</p>
                        </transition>
                    </div>
                </transition>
                
            </div>
            <div class="header__right">
                
                <transition>
                    <div class="header__theme-button theme-button " @click="changeThemeMode" 
                    :class="{'theme-button__night-mode': !dayMode,
                     'theme-button__day-mode': dayMode,
                       'color-Black': header__show_meny,
                        'hideThemeModeBtn': header__burger_status,
                        'hiddetThemeBtnMobMenyOpen': header__show_night_mode}">
                        <div class="theme-button__img-container theme-button__day" >
                            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13 2C19.0751 2 24 6.92487 24 13L26 13C26 5.8203 20.1797 -8.38371e-07 13 -5.24537e-07L13 2ZM2 13C2 6.92487 6.92487 2 13 2L13 -5.24537e-07C5.8203 -2.10702e-07 -8.38371e-07 5.8203 -5.24537e-07 13L2 13ZM13 24C6.92487 24 2 19.0751 2 13L-5.24537e-07 13C-2.10702e-07 20.1797 5.8203 26 13 26L13 24ZM24 13C24 19.0751 19.0751 24 13 24L13 26C20.1797 26 26 20.1797 26 13L24 13Z" fill="white"/>
                            </svg>
                        </div>
    
                        <div class="theme-button__img-container theme-button__night">
                            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.4853 1.51416L16.7753 0.55715L14.9859 0.0148056L15.5283 1.80422L16.4853 1.51416ZM1.51367 16.4859L1.80373 15.5289L0.0143015 14.9866L0.556665 16.776L1.51367 16.4859ZM15.9994 5.00004C15.9994 11.0752 11.0746 16 4.99943 16V18C12.1791 18 17.9994 12.1797 17.9994 5.00004H15.9994ZM15.5283 1.80422C15.8344 2.81437 15.9994 3.88704 15.9994 5.00004H17.9994C17.9994 3.68834 17.8048 2.42028 17.4423 1.2241L15.5283 1.80422ZM16.1952 2.47117C20.7128 3.84037 23.9995 8.03769 23.9995 13H25.9995C25.9995 7.13219 22.1126 2.17479 16.7753 0.55715L16.1952 2.47117ZM23.9995 13C23.9995 19.0752 19.0747 24 12.9995 24V26C20.1792 26 25.9995 20.1797 25.9995 13H23.9995ZM12.9995 24C8.0372 24 3.83992 20.7134 2.47068 16.1959L0.556665 16.776C2.17434 22.1132 7.13171 26 12.9995 26V24ZM4.99943 16C3.88647 16 2.81384 15.8351 1.80373 15.5289L1.22362 17.4429C2.41976 17.8055 3.68778 18 4.99943 18V16Z" fill="white"/>
                            </svg>                            
                        </div>
                    </div>
                </transition>
                
                <transition name="show__photo_wrapper">
                    <div v-if="show__photo" class="header__nav-photo" >                        
                        <div class="header__photo-wrapper"  :class="{'header-meny-active__close-bnt-active':header__show_meny}">

                            <img :src="user__photo" alt="user_avatar" class="header__photo" @click="openMeny">
                        

                            <div class="header-meny_close" @click="openMeny">
                                <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g filter="url(#filter0_b_1_1703)">
                                    <line x1="45.7813" y1="25.983" x2="25.9823" y2="45.782" stroke="#1B1D1C" stroke-width="2"/>
                                    <line x1="25.9825" y1="26.2187" x2="45.7815" y2="46.0177" stroke="#1B1D1C" stroke-width="2"/>
                                    </g>
                                    <defs>
                                    <filter id="filter0_b_1_1703" x="-64" y="-64" width="200" height="200" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                    <feGaussianBlur in="BackgroundImageFix" stdDeviation="32"/>
                                    <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_1_1703"/>
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_1_1703" result="shape"/>
                                    </filter>
                                    </defs>
                                </svg>
                                                               
                            </div>
                        </div>
                    </div>
                </transition>
                
            </div>

            <div class="header__down-line"></div>
             
        </div>
    </header>


        <div :class="{'header-meny-active':header__show_meny}" class="header-meny" >
            <div class="header-meny__row">
                <div class="container">

                    <div class="header-meny_close-mob" @click="openMeny">
                        <svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g filter="url(#filter0_b_308_9982)">
                            <g filter="url(#filter1_b_308_9982)">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M24.12 48.24C37.4411 48.24 48.24 40.7911 48.24 24.12C48.24 7.44889 37.4411 0 24.12 0C10.7989 0 0 7.44889 0 24.12C0 40.7911 10.7989 48.24 24.12 48.24Z" fill="white"/>
                            </g>
                            <line x1="30.7872" y1="17.5217" x2="17.5219" y2="30.787" stroke="#1B1D1C" stroke-width="2"/>
                            <line x1="17.5218" y1="17.2129" x2="30.7871" y2="30.4783" stroke="#1B1D1C" stroke-width="2"/>
                            </g>
                            <defs>
                            <filter id="filter0_b_308_9982" x="-42.88" y="-42.88" width="134" height="134" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                            <feGaussianBlur in="BackgroundImageFix" stdDeviation="21.44"/>
                            <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_308_9982"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_308_9982" result="shape"/>
                            </filter>
                            <filter id="filter1_b_308_9982" x="-42.88" y="-42.88" width="134" height="134" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                            <feGaussianBlur in="BackgroundImageFix" stdDeviation="21.44"/>
                            <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_308_9982"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_308_9982" result="shape"/>
                            </filter>
                            </defs>
                        </svg>                            
                    </div>

                    <div class="header-meny__wrapper">
                        <div class="header-meny__container">

                            <div class="header-meny__info">
                                <div class="tab__photo-wrapper">
                                    <img :src="user__photo" alt="user avatar" class="tab__photo">
                                </div>
                                <h2 class="tab__title">{{user__first_name}} {{ user__last_name }}</h2>
                                <!-- <ul class="tab__list">
                                    <li class="tab__list-element" v-if="user__type_accoutn != null"> {{ user__type_accoutn }}</li>
                                    <li class="tab__list-element" v-if="user__origin_country != null">{{ user__origin_country }}</li>
                                    <li class="tab__list-element" v-if="user__resident_country != null">{{user__resident_country}}</li>
                                </ul> -->

                                <ul class="tab__list">
                                    <li class="tab__list-element" v-if="user__type_accoutn != null">{{user__type_accoutn}}</li>
                                    <!-- <li class="tab__list-element">London</li> -->
                                    <template v-if="user__type_accoutn == 'Art Collector'">
                                      <li class="tab__list-element" v-if=" user__origin_country != '' && user__origin_country != null">from {{ user__origin_country }}</li>
                                      <li class="tab__list-element" v-if="user__resident_country != null">{{ user__resident_country }}</li>
                                    </template>
          
                                    <template v-else-if="user__type_accoutn == 'Artist'">
                                      <li class="tab__list-element" v-if=" user__origin_country != '' && user__origin_country != null ">from {{ user__origin_country }}</li>
                                      <li class="tab__list-element" v-if=" user__resident_country != '' && user__resident_country != null ">{{ user__resident_country }}</li>
                                    </template>
                                </ul>


                            </div>
                            
                            <ul class="header-meny__contacts">
                                <template v-if="user__phones != null && user__phones != undefined">
                                    <div>
                                        <template  v-for="item in user__phones" :key="item">
                                            <li class="header-meny__contact-element" >
                                                <a :href="`tel:${item.value}`"  class="header-meny__contact-link">{{ item.value }}</a>
                                            </li>
                                        </template>
                                    </div>
                                </template>
                                
                                <template v-if="user__emails != null && user__emails != undefined">
                                    <div>
                                        <template v-for="item in user__emails" :key="item">
                                            <li class="header-meny__contact-element">
                                                <a :href="`mailto:${item.value}`" class="header-meny__contact-link">{{ item.value }}</a>
                                            </li>
                                        </template>
                                    </div>
                                </template>

                                <template v-for="item in user__socials" :key="item">
                                    <li class="header-meny__contact-element" v-if="getSocial(item.description).length > 0" >
                                        <template v-if="item.description == 'instagram'">
                                           <a target="_blank" :href="getSocialLink(item.description, item)" class="header-meny__contact-link">
                                                <div class="header-meny__icon-wrapper">
                                                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.496 3.23999H16.505C18.987 3.23999 21 5.25199 21 7.73599V16.745C21 19.227 18.988 21.24 16.504 21.24H7.496C5.013 21.24 3 19.228 3 16.744V7.73599C3 5.25299 5.012 3.23999 7.496 3.23999V3.23999Z" stroke="#1B1D1C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                        <path d="M16.949 6.95303C16.763 6.95403 16.612 7.10503 16.612 7.29103C16.612 7.47703 16.764 7.62803 16.95 7.62803C17.136 7.62803 17.287 7.47703 17.287 7.29103C17.288 7.10403 17.136 6.95303 16.949 6.95303" stroke="#1B1D1C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                        <path d="M14.5456 9.69443C15.9515 11.1003 15.9515 13.3797 14.5456 14.7856C13.1397 16.1915 10.8603 16.1915 9.45444 14.7856C8.04855 13.3797 8.04855 11.1003 9.45444 9.69443C10.8603 8.28854 13.1397 8.28854 14.5456 9.69443" stroke="#1B1D1C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                    </svg>                                                        
                                                </div>
                                                {{ getLastSegment(getSocialLink(item.description, item), item) }}
                                            </a>
                                        </template>

                                        <template v-else-if="item.description == 'facebook'">
                                            <a target="_blank" :href="getSocialLink(item.description, item)" class="header-meny__contact-link">
                                                 <div class="header-meny__icon-wrapper">
                                                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M9.68396 11.554H14.315" stroke="#1B1D1C" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round"/>
                                                        <path d="M14.316 7.69495H13.506C12.249 7.69495 11.229 8.71495 11.229 9.97195V10.7819V16.7849" stroke="#1B1D1C" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round"/>
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 22.24C17.5228 22.24 22 17.7628 22 12.24C22 6.71714 17.5228 2.23999 12 2.23999C6.47715 2.23999 2 6.71714 2 12.24C2 17.7628 6.47715 22.24 12 22.24Z" stroke="#1B1D1C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                    </svg>                                                        
                                                 </div>
                                                 {{ getLastSegment(getSocialLink(item.description, item), item) }}
                                             </a>
                                         </template>

                                         <template v-else-if="item.description == 'tikTok'">
                                            <a target="_blank" :href="getSocialLink(item.description, item)" class="header-meny__contact-link">
                                                 <div class="header-meny__icon-wrapper">
                                                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.5 3.23999H16.504C18.987 3.23999 21 5.25299 21 7.73599V16.745C21 19.227 18.987 21.24 16.504 21.24H7.496C5.013 21.24 3 19.227 3 16.744V7.73999C3 5.25499 5.015 3.23999 7.5 3.23999V3.23999Z" stroke="#1B1D1C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                        <path d="M14.4487 7.23999H12.9459V14.2813C12.9459 14.9755 12.0896 15.7689 11.2509 15.7689C10.4819 15.7689 9.57335 15.24 9.57335 14.2813C9.5504 13.2069 10.2198 12.6449 11.3557 12.645V11.1574C9.34579 11.1573 7.9657 12.5788 8.00065 14.2813C8.0356 15.9838 9.50385 17.24 11.2509 17.24C12.998 17.24 14.4487 15.7193 14.4487 14.397V10.0499C15.0603 10.9425 16.336 11.3392 17 11.2565V9.60363C15.5846 9.68627 14.4487 7.9342 14.4487 7.23999Z" fill="#1B1D1C"/>
                                                    </svg>                                                            
                                                 </div>
                                                 {{ getLastSegment(getSocialLink(item.description, item), item) }}
                                             </a>
                                         </template>

                                         <template v-else-if="item.description == 'youTube'">
                                            <a target="_blank" :href="getSocialLink(item.description, item)" class="header-meny__contact-link">
                                                 <div class="header-meny__icon-wrapper">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M21.583 6.37299C21.354 5.36899 20.676 4.57699 19.814 4.30499C18.255 3.81799 12 3.81799 12 3.81799C12 3.81799 5.748 3.81799 4.186 4.30499C3.327 4.57299 2.649 5.36499 2.417 6.37299C2 8.19499 2 12 2 12C2 12 2 15.805 2.417 17.627C2.646 18.631 3.324 19.423 4.186 19.695C5.748 20.182 12 20.182 12 20.182C12 20.182 18.255 20.182 19.814 19.695C20.673 19.427 21.351 18.635 21.583 17.627C22 15.805 22 12 22 12C22 12 22 8.19499 21.583 6.37299Z" stroke="#1B1D1C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.002 15L15.198 12L10.002 9V15Z" stroke="#1B1D1C" stroke-width="1.5" stroke-linecap="round"/>
                                                    </svg>                                                                                                                    
                                                 </div>
                                                 {{ getLastSegment(getSocialLink(item.description, item), item) }}
                                             </a>
                                         </template>

                                         <template v-else-if="item.type == 'web'">
                                            <a target="_blank" :href="getSocialLink(item.description, item)" class="header-meny__contact-link">{{ getLastSegment(getSocialLink(item.description, item), item) }}</a>
                                        </template>

                                        <template v-else>
                                            <a target="_blank" :href="getSocialLink(item.description, item)" class="header-meny__contact-link">{{ item.value }}</a>
                                        </template>
                                    </li>
                                </template>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
   
    
        <!-- <preloader/> -->
    
</template>


<script>
// import preloader from '@/components/component__preloader.vue'
import { unixConverteDate } from '@/plugins/plugin__convert-unix-date.js';


export default {
    
    data() {
        return {
            show__header_info: false,
            show__header_name: false,
            show__until: false,
            show__photo: false,
            show__burger: false,
            header__full_anim: false,

            header__show: false,
            header__show_all: false,
            header__show_meny: false,
            header__show_night_mode: false,
            header__show_element: false,
            header__burger_status: false,
            header__scroll_more_100: false,

            dayMode: this.$store.state.themeDayMode,
            burgerFirstHide: this.$store.state.burgerHideFirstWindowOpen,

            prevScrollTop: 0, // Добавляем новое свойство для хранения предыдущего значения скролла
            header__scroll_direction: "", // Направление скролла (up или down)

            //data user
            user__title_page: '',
            user__first_name: '',
            user__last_name: '',
            user__counter_work: 0,
            user__photo: null,
            user__emails: [],
            user__phones: [],
            user__socials: [],
            user__until_date: '',
            user__origin_country: '',
            user__resident_country: '',
            user__type_accoutn: '',          
        }
    },

    components: {
        // preloader,
    },


    methods: {
        showFirstElements(){
            this.show__header_info = true
            this.show__photo = true
        },
        showAllElements(){
            this.show__header_info = false
            this.show__header_name = true
            this.show__until = true
            this.show__burger = true
            
            this.header__full_anim = true
            
        },

        hideHeader(){
            this.header__show = this.$store.state.mainHeaderHide
        },

        hideHeaderAll(){
            this.header__show_all = this.$store.state.headerHideAll
        },

        openMeny(){
            let currentHeaderStatus = this.$store.state.mainHeaderHide
            let swiperId = this.$store.state.swipeIndex

            //get public status page
            let publicStatus = this.$store.state.publickStatus

            if(swiperId == null || swiperId == 0){
                this.$store.commit('changeHeaderMainStatus', !currentHeaderStatus)
                this.header__show_night_mode = !this.header__show_night_mode
            }
            else{

            }

            this.header__show_meny = !this.header__show_meny


            //при открытии меню подгружаем другую картинку и имя если public status true и эта картинка существует на сервере
            if(publicStatus == true){

                //if meny open
                if(this.header__show_meny == true){
                    //image
                    if(this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.image_data &&
                    this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.image_data.image_url){
                        this.user__photo = this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.image_data.image_url   
                    }
                    else{
                        this.user__photo =  require('@/assets/img/no-photo.jpg');
                    }

                    //name
                    if(this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.first_name ){
                        this.user__first_name = this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.first_name 
                    }
                    else{
                        this.user__first_name = ''
                    }
                }  
                //if medy close
                else{
                    //image
                    if(this.$store.state.allDataServer.data.viewingRoomGetWeb.artist_data.image_data  &&
                    this.$store.state.allDataServer.data.viewingRoomGetWeb.artist_data.image_data.image_url  && 
                    this.$store.state.allDataServer.data.viewingRoomGetWeb.artist_data.image_url != '' &&
                    this.$store.state.allDataServer.data.viewingRoomGetWeb.artist_data.image_url != ' ' && 
                    this.$store.state.allDataServer.data.viewingRoomGetWeb.artist_data.image_url != ""){
                        this.user__photo = this.$store.state.allDataServer.data.viewingRoomGetWeb.artist_data.image_data.image_url
                    }
                    else{
                        // if(this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.image_data  &&
                        // this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.image_data.image_url){
                        //     this.user__photo = this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.image_data.image_url   
                        // }
                        // else{
                        //     this.user__photo =  require('@/assets/img/no-photo.jpg');
                        // }
                        this.user__photo =  require('@/assets/img/no-photo.jpg');
                    }

                    //name
                    if(this.$store.state.allDataServer.data.viewingRoomGetWeb.artist_data.first_name != null && 
                    this.$store.state.allDataServer.data.viewingRoomGetWeb.artist_data.first_name != ''){
                        this.user__first_name = this.$store.state.allDataServer.data.viewingRoomGetWeb.artist_data.first_name 
                    }
                    else{
                        if(this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.first_name != null){
                            this.user__first_name = this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.first_name 
                        }
                        else{
                            this.user__first_name = ''
                        }
                    }
                }
            }
        },


        hideBurgerFunction(){
            let burgerSroreStatus = this.$store.state.hideBurger
            this.header__burger_status =  burgerSroreStatus
        },

        openCurrentWindow(currentNumber){
            this.$store.commit('changeSwiperScrollCurrent', currentNumber)

            let currentHeaderStatus = this.$store.state.mainHeaderHide
            let swiperId = this.$store.state.swipeIndex

            if(swiperId == null || swiperId == 0){
                this.$store.commit('changeHeaderMainStatus', !currentHeaderStatus)
            }
            else{

            }
            this.header__show_meny = !this.header__show_meny
        },

        changeThemeMode(){
            let dayModeStatus =  this.$store.state.themeDayMode
            this.$store.commit('changeThemeDayMode', !dayModeStatus)
        },

        changeThemeStatus(){
            this.dayMode = this.$store.state.themeDayMode
        },

        hideBurgerFirstScreen(){
            this.burgerFirstHide = this.$store.state.burgerHideFirstWindowOpen
        },


        // trackScroll() {
        // // Получаем значение скролла
        // const scrollTop = window.scrollY || document.documentElement.scrollTop;
        
        // // Выводим значение в консоль
        // console.log('Значение скролла:', scrollTop);

        // if(scrollTop >= 50 ){
        //     this.header__scroll_more_100 = true
        // }
        // else{
        //     this.header__scroll_more_100 = false
        // }
        // },


            trackScroll() {
            // Получаем текущее значение скролла
            const scrollTop = window.scrollY || document.documentElement.scrollTop;

            // Определяем направление скролла
            if (scrollTop > this.prevScrollTop) {
            this.header__scroll_direction = "down";
            this.header__scroll_more_100 = true
            } else if (scrollTop < this.prevScrollTop) {
            this.header__scroll_direction = "up";
            this.header__scroll_more_100 = false
            }

            // Сохраняем текущее значение скролла для следующего сравнения
            this.prevScrollTop = scrollTop;
        },





        //load data user header
        header__data_user(){
            //get public status page
            let publicStatus = this.$store.state.publickStatus

            //load title website
            if(this.$store.state.allDataServer.data.viewingRoomGetWeb.title != null){
                this.user__title_page = this.$store.state.allDataServer.data.viewingRoomGetWeb.title 
            }
            else{
                this.user__title_page = ''
            }

            //load first name
            if(publicStatus == true){
                if( this.$store.state.allDataServer.data.viewingRoomGetWeb.artist_data &&
                    this.$store.state.allDataServer.data.viewingRoomGetWeb.artist_data.first_name  && 
                    this.$store.state.allDataServer.data.viewingRoomGetWeb.artist_data.first_name != ''){
                    this.user__first_name = this.$store.state.allDataServer.data.viewingRoomGetWeb.artist_data.first_name 
                }
                else{
                    if(this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.first_name != null){
                        this.user__first_name = this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.first_name 
                    }
                    else{
                        this.user__first_name = ''
                    }
                }
            }
            else{
                if(this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data && 
                this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.first_name){
                    this.user__first_name = this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.first_name 
                }
                else{
                    this.user__first_name = ''
                }
            }
            
            //load last name
            if(this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.last_name != null){
                this.user__last_name = this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.last_name    
            }
            else{
                this.user__last_name = ''
            }


            //load type accoutn
            if(this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.profile_type != null){

               this.user__type_accoutn = this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.profile_type    
            }
            else{
                this.user__type_accoutn = ''
            }


            //load counter work
            if(this.$store.state.allDataServer.data.viewingRoomGetWeb.artworks_data != null){
                this.user__counter_work = this.$store.state.allDataServer.data.viewingRoomGetWeb.artworks_data.length
            }
            else{
                this.user__counter_work = 0
            }
            

            //load photo
            if(publicStatus == true){
                if( this.$store.state.allDataServer.data.viewingRoomGetWeb.artist_data &&
                    this.$store.state.allDataServer.data.viewingRoomGetWeb.artist_data.image_data  &&
                    this.$store.state.allDataServer.data.viewingRoomGetWeb.artist_data.image_data.image_url  && 
                    this.$store.state.allDataServer.data.viewingRoomGetWeb.artist_data.image_url != '' &&
                    this.$store.state.allDataServer.data.viewingRoomGetWeb.artist_data.image_url != ""){
                    this.user__photo = this.$store.state.allDataServer.data.viewingRoomGetWeb.artist_data.image_data.image_url
                    
                }
                else{
                    if(this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.image_data != null &&
                    this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.image_data.image_url){
                        this.user__photo = this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.image_data.image_url   
                    }
                    else{
                        this.user__photo =  require('@/assets/img/no-photo.jpg');
                    }
                }
            }
            else{
                if(this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.image_data != null &&
                this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.image_data.image_url){
                    this.user__photo = this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.image_data.image_url   
                }
                else{
                    this.user__photo =  require('@/assets/img/no-photo.jpg');
                }
            }


            //load emails
            if(this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.emails != null){
                this.user__emails = this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.emails    
            }
            else{
                this.user__emails = []
            }

            //load phones
            if(this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.phones != null){
                this.user__phones = this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.phones    
            }
            else{
                this.user__phones = []
            }

            //load socials
            if(this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.socials != null){
                this.user__socials = this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.socials    
            }
            else{
                this.user__socials = []
            }

            //load country
            if(this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.origin_country && 
               this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.origin_country != ""){
                this.user__origin_country = this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.origin_country    
            }
            else{
                this.user__origin_country = null
            }
            
            
            //load country resident
            if(this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.residence_country && 
               this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.residence_country != ""){
                this.user__resident_country = this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.residence_country    
            }
            else{
                this.user__resident_country = null
            } 





            //load until date
            if(this.$store.state.allDataServer.data.viewingRoomGetWeb.valid_until != null){
                if(this.$store.state.allDataServer.data.viewingRoomGetWeb.valid_until > 0){
                    this.user__until_date = unixConverteDate(this.$store.state.allDataServer.data.viewingRoomGetWeb.valid_until) 
                }
                else{
                    this.user__until_date = ''
                }
            }
            
            
            
        },

        
        truncateString(str) {
            // Проверяем длину строки, включая пробелы
            if (str.length > 54) {
                // Обрезаем строку до 54 символов и заменяем последние 3 символа на три точки
                return str.slice(0, 51) + '...';
            } else {
                // Если длина строки не превышает 54 символа, возвращаем исходную строку
                return str;
            }
        },




        getSocialLink(alias, allLinkData) {
        let linkValue = allLinkData.value
        let typeLink = allLinkData.type
        let typeSoial = allLinkData.description
        let searchString = "https://";

        if(typeLink == 'web'){
            if(linkValue.includes(searchString)){
                return linkValue
            }
            else if( !linkValue.includes("://")){
                return 'https://' + linkValue
            }
            else{
                return linkValue
            }
        }
        else if(typeLink == 'social'){

            //facebook
            if(typeSoial == 'facebook'){
                let facebookUrl = 'facebook.com'

                if(linkValue.includes(facebookUrl)){
                    return linkValue
                }
                else{
                    return 'https://www.facebook.com/'
                }  
            }
            else if(typeSoial == 'instagram'){
                let instagramUrl = 'instagram.com'

                if(linkValue.includes(instagramUrl)){
                    return linkValue
                }
                else{
                    return 'https://instagram.com'
                } 
            }
            else if(typeSoial == 'youTube'){
                let yotubeUrl1 = 'youtube.com'
                let yotubeUrl2 = '@'

                if(linkValue.includes(yotubeUrl1)){
                    return linkValue
                }
                else if(!linkValue.includes(yotubeUrl1) && linkValue.includes(yotubeUrl2)){
                    return 'https://www.youtube.com/'+linkValue
                }
                else if(!linkValue.includes(yotubeUrl1) && !linkValue.includes(yotubeUrl2) && !linkValue.includes('.com') && !linkValue.includes('/') && !linkValue.includes('.')){
                    return 'https://www.youtube.com/@'+linkValue
                }
                else{
                    return 'https://www.youtube.com/'
                } 
            }
            else if(typeSoial == 'tikTok'){
                let tikTokUrl1 = 'tiktok.com'
                let tikTokUrl2 = '@'

                if(linkValue.includes(tikTokUrl1)){
                    return linkValue
                }
                else if(!linkValue.includes(tikTokUrl1) && linkValue.includes(tikTokUrl2)){
                    return 'https://www.tiktok.com/'+linkValue
                }
                else if(!linkValue.includes(tikTokUrl1) && !linkValue.includes(tikTokUrl2) && !linkValue.includes('.com') && !linkValue.includes('/') && !linkValue.includes('.')){
                    return 'https://www.tiktok.com/@'+linkValue
                }
                else{
                    return 'https://www.tiktok.com/@'
                }
            }
        }
        else{
            return ''
        }
        
        },

        

        getSocial(alias) {
        let social = this.user__socials.find(
            (el) => el.description && el.description === alias
        )
    
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

        stringIsAValidUrl(s) {
            try {
                new URL(s);
                return true;
            } catch (err) {
                return false;
            }
        },
        getLastSegment(url, allData) {
            let typeLink = allData.type

            if(typeLink == 'web'){
                if(url.length > 30){
                    let newUrl = url.substring(0, 29);
                    return newUrl + '...'
                }
                else{
                    return url
                }
            }
            else{
                if(url.includes('instagram.com')){
                    return 'Instagram'
                }

                else if(url.includes('facebook.com')){
                    return 'Facebook'
                }

                else if(url.includes('youtube.com')){
                    return 'YouTube'
                }

                else if(url.includes('tiktok.com/@')){
                    return 'TikTok'
                }
                else{
                    if(url.length > 20){
                        let newUrl = url.substring(0, 19);
                        return newUrl + '...'
                    }
                    else{
                        return url
                    }
                }
            }

        
            
        }, 



        //url convert for social link
       //url convert for social link
    //   getSocialLink(alias, allLinkData) {
    //     let link = allLinkData.value
    //     let searchString = "https://";
      

    //     if (link.includes(searchString)) {
    //       console.log("Строка не содержит сылку");
    //         return link
    //     } else {
           

    //         console.log("Строка не содержит сылку");
    //         const social = this.user__socials.find(
    //             (el) => el.description && el.description === alias
    //         )
    //         if (this.stringIsAValidUrl(social.value)) {
    //             const result = social.value != null ? social.value : ''
    //             return result
    //         }
    //         let username = ''
    //         // check for username
    //         if (!social.value) return false
    //         if (social.value && Array.from(social.value)[0] === '@') {
    //             username = social.value.replace('@', '')
    //         } else {
    //             username = social.value
    //         }
    //         switch (social.description) {
    //             case 'website':
    //             return 'https://' + username + '/'
    //             case 'instagram':
    //             return 'https://instagram.com/' + username + '/'
    //             case 'facebook':
    //             return 'https://www.facebook.com/' + username + '/'
    //             case 'youTube':
    //             return 'https://www.youtube.com/user/' + username + '/'
    //             case 'tikTok':
    //             return 'https://www.tiktok.com/@' + username + '/'
    //         }

    //     }

    //     console.log('ALIAS', link)
        
    //     },

    //     getSocial(alias) {
    //     let social = this.user__socials.find(
    //         (el) => el.description && el.description === alias
    //     )
    //     console.log('GGG', social)
    //     let result

    //     if(social != null && social != undefined  && social.value != null){
    //         result = social.value
    //     }
    //     else{
    //         result = ''
    //     }

    //     console.log(result)
    //     return result
    //     },

    //     stringIsAValidUrl(s) {
    //         try {
    //             new URL(s);
    //             return true;
    //         } catch (err) {
    //             return false;
    //         }
    //     },
    //     getLastSegment(url) {
    //       console.log('all data link url', url)
    //       let instagramLink = 'instagram.com'
    //       let facebookLink = 'www.facebook.com/'
    //       let tikTok = 'www.tiktok.com/@'
    //       let youtube = 'youtube.com/'

    //       if (url.includes(instagramLink)) {
    //         console.log('Instax')
    //         let username = url.match(/instagram\.com\/([a-zA-Z0-9_]+)/)[1];
    //         if(username){
    //           return username;
    //         }
    //         else{
    //           return 'instagram';
    //         }
          
    //       }
    //       else if(url.includes(facebookLink)){
    //         let match;
    //         if (url.includes("profile.php?id")) {
    //             match = url.match(/profile\.php\?id=(\d+)/);
    //             if (match) {
    //                 return `id:${match[1]}`;
    //             }
    //         } else {
    //             match = url.match(/facebook\.com\/([^/?]+)/);
    //             if (match) {
    //                 return match[1];
    //             }
                
    //         }
    //         return 'facebook';
           
    //       }
    //       else if(url.includes(tikTok)){
    //         const match = url.match(/(?:https?:\/\/)?(?:www\.)?tiktok\.com\/@([^/?]+)/);
    //         if (match) {
    //             return `@${match[1]}`;
    //         } else {
    //             return 'tiktok'; // Если ссылка не соответствует формату
    //         }
    //       }
    //       else if(url.includes(youtube)){
    //         let match = url.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/user\/([^/?]+)/);
    //         if (match) {
    //             return match[1]; // Возвращаем захваченное значение имени пользователя
    //         } else {
    //             return 'youtube'; // Если ссылка не соответствует формату
    //         }
    //       }
    //       else{
    //         return url;
    //       }
            
    //     }, 

    },

    computed: {
        wachPreloaderStatus() {
            // get data in store
            return this.$store.state.preloaderStatus;
        },

        watchHeaderHideStatus() {
            // get data in store
            return this.$store.state.mainHeaderHide;
        },

        watchHideBurgerStatus() {
            // get data in store
            return this.$store.state.hideBurger;
        },

        watchThemeModeStatus(){
            return this.$store.state.themeDayMode
        },

        watchChangeTextFirstScreen(){
            return this.$store.state.burgerHideFirstWindowOpen
        },

        watchHeaderAll(){
            return this.$store.state.headerHideAll
        }

    },

    watch: {
        //watch data store and use function if data changed
        wachPreloaderStatus(newValue, oldValue) {
            if (newValue !== oldValue) {
                this.showAllElements()
            }
        },


        //watch data store and use function if data changed
        watchHeaderHideStatus(newValue, oldValue) {
            if (newValue !== oldValue) {
                this.hideHeader()
            }
        },

        watchHideBurgerStatus(newValue, oldValue) {
            if (newValue !== oldValue) {
                this.hideBurgerFunction()
            }
        },


        //watch theme status
        watchThemeModeStatus(newValue, oldValue) {
            if (newValue !== oldValue) {
                this.changeThemeStatus()
            }
        },


        //watch first window
        watchChangeTextFirstScreen(newValue, oldValue) {
            if (newValue !== oldValue) {
                this.hideBurgerFirstScreen()
            }
        },

        //watch header all status
        watchHeaderAll(newValue, oldValue) {
            if (newValue !== oldValue) {
                this.hideHeaderAll()
            }
        }
    },

    mounted(){
        this.header__data_user()
        this.showFirstElements()
        window.addEventListener('scroll', this.trackScroll);
    },

}
</script>