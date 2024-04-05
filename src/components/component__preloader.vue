<template>
    <transition name="show__preloader">
        <div class="preloader" v-if="show__preloader" >
            <div class="container preloader__wrapper">
                <div class="preloader__row" v-for="(item, index) in counterRow" :key="item.id" :class="
                {'show': rowVisible[index], 
                'rotate1': rowRotate[index], 
                'rotate2': rowRotate2[index], 
                'rotate1Revers': rowRotate1revers[index],
                'rotate2Revers': rowRotate2revers[index],
                }">
                    <div class="preloader__box" v-for="item in counterRowElements" :key="item.id">
        
                        <svg width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="12" width="2" height="25" fill="#353535"/>
                            <rect x="0.5" y="13.5" width="2" height="25" transform="rotate(-90 0.5 13.5)" fill="#353535"/>
                        </svg> 
                            
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>


<script>


export default {
  data() {
    return {
        counterRowElements: 24,
        counterRow: 17,

        rowVisible: [],
        rowRotate: [],
        rowRotate2: [],
        rowRotate1revers: [],
        rowRotate2revers: [],

        show__preloader: true,
    }
  },
  components: {
    
  },


  methods: {
    async animateRows() {
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
            this.counterRow = 13;
        }

      for (let i = 0; i < this.counterRow; i++) {
        await this.delay(30); // Задержка в 0.03 секунды
        this.rowVisible[i] = true;

        if(i == this.counterRow - 1){
            setTimeout(() => {
            this.animRotate()
            }, 800);
        }
        
      }
    },
    delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },


    animRotate(){
        for(let i = 0; i < this.counterRow; i++){

            if (i % 8 < 4) {
                this.rowRotate[i] = false;
                this.rowRotate2[i] = true;
            } else {
                this.rowRotate[i] = true;
                this.rowRotate2[i] = false;
            }

            if(i == +this.counterRow - 1){
                this.animRotateRevers()
            }
        }    
    },

    animRotateRevers(){
        for(let i = 0; i < this.counterRow; i++){   

            if(i == 4 || i == 5){
                setTimeout(() => {
                this.rowRotate1revers[i] = true;
                }, 1400);
            }
            else{
                this.rowRotate1revers[i] = false
            }

            if(i == 8 || i == 11){
                setTimeout(() => {
                this.rowRotate2revers[i] = true;
                }, 1400);
            }
            else{
                this.rowRotate2revers[i] = false
            }


            if(i == this.counterRow - 1){

            setTimeout(() => {
                this.$store.commit('changePreloader', false);
                this.show__preloader = false

            }, 1700);

            }
        } 
    }
  },

  mounted(){
   this.animateRows()
  },
}
</script>