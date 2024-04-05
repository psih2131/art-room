<template>
    <transition name="show-slider">
        <div v-if="popupStatus" class="poput-art-slider" :class="{'hide-slider-popup': hideSliderPopup}">
            <div class="container">
                <div class="poput-art-slider__swiper">
                    <swiper
                    :slides-per-view="1"
                    :space-between="0"
                    :speed="800"
                    :pagination="{
                        clickable: true,
                      }" 
                    :modules="modules"
                >
                    <swiper-slide v-for="imageItem in currentWorkData.image_data" :key="imageItem">
                        <img :src="imageItem.image_url" alt="" class="poput-art-slider__img">
                    </swiper-slide>
    
                </swiper>
                </div>
                
                <div v-if="currentWorkData.artist_name != null" class="poput-art-slider__adutor-name">{{currentWorkData.artist_name}}</div>

                <div class="poput-art-slider__price">
                    <h3 class="art-post__title">{{ currentWorkData.artwork_title }}</h3>
                    <p class="art-post__price">
                        <component__price :typeValue="currentWorkData.sale_price.currency" :priceValue="currentWorkData.sale_price.value" />
                    </p>
                </div>
                

                <div class="poput-art-slider__details btn-ar" @click="openDopInfo">
                    <p class="btn-ar__text">Details</p>
                    <div class="btn-ar__icon-container">
                        <svg width="73" height="16" viewBox="0 0 73 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.292893 7.29289C-0.0976311 7.68342 -0.0976311 8.31658 0.292893 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928932C7.68054 0.538408 7.04738 0.538408 6.65685 0.928932L0.292893 7.29289ZM1 9L73 9V7L1 7L1 9Z" fill="white"></path>
                        </svg>
                    </div>
                </div>
               
    
                <div class="poput-art-slider__close" @click="closeArtPopup">
                    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_b_0_1457)">
                        <line x1="45.7813" y1="25.983" x2="25.9823" y2="45.782" stroke="white" stroke-width="2"/>
                        <line x1="25.9825" y1="26.2187" x2="45.7815" y2="46.0177" stroke="white" stroke-width="2"/>
                        </g>
                        <defs>
                        <filter id="filter0_b_0_1457" x="-64" y="-64" width="200" height="200" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                        <feGaussianBlur in="BackgroundImageFix" stdDeviation="32"/>
                        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_0_1457"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_0_1457" result="shape"/>
                        </filter>
                        </defs>
                    </svg>                    
                </div>
            </div>
        </div>
    </transition>

    <!-- <popup__art_info :openDop="dopInfoStatus"  @closeDop="closeDopInfoArt"/> -->

</template>

<script>
// Import Swiper Vue.js components
// import popup__art_info from '@/components/component__art-info.vue'
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-creative';

import component__price from '@/components/component__price.vue'

// import required modules
import { EffectCreative, Pagination, Mousewheel, Navigation  } from 'swiper/modules';

export default {

    props: {
        popupStatus: Boolean,
  },
    
    data() {
        return {
            dopInfoStatus: false,
            hideSliderPopup: false,
            idWork: null,
            currentWorkData: '',
            
        }
    },

    components: {
        Swiper,
        SwiperSlide,
        component__price,
    },


    methods: {
        closeArtPopup(){
            this.$emit('closePopup', false);
        },
        
        openDopInfo(){
            this.dopInfoStatus = true
            this.hideSliderPopup = true
            this.$emit('openDopInfoArt', true) 
        },
        
        closeDopInfoArt(data){
            this.dopInfoStatus = data
            this.hideSliderPopup = false
        },

        zoomMobileImage(){
            document.addEventListener('touchmove', function(event) {
                event = event.originalEvent || event;
                if(event.scale !== 1) {
                    event.preventDefault();
                } 
                }, false);

            // // Разрешаем зумирование внутри .full-image-popup__image
            // document.querySelector('.full-image-popup__image').addEventListener('touchmove', function(event) {
            //     // Разрешаем масштабирование только внутри этого элемента
            //     event.stopPropagation();
            // }, { passive: false });
        },

        //load current work data and image 
        currentIdStatusWork(){
            if(this.popupStatus == true){
                this.idWork = this.$store.state.sliderId
                let allWorks = this.$store.state.allDataServer.data.viewingRoomGetWeb.artworks_data

                for(let i = 0; i < allWorks.length; i++){
                    let idWork = allWorks[i].id

                    if(idWork == this.idWork){
                        this.currentWorkData = allWorks[i]
                        console.log(this.currentWorkData)
                    }
                }
            }
        }
    },

    computed: {

    },

    watch: {
        popupStatus(newVal, oldVal) {
            // check change currentId props
            this.currentIdStatusWork() 
        }
    },

    mounted(){
        this.zoomMobileImage()
        
    },
    setup() {
        return {
            modules: [EffectCreative, Pagination, Mousewheel, Navigation],
        };
    },
}
</script>