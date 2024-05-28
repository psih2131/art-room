<template>
    <div v-if="reaction_data.reaction != null && reaction_data.reaction != undefined" class="rate-value" @click="visibleRateTextStatus">
        
        <template v-if="publicStatus == true">
            <div class="rate-value__image-wrapper rate-value_like" v-if="reaction_data.reaction == 'like' && reaction_data.user_token == TOKEN">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M14 7.66672C14 7.66672 16.2585 5.07357 18.2303 4.85333C21.702 4.46555 24.29 8.26046 24.29 11.4332C24.29 18.0657 14 23.1467 14 23.1467C14 23.1467 3.70996 18.0657 3.70996 11.4332C3.70996 8.26046 6.29795 4.46555 9.76963 4.85333C11.7414 5.07357 14 7.66672 14 7.66672Z" stroke="#1B1D1C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>  
            </div>
    
            <div class="rate-value__image-wrapper rate-value_dislike" v-if="reaction_data.reaction == 'dislike' && reaction_data.user_token == TOKEN ">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="14" cy="14" r="10.29" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <line x1="7.29289" y1="21.0072" x2="21.0072" y2="7.29287" stroke="white" stroke-width="2"/>
                    </svg>                
            </div>
    
            <div class="rate-value__image-wrapper rate-value_question" v-if="reaction_data.reaction == 'neutral' && reaction_data.user_token == TOKEN">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 16.9485L17.7701 15.9651C18.6535 15.4744 19.2014 14.5433 19.2014 13.5328C19.0967 11.8524 17.6556 10.5714 15.9745 10.6644C14.4724 10.6021 13.1385 11.6175 12.7987 13.082" stroke="#1B1D1C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <circle cx="16" cy="16.0001" r="12.005" stroke="#1B1D1C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M16.1336 21.2023C16.1335 21.2759 16.0738 21.3355 16.0001 21.3355C15.9265 21.3355 15.8668 21.2758 15.8668 21.2022C15.8668 21.1285 15.9264 21.0688 16 21.0687C16.0355 21.0687 16.0695 21.0827 16.0945 21.1078C16.1196 21.1328 16.1336 21.1668 16.1336 21.2023" stroke="#1B1D1C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
    
    
            <div class="rate-value__text-popup" :class="{'active-rate-text': rateTextVisible && reaction_data.user_token == TOKEN}">
                <p class="rate-value__text" v-if="reaction_data.reaction == 'dislike' && reaction_data.user_token == TOKEN">Not for me</p>
                <p class="rate-value__text" v-if="reaction_data.reaction == 'neutral' && reaction_data.user_token == TOKEN">Need to think about it</p>
                <p class="rate-value__text" v-if="reaction_data.reaction == 'like' && reaction_data.user_token == TOKEN">Love It</p>
            </div>
        </template>

        <template v-else>
            <div class="rate-value__image-wrapper rate-value_like" v-if="reaction_data.reaction == 'like'">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M14 7.66672C14 7.66672 16.2585 5.07357 18.2303 4.85333C21.702 4.46555 24.29 8.26046 24.29 11.4332C24.29 18.0657 14 23.1467 14 23.1467C14 23.1467 3.70996 18.0657 3.70996 11.4332C3.70996 8.26046 6.29795 4.46555 9.76963 4.85333C11.7414 5.07357 14 7.66672 14 7.66672Z" stroke="#1B1D1C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>  
            </div>
    
            <div class="rate-value__image-wrapper rate-value_dislike" v-if="reaction_data.reaction == 'dislike'">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="14" cy="14" r="10.29" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <line x1="7.29289" y1="21.0072" x2="21.0072" y2="7.29287" stroke="white" stroke-width="2"/>
                    </svg>                
            </div>
    
            <div class="rate-value__image-wrapper rate-value_question" v-if="reaction_data.reaction == 'neutral'">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 16.9485L17.7701 15.9651C18.6535 15.4744 19.2014 14.5433 19.2014 13.5328C19.0967 11.8524 17.6556 10.5714 15.9745 10.6644C14.4724 10.6021 13.1385 11.6175 12.7987 13.082" stroke="#1B1D1C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <circle cx="16" cy="16.0001" r="12.005" stroke="#1B1D1C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M16.1336 21.2023C16.1335 21.2759 16.0738 21.3355 16.0001 21.3355C15.9265 21.3355 15.8668 21.2758 15.8668 21.2022C15.8668 21.1285 15.9264 21.0688 16 21.0687C16.0355 21.0687 16.0695 21.0827 16.0945 21.1078C16.1196 21.1328 16.1336 21.1668 16.1336 21.2023" stroke="#1B1D1C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
    
    
            <div class="rate-value__text-popup" :class="{'active-rate-text': rateTextVisible}">
                <p class="rate-value__text" v-if="reaction_data.reaction == 'dislike'">Not for me</p>
                <p class="rate-value__text" v-if="reaction_data.reaction == 'neutral'">Need to think about it</p>
                <p class="rate-value__text" v-if="reaction_data.reaction == 'like'">Love It</p>
            </div>
        </template>


    </div>
</template>



<script>


export default {

    props: {
        reaction_data: Object
    },
    
    data() {
        return {
            rateTextVisible: false,
            TOKEN: this.$store.state.userToken,
            publicStatus: this.$store.state.publicDataUserStatus
        }
    },

    components: {
    
    },

    methods: {
        visibleRateTextStatus(){
            this.rateTextVisible = !this.rateTextVisible

            if(this.rateTextVisible == true){
                 var timerId = setTimeout(()=> {
                    this.rateTextVisible = false
                    console.log("Таймер сработал!");
                 }, 5000); 

            }
            else{
                // Отмена выполнения таймера
                clearTimeout(timerId);
            }

            
        }
    },

    computed: {

    },

    watch: {

    },

    mounted(){

    },

}
</script>