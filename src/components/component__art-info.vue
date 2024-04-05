<template>
    <transition name="show__dop-info">
        <div v-if="openDop" class="popup-work-info"  :class="{'hidden-class-active': hiddenStatus}">
            <div class="container">
                <div class="popup-work-info__wrapper">
                    <div class="popup-work-info__fixed-box fixed-box-info">
                        <div class="fixed-box-info__img-wrapper">
                            <img :src="work__image" alt="" class="fixed-box-info__img">
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
                            <p class="art-post__price" v-if="work__price.value != null">
                                <component__price :typeValue="work__price.currency" :priceValue="work__price.value" />
                            </p>
                        </div>
                    </div>
                    <div class="popup-work-info__content">
                        <div class="popup-work-info__header">
                            <component__comment :workId="work__currentId" />
                            <component__rate :workId="work__currentId"/>
                        </div>
                        <div class="popup-work-info__body">
                            <ul class="tab__list">
                                <li class="tab__list-element" v-if="work__category">{{categoryModName(work__category)}}</li>
                                <li class="tab__list-element" v-if="work__contry  && work__contry.length > 0">{{ work__contry }}</li>
                                <li class="tab__list-element" v-if="work__year && work__year > 0">{{ work__year }}</li>
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
                            
                            <p class="popup-work-info__medium" v-if="work__style && work__style != ' ' ">
                                <b>Style:</b>
                                {{ work__style }}
                            </p>

                            <p class="popup-work-info__framed" v-if="work__is_framed != null">
                                <template v-if="work__is_framed == true">
                                    <span v-if="work__frame_details != null && work__frame_details != ''" ><b>Framed:</b> {{work__frame_details}}</span>
                                    <span v-else><b>Framed</b></span>
                                </template>
                                <template v-else>
                                    <span ><b>No Frame</b></span>
                                </template>
                      
                            </p>


                            <div class="popup-work-info__text" v-if="work__description">
                                {{ work__description }}
                            </div>



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
                                <div class=" popup-work-info__link-col">
                                    
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
                                    v-if="work__exhibition_history.length > 0  && work__exhibition_history != '' && work__exhibition_history != null">
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

                            <div class="popup-work-info__tabs" v-if="work__dop_info">

                                <div class="popup-work-info__tab popup-tab popup-tab_about" @click="tabPopupChange($event)" :class="{'tab-popup__about-open':about_show_all}">
                                    <p class="popup-tab__title">about Artist</p>
                                    <div class="popup-tab__body">
                                        <div class="popup-tab__wrapper">
                                            <div class="tab__photo-wrapper">
                                                <img src="@/assets/img/photo.jpg" alt="" class="tab__photo">
                                              </div>
                                              <div class="tab__col1">
                                                <h2 class="tab__title">Matt Johnson</h2>
                                                <ul class="tab__list">
                                                  <li class="tab__list-element">Artist</li>
                                                  <li class="tab__list-element">London</li>
                                                  <li class="tab__list-element">England</li>
                                                </ul>
                                                <div class="tab__description about-text-container">
                                                  {{ about_text }}
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

                                <div class="popup-work-info__tab popup-tab tab-popup_awards" @click="tabPopupChange($event)" :class="{'tab-popup__awards-open':avards_show_all}">
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

                                <div class="popup-work-info__tab popup-tab  tab-popup_exhibitions" @click="tabPopupChange($event)" :class="{'tab-popup__awards-open':exhibitions_show_all}">
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


                            <p class="popup-work-info__text-after-tabs">
                                This viewing room was created in the <a href="https://artup.app/" target="_blank">ArtUp app</a>.<br>
                                © 2023 Art eService Ltd. Registered in England.
                                ArtUp is a trademark of Art eService Ltd. All rights reserved.
                            </p>
                        </div>
                    </div>
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
</template>


<script>
import component__comment from '@/components/component__comment.vue'
import component__rate from '@/components/component__rate.vue'
import component__price from '@/components/component__price.vue'

//json to list convert plugin
import { convertJsonToArray } from '@/plugins/plugin__convet-json-to-list.js';

export default {

    props: {
        openDop: Boolean
  },
    
    data() {
        return {
            hiddenStatus: false,

            idWork: null,
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
            work__docs: null,
            work__is_framed: null,
            work__frame_details: null,
            work__exhibition_history: [],
            work__provenance: [],
            work__publications: [],
            work__image: null,
            work__currentId: null,

            work__dop_info: false,



            about_text: ' Young artist who began his career in early 2020. He studied painting at a renowned art college, where he specialized in the manipulation of various materials and techniques.   Young artist who began his career in early 2020. He studied painting at a renowned art college, where he specialized in the manipulation of various materials and techniques.  Young artist who began his career in early 2020. He studied painting at a renowned art college, where he specialized in the manipulation of various materials and techniques.   Young artist who began his career in early 2020. He studied painting at a renowned art college, where he specialized in the manipulation of various materials and techniques. ',
            about_btnStatus: false,
            about_show_all: false,

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
            counterAvards: 4,



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
            counterExhibitions: 4,

            
        }
    },

    components: {
        component__comment,
        component__rate,
        component__price,
    },

    methods: {
        closeDopInfo(){
            this.$emit('closeDop', false)
        },

        //hide about btn
        culcHeightDownAbout(){
            setTimeout(()=>{
                let textContainer = document.querySelector('.about-text-container')
                if(textContainer.offsetHeight > 129){
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

            if(this.avards_array.length > 4){
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

            if(this.exhibitions_array.length > 4){
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

          this.counterAvards = 100
          this.$store.commit('changeBodyOverflow', true)
          this.hiddenStatus = true
        }
        else{
          this.counterAvards = 4
          this.hiddenStatus = false
        }
      },


      //open exhibitions text 
      exhibitionsActive(){
        this.exhibitions_show_all = !this.exhibitions_show_all

        if(this.exhibitions_show_all == true){       
          this.slowScroll()

          this.counterExhibitions = 100

          this.$store.commit('changeBodyOverflow', true)
          this.hiddenStatus = true
        }
        else{

          this.counterExhibitions = 4

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
        const container = document.querySelector(".popup-work-info .popup-work-info__content");
        const boxRect = heightBox.getBoundingClientRect();
        const distanceFromBrowserTop = boxRect.top;
        const currentScrollValue = container.scrollTop;

        const newScrollValue = currentScrollValue + distanceFromBrowserTop;
        const duration = 800; // Длительность анимации (в миллисекундах)

        scrollToSmoothly(container, newScrollValue, duration);
      },


         tabPopupChange(e) {
            console.log('gg')
            let parrent = document.querySelector('.popup-work-info__tabs');
            let allTabs = document.querySelectorAll('.popup-tab');
            let curruentElement = e.target;
            let currentClassList = curruentElement.classList;

            let children = Array.from(parrent.children);
            let index = children.indexOf(curruentElement);

            if (index == 2) {
                console.log(currentClassList);
                console.log(index);

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
                console.log(currentClassList);
                console.log(index);

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

        //load current work data and image 
        currentIdStatusWork(){
            if(this.openDop == true){
                this.idWork = this.$store.state.sliderId
                let allWorks = this.$store.state.allDataServer.data.viewingRoomGetWeb.artworks_data

                for(let i = 0; i < allWorks.length; i++){
                    let idWork = allWorks[i].id

                    if(idWork == this.idWork){
                        this.work__all_data = allWorks[i]
                        this.loadAllDataForWork()
                        console.log(this.work__all_data)
                    }
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

        //load all data
        loadAllDataForWork(){
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
            this.work__docs = this.work__all_data.file_data
            this.work__is_framed = this.work__all_data.is_framed
            this.work__frame_details = this.work__all_data.frame_details
            this.work__exhibition_history = this.work__all_data.exhibition_history
            this.work__image = this.work__all_data.image_data[0].preview_url
            this.work__currentId = this.work__all_data.id


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
        }
    },

    computed: {


    },

    watch: {
        openDop(newVal, oldVal) {
            // check change currentId props
            this.currentIdStatusWork() 
        }
    },

    mounted(){
        this.culcHeightDownAbout()
        this.culcHeightDownAvards()
        this.culcHeightDownExhibitions()
    },

}
</script>