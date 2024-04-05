<template>
    <transition name="show__popup">
        <div v-if="statusPopapImg" class="full-image-popup__container">
            <div class="full-image-popup">
                    <div class="full-image-popup__header">
                        <div class="container">
                            <p class="full-image-popup__title">{{currentImage.title}} <br>by Matt Johnson</p>
                            <div class="full-image-popup__close" @click="closePopup">
                                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <line x1="20.7873" y1="7.52156" x2="7.52198" y2="20.7869" stroke="white" stroke-width="2"/>
                                    <line x1="7.52217" y1="7.21282" x2="20.7875" y2="20.4781" stroke="white" stroke-width="2"/>
                                </svg>                            
                            </div>
                        </div>
                    </div>
                    
                    <Fancybox
                    :options="{
                        Carousel: {
                        infinite: false,
                        },        
                    }"
                    >
                    <a data-fancybox="gallery" :href="imgUrl">
                        <img :src="imgUrl" />
                    </a>

                    </Fancybox>

            </div>
        </div>
    </transition>
</template>


<script>

import Fancybox from './Fancybox.vue';


export default {

    props: {
        statusPopapImg: Boolean,
        currentImage: String,
  },

    data() {
        return {

        imgs: 'https://via.placeholder.com/450.png', // Img Url , string or Array of string
        visible: true,
        index: 0, // default: 0
            canvasWidth: window.innerWidth,
            canvasHeight: window.innerHeight,
            vueCanvas: null,
            imgUrl: 'https://images.unsplash.com/photo-1682685797208-c741d58c2eff?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        }
    },

    components: {
        Fancybox,
    },
    
    methods: {
        closePopup(){
            this.$emit('closePopup', false)
        },
    },

    computed: {
    },

    watch: {

    },

    setup() {
        
    },

    mounted() {
    this.panzoomJS()
    }












    

}
</script>