<template>
    <div class="full-image-popup__header">
        <div class="container">
            <p class="full-image-popup__title">{{nameArt}} <br>by {{nameAutor}}</p>
        </div>
    </div>

    <div class="header__theme-button theme-button theme-button-fancy" @click="x1Test"  :class="{'theme-button__night-mode': !dayModeX, 'theme-button__day-mode': dayModeX, 'activeHEaderTheme':tmStatus  }">
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

    <div class="full-image-popup__zoom-icon-wrapper" :class="{'activ-icon-zoom':zoomIconStatus}">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M42.3174 34.4213V22.6053C42.3174 20.4293 40.5547 18.6666 38.3787 18.6666C36.2027 18.6666 34.44 20.4293 34.44 22.6053V45.3333L27.384 41.712C25.7787 40.888 23.824 41.1946 22.5494 42.4693C20.8614 44.1573 20.9414 46.9173 22.7227 48.5066L35.5894 59.9813C36.568 60.8506 37.8294 61.3333 39.1387 61.3333H51.4934C53.992 61.3333 56.1574 59.5973 56.6987 57.1573L59.56 44.2773C60.3947 40.5173 57.88 36.832 54.0747 36.2426L42.3174 34.4213Z" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
            <path d="M29.3443 13.3377V2.66663M29.3443 2.66663H18.6732M29.3443 2.66663L2.66669 29.3444M2.66669 29.3444L13.3378 29.3442M2.66669 29.3444V18.6731" stroke="white" stroke-width="2.5" stroke-linecap="square"/>
        </svg>            
    </div>
</template>


<script>


export default {
  props: {
    options: Object,
    tmStatus: Boolean,
    nameArt: String,
    nameAutor: String,
    statusHeaderOpen: Boolean
    
  },
  data() {
    return {
        dayModeX: this.$store.state.themeDayMode,
        zoomIconStatus: false,
    }
  },
  methods: {


    changeThemeStatus(){

        setTimeout(()=>{
            let fancyElement = document.querySelector('.fancybox__container')
            if(fancyElement){
                if(this.$store.state.themeDayMode == true){
                    fancyElement.classList.add('fancy-day-mode')
                }
                else{
                    fancyElement.classList.remove('fancy-day-mode')
                }
            } 
        },100)
         
        this.dayModeX = this.$store.state.themeDayMode
        
    },

    x1Test(){
        this.$store.commit('changeThemeDayMode', !this.$store.state.themeDayMode)
        this.changeThemeStatus()  
    },

    changeZoomStatusIcon(){
        if(this.statusHeaderOpen == true){
            setTimeout(()=>{
                this.zoomIconStatus = true
            },200)
            setTimeout(()=>{
                this.zoomIconStatus = false
            },2200)
        }
        else{
            this.zoomIconStatus = false
        }
        
    }

    // changeThemeModeG(){
    //     this.dayMode = !this.dayMode
    // },

    // changeColorFancybox(){
    //     this.dayMode = this.$store.state.themeDayMode
    //     let fancyElement = document.querySelector('.fancybox__container')

    //     if(fancyElement){
    //         if(this.$store.state.themeDayMode == true){
    //             fancyElement.classList.add('fancy-day-mode')
    //         }
    //         else{
    //             fancyElement.classList.remove('fancy-day-mode')
    //         }
    //     }
        
    // }

  },
  mounted() {
    this.changeThemeStatus()
    this.changeZoomStatusIcon()
  },

  computed: {
        wachThemeColorWatch() {
            // get data in store
            return this.$store.state.themeDayMode;
        },
    },
    watch: {
        //watch data store and use function if data changed
        wachThemeColorWatch(newValue, oldValue) {
            if (newValue !== oldValue) {
                this.changeThemeStatus()
            }
        },

        tmStatus: function(newVal, oldVal) {
        // Действия при изменении myProp
        console.log('Значение myProp изменилось:', newVal);
        this.changeThemeStatus()
        this.changeZoomStatusIcon()
        }
    }

    

};
</script>