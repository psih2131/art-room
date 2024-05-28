<template>
  <main v-if="showComponent == true" class="main" :class="{'hideSlider': statusLoading}" >

    <div class="bag-fix-slider">
        <div class="bag-fix-slider__image-wrapper" v-for="item in fixedArray" :key="item.id">
          <img :src="item.image_data[0].image_url" alt="" class="bag-fix-slider__img" :data-id="item.id">
        </div>
    </div>

    <div class="page-slider slide-dark-mode">
    
      <swiper
      :direction="'vertical'"
      :grabCursor="false"
      :parallax="true"
      :speed="800"
      :allowTouchMove="true"

      :pagination="{
      clickable: true,
      }"
      :mousewheel="sliderScrollStatus"
      :effect="'creative'"
      :creativeEffect="{
      prev: {
      shadow: false,
      translate: [0, '-50%',  -1],
      },
      next: {
      translate: [0, '100%',  1],
      },
      }"

      :modules="modules"
      class="mySwiper"

      @slideChange="onSlideChange"
      @swiper="onSwiper"
      >
      <swiper-slide >
        <div class="page-slider__slide first-slide">
          <div class="container">
            <div class="first-slide__btn-ar btn-ar" @click="sideToNextWindow(2)">
              <p class="btn-ar__text">Works</p>
              <div class="btn-ar__icon-container">
                <svg width="73" height="16" viewBox="0 0 73 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.292893 7.29289C-0.0976311 7.68342 -0.0976311 8.31658 0.292893 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928932C7.68054 0.538408 7.04738 0.538408 6.65685 0.928932L0.292893 7.29289ZM1 9L73 9V7L1 7L1 9Z" fill="white"/>
                </svg>
              </div>
            </div>
  
            <div class="first-slide__content">
  
              <transition  name="show__big_art">
                <div v-if="show__big_art" class="first-slide__big-post big-post " :class="{'show__all_baner': show__all_big_art}">
                
                  <div class="big-post__wrapper" >
                    <h1 class="big-post__title">
                      {{ user__title_page }}
                    </h1>
                    <p class="big-post__description">
                      {{ user__description_page }}
                    </p>
                  </div>
            
                  <div class="big-post__btn btnV1 big-post__btn-wrapper" @click="openAllBigArt" :class="{'active-btn-description': show__all_big_art, 'hide-more-btn-sec1': sec1_btn_more_text_status}">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <line x1="12" y1="4.37114e-08" x2="12" y2="24" stroke="#3B465C" stroke-width="2"/>
                      <line x1="4.37114e-08" y1="12" x2="24" y2="12" stroke="#3B465C" stroke-width="2"/>
                      </svg>                    
                  </div>
                  
                </div>
              </transition>

              <transition name="show__middle_art" >
                <div  v-if="show__middle_art && show__middle_art != null"
                  class="art-img first-slide__middle-post middle-post art-post" 
                 
                  >
                  <template v-for="(item, index ) in user__works_array" :key="index">
                    <div class="art-post__template-wrapper" v-if="index == 0">

                      <template  v-for="(image, innerIndex) in item.image_data" :key="innerIndex">
                        <img v-if="innerIndex == 0" :src="image.preview_url" alt="" class="art-img-slide art-post__post-image" @click="openPopupSlider(item.id, $event)">
                      </template>
                    
                      <div  class="art-post__info" @click="openPopupSlider(item.id, $event)">
                        <div class="art-post__info-link">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_1_501)">
                            <line x1="12" x2="12" y2="24" stroke="#3B465C" stroke-width="2"/>
                            <line x1="4.37114e-08" y1="12" x2="24" y2="12" stroke="#3B465C" stroke-width="2"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_1_501">
                            <rect width="24" height="24" fill="white" transform="matrix(0 1 -1 0 24 0)"/>
                            </clipPath>
                            </defs>
                            </svg>                    
                        </div>
                        <h3 class="art-post__title">{{ item.artwork_title }}</h3>
                        <p class="art-post__price">
                          <component__price v-if="item.sale_price && item.sale_price.value > 0" :typeValue="item.sale_price.currency" :priceValue="item.sale_price.value" />
                        </p>
                      </div>
                    </div>
                  </template> 
                </div>
              </transition>
              
              <transition name="show__small_art">
                <div v-if="show__small_art && user__works_array.length > 1"
                   class="art-img first-slide__middle-post small-post art-post" 
                   >

                   <template v-for="(item, index ) in user__works_array" :key="index">
                    <div class="art-post__template-wrapper" v-if="index == 1">
                        
                      <template  v-for="(image, innerIndex) in item.image_data" :key="innerIndex" >
                        <img v-if="innerIndex == 0" :src="image.preview_url" alt="" class="art-img-slide art-post__post-image" @click="openPopupSlider(item.id, $event)">
                      </template>

                      <div class="art-post__info" @click="openPopupSlider(item.id, $event)"> 
                        <div class="art-post__info-link">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_1_501)">
                            <line x1="12" x2="12" y2="24" stroke="#3B465C" stroke-width="2"/>
                            <line x1="4.37114e-08" y1="12" x2="24" y2="12" stroke="#3B465C" stroke-width="2"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_1_501">
                            <rect width="24" height="24" fill="white" transform="matrix(0 1 -1 0 24 0)"/>
                            </clipPath>
                            </defs>
                            </svg>                    
                        </div>
                        <h3 class="art-post__title">{{ item.artwork_title }}</h3>
                        <p class="art-post__price">
                          <component__price v-if="item.sale_price && item.sale_price.value > 0" :typeValue="item.sale_price.currency" :priceValue="item.sale_price.value" />
                        </p>
                      </div>

                    </div>
                   </template>

                </div>
              </transition>
              
            </div>
          </div>
        </div>
      </swiper-slide>
      
      <swiper-slide v-slot="{ isActive, isPrev, isNext  }" v-for="item in user__works_array_slider" :key="item">
        <div class="page-slider__slide slide-two-work" v-if="item.length == 2">
          <div class="container">
            <div class="slide-two-work__container">

              <template v-for="(work, index) in item" :key="index" >
                <div v-if="index == 0" class="art-img slide-two-work__img-wrapper">
                  <div  class="slide-two-work__wp">
                    <div class="slide-two-work__img-box">

                      <template  v-for="element in user__works_reactions" :key="element">
                        <component__rate_value v-if="work.id == element.artwork_id" :reaction_data="element" />
                      </template>

                      <template v-for="(image, innerIndex) in work.image_data" :key="innerIndex">
                        <img v-if="innerIndex == 0" 
                            :class="{'activArtImage': isActive, 
                            'prevArtImage': isPrev , 
                            'nextArtImage': isNext
                          }" :src="image.preview_url" alt="" class="art-img-slide slide-two-work__img" @click="openPopupSlider(work.id, $event)">
                      </template>
                      
                    </div>
                    
                    <div class="slide-two-work__title-box">
                        <h3 class="art-post__title">{{ work.artwork_title }}</h3>
                        <p class="art-post__price">
                          <component__price v-if="work.sale_price && work.sale_price.value > 0" :typeValue="work.sale_price.currency" :priceValue="work.sale_price.value" />
                        </p>
                        <template  v-for="element in user__works_reactions" :key="element">
                          <component__comment_value v-if="work.id == element.artwork_id" :reaction_data="element" />
                        </template>
                    </div>
                  </div>
                </div>
              </template>
              
  
  
              <div class="slide-two-work__demarcation-line-wrapper">
                <div :class="{'activLineImage': isActive, 
                'prevLineImage': isPrev , 
                'nextLineImage': isNext}" class="slide-two-work__demarcation-line"></div>
              </div>
             
  
              <template v-for="(work, index) in item" :key="index" >
                <div v-if="index == 1" class="art-img slide-two-work__img-wrapper"  >
                  <div  class="slide-two-work__wp">
                    <div class="slide-two-work__img-box">

                      <template  v-for="element in user__works_reactions" :key="element">
                        <component__rate_value v-if="work.id == element.artwork_id" :reaction_data="element" />
                      </template>

                      <template v-for="(image, innerIndex) in work.image_data" :key="innerIndex">
                        <img v-if="innerIndex == 0" 
                            :class="{'activArtImage': isActive, 
                            'prevArtImage': isPrev , 
                            'nextArtImage': isNext
                          }" :src="image.preview_url" alt="" class="art-img-slide slide-two-work__img" @click="openPopupSlider(work.id, $event)">
                      </template>
                      
                    </div>
                    
                    <div class="slide-two-work__title-box">
                        <h3 class="art-post__title">{{ work.artwork_title }}</h3>
                        <p class="art-post__price">
                          <component__price v-if="work.sale_price && work.sale_price.value > 0" :typeValue="work.sale_price.currency" :priceValue="work.sale_price.value" />
                        </p>
                        <template  v-for="element in user__works_reactions" :key="element">
                          <component__comment_value v-if="work.id == element.artwork_id" :reaction_data="element" />
                        </template>
                    </div>
                  </div>
                </div>
              </template>

            </div>
            
          </div>
        </div>

        <div class="page-slider__slide slide-one-work" v-else>
          <div class="container">
            <template v-for="(work, index) in item" :key="index">
              <div v-if="index == 0" class="art-img slide-one-work__wrapper" >
                <div class="slide-one-work__work">
                  <div class="slide-one-work__img-box">

                    <div class="slide-one-work__img-box-wrapper-one">
                      <template  v-for="element in user__works_reactions" :key="element">
                        <component__rate_value v-if="work.id == element.artwork_id" :reaction_data="element" />
                      </template>

                      <template v-for="(image, innerIndex) in work.image_data" :key="innerIndex">
                        <img v-if="innerIndex == 0"
                            :class="{'activArtImage2': isActive, 
                                'prevArtImage2': isPrev, 
                                'nextArtImage2': isNext
                              }"
                            :src="image.preview_url" alt="" class="art-img-slide slide-one-work__img" @click="openPopupSlider(work.id, $event)">
                      </template>
                    </div>
                    
                  </div>
                  
                  <div class="slide-two-work__title-box">
                      <h3 class="art-post__title">{{ work.artwork_title }}</h3>
                      <p class="art-post__price">
                        <component__price v-if="work.sale_price && work.sale_price.value > 0" :typeValue="work.sale_price.currency" :priceValue="work.sale_price.value" />
                      </p>
                      <template  v-for="element in user__works_reactions" :key="element">
                        <component__comment_value v-if="work.id == element.artwork_id" :reaction_data="element" />
                      </template>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </swiper-slide>

    
      <swiper-slide v-slot="{ isActive, isPrev, isNext  }">
        <div class="page-slider__slide slide-footer" v-if="avards_visible == true && exhibitions_visible == true">
          <div class="container">
            <div class="slide-footer__wrapper tab__container"
            :class="{'activTab': isActive, 
                          'prevTab': isPrev, 
                          'nextTab': isNext
                        }"
            >

              <div  class="tab tab-element tab_about" @click="tabChange($event)" :class="{'about-full-text': about_show_all}">
                <div class="tab__title-tab">about</div>
                <div class="tab__wrapper">
                  <div class="tab__anim-wrapper">
                    <div class="tab__col-photo-mob">
                      <div class="tab__photo-wrapper">
                        <img :src="user__photo" alt="" class="tab__photo">
                      </div>
                    </div>
                    <div class="tab__col1">
                      <h2 class="tab__title">{{ user__first_name }}</h2>
                      <ul class="tab__list">
                        <li class="tab__list-element" v-if=" user__type_accoutn != null">{{user__type_accoutn}}</li>
                        <!-- <li class="tab__list-element">London</li> -->
                        <template v-if="user__type_accoutn == 'Art Collector'">
                          <li class="tab__list-element" v-if=" user__origin_country != '' && user__origin_country != null">from {{ user__origin_country }}</li>
                          <li class="tab__list-element" v-if="  user__resident_country != null">{{ user__resident_country }}</li>
                        </template>

                        <template v-else-if="user__type_accoutn == 'Artist'">
                          <li class="tab__list-element" v-if=" user__origin_country != '' && user__origin_country != null ">from {{ user__origin_country }}</li>
                          <li class="tab__list-element" v-if=" user__resident_country != '' && user__resident_country != null ">{{ user__resident_country }}</li>
                        </template>


                        
                      </ul>
                      <div class="tab__description">
                        <div class="about-text-container">
                          {{ user__about_biograf }}
                        </div>
                        
                      </div>
                      
                    </div>
                    <div class="tab__col2">
                      <div class="tab__photo-wrapper">
                        <img :src="user__photo" alt="" class="tab__photo">
                      </div>
                      <ul class="tab__link">

                        <template v-if="user__phones != null && user__phones != undefined">
                          <div>
                            <template v-for="item in user__phones" :key="item">
                                <li class="tab__link-element" >
                                    <a :href="`tel:${item.value}`" class="tab__link-text">{{ item.value }}</a>
                                </li>
                            </template>
                          </div>
                        </template>
                        
                        
                        <template v-if="user__emails != null && user__emails != undefined">
                          <div>
                            <template v-for="item in user__emails" :key="item">
                                <li class="tab__link-element">
                                    <a :href="`mailto:${item.value}`" class="tab__link-text">{{ item.value }}</a>
                                </li>
                            </template>
                          </div>
                        </template>
                        
                        <template v-if="user__socials != null && user__socials != undefined">
                          <div>
                              <template v-for="item in user__socials" :key="item">
                                
                                <component__social :itemData="item"  v-if="getSocial(item.description).length > 0"/>

                            </template>
                          </div>
                        </template>

                      </ul>
                    </div>

                   <component__copy_text />

                  </div>
                </div> 
                
               
                  <div class="tab__btn btnV1" @click="aboutActive" v-if="about_btnStatus">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="12" y1="4.37114e-08" x2="12" y2="24" stroke="#3B465C" stroke-width="2"/>
                        <line x1="4.37114e-08" y1="12" x2="24" y2="12" stroke="#3B465C" stroke-width="2"/>
                        </svg>                    
                  </div>
               


              </div>


              


              <div  class="tab tab-element tab_awards" @click="tabChange($event)" :class="{'avards-full-text': avards_show_all}">
                <div class="tab__title-tab">Publications</div>
                <div class="tab__wrapper">
                  <div class="tab__anim-wrapper">
                    <h2 class="tab__title">{{ user__first_name }}</h2>
                    <ul class="tab__list">
                      <li class="tab__list-element" v-if=" user__type_accoutn != null">{{user__type_accoutn}}</li>
                      <!-- <li class="tab__list-element">London</li> -->
                      <template v-if="user__type_accoutn == 'Art Collector'">
                        <li class="tab__list-element" v-if=" user__origin_country != '' && user__origin_country != null">from {{ user__origin_country }}</li>
                        <li class="tab__list-element" v-if="  user__resident_country != null">{{ user__resident_country }}</li>
                      </template>

                      <template v-else-if="user__type_accoutn == 'Artist'">
                        <li class="tab__list-element" v-if=" user__origin_country != '' && user__origin_country != null ">from {{ user__origin_country }}</li>
                        <li class="tab__list-element" v-if=" user__resident_country != '' && user__resident_country != null ">{{ user__resident_country }}</li>
                      </template>
                    </ul>
                    <div class="tab__awards-row">
                      <div class="tab__work-container-list">
                        <div class="tab__awards-element" v-for="item in avards_array.slice(0, counterAvards)" :key="item" >
                          <!-- <p class="tab__awards-element-title">{{ item.title }}</p> -->
                          <ul class="tab__list">
                            <li class="tab__list-element">{{ item }}</li>
                            <!-- <li class="tab__list-element">{{ item.subtitle }}</li> -->
                          </ul>
                        </div>
                      </div>
                      

                      

                    </div>

                    </div>

                    
                </div>

                

                <div class="tab__btn btnV1" v-if="avards_btnStatus" @click="avardsActive">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="12" y1="4.37114e-08" x2="12" y2="24" stroke="#3B465C" stroke-width="2"/>
                    <line x1="4.37114e-08" y1="12" x2="24" y2="12" stroke="#3B465C" stroke-width="2"/>
                    </svg>                    
                </div>


              </div>


              <div  class="tab tab-element tab_exhibitions" @click="tabChange($event)"  :class="{'exhibitions-full-text': exhibitions_show_all}">
                <div class="tab__title-tab">Exhibitions</div>
                <div class="tab__wrapper">
                  <div class="tab__anim-wrapper">
                  <h2 class="tab__title">{{ user__first_name }}</h2>
                  <ul class="tab__list">
                    <li class="tab__list-element" v-if="user__type_accoutn != null && user__type_accoutn.length > 1">{{user__type_accoutn}}</li>
                    <!-- <li class="tab__list-element">London</li> -->
                    <template v-if="user__type_accoutn == 'Art Collector'">
                      <li class="tab__list-element" v-if=" user__origin_country != '' && user__origin_country != null">from {{ user__origin_country }}</li>
                      <li class="tab__list-element" v-if="  user__resident_country != null">{{ user__resident_country }}</li>
                    </template>

                    <template v-else-if="user__type_accoutn == 'Artist'">
                      <li class="tab__list-element" v-if=" user__origin_country != '' && user__origin_country != null ">from {{ user__origin_country }}</li>
                      <li class="tab__list-element" v-if=" user__resident_country != '' && user__resident_country != null ">{{ user__resident_country }}</li>
                    </template>
                  </ul>
                  <div class="tab__awards-row">
                    <div class="tab__work-container-list">
                      <div class="tab__awards-element" v-for="item in exhibitions_array.slice(0, counterExhibitions)" :key="item" >
                          <!-- <p class="tab__awards-element-title">{{ item.title }}</p> -->
                          <ul class="tab__list">
                            <li class="tab__list-element">{{ item }}</li>
                            <!-- <li class="tab__list-element">{{ item.subtitle }}</li> -->
                          </ul>
                        </div>

                        
                      </div>



                      
                      

                      
                  </div>

                    
                  </div>
                  
              </div>
              <div class="tab__btn btnV1" v-if="exhibitions_btnStatus" @click="exhibitionsActive">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="12" y1="4.37114e-08" x2="12" y2="24" stroke="#3B465C" stroke-width="2"/>
                  <line x1="4.37114e-08" y1="12" x2="24" y2="12" stroke="#3B465C" stroke-width="2"/>
                  </svg>                    
              </div>

             

              </div>

            </div>
          </div>
        </div>


        <div class="page-slider__slide slide-footer" :class="{'two-tabs-about-pc': !avards_visible || !exhibitions_visible}" v-if="!avards_visible || !exhibitions_visible">
          <div class="container">
            <div class="slide-footer__wrapper tab__container"
            :class="{'activTab': isActive, 
                          'prevTab': isPrev, 
                          'nextTab': isNext
                        }"
            >

              <div  class="tab tab-element tab_about" @click="tabChange($event)" :class="{'about-full-text': about_show_all}">
                <div class="tab__title-tab">about</div>
                <div class="tab__wrapper">
                  <div class="tab__anim-wrapper">
                    <div class="tab__col-photo-mob">
                      <div class="tab__photo-wrapper">
                        <img :src="user__photo" alt="" class="tab__photo">
                      </div>
                    </div>
                    <div class="tab__col1">
                      <h2 class="tab__title">{{ user__first_name }}</h2>
                      <ul class="tab__list">
                        <li class="tab__list-element" v-if="user__type_accoutn != null">{{user__type_accoutn}}</li>
                        <!-- <li class="tab__list-element">London</li> -->
                        <template v-if="user__type_accoutn == 'Art Collector'">
                          <li class="tab__list-element" v-if=" user__origin_country != null && user__origin_country != null">from {{ user__origin_country }}</li>
                          <li class="tab__list-element" v-if=" user__resident_country != null">{{ user__resident_country }}</li>
                        </template>

                        <template v-else-if="user__type_accoutn == 'Artist'">
                          <li class="tab__list-element" v-if=" user__origin_country != null && user__origin_country != null ">from {{ user__origin_country }}</li>
                          <li class="tab__list-element" v-if=" user__resident_country != null && user__resident_country != null ">{{ user__resident_country }}</li>
                        </template>
                      </ul>
                      <div class="tab__description">
                        <div class="about-text-container">
                          {{ user__about_biograf }}
                        </div>
                        
                      </div>
                      
                    </div>
                    <div class="tab__col2">
                      <div class="tab__photo-wrapper">
                        <img :src="user__photo" alt="" class="tab__photo">
                      </div>
                      <ul class="tab__link">

                        <template v-if="user__phones != null && user__phones != undefined">
                          <div>
                            <template v-for="item in user__phones" :key="item">
                                <li class="tab__link-element" >
                                    <a :href="`tel:${item.value}`" class="tab__link-text">{{ item.value }}</a>
                                </li>
                            </template>
                          </div>
                        </template>
                        
                        
                        <template v-if="user__emails != null && user__emails != undefined">
                          <div>
                            <template v-for="item in user__emails" :key="item">
                                <li class="tab__link-element">
                                    <a :href="`mailto:${item.value}`" class="tab__link-text">{{ item.value }}</a>
                                </li>
                            </template>
                          </div>
                        </template>
                        
                        <template v-if="user__socials != null && user__socials != undefined">
                          <div>
                              <template v-for="item in user__socials" :key="item">

                                <component__social :itemData="item"  v-if="getSocial(item.description).length > 0"/>
                                
                            </template>
                          </div>
                        </template>

                      </ul>
                    </div>
                    
                    <component__copy_text />

                  </div>
                </div> 
                
               
                  <div class="tab__btn btnV1" @click="aboutActive" v-if="about_btnStatus">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="12" y1="4.37114e-08" x2="12" y2="24" stroke="#3B465C" stroke-width="2"/>
                        <line x1="4.37114e-08" y1="12" x2="24" y2="12" stroke="#3B465C" stroke-width="2"/>
                        </svg>                    
                  </div>
               


              </div>

              <div  class="tab tab-element tab_awards" @click="tabChange($event)" :class="{'avards-full-text': avards_show_all}" v-if="avards_visible">
                <div class="tab__title-tab">Publications</div>
                <div class="tab__wrapper">
                  <div class="tab__anim-wrapper">
                    <h2 class="tab__title">{{ user__first_name }}</h2>
                    <ul class="tab__list">
                      <li class="tab__list-element" v-if=" user__type_accoutn != null">{{user__type_accoutn}}</li>
                      <!-- <li class="tab__list-element">London</li> -->
                      <template v-if="user__type_accoutn == 'Art Collector'">
                        <li class="tab__list-element" v-if=" user__origin_country != '' && user__origin_country != null">from {{ user__origin_country }}</li>
                        <li class="tab__list-element" v-if=" user__resident_country != null">{{ user__resident_country }}</li>
                      </template>

                      <template v-else-if="user__type_accoutn == 'Artist'">
                        <li class="tab__list-element" v-if=" user__origin_country != '' && user__origin_country != null ">from {{ user__origin_country }}</li>
                        <li class="tab__list-element" v-if=" user__resident_country != '' && user__resident_country != null ">{{ user__resident_country }}</li>
                      </template>
                    </ul>
                    <div class="tab__awards-row">
                      <div class="tab__work-container-list">
                        <div class="tab__awards-element" v-for="item in avards_array.slice(0, counterAvards)" :key="item" >
                          <!-- <p class="tab__awards-element-title">{{ item.title }}</p> -->
                          <ul class="tab__list">
                            <li class="tab__list-element">{{ item }}</li>
                            <!-- <li class="tab__list-element">{{ item.subtitle }}</li> -->
                          </ul>
                        </div>
                      </div>
                      

                      

                    </div>

                    </div>

                    
                </div>

                

                <div class="tab__btn btnV1" v-if="avards_btnStatus" @click="avardsActive">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="12" y1="4.37114e-08" x2="12" y2="24" stroke="#3B465C" stroke-width="2"/>
                    <line x1="4.37114e-08" y1="12" x2="24" y2="12" stroke="#3B465C" stroke-width="2"/>
                    </svg>                    
                </div>


              </div>

              <div  class="tab tab-element tab_exhibitions" @click="tabChange($event)"  :class="{'exhibitions-full-text': exhibitions_show_all}" v-if="exhibitions_visible">
                <div class="tab__title-tab">Exhibitions</div>
                <div class="tab__wrapper">
                  <div class="tab__anim-wrapper">
                  <h2 class="tab__title">{{ user__first_name }}</h2>
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
                  <div class="tab__awards-row">
                    <div class="tab__work-container-list">
                      <div class="tab__awards-element" v-for="item in exhibitions_array.slice(0, counterExhibitions)" :key="item" >
                          <!-- <p class="tab__awards-element-title">{{ item.title }}</p> -->
                          <ul class="tab__list">
                            <li class="tab__list-element">{{ item }}</li>
                            <!-- <li class="tab__list-element">{{ item.subtitle }}</li> -->
                          </ul>
                        </div>

                        
                      </div>



                      
                      

                      
                  </div>

                    
                  </div>
                  
              </div>
              <div class="tab__btn btnV1" v-if="exhibitions_btnStatus" @click="exhibitionsActive">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="12" y1="4.37114e-08" x2="12" y2="24" stroke="#3B465C" stroke-width="2"/>
                  <line x1="4.37114e-08" y1="12" x2="24" y2="12" stroke="#3B465C" stroke-width="2"/>
                  </svg>                    
              </div>

             

              </div>

            </div>
          </div>
        </div>
      </swiper-slide>

      </swiper>

    </div>
  </main>

  <popup__art_slider v-if="showComponent == true" :popupStatus="show__slider_popup" @closePopup="closePoupArt" @openDopInfoArt="openDopArtInfo" />

  <popup__art_info v-if="showComponent == true" :openDop="dopInfoStatus"  @closeDop="closeDopInfoArt"/>
 
</template>

<script>
// @ is an alias to /src
import popup__art_slider from '@/components/component__art-popup-slider.vue'
import popup__art_info from '@/components/component__art-info.vue'
import component__price from '@/components/component__price.vue'
import component__social from '@/components/component__social.vue'
import component__copy_text from '@/components/component__copytext.vue'


// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-creative';

// import required modules
import { EffectCreative, Pagination, Mousewheel } from 'swiper/modules';

import component__rate_value from '@/components/component__rate-value.vue'
import component__comment_value from '@/components/component__comment-value.vue'

//json to list convert plugin
import { convertJsonToArray } from '@/plugins/plugin__convet-json-to-list.js';


export default {
  name: 'HomeViewPc',
  components: {
      Swiper,
      SwiperSlide,
      popup__art_slider,
      popup__art_info,
      component__rate_value,
      component__comment_value,
      component__price,
      component__social,
      component__copy_text,
  },
  data() {
    return {
      statusLoading: true,

      sliderScrollStatus: true,

      show__big_art: false,
      show__middle_art: false,
      show__small_art: false,
      show__all_big_art: false,
      
      show__slider_popup: false,
      show__slider_popup_full: false,
      
      dopInfoStatus: false,


      about_text: '',
      about_btnStatus: false,
      about_show_all: false,

      avards_array: [],
      avards_btnStatus: false,
      avards_show_all: false,
      counterAvards: 8,


      exhibitions_array: [],
      exhibitions_btnStatus: false,
      exhibitions_show_all: false,
      counterExhibitions: 8,


      //data user
      user__title_page: '',
      user__description_page: '',
      user__first_name: '',
      user__last_name: '',
      user__counter_work: 0,
      user__photo: '',
      user__emails: [],
      user__phones: [],
      user__socials: [],
      user__origin_country: '',
      user__resident_country: '',
      user__type_accoutn: '',
      
      //data user tab sec
      user__about_biograf: '',

      //data works
      user__works_array: [],
      user__works_array_slider: [],
      user__current_id_work: 0,

      //data works reactions
      user__works_reactions: [],


      fixedArray: [],

      showComponent: false,

      
    }
  },
  methods: {
    //hide about btn
    culcHeightDownAbout(){
      setTimeout(()=>{
          let textContainer = document.querySelector('.about-text-container')
          if(textContainer.offsetHeight > 120){
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

          if(this.avards_array.length > 8){
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

          if(this.exhibitions_array.length > 8){
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
        // this.$store.commit('changeHeaderHideAll', true)

        this.$store.commit('changeBodyOverflow', true)
        document.body.style.overflow = 'hidden';
        this.disableSwiper()


        let block = document.querySelector('.tab_about .tab__wrapper');    
        block.scrollTop
        // Добавляем обработчик события 'wheel' для блока
        block.addEventListener('wheel', function(event) {
            // Отменяем стандартное поведение скролла
            event.preventDefault();

            // Прокручиваем блок
            block.scrollTop += event.deltaY / 4;
        });

        
      }
      else{
        // this.$store.commit('changeHeaderHideAll', false)

        document.body.style.overflow = 'visible';
        this.enableSwiper()
      }
     
    },

    //open avards text 
    avardsActive(){
      this.avards_show_all = !this.avards_show_all

      if(this.avards_show_all == true){
        // this.$store.commit('changeHeaderHideAll', true)
        this.counterAvards = 100
        this.$store.commit('changeBodyOverflow', true)
        document.body.style.overflow = 'hidden';
        this.disableSwiper()


        let block = document.querySelector('.tab_awards .tab__wrapper');    
        block.scrollTop
        // Добавляем обработчик события 'wheel' для блока
        block.addEventListener('wheel', function(event) {
            // Отменяем стандартное поведение скролла
            event.preventDefault();

            // Прокручиваем блок
            block.scrollTop += event.deltaY / 4;
        });

      }
      else{
        // this.$store.commit('changeHeaderHideAll', false)
        this.counterAvards = 8
        document.body.style.overflow = 'visible';
        this.enableSwiper()
      }
    },


    //open exhibitions text 
    exhibitionsActive(){
      this.exhibitions_show_all = !this.exhibitions_show_all

      if(this.exhibitions_show_all == true){
        // this.$store.commit('changeHeaderHideAll', true)
        this.counterExhibitions = 100
        this.$store.commit('changeBodyOverflow', true)
        document.body.style.overflow = 'hidden';
        this.disableSwiper()


        let block = document.querySelector('.tab_exhibitions .tab__wrapper');   
        
        block.scrollTop = 0 
        // Добавляем обработчик события 'wheel' для блока
        block.addEventListener('wheel', function(event) {
            // Отменяем стандартное поведение скролла
            event.preventDefault();

            // Прокручиваем блок
            block.scrollTop += event.deltaY / 4;
        });
      }
      else{
        // this.$store.commit('changeHeaderHideAll', false)
        this.counterExhibitions = 8
        document.body.style.overflow = 'visible';
        this.enableSwiper()
      }
    },

    //load anim first section
    animFirstSlide(){
      this.statusPage = true

      this.show__big_art = true

      setTimeout(()=>{
        this.show__middle_art = true
      }, 700)
      
      setTimeout(()=>{
        this.show__small_art = true
      }, 900)

      setTimeout(()=>{
        this.statusLoading = false
      }, 1700)
      
    },

    //first sec open txt
    openAllBigArt(){
      this.show__all_big_art = !this.show__all_big_art
      this.$store.commit('changeBurgerHideFirstWindowOpen', this.show__all_big_art)

      if(this.show__all_big_art == true){
        this.disableSwiper()
      }
      else{
        this.enableSwiper()
      }
      
     

     

    },

    onSlideChange(data){
      let currentId = data.activeIndex
      this.$store.commit('changeSwipeIndex', currentId)

      if(currentId != 0){
        this.$store.commit('changeHeaderMainStatus', true)
      }
    
      else{
        this.$store.commit('changeHeaderMainStatus', false)
      }


      if(currentId == data.slides.length - 1){
      
        this.$store.commit('changeHeaderHideAll', true)
      }
      else{
        this.$store.commit('changeHeaderHideAll', false)
      }

      
     
    },

    //tab open
    tabChange(e) {
        let parrent = document.querySelector('.tab__container');
        let allTabs = document.querySelectorAll('.tab-element');
        let curruentElement = e.target;
        let currentClassList = curruentElement.classList;

        let children = Array.from(parrent.children);
        let index = children.indexOf(curruentElement);

        if(this.avards_visible && this.exhibitions_visible){
            if (index == 2) {
          
              // Добавляем класс для анимации к первому элементу
              allTabs[0].classList.add('animateBig');
              allTabs[1].classList.add('animateBig');
              allTabs[2].classList.add('animateBig');
  
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
  
  
  
                  firstElement.classList.remove('animateBig');
                  secondElement.classList.remove('animateBig');
                  thirdElement.classList.remove('animateBig');
  
                
              }, 500); // Задержка 0 миллисекунд, чтобы анимация началась сразу
          }
  
          if (index == 1) {
       
  
              // Добавляем класс для анимации к первому элементу
              allTabs[0].classList.add('animateBig1');
              allTabs[1].classList.add('animateBig1');
              allTabs[2].classList.add('animateBig1');
  
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
  
  
  
                  firstElement.classList.remove('animateBig1');
                  secondElement.classList.remove('animateBig1');
                  thirdElement.classList.remove('animateBig1');
  
                
              }, 500); // Задержка 0 миллисекунд, чтобы анимация началась сразу
          }
        }
        else{
          if(index == 1){


            // Добавляем класс для анимации к первому элементу
            allTabs[0].classList.add('animateBig3');
            allTabs[1].classList.add('animateBig3');

            setTimeout(() => {
                const firstElement = allTabs[0];
                const secondElement = allTabs[1];

                // Переупорядочивание элементов
                parrent.removeChild(firstElement);
                parrent.removeChild(secondElement);

                parrent.appendChild(secondElement);
                parrent.appendChild(firstElement);



                firstElement.classList.remove('animateBig3');
                secondElement.classList.remove('animateBig3');

              
            }, 500); // Задержка 0 миллисекунд, чтобы анимация началась сразу
          }
        }

       

    },

    //open popup slider
    openPopupSlider(idNumber, event){
      this.show__slider_popup = true
      this.$store.commit('changeSliderId', idNumber)
      
      
      this.$store.commit('changeHideBurger', true)
      this.$store.commit('changeBodyOverflow', true)
      
      if(this.show__slider_popup_full == false){

      let mainContainer = document.querySelector('.main')
      let parrentElement = event.target.closest('.art-img')
      
      let image = parrentElement.querySelector('.art-img-slide')
      let imageWidth = image.width
      let imageHeight = image.height
      let imgSrc = image.src
      let rect = image.getBoundingClientRect();

      let imgLeft = rect.left
      let imgtop = rect.top

      let newlement = document.createElement("img");

      this.show__slider_popup_full = true

      newlement.classList.add('fixedArtImgBefore')
      newlement.src = imgSrc
      newlement.style.left = imgLeft + 'px'
      newlement.style.top = imgtop + 'px'
      newlement.width = imageWidth
      newlement.height = imageHeight

      

      parrentElement.classList.add('hideOldImg')

      
      this.$store.commit('changeHeaderMainStatus', true)
      
     
      mainContainer.insertAdjacentElement('afterend', newlement);
      mainContainer.classList.add('main_hide')

      setTimeout(function(){
        let currentImg =  document.querySelector(`.bag-fix-slider__img[data-id="${idNumber}"]`)
        // console.log('___________', currentImg , idNumber)
        let sliderElements = document.querySelectorAll('.poput-art-slider__img')
        // let sliderElementWidth = sliderElements[0].width
        // let sliderElementHeight = sliderElements[0].height

        let sliderElementWidth = currentImg.width
        let sliderElementHeight = currentImg.height

        newlement.width = sliderElementWidth
        newlement.height = sliderElementHeight

 
        
        newlement.style.left = `calc(50% - ${sliderElementWidth/2}px)`
        newlement.style.top = `calc(50% - ${sliderElementHeight/2}px)`
        
       
        

        setTimeout(()=>{
          newlement.style.opacity = '0'
          if(mainContainer != null){
            mainContainer.classList.remove('main_hide')
          }
          
          mainContainer.classList.add('main_hideV2')
          parrentElement.classList.remove('hideOldImg')
        }, 1300)

       
      }, 200)

    }

    //ANALITICA
    this.$store.commit('changeIdCurrentOpenWork', idNumber)
    this.$store.commit('changeArtWorkIdAnal', null)
    this.$store.commit('changeUpdateStatusAnal', true)

    },
    //close popup art
    closePoupArt(data){
      let copyImage = document.querySelector('.fixedArtImgBefore')
      let main = document.querySelector('main')
      let idSwiper = this.$store.state.swipeIndex

      this.$store.commit('changeHideBurger', false)
      this.$store.commit('changeBodyOverflow', false)

      if(idSwiper == null || idSwiper == 0){
        this.$store.commit('changeHeaderMainStatus', data)
      }
      else{
        this.$store.commit('changeHeaderMainStatus', true)
      }

      this.show__slider_popup = data

      
      copyImage.remove()
      main.classList.remove('main_hideV2')
      this.$store.commit('changeSliderId', null)

      setTimeout(()=>{
        this.show__slider_popup_full = false
        
      },700)

      //ANALITICA
      
      let currentId = this.$store.state.idCurrentOpenWork

      this.$store.commit('changeArtWorkIdAnal', currentId)
      this.$store.commit('changeUpdateStatusAnal', true)

  
    },

    //open dop info popup
    openDopArtInfo(data){
      this.dopInfoStatus = data
    },

    //close dop info popup
    closeDopInfoArt(){
      this.dopInfoStatus = false
    },

    //change current slide
    changeIdSlider(){
      let currentIdSwiper = this.$store.state.swiperScrollCurrent

      if(currentIdSwiper == 100){

      }
      else{
        this.slideTo(currentIdSwiper)
      }
    },


    //first sec down scroll arrow
    sideToNextWindow(namData){
      this.$store.commit('changeSwiperScrollCurrent', namData)
      this.slideTo(namData)
    },

  



    //load data user home page
    home__data_user(numberUpdate){
          //load title website
          if(this.$store.state.allDataServer.data.viewingRoomGetWeb.title != null){
              this.user__title_page = this.$store.state.allDataServer.data.viewingRoomGetWeb.title 
          }
          else{
              this.user__title_page = ''
          }

          //load title description
          if(this.$store.state.allDataServer.data.viewingRoomGetWeb.description != null){
              this.user__description_page = this.$store.state.allDataServer.data.viewingRoomGetWeb.description 
          }
          else{
              this.user__description_page = ''
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




          //load type accoutn
          if(this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.profile_type != null &&
             this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.profile_type != '' &&
             this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.profile_type != undefined){

             this.user__type_accoutn = this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.profile_type    
          }
          else{
              this.user__type_accoutn = ''
          }
          

          //load counter work
          if(this.$store.state.allDataServer.data.viewingRoomGetWeb.artworks_data != null){
            this.user__counter_work = this.$store.state.allDataServer.data.viewingRoomGetWeb.artworks_data.length
          }
          

          //load photo
          if(this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.image_data != null &&
          this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.image_data.image_url){
              this.user__photo = this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.image_data.image_url    
          }
          else{
              this.user__photo = require('@/assets/img/no-photo.jpg');
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

          //load user biograf
          if(this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.biography != null){
              this.user__about_biograf = this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.biography    
          }
          else{
              this.user__about_biograf = ''
          }

          //load user works
          if(this.$store.state.allDataServer.data.viewingRoomGetWeb.artworks_data.length > 0 && this.$store.state.allDataServer.data.viewingRoomGetWeb.artworks_data != null){
              this.fixedArray = this.$store.state.allDataServer.data.viewingRoomGetWeb.artworks_data
           
              let counterSlider = this.user__works_array_slider.length
              this.user__works_array = this.$store.state.allDataServer.data.viewingRoomGetWeb.artworks_data
              let transitArray = this.$store.state.allDataServer.data.viewingRoomGetWeb.artworks_data



              for(let h = 0; h < transitArray.length; h++ ){
                let imgsData = transitArray[h].image_data
                if(imgsData != null && imgsData.length > 0){
                  for(let z = 0; z < imgsData.length; z++){
                    if(imgsData[z].image_url == null){
                      imgsData[z].image_url = require('@/assets/img/no-works-img.jpg');
                    }
                    else if(imgsData[z].preview_url == null){
                      imgsData[z].preview_url = require('@/assets/img/no-works-img.jpg');
                    }
                    else if(imgsData[z].image_url == null && imgsData[z].preview_url == null){
                      imgsData[z].image_url = require('@/assets/img/no-works-img.jpg');
                      imgsData[z].preview_url = require('@/assets/img/no-works-img.jpg');
                    }

                  
                  }
                  
                }
                else{
                  transitArray[h].image_data = [
                    {'image_url': require('@/assets/img/no-works-img.jpg'), 'preview_url': require('@/assets/img/no-works-img.jpg')}
                  ]
                
                }
              }

              // Группировка элементов массива x попарно
              for (let i = 0; i < transitArray.length; i += 2) {
               
                
                
               
                let pair = [transitArray[i]];

                // transitArray[i].image_data.image_url = null
                // transitArray[i].image_data.preview_url = null

               

                



                
                // Добавление второго элемента пары, если он существует
                if (i + 1 < transitArray.length) {
                  
                  pair.push(transitArray[i + 1]);
                  
                }

                
                // Добавление пары в массив y
                this.user__works_array_slider.push(pair);
              }

              if(numberUpdate == 1){
                this.user__works_array_slider.splice(-counterSlider);
              }
     
              
          }
          else{
              this.user__works_array = ''
              this.user__works_array_slider = ''
          }


          //load work reactions for works
          if(this.$store.state.allDataServer.data.viewingRoomGetWeb.reactions != null && this.$store.state.allDataServer.data.viewingRoomGetWeb.reactions.length > 0){
              this.user__works_reactions = this.$store.state.allDataServer.data.viewingRoomGetWeb.reactions
          }
          else{
              this.user__works_reactions = []
          }



          //load work exhibitions for works
          if(this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.exhibitions != null &&
          this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.exhibitions != ''){
              this.exhibitions_array = convertJsonToArray(this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.exhibitions)
         
              this.exhibitions_visible = true

          }
          else{
              this.exhibitions_array = []
              this.exhibitions_visible = false
          }

          //load work awars publications for works
          if(this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.publications != null &&
          this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.publications != ''){
              this.avards_array = convertJsonToArray(this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.publications)
            
              this.avards_visible = true
          }
          else{
              this.avards_array = []
              this.avards_visible = false

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

  
      return result
      },



      allStartFunctions(){
          this.home__data_user(0)
          this.culcHeightDownAbout()
          this.culcHeightDownAvards()
          this.culcHeightDownExhibitions()
      },


      firstLoad(){
        let publicStatus = this.$store.state.publickStatus 
        if(publicStatus == false){
          this.showComponent = true

          this.allStartFunctions()
        }
        else if(publicStatus == true){
          if(this.$store.state.userToken){
            this.showComponent = true
            this.allStartFunctions()

            setTimeout(()=>{
                this.animFirstSlide()
            },2500)
          }
          else{
            this.showComponent = false
          }
          
        }

        else{
          this.showComponent = true
          this.allStartFunctions()
        }
        
      },


    
  },


  computed: {
        wachPreloaderStatus() {
            // get data in store
            return this.$store.state.preloaderStatus;
        },

        wachSwiperCurrentId() {
            // get data in store
            return this.$store.state.swiperScrollCurrent;
        },

        watchDataChangeStatus() {
          return this.$store.state.reloadHomePageStatus
        },

        watchPublicDataStatus() {
          return this.$store.state.publicDataUserStatus
        },
    },

    watch: {
        //watch data store and use function if data changed
        wachPreloaderStatus(newValue, oldValue) {
            if (newValue !== oldValue) {
              let publicStatus = this.$store.state.publickStatus 
              if(publicStatus == false){
                this.animFirstSlide()
              }

            }
        },

        wachSwiperCurrentId(newValue, oldValue) {
            if (newValue !== oldValue) {
                this.slideTo(newValue)
            }
        },

        //watch change data status
        watchDataChangeStatus(newValue, oldValue) {
          if (newValue !== oldValue) {
            this.home__data_user(1)
 
          }
        },


        //watch change data status
        watchPublicDataStatus(newValue, oldValue) {
          if(newValue == true){
              this.showComponent = true
              this.allStartFunctions()
              setTimeout(()=>{
                this.animFirstSlide()
              },100)
              
            }
        },
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

      const disableSwiper = () => {
        const swiper = swiperData; // получаем экземпляр swiper
 
        if (!swiper) return; // проверяем наличие экземпляра swiper
        swiper.disable();
      };
  

      const enableSwiper = () => {
        const swiper = swiperData; // получаем экземпляр swiper
    
        if (!swiper) return; // проверяем наличие экземпляра swiper
        swiper.enable();
      };
     
      return {
        onSwiper,
        slideTo,
        disableSwiper,
        enableSwiper,
       
        modules: [EffectCreative, Pagination, Mousewheel],
      };
    },
    mounted() {
      this.firstLoad()
    },
}
</script>
