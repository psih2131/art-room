<template>
    <div class="rate">
        <div class="rate__element">
            <div class="rate__track">
                <div class="section"></div>
                <div class="section"></div>
                <div class="section"></div>
                <div class="section"></div>
                <div class="circle" id="draggable">
                    <img :src="urlImgRate" alt="" class="circle__image">
                </div>
            </div>
        </div>
        <p class="rate__title" :class="{'black-text-color': changeColorText}">{{rateText}}</p>
      
    </div>
    
</template>

<script>


export default {

    props: {
        openDop: Boolean,
        workId: Number,
   
  },
    
    data() {
        return {
            urlImgRate: require('@/assets/img/rate1.svg'),
            rateText: '→ Drag to rate this work',
            changeColorText: false
        }
    },

    components: {
    
    },


    methods: {
        testX(){


            if ('ontouchstart' in window) {
            // Устройство поддерживает сенсорный экран
            console.log('У вас сенсорный экран');

            const circle = document.getElementById('draggable');
            let isDragging = false;
            let autoAlignTimer;
            let currentBlockNumber = 1;
            let isScriptStopped = false;

            circle.addEventListener('touchstart', (e) => {
                isDragging = true;
                circle.style.cursor = 'grabbing';
                isScriptStopped = false;
                const container = document.querySelector('.rate__track');
                const containerRect = container.getBoundingClientRect();
                const sectionWidth = containerRect.width / 4;

                document.querySelector('.rate__element').addEventListener('touchmove', (e) => {
                    if (isDragging) {
                        if (!isScriptStopped) {
                            const circleWidth = circle.clientWidth;
                            const maxLeft = 0;
                            const maxRight = containerRect.width - circleWidth;
                            let touchX = e.touches[0].clientX;
                            let circleLeft = touchX - containerRect.left - circleWidth / 2;
                            circleLeft = Math.min(maxRight, Math.max(maxLeft, circleLeft));

                            const closestSectionIndex = Math.round(circleLeft / sectionWidth);
                            const newLeft = closestSectionIndex * sectionWidth;

                            circle.style.transition = 'left 0.2s ease-in-out';
                            circle.style.left = `${newLeft}px`;

                            // Определяем номер блока и выводим в консоль
                            const blockNumber = closestSectionIndex + 1;
                            if (blockNumber !== currentBlockNumber) {
                                console.log(`Номер блока: ${blockNumber}`);
                                currentBlockNumber = blockNumber;
                                this.changeImage(blockNumber);
                                
                            }
                        }
                    }
                });

                document.querySelector('.rate__element').addEventListener('touchend', () => {
                    isDragging = false;
                    circle.style.cursor = 'grab';
                    circle.style.transition = 'left 0.2s ease-in-out';

                    clearTimeout(autoAlignTimer);
                    autoAlignTimer = setTimeout(() => {
                        // Автоматически выравниваем кружок к ближайшему блоку после некоторой задержки
                        const currentLeft = parseFloat(circle.style.left);
                        const closestSectionIndex = Math.round(currentLeft / sectionWidth);
                        const newLeft = closestSectionIndex * sectionWidth;
                        circle.style.left = `${newLeft}px`;

                        // this.SERVER_QUERY_SEND_NEW_RATE(closestSectionIndex)
                    }, 200); // Задержка в 200 миллисекунд

                    let currentLeftX = parseFloat(circle.style.left);
                    let closestSectionIndexX = Math.round(currentLeftX / sectionWidth);
                    
                    this.SERVER_QUERY_SEND_NEW_RATE(closestSectionIndexX)
                });

                container.addEventListener('mouseenter', () => {
                    if (isScriptStopped) {
                        console.log('Скрипт возобновлен.');
                    }
                    isScriptStopped = false;
                    
                });

                container.addEventListener('mouseleave', () => {
                    if (isDragging) {
                        isDragging = false;
                        circle.style.cursor = 'grab';
                        circle.style.transition = 'left 0.2s ease-in-out';

                        clearTimeout(autoAlignTimer);
                        autoAlignTimer = setTimeout(() => {
                            const currentLeft = parseFloat(circle.style.left);
                            const closestSectionIndex = Math.round(currentLeft / sectionWidth);
                            const newLeft = closestSectionIndex * sectionWidth;
                            circle.style.left = `${newLeft}px`;

                            console.log('Скрипт остановлен и кружок автоматически выровнен.');
                            isScriptStopped = true;

                           
                        }, 200);
                    }
                });
            });



            } else {
            // Устройство не поддерживает сенсорный экран
            console.log('У вас нет сенсорного экрана');
            const circle = document.getElementById('draggable');
            let isDragging = false;
            let autoAlignTimer;
            let currentBlockNumber = 1;
            let isScriptStopped = false;

            circle.addEventListener('mousedown', (e) => {
                isDragging = true;
                circle.style.cursor = 'grabbing';
                isScriptStopped = false;
                const container = document.querySelector('.rate__track');
                const containerRect = container.getBoundingClientRect();
                const sectionWidth = containerRect.width / 4;

                document.querySelector('.rate__element').addEventListener('mousemove', (e) => {
                    if (isDragging) {
                        if (!isScriptStopped) {
                            const circleWidth = circle.clientWidth;
                            const maxLeft = 0;
                            const maxRight = containerRect.width - circleWidth;
                            let circleLeft = e.clientX - containerRect.left - circleWidth / 2;
                            circleLeft = Math.min(maxRight, Math.max(maxLeft, circleLeft));

                            const closestSectionIndex = Math.round(circleLeft / sectionWidth);
                            const newLeft = closestSectionIndex * sectionWidth;

                            circle.style.transition = 'left 0.2s ease-in-out';
                            circle.style.left = `${newLeft}px`;

                            // Определяем номер блока и выводим в консоль
                            const blockNumber = closestSectionIndex + 1;
                            if (blockNumber !== currentBlockNumber) {
                                console.log(`Номер блока: ${blockNumber}`);
                                currentBlockNumber = blockNumber;
                                this.changeImage(blockNumber)
                            }
                        }
                        else{
                            // this.SERVER_QUERY_SEND_NEW_RATE(closestSectionIndex)
                        }
                    }
                });

                document.querySelector('.rate__element').addEventListener('mouseup', () => {
                    isDragging = false;
                    circle.style.cursor = 'grab';
                    circle.style.transition = 'left 0.2s ease-in-out';

                    clearTimeout(autoAlignTimer);
                    autoAlignTimer = setTimeout(() => {
                        // Автоматически выравниваем кружок к ближайшему блоку после некоторой задержки
                        const currentLeft = parseFloat(circle.style.left);
                        const closestSectionIndex = Math.round(currentLeft / sectionWidth);
                        const newLeft = closestSectionIndex * sectionWidth;
                        circle.style.left = `${newLeft}px`;
                        this.SERVER_QUERY_SEND_NEW_RATE(closestSectionIndex)
                    }, 200); // Задержка в 500 миллисекунд (0.5 секунды)
                });

                container.addEventListener('mouseenter', () => {
                    if (isScriptStopped) {
                        console.log('Скрипт возобновлен.');
                    }
                    isScriptStopped = false;
                });

                container.addEventListener('mouseleave', () => {
                    if (isDragging) {
                        isDragging = false;
                        circle.style.cursor = 'grab';
                        circle.style.transition = 'left 0.2s ease-in-out';

                        clearTimeout(autoAlignTimer);
                        autoAlignTimer = setTimeout(() => {
                            const currentLeft = parseFloat(circle.style.left);
                            const closestSectionIndex = Math.round(currentLeft / sectionWidth);
                            const newLeft = closestSectionIndex * sectionWidth;
                            circle.style.left = `${newLeft}px`;

                            console.log('Скрипт остановлен и кружок автоматически выровнен.');
                            isScriptStopped = true;

                            
                        }, 200); // Задержка в 500 миллисекунд (0.5 секунды)
                    }
                });
            });
            }

        },

        //check value and change down rate text
        changeImage(url){
            if(+url == 1){
               this.urlImgRate = require('@/assets/img/rate1.svg');
               this.rateText = '→ Drag to rate this work'
               this.changeColorText = false
            }
            else if(+url == 2){
                this.urlImgRate = require('@/assets/img/rate2.svg');
                this.rateText = 'Not for me'
                this.changeColorText = true
            }
            else if(+url == 3){
                this.urlImgRate = require('@/assets/img/rate3.svg');
                this.rateText = 'Need to think about it'
                this.changeColorText = true
            }
            else if(+url == 4){
                this.urlImgRate = require('@/assets/img/rate4.svg');
                this.rateText = 'Love It'
                this.changeColorText = true
            }
        },


        //get default value rate
        getDefaultValue(){
            let idWork = this.workId
            let reactionForThisWork = this.$store.state.allDataServer.data.viewingRoomGetWeb.reactions
            let reactionValue = null;

            if(reactionForThisWork != null && reactionForThisWork.length > 0){

                for(let i = 0; i < reactionForThisWork.length; i++){
                    let idReaction = reactionForThisWork[i].artwork_id
                    if(+idReaction == +idWork){
                        reactionValue = reactionForThisWork[i].reaction
                    }
                }
            }

            this.setDefaultValueForCircle(reactionValue)

        },

        //set style left for circle
        setDefaultValueForCircle(valueReaction){
            let circleRate = document.querySelector('.circle')
            let trackRate = document.querySelector('.rate__track')
            let trackRate_width = trackRate.offsetWidth 
            let trackRate_width_one_sec = trackRate_width / 4
            console.log(trackRate_width_one_sec)

            if(valueReaction == 'like'){
                circleRate.style.left = trackRate_width_one_sec * 3 + 'px'
                this.changeImage(4)
                this.testX()
            }

            if(valueReaction == 'dislike'){
                circleRate.style.left = trackRate_width_one_sec * 1 + 'px'
                this.changeImage(2)
                this.testX()
            }

            if(valueReaction == 'neutral'){
                circleRate.style.left = trackRate_width_one_sec * 2 + 'px'
                this.changeImage(3)
                this.testX()
            }

            if(valueReaction == 'none' || valueReaction == null || valueReaction == ''){
                circleRate.style.left = 0 + 'px'
                this.changeImage(1)
                this.testX()
            }
        },

        SERVER_QUERY_SEND_NEW_RATE(valueRate){
            console.log(valueRate)
            let currentRateValue = '';
            if(valueRate == 0){
                currentRateValue = 'none'
            }
            if(valueRate == 1){
                currentRateValue = 'dislike'
            }
            if(valueRate == 2){
                currentRateValue = 'neutral'
            }
            if(valueRate == 3){
                currentRateValue = 'like'
            }
            
       

            const serverUrl = 'https://ma-artist-api-dev.herokuapp.com/graphql';

            const linkAlias = this.$store.state.linkAleas;

            const mutation = `
            mutation UpdateViewingRoomWeb($viewingRoom: OfferReactionStatsInput) {
                updateViewingRoomWeb(viewing_room: $viewingRoom) {
                artwork_id
                comments
                reaction
                }
            }
            `;

            const variables = {
            "viewingRoom": {
                "link_alias": linkAlias,
                "artwork_id": this.workId,
                "reaction": currentRateValue
            }
            };

            fetch(serverUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: mutation,
                variables: {
                viewingRoom: {
                    link_alias: linkAlias,
                    ...variables.viewingRoom
                }
                }
            }),
            })
            .then(response => response.json())
            .then(data => this.handleMutationResponse(data))
            .catch(error => console.error('Error:', error));
        },

        handleMutationResponse(data){
            console.log(data)
            this.$store.commit('changeDataUpdateStatus', !this.$store.state.dataUpdateStatus)
        }
    },

    computed: {

    },

    watch: {

    },

    mounted(){
       this.getDefaultValue()
    },

}
</script>