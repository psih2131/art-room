<template>
    <transition name="show__dop-info">
        <div v-if="openDop" class="popup-work-info" >
            <div class="container" :class="{'hidden-class-active': hiddenStatus}">
                <div class="popup-work-info__wrapper">
                    <div class="popup-work-info__fixed-box fixed-box-info">
                        <div class="fixed-box-info__img-wrapper">
                            <swiper
                            :grabCursor="false"
                            :parallax="true"
                            :speed="800"
                            :allowTouchMove="true"
                    
                            :pagination="{
                            clickable: true,
                            }"
                    
                            :modules="modules"
                            class="mySwiperMob"
                    
                            @slideChange="onSlideChange"
                            @swiper="onSwiper"
                            >
                            
                            <swiper-slide v-for="item in allImg" :key="item.id">

                            <Fancybox
                            :options="{
                            Carousel: {
                            infinite: false,
                            
                            },
                            Toolbar: true, // Скрыть панель управления
                            Infobar: false, // Скрыть информационную панель
                            SmallBtn: true, // Показать только кнопку закрытия (крестик)
                            dragToClose: false,
                            
                            }"
                            >
                            <a data-fancybox="gallery" :href="item.image_url" @click="openHeader">
                            <img :src="item.preview_url" alt="" class="fixed-box-info__img" />
                            </a>

                            </Fancybox>
                                <!-- <img :src="item.url" alt="" class="fixed-box-info__img" @click="openImgPopup(item)"> -->
                            </swiper-slide>

                            </swiper>
                            
                        </div>
                        <!-- <button class="fixed-box-info__buy btn-store">
                            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_131_3528)">
                                <line x1="12.5" x2="12.5" y2="24" stroke="white" stroke-width="2"/>
                                <line x1="0.5" y1="12" x2="24.5" y2="12" stroke="white" stroke-width="2"/>
                                </g>
                                <defs>
                                <clipPath id="clip0_131_3528">
                                <rect width="24" height="24" fill="white" transform="matrix(0 1 -1 0 24.5 0)"/>
                                </clipPath>
                                </defs>
                            </svg>                            
                            <span class="btn-store__text">BUY or make an offer</span>
                        </button> -->

                        <div class="fixed-box-info__price">
                            <h3 class="art-post__title">{{ work__title }}</h3>
                            <h3 class="art-post__name" v-if="work__name_autor != null">by {{ work__name_autor }}</h3>
                            <p class="art-post__price" > 
                                <component__price v-if="work__price && work__price.value && work__price.value > 0" :typeValue="work__price.currency" :priceValue="work__price.value" />
                            </p>
                        </div>
                    </div>
                    <div class="popup-work-info__content">
                        <div class="popup-work-info__header">
                            <component__comment :workId="currentId" />
                            <component__rate :workId="currentId"/>
                        </div>
                        <div class="popup-work-info__body">
                            <ul class="tab__list">
                                <li class="tab__list-element" v-if="work__category">{{categoryModName(work__category)}}</li>
                                <li class="tab__list-element" v-if="work__contry  && work__contry.length > 0">{{ work__contry }}</li>
                                <li class="tab__list-element" v-if="work__year ">{{ work__year }}</li>
                            </ul>

                            <div class="popup-work-info__size-dop-info" v-if="work__size_width > 0 || 
                                work__size_height > 0 || work__size_dep > 0 || work__size_width_ft > 0 || work__size_width_inch > 0 || 
                                work__size_height_ft > 0 || work__size_height_inch > 0 || work__size_dep_ft > 0 || work__size_dep_inch > 0">

                             
                                <p class="popup-work-info__size-cm" v-if="work__size_width > 0 || work__size_height > 0 || work__size_dep > 0">
                                    
                                    <span v-if="work__size_width && work__size_width >0 ">{{ work__size_width }} W </span>
                                    
                                    <span v-if="work__size_width && work__size_width >0 && work__size_height && work__size_height >0"> × </span>

                                    <span v-if="work__size_height && work__size_height >0 ">{{ work__size_height }} H</span>   
                                    
                                    <span v-if="work__size_dep && work__size_dep > 0 && work__size_height && work__size_height >0 "> × </span>

                                    <span v-if="work__size_dep && work__size_dep > 0">{{ work__size_dep }}</span>

                                    cm

                                    <span v-if="work__size_width_ft > 0 || work__size_width_inch > 0 || work__size_height_ft > 0 ||
                                         work__size_height_inch > 0 || work__size_dep_ft > 0 || work__size_dep_inch > 0">, </span>
                                </p>
                        

                        
                                <p class="popup-work-info__size-inch" v-if="work__size_width_ft > 0 || work__size_width_inch > 0 ||
                                     work__size_height_ft > 0 || work__size_height_inch > 0 || work__size_dep_ft > 0 || work__size_dep_inch > 0">


                                    <span v-if="work__size_width_ft > 0 || work__size_width_inch > 0">
                                        <span v-if="work__size_width_ft > 0">{{work__size_width_ft}}’ </span>

                                        <span v-if="work__size_width_inch > 0">{{work__size_width_inch}}”</span> 
                                        W
                                    </span>
                                    <span v-else>0”</span>

                                    <span v-if="work__size_height_ft > 0 || work__size_height_inch > 0"> × </span>  

                                    <span v-if="work__size_height_ft > 0 || work__size_height_inch > 0">
                                        <span v-if="work__size_height_ft > 0">{{work__size_height_ft}}’ </span>

                                        <span v-if="work__size_height_inch > 0">{{work__size_height_inch}}”</span> 
                                        H
                                    </span>

                                    <span v-if="work__size_dep_ft > 0 || work__size_dep_inch > 0"> × </span>
                                    
                                    <span v-if="work__size_dep_ft > 0 || work__size_dep_inch > 0">
                                        <span v-if="work__size_dep_ft > 0">{{work__size_dep_ft}}’ </span>

                                        <span v-if="work__size_dep_inch > 0">{{work__size_dep_inch}}”</span> 
                                    </span>
                                </p>
                             
                            </div>
                            

                            <p class="popup-work-info__medium" v-if="work__medium && work__medium != ' '">
                                <b>Medium:</b>
                                {{ work__medium }}
                            </p> 
                            
                            <p class="popup-work-info__medium" v-if="work__style && work__style !=' '">
                                <b>Style:</b>
                                {{ work__style }}
                            </p>
                            
                            <div class="popup-work-info__text" v-if="work__description ">
                                {{ work__description }}
                            </div>

                            <p class="popup-work-info__framed" v-if="work__is_framed != null">
                                <template v-if="work__is_framed == true">
                                    <span v-if="work__frame_details != null && work__frame_details != ''" ><b>Framed:</b> {{work__frame_details}}</span>
                                    <span v-else><b>Framed</b></span>
                                </template>
                                <template v-else>
                                    <span ><b>No Frame</b></span>
                                </template>
                      
                            </p>

                            <div class="popup-work-info__line"  v-if="work__docs && work__docs.length > 0"></div>

                            <div class="work-docs" v-if="work__docs && work__docs.length > 0">
                                <h3 class="popup-work-info__link-title">Documents</h3>
                                <div class="popup-work-info__link-element" v-for="item in work__docs" :key="item">
                                    <p class="popup-work-info__link-text">
                                      {{ item.file_name }}
                                      <span v-if="item.file_url"><br></span>
                                      <a v-if="item.file_url"  :href="item.file_url" target="_blank" class="file-link">{{convertUrlToName(item.file_url)}}</a>
                                    </p>
                                </div>
                            </div>

                            <div class="popup-work-info__line"></div>
                            <div class="popup-work-info__link-container">
                                <div class="popup-work-info__link-col">
                                    
                                    <div class="popup-work-info__link-claster" :class="{ 'no-bulets-class': work__provenance.length == 1 }" 
                                    v-if="work__provenance.length > 0 && work__provenance != '' && work__provenance != null">
                                        <h3 class="popup-work-info__link-title">Provenance</h3>
                                        <div class="popup-work-info__link-element" v-for="item in work__provenance" :key="item">
                                            <p class="popup-work-info__link-text">
                                              {{ item }}
                                            </p>
                                        </div>
                                    </div>

                                    <div class="popup-work-info__link-claster" :class="{ 'no-bulets-class': work__exhibition_history.length == 1 }" 
                                    v-if="work__exhibition_history.length > 0 && work__exhibition_history != '' && work__exhibition_history != null">
                                        <h3 class="popup-work-info__link-title">Exhibitions</h3>
                                        <div class="popup-work-info__link-element" v-for="item in work__exhibition_history" :key="item">
                                            <p class="popup-work-info__link-text">
                                                {{ item }}
                                            </p>
                                        </div>
                                    </div>

                                </div>

                                
                                <div class=" popup-work-info__link-col" 
                                v-if="work__publications.length > 0 && work__publications != '' && work__publications != null">

                                    <div class="popup-work-info__link-claster" :class="{ 'no-bulets-class': work__publications.length == 1 }">
                                        <h3 class="popup-work-info__link-title">Publications</h3>
                                        <div class="popup-work-info__link-element" v-for="item in work__publications" :key="item">
                                            <p class="popup-work-info__link-text">
                                                {{ item }}
                                            </p>
                                        </div>

                                    </div>

                                </div>   
                            </div>
                        </div>
                    </div>

                    <div class="popup-work-info__tabs" v-if="work__dop_info" :class="{'only-about-tab-mob': !work__dop_info_awards && !work__dop_info_exhibitions}">

                        <div v-if="work__dop_info_about"  class="popup-work-info__tab popup-tab popup-tab_about" @click="tabPopupChange($event)" :class="{'tab-popup__about-open':about_show_all}">
                            <p class="popup-tab__title">about artist</p>
                            <div class="popup-tab__body">
                                <div class="popup-tab__wrapper">
                                    <div class="tab__photo-wrapper">
                                        <img :src="about_image" alt="" class="tab__photo">
                                      </div>
                                      <div class="tab__col1">
                                        <h2 class="tab__title">{{truncateString(about__first_name)}}</h2>
                                        <ul class="tab__list">
                                            <li class="tab__list-element" v-if="user__type_accoutn == 'Art Collector'">Artist</li>
                                            <!-- <li class="tab__list-element">London</li> -->
                                            <template v-if="user__type_accoutn == 'Art Collector'">
                                              <li class="tab__list-element" v-if=" user__origin_country != '' && user__origin_country != null">From {{ user__origin_country }}</li>
                                              <li class="tab__list-element" v-if="user__resident_country != null">{{ user__resident_country }}</li>
                                            </template>
                  
                                            <template v-else-if="user__type_accoutn == 'Artist'">
                                              <li class="tab__list-element" v-if=" user__origin_country != '' && user__origin_country != null ">From {{ user__origin_country }}</li>
                                              <li class="tab__list-element" v-if=" user__resident_country != '' && user__resident_country != null ">{{ user__resident_country }}</li>
                                            </template>
                                        </ul>
                                        <div class="tab__description about-text-container about-text-dop-popup">
                                            <div class="about-text-dop-popup__wrapper" ref="aboutWrapperRef">
                                                {{ about_text }}
                                            </div>
                                        </div>
                                        <div class="tab__btn-container" v-if="about_btnStatus">
                                          <div class="tab__btn btnV1" @click="aboutActive">
                                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <line x1="12" y1="4.37114e-08" x2="12" y2="24" stroke="#3B465C" stroke-width="2"/>
                                                <line x1="4.37114e-08" y1="12" x2="24" y2="12" stroke="#3B465C" stroke-width="2"/>
                                                </svg>                    
                                           </div>
                                        </div>
                                      </div>
                                </div>
                            </div>
                        </div>

                        <div v-if="work__dop_info_awards" class="popup-work-info__tab popup-tab tab-popup_awards" @click="tabPopupChange($event)" :class="{'tab-popup__awards-open':avards_show_all}">
                            <p class="popup-tab__title">Artist Awards</p>
                            <div class="popup-tab__body">
                                
                                <div class="popup-tab__wrapper">
                                    <h2 class="tab__title">Matt Johnson</h2>
                                    <ul class="tab__list">
                                        <li class="tab__list-element">Artist</li>
                                        <li class="tab__list-element">London</li>
                                        <li class="tab__list-element">England</li>
                                    </ul>
                                    <div class="tab__awards-row">

                                        <div class="tab__awards-element" v-for="item in avards_array.slice(0, counterAvards)" :key="item" >
                                        <p class="tab__awards-element-title">{{ item.title }}</p>
                                        <ul class="tab__list">
                                            <li class="tab__list-element">{{ item.year }}</li>
                                            <li class="tab__list-element">{{ item.subtitle }}</li>
                                        </ul>
                                        </div>
                                        
                
                                        <div class="tab__btn-container" v-if="avards_btnStatus" >
                                        <div class="tab__btn btnV1" @click="avardsActive">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <line x1="12" y1="4.37114e-08" x2="12" y2="24" stroke="#3B465C" stroke-width="2"/>
                                            <line x1="4.37114e-08" y1="12" x2="24" y2="12" stroke="#3B465C" stroke-width="2"/>
                                            </svg>                    
                                        </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div v-if="work__dop_info_exhibitions"  class="popup-work-info__tab popup-tab  tab-popup_exhibitions" @click="tabPopupChange($event)" :class="{'tab-popup__awards-open':exhibitions_show_all}">
                            <p class="popup-tab__title">Artist Exhibitions</p>
                            <div class="popup-tab__body">
                                <div class="popup-tab__wrapper">
                                    <h2 class="tab__title">Matt Johnson</h2>
                                    <ul class="tab__list">
                                    <li class="tab__list-element">Artist</li>
                                    <li class="tab__list-element">London</li>
                                    <li class="tab__list-element">England</li>
                                    </ul>
                                    <div class="tab__awards-row">

                                    <div class="tab__awards-element" v-for="item in exhibitions_array.slice(0, counterExhibitions)" :key="item" >
                                        <p class="tab__awards-element-title">{{ item.title }}</p>
                                        <ul class="tab__list">
                                            <li class="tab__list-element">{{ item.year }}</li>
                                            <li class="tab__list-element">{{ item.subtitle }}</li>
                                        </ul>
                                        </div>
                                        
                
                                        <div class="tab__btn-container" v-if="exhibitions_btnStatus" @click="exhibitionsActive">
                                        <div class="tab__btn btnV1">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <line x1="12" y1="4.37114e-08" x2="12" y2="24" stroke="#3B465C" stroke-width="2"/>
                                            <line x1="4.37114e-08" y1="12" x2="24" y2="12" stroke="#3B465C" stroke-width="2"/>
                                            </svg>                    
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <component__copy_text />

                </div>

                <div class="poput-art-slider__close" @click="closeDopInfo">
                    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_b_0_1548)">
                        <line x1="45.7818" y1="25.983" x2="25.9828" y2="45.782" stroke="#1B1D1C" stroke-width="2"/>
                        <line x1="25.9825" y1="26.2187" x2="45.7815" y2="46.0177" stroke="#1B1D1C" stroke-width="2"/>
                        </g>
                        <defs>
                        <filter id="filter0_b_0_1548" x="-64" y="-64" width="200" height="200" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                        <feGaussianBlur in="BackgroundImageFix" stdDeviation="32"/>
                        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_0_1548"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_0_1548" result="shape"/>
                        </filter>
                        </defs>
                    </svg>                        
                </div>

            </div>
        </div>
    </transition>

    <!-- <component__full_image v-if="popup_image_status" :statusPopapImg="popup_image_status" :currentImage="activeImage" @closePopup="closePopup" /> -->

    <Fancybox_header :tmStatus="themeStatusBtn" :nameArt="work__title" :nameAutor="work__name_autor" :statusHeaderOpen="headerPopStatus" />
   
</template>


<script>

import component__comment from '@/components/component__comment.vue'
import component__rate from '@/components/component__rate.vue'
import component__full_image from '@/components/component__full-image-mob.vue'
import component__price from '@/components/component__price.vue'
import component__copy_text from '@/components/component__copytext_art_info.vue'


import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-creative';

import { EffectCreative, Pagination, Mousewheel } from 'swiper/modules';

//zoom image 
import Fancybox from './Fancybox.vue';
import Fancybox_header from './Fancybox_header.vue';

//json to list convert plugin
import { convertJsonToArray } from '@/plugins/plugin__convet-json-to-list.js';

export default {
    props: {
        openDop: Boolean,
        currentId: Number
  },
    data() {
        return {
            headerPopStatus: false,
            themeStatusBtn: false,

            work__all_data: null,
            work__title: null,
            work__price: null,
            work__year: null,
            work__contry: null,
            work__style: null,
            work__medium: null,
            work__name_autor: null,
            work__category: null,

            work__size_width: null,
            work__size_height: null,
            work__size_dep: null,

            work__size_width_inch: null,
            work__size_height_inch: null,
            work__size_dep_inch: null,

            work__size_width_ft: null,
            work__size_height_ft: null,
            work__size_dep_ft: null,

            work__description: null,
            work__is_framed: null,
            work__docs: null,
            work__frame_details: null,

            work__exhibition_history: [],
            work__provenance: [],
            work__publications: [],
            work__dop_info: false,

            allImg: [],
            popup_image_status: false,
            activeImage: null,

            hiddenStatus: false,




            work__dop_info: false,

            user__type_accoutn: null,
            user__origin_country: null,
            user__resident_country: null,

            work__dop_info_about: false,
            about_text: null,
            about_image: null,
            about__first_name: null,
            about_btnStatus: false,
            about_show_all: false,

            work__dop_info_awards: false,
            avards_array: [
            {'title':'Best Emerging Artist', 'year': '2020', 'subtitle':'Local Art Show'},
            {'title':'Best Emerging Artist', 'year': '2020', 'subtitle':'Local Art Show'},
            {'title':'Best Emerging Artist', 'year': '2020', 'subtitle':'Local Art Show'},
            {'title':'Best Emerging Artist', 'year': '2020', 'subtitle':'Local Art Show'},
            {'title':'Best Emerging Artist', 'year': '2020', 'subtitle':'Local Art Show'},
            {'title':'Best Emerging Artist', 'year': '2020', 'subtitle':'Local Art Show'},
            {'title':'Best Emerging Artist', 'year': '2020', 'subtitle':'Local Art Show'},
            {'title':'Best Emerging Artist', 'year': '2020', 'subtitle':'Local Art Show'},

            ],
            avards_btnStatus: true,
            avards_show_all: false,
            counterAvards: 2,


            work__dop_info_exhibitions: false,
            exhibitions_array: [
            {'title':'Best Emerging Artist', 'year': '2020', 'subtitle':'Local Art Show'},
            {'title':'Best Emerging Artist', 'year': '2020', 'subtitle':'Local Art Show'},
            {'title':'Best Emerging Artist', 'year': '2020', 'subtitle':'Local Art Show'},
            {'title':'Best Emerging Artist', 'year': '2020', 'subtitle':'Local Art Show'},
            {'title':'Best Emerging Artist', 'year': '2020', 'subtitle':'Local Art Show'},
            {'title':'Best Emerging Artist', 'year': '2020', 'subtitle':'Local Art Show'},
            {'title':'Best Emerging Artist', 'year': '2020', 'subtitle':'Local Art Show'},
            {'title':'Best Emerging Artist', 'year': '2020', 'subtitle':'Local Art Show'},
            {'title':'Best Emerging Artist', 'year': '2020', 'subtitle':'Local Art Show'},
            {'title':'Best Emerging Artist', 'year': '2020', 'subtitle':'Local Art Show'},

            ],
            exhibitions_btnStatus: true,
            exhibitions_show_all: false,
            counterExhibitions: 2,
        }
    },

    components: {
        component__comment,
        component__rate,
        Swiper,
        SwiperSlide,
        component__full_image,
        Fancybox,
        Fancybox_header,
        component__price,
        component__copy_text 
    },

    methods: {
        openImgPopup(item){
          
            this.popup_image_status = true
            this.activeImage = item
        },
        
        closePopup(data){
            this.popup_image_status = data
        },

        closeDopInfo(){
            this.$emit('closeDop', false)
        },

        //show hiddpen preloader status
        hideShowHeaderPopup(){
            this.headerPopStatus = this.$store.state.headerPopupFull
        },

        openHeader(){
            this.headerPopStatus = true
            document.querySelector('.full-image-popup__header').classList.add('activeHEader')
            this.themeStatusBtn = true
            

        setTimeout(()=>{
            this.closeHeaderPopup()
        },400)
        },

        closeHeaderPopup(){
            let elementWithDataFancyboxClose = document.querySelector('[data-fancybox-close]');
           

            elementWithDataFancyboxClose.addEventListener('click',()=>{
                this.themeStatusBtn = false
                this.headerPopStatus = false
                document.querySelector('.full-image-popup__header').classList.remove('activeHEader')
                
                
               
            })
        },

        //hide about btn
        culcHeightDownAbout(){
            setTimeout(()=>{
                let textContainer = document.querySelector('.about-text-container')
                if(textContainer.offsetHeight > 88){
                    this.about_btnStatus = true
                }
                else{
                    this.about_btnStatus = false
                }
            },4000)
        },

      //hide avards btn
      culcHeightDownAvards(){
        setTimeout(()=>{

            if(this.avards_array.length > 2){
                this.avards_btnStatus = true
            }
            else{
                this.avards_btnStatus = false
            }
        },4000)
      },


      //hide exhibitions btn
      culcHeightDownExhibitions(){
        setTimeout(()=>{

            if(this.exhibitions_array.length > 2){
                this.exhibitions_btnStatus = true
            }
            else{
                this.exhibitions_btnStatus = false
            }
        },4000)
      },

      //open about text 
      aboutActive(){
        this.about_show_all = !this.about_show_all

        if(this.about_show_all == true){
            this.slowScroll()

            this.$store.commit('changeBodyOverflow', true)
            this.hiddenStatus = true
        }
        else{
            this.hiddenStatus = false 
        }
       
      },

      //open avards text 
      avardsActive(){
        this.avards_show_all = !this.avards_show_all

        if(this.avards_show_all == true){
          this.slowScroll()
          

          setTimeout(()=>{
            this.counterAvards = 100
          },200)

          this.$store.commit('changeBodyOverflow', true)
          this.hiddenStatus = true
        }
        else{
          this.counterAvards = 2
          this.hiddenStatus = false
        }
      },


      //open exhibitions text 
      exhibitionsActive(){
        this.exhibitions_show_all = !this.exhibitions_show_all

        if(this.exhibitions_show_all == true){
          this.slowScroll()


          setTimeout(()=>{
            this.counterExhibitions = 100
          },200)

          this.$store.commit('changeBodyOverflow', true)
          this.hiddenStatus = true
        }
        else{

          this.counterExhibitions = 2

          this.hiddenStatus = false
        }
      },


      //плавный скрол
      slowScroll(){
        function scrollToSmoothly(container, scrollValue, duration) {
        const startTime = performance.now();
        const startScroll = container.scrollTop;
        const difference = scrollValue - startScroll;

        function step(currentTime) {
            const elapsedTime = currentTime - startTime;
            if (elapsedTime < duration) {
            const ease = easeOutCubic(elapsedTime, 0, 1, duration);
            container.scrollTop = startScroll + ease * difference;
            requestAnimationFrame(step);
            } else {
            container.scrollTop = scrollValue;
            }
        }

        requestAnimationFrame(step);
        }

        function easeOutCubic(t, b, c, d) {
        t /= d;
        t--;
        return c * (t * t * t + 1) + b;
        }

        const heightBox = document.querySelector('.popup-work-info__tabs');
        const container = document.querySelector(".popup-work-info .container");
        const boxRect = heightBox.getBoundingClientRect();
        const distanceFromBrowserTop = boxRect.top;
        const currentScrollValue = container.scrollTop;

        const newScrollValue = currentScrollValue + distanceFromBrowserTop;
        const duration = 800; // Длительность анимации (в миллисекундах)

        scrollToSmoothly(container, newScrollValue, duration);
      },

         tabPopupChange(e) {
            let parrent = document.querySelector('.popup-work-info__tabs');
            let allTabs = document.querySelectorAll('.popup-tab');
            let curruentElement = e.target;
            let currentClassList = curruentElement.classList;

            let children = Array.from(parrent.children);
            let index = children.indexOf(curruentElement);

            if (index == 2) {
             

                // Добавляем класс для анимации к первому элементу
                allTabs[0].classList.add('animate');
                allTabs[1].classList.add('animate');
                allTabs[2].classList.add('animate');

                setTimeout(() => {
                    const firstElement = allTabs[0];
                    const secondElement = allTabs[1];
                    const thirdElement = allTabs[2];

                    // Переупорядочивание элементов
                    parrent.removeChild(firstElement);
                    parrent.removeChild(secondElement);
                    parrent.removeChild(thirdElement);

                    parrent.appendChild(thirdElement);
                    parrent.appendChild(firstElement);
                    parrent.appendChild(secondElement);



                    firstElement.classList.remove('animate');
                    secondElement.classList.remove('animate');
                    thirdElement.classList.remove('animate');

                  
                }, 500); // Задержка 0 миллисекунд, чтобы анимация началась сразу
            }

            if (index == 1) {
       

                // Добавляем класс для анимации к первому элементу
                allTabs[0].classList.add('animat1');
                allTabs[1].classList.add('animat1');
                allTabs[2].classList.add('animat1');

                setTimeout(() => {
                    const firstElement = allTabs[0];
                    const secondElement = allTabs[1];
                    const thirdElement = allTabs[2];

                    // Переупорядочивание элементов
                    parrent.removeChild(firstElement);
                    parrent.removeChild(secondElement);
                    parrent.removeChild(thirdElement);

                    parrent.appendChild(secondElement);
                    parrent.appendChild(thirdElement);
                    parrent.appendChild(firstElement);



                    firstElement.classList.remove('animat1');
                    secondElement.classList.remove('animat1');
                    thirdElement.classList.remove('animat1');

                  
                }, 500); // Задержка 0 миллисекунд, чтобы анимация началась сразу
            }

        },

        //loade current data for select work
        dataLoadCurrentWork(){
            let allData = this.$store.state.allDataServer.data.viewingRoomGetWeb.artworks_data
            for(let i = 0; i < allData.length; i++){
                let currentIdWork = allData[i].id
                if(currentIdWork == this.currentId){
                    this.work__all_data = allData[i]
                    this.enterCurrentData()
                }
            }
        },

        //convert url lo name
        convertUrlToName(data){
            // Разделить URL по символу "/"
            let parts = data.split("/");

            // Взять последний элемент массива
            let currentName =  parts[parts.length - 1];
            return currentName
        },

        //convert cat name
        categoryModName(category){
            let categoriesDict = {
                painting: 'Painting',
                drawing: 'Drawing',
                printmaking: 'Print',
                photography: 'Photography',
                sculpture: 'Sculpture',
                digitalArt: 'Digital Art',
                collage: 'Collage'
            };

            // Проверяем наличие категории в объекте categoriesDict
            if (categoriesDict.hasOwnProperty(category)) {
                // Если категория существует, возвращаем соответствующее значение из объекта
                return categoriesDict[category];
            } else {
                // Если категория отсутствует, возвращаем ту же категорию, которую мы приняли
                return category;
            }
        },


        //reload work info data
        enterCurrentData(){
            this.allImg = this.work__all_data.image_data
            this.work__title = this.work__all_data.artwork_title
            this.work__price = this.work__all_data.sale_price
            this.work__year = this.work__all_data.year
            this.work__contry = this.work__all_data.country
            this.work__style = this.work__all_data.styles_txt
            this.work__medium = this.work__all_data.mediums_txt
            this.work__name_autor = this.work__all_data.artist_name
            this.work__category = this.work__all_data.category

            this.work__size_width = this.work__all_data.size_params.width_cm
            this.work__size_height = this.work__all_data.size_params.height_cm
            this.work__size_dep = this.work__all_data.size_params.depth_cm

            this.work__size_width_inch = this.work__all_data.size_params.width_in
            this.work__size_height_inch = this.work__all_data.size_params.height_in
            this.work__size_dep_inch = this.work__all_data.size_params.depth_in


            this.work__size_width_ft = this.work__all_data.size_params.width_ft
            this.work__size_height_ft = this.work__all_data.size_params.height_ft
            this.work__size_dep_ft = this.work__all_data.size_params.depth_ft
            

            this.work__description = this.work__all_data.description
            this.work__is_framed = this.work__all_data.is_framed
            this.work__docs = this.work__all_data.file_data
            this.work__frame_details = this.work__all_data.frame_details
            this.work__exhibition_history = this.work__all_data.exhibition_history

            if(this.work__all_data.exhibition_history != null){
                let stringValue = this.work__all_data.exhibition_history
                this.work__exhibition_history = convertJsonToArray(stringValue);
            }
            else{
                this.work__exhibition_history = []
            }

            if(this.work__all_data.provenance != null){
                let stringValue = this.work__all_data.provenance
                this.work__provenance = convertJsonToArray(stringValue);
            }
            else{
                this.work__provenance = []
            }

            if(this.work__all_data.publication_history != null){
                let stringValue = this.work__all_data.publication_history
                this.work__publications = convertJsonToArray(stringValue);
            }
            else{
                this.work__publications = []
            } 
            
        },


        //function for dop info sec SHOW or HIDE
        dopInfoTabStatus(){
            //get publick status
            let publicStatus = this.$store.state.publickStatus
            
            //get profile type "Art Collector , Artist,  or other"
            let profileType = this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.profile_type

            if(publicStatus == true && profileType == 'Art Collector'){
                this.work__dop_info = true
                this.work__dop_info_about = true

                this.loadDataForDopInfoTabSec()
                
            }
        },


        //get data for dop info tab
        loadDataForDopInfoTabSec(){

            // get about text
            if(this.$store.state.allDataServer.data.viewingRoomGetWeb.artist_data && this.$store.state.allDataServer.data.viewingRoomGetWeb.artist_data.biography){
                this.about_text = this.$store.state.allDataServer.data.viewingRoomGetWeb.artist_data.biography
                // this.about_text = 'adasd asd asas dasd asd'
                setTimeout(()=>{
                    this.tabAboutBtsShow()
                },300)
            }
            else{
                this.about_text = ''
               
            }

            // get about image photo
            if(this.$store.state.allDataServer.data.viewingRoomGetWeb.artist_data &&
                this.$store.state.allDataServer.data.viewingRoomGetWeb.artist_data.image_data && 
                this.$store.state.allDataServer.data.viewingRoomGetWeb.artist_data.image_data.image_url){
                this.about_image = this.$store.state.allDataServer.data.viewingRoomGetWeb.artist_data.image_data.image_url 
            }
            else{
                this.about_image =  require('@/assets/img/no-photo.jpg');
            }
            
            // get about autor name
            if(this.$store.state.allDataServer.data.viewingRoomGetWeb.artist_data && 
               this.$store.state.allDataServer.data.viewingRoomGetWeb.artist_data.first_name){
                this.about__first_name = this.$store.state.allDataServer.data.viewingRoomGetWeb.artist_data.first_name
            }
            else{
                this.about__first_name = ''
            }

            //load type accoutn
            if(this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.profile_type != null){

            this.user__type_accoutn = this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.profile_type    
            }
            else{
            this.user__type_accoutn = ''
            }

            
            //load country
            if(this.$store.state.allDataServer.data.viewingRoomGetWeb.artist_data.origin_country && 
            this.$store.state.allDataServer.data.viewingRoomGetWeb.artist_data.origin_country  != ""){
                this.user__origin_country = this.$store.state.allDataServer.data.viewingRoomGetWeb.artist_data.origin_country    
            }
            else{
                this.user__origin_country = null
            }


            //load country resident
            if(this.$store.state.allDataServer.data.viewingRoomGetWeb.artist_data.residence_country && 
              this.$store.state.allDataServer.data.viewingRoomGetWeb.artist_data.residence_country != ""){
                this.user__resident_country = this.$store.state.allDataServer.data.viewingRoomGetWeb.artist_data.residence_country    
            }
            else{
                this.user__resident_country = null
            } 

        },


        //отображение или скритие кнопки + для tab about
        tabAboutBtsShow(){
            const height = this.$refs.aboutWrapperRef;
            if(height){
                if(height.offsetHeight > 122){
                    this.about_btnStatus = true
                }
                else{
                    this.about_btnStatus = false
                }
            }
            
        },


        //обрезка строки
        truncateString(str) {
            // Проверяем длину строки, включая пробелы
            if (str.length > 34) {
                // Обрезаем строку до 54 символов и заменяем последние 3 символа на три точки
                return str.slice(0, 31) + '...';
            } else {
                // Если длина строки не превышает 54 символа, возвращаем исходную строку
                return str;
            }
        },

    },

    computed: {
 
    },

    watch: {
        currentId(newVal, oldVal) {
            // check change currentId props
            this.dataLoadCurrentWork()
            this.dopInfoTabStatus()
        }
    },

    setup() {
        let swiperData = ''
  
        let onSwiper = (swiper) => {
        swiperData = swiper;
        };
  
        const slideTo = (index) => {
          if(index == 100){
            
            const lastIndex = swiperData.slides.length - 1;
            swiperData.slideTo(lastIndex, 1200);
          }
          else{
            swiperData.slideTo(index - 1, 1200);
          }
           
        };
       
        return {
          onSwiper,
          slideTo,
         
          modules: [EffectCreative, Pagination, Mousewheel],
        };
      },

    mounted(){
        
        // this.culcHeightDownAbout()
        this.culcHeightDownAvards()
        this.culcHeightDownExhibitions()
    },

}
</script>