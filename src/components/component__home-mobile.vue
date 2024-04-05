<template>
    <main class="main" :class="{'hideSlider': statusLoading, 'show__all_baner-full': show__all_big_art }">
      <div class="page-slider slide-dark-mode">

        <section class="page-slider__slide first-slide" > 
            <div class="container">
    
              <div class="first-slide__content">

                <transition  name="show__big_art">
                  <div v-if="show__big_art" class="first-slide__big-post big-post " >
                  
                    <div class="big-post__wrapper" >

                      <h1 class="big-post__title">
                        {{ user__title_page }}
                      </h1>

                      <p class="big-post__description">
                        {{ user__description_page }}
                      </p>

                        <div class="big-post__btn btnV1 big-post__btn-wrapper" @click="openAllBigArt" :class="{'active-btn-description': show__all_big_art, 'hide-more-btn-sec1': sec1_btn_more_text_status}">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <line x1="12" y1="4.37114e-08" x2="12" y2="24" stroke="#3B465C" stroke-width="2"/>
                              <line x1="4.37114e-08" y1="12" x2="24" y2="12" stroke="#3B465C" stroke-width="2"/>
                            </svg>                    
                        </div>
                    </div>

                  </div>
                </transition>
                
              </div>
            </div>
        </section>


        <transition name="show__work-anim">

          <section  v-if="show__work" class="all-work-container page-slider__slide slide-one-work ">

            <template v-for="item in user__works_array" :key="item">
              <div class="work-sls">
                <div class="container">
                  <div class="art-img slide-one-work__wrapper" >
                  
                    <div  class="slide-one-work__work">
                      <div class="slide-one-work__img-box">

                        <template  v-for="element in user__works_reactions" :key="element">
                          <component__rate_value v-if="item.id == element.artwork_id" :reaction_data="element" />
                        </template>
                        

                        <template v-for="(image, index) in item.image_data" :key="index" >
                          <img v-if="index === 0"
                          :class="{'activArtImage2': isActive, 
                                  'prevArtImage2': isPrev, 
                                  'nextArtImage2': isNext
                                }"
                          :src="image.preview_url" alt="" class="art-img-slide slide-one-work__img" @click="openDopArtInfo(item.id, $event)">
                          
                        </template>
                        
                      </div>
                      
                      <div class="slide-two-work__title-box">
                        <h3 class="art-post__title">{{ item.artwork_title }}</h3>
                          <p class="art-post__price">
                            <component__price :typeValue="item.sale_price.currency" :priceValue="item.sale_price.value" />
                          </p>
                          <template  v-for="element in user__works_reactions" :key="element">
                            <component__comment_value v-if="item.id == element.artwork_id" :reaction_data="element" />
                          </template>
                      </div>
                    </div>
                  
                  </div>
                </div>
              </div>
            </template>
              
          </section>
            
        </transition>
    
          <section class="page-slider__slide slide-footer" :class="{'tab-active-footer-full': about_show_all}" v-if="avards_visible && exhibitions_visible">
            <div class="container">
              <div class="slide-footer__wrapper tab__container">
  
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
                        <li class="tab__list-element" v-if="user__type_accoutn.length > 0 && user__type_accoutn != null">{{user__type_accoutn}}</li>
                        <!-- <li class="tab__list-element">London</li> -->
                        <template v-if="user__type_accoutn == 'Art Collector'">
                          <li class="tab__list-element" v-if=" user__origin_country.length > 1 && user__origin_country != null">{{ user__origin_country }}</li>
                          <!-- <li class="tab__list-element" v-if=" user__resident_country.length > 1 && user__resident_country != null">{{ user__resident_country }}</li> -->
                        </template>

                        <template v-else-if="user__type_accoutn == 'Artist'">
                          <li class="tab__list-element" v-if=" user__origin_country.length > 1 && user__origin_country != null ">{{ user__origin_country }}</li>
                          <li class="tab__list-element" v-if=" user__resident_country.length > 1 && user__resident_country != null ">{{ user__resident_country }}</li>
                        </template>
                      </ul>
                      <div class="tab__description about-text-container">
                        <div class="about-text-container-wrapper">
                          {{ user__about_biograf }}
                        </div>
                        
                      </div>
               
                        <div class="tab__btn btnV1" @click="aboutActive" v-if="about_btnStatus">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <line x1="12" y1="4.37114e-08" x2="12" y2="24" stroke="#3B465C" stroke-width="2"/>
                              <line x1="4.37114e-08" y1="12" x2="24" y2="12" stroke="#3B465C" stroke-width="2"/>
                              </svg>                    
                         </div>

                    </div>
                    <div class="tab__col2" :class="{'change-margin-about': !about_btnStatus}">
                      <div class="tab__photo-wrapper">
                        <img :src="user__photo" alt="" class="tab__photo">
                      </div>
                      <ul class="tab__link">

                        <template v-if="user__phones != null && user__phones != undefined">
                          <div>
                            <template v-for="item in user__phones" :key="item">
                                <li class="tab__link-element">
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
                    <div class="tab__down">
                      This viewing room was created in the <a href="https://artup.app/" target="_blank">ArtUp app</a>.<br>
                      © 2023 Art eService Ltd. Registered in England.<br>
                      ArtUp is a trademark of Art eService Ltd. All rights reserved.
                    </div>
                  </div>
                </div>  
              </div>


              <div  class="tab tab-element tab_awards" @click="tabChange($event)" :class="{'avards-full-text': avards_show_all}">
                <div class="tab__title-tab">Publications</div>
                <div class="tab__wrapper">
                  <div class="tab__anim-wrapper">
                    <h2 class="tab__title">{{ user__first_name }}</h2>
                    <ul class="tab__list">
                      <li class="tab__list-element" v-if="user__type_accoutn.length > 0 && user__type_accoutn != null">{{user__type_accoutn}}</li>
                      <!-- <li class="tab__list-element">London</li> -->
                      <template v-if="user__type_accoutn == 'Art Collector'">
                        <li class="tab__list-element" v-if=" user__origin_country.length > 1 && user__origin_country != null">{{ user__origin_country }}</li>
                        <!-- <li class="tab__list-element" v-if=" user__resident_country.length > 1 && user__resident_country != null">{{ user__resident_country }}</li> -->
                      </template>

                      <template v-else-if="user__type_accoutn == 'Artist'">
                        <li class="tab__list-element" v-if=" user__origin_country.length > 1 && user__origin_country != null ">{{ user__origin_country }}</li>
                        <li class="tab__list-element" v-if=" user__resident_country.length > 1 && user__resident_country != null ">{{ user__resident_country }}</li>
                      </template>
                    </ul>
                    <div class="tab__awards-row">

                      <div class="tab__awards-element" v-for="item in avards_array.slice(0, counterAvards)" :key="item" >
                        <!-- <p class="tab__awards-element-title">{{ item.title }}</p> -->
                        <ul class="tab__list">
                          <li class="tab__list-element">{{ item }}</li>
                          <!-- <li class="tab__list-element">{{ item.subtitle }}</li> -->
                        </ul>
                      </div>
                      

                      <div class="tab__btn-container" v-if="avards_btnStatus" @click="avardsActive">
                        <div class="tab__btn btnV1">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line x1="12" y1="4.37114e-08" x2="12" y2="24" stroke="#3B465C" stroke-width="2"/>
                            <line x1="4.37114e-08" y1="12" x2="24" y2="12" stroke="#3B465C" stroke-width="2"/>
                            </svg>                    
                        </div>
                      </div>

                    </div>
                    <div class="tab__down">
                      This viewing room was created in the <a href="https://artup.app/" target="_blank">ArtUp app</a>.<br>
                      © 2023 Art eService Ltd. Registered in England.<br>
                      ArtUp is a trademark of Art eService Ltd. All rights reserved.
                    </div>
                    </div>
                </div>
              </div>


              <div  class="tab tab-element tab_exhibitions" @click="tabChange($event)"  :class="{'exhibitions-full-text': exhibitions_show_all}">
                <div class="tab__title-tab">Exhibitions</div>
                <div class="tab__wrapper">
                  <div class="tab__anim-wrapper">
                  <h2 class="tab__title">{{ user__first_name }}</h2>
                  <ul class="tab__list">
                    <li class="tab__list-element" v-if="user__type_accoutn.length > 0 && user__type_accoutn != null">{{user__type_accoutn}}</li>
                    <!-- <li class="tab__list-element">London</li> -->
                    <template v-if="user__type_accoutn == 'Art Collector'">
                      <li class="tab__list-element" v-if=" user__origin_country.length > 1 && user__origin_country != null">{{ user__origin_country }}</li>
                      <!-- <li class="tab__list-element" v-if=" user__resident_country.length > 1 && user__resident_country != null">{{ user__resident_country }}</li> -->
                    </template>

                    <template v-else-if="user__type_accoutn == 'Artist'">
                      <li class="tab__list-element" v-if=" user__origin_country.length > 1 && user__origin_country != null ">{{ user__origin_country }}</li>
                      <li class="tab__list-element" v-if=" user__resident_country.length > 1 && user__resident_country != null ">{{ user__resident_country }}</li>
                    </template>
                  </ul>
                  <div class="tab__awards-row">

                    <div class="tab__awards-element" v-for="item in exhibitions_array.slice(0, counterExhibitions)" :key="item" >
                        <!-- <p class="tab__awards-element-title">{{ item.title }}</p> -->
                        <ul class="tab__list">
                          <li class="tab__list-element">{{ item }}</li>
                          <!-- <li class="tab__list-element">{{ item.subtitle }}</li> -->
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

                  <div class="tab__down">
                    This viewing room was created in the <a href="https://artup.app/" target="_blank">ArtUp app</a>.<br>
                    © 2023 Art eService Ltd. Registered in England.<br>
                    ArtUp is a trademark of Art eService Ltd. All rights reserved.
                  </div>
                    
                  </div>
              </div>
              </div>
  
              </div>
            </div>
          </section>


          <section class="page-slider__slide slide-footer" :class="{'tab-active-footer-full': about_show_all, 'two-tabs-about': !avards_visible || !exhibitions_visible}" v-if="!avards_visible || !exhibitions_visible">
            <div class="container">
              <div class="slide-footer__wrapper tab__container">
  
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
                        <li class="tab__list-element" v-if="user__type_accoutn.length > 0 && user__type_accoutn != null">{{user__type_accoutn}}</li>
                        <!-- <li class="tab__list-element">London</li> -->
                        <template v-if="user__type_accoutn == 'Art Collector'">
                          <li class="tab__list-element" v-if=" user__origin_country.length > 1 && user__origin_country != null">{{ user__origin_country }}</li>
                          <!-- <li class="tab__list-element" v-if=" user__resident_country.length > 1 && user__resident_country != null">{{ user__resident_country }}</li> -->
                        </template>

                        <template v-else-if="user__type_accoutn == 'Artist'">
                          <li class="tab__list-element" v-if=" user__origin_country.length > 1 && user__origin_country != null ">{{ user__origin_country }}</li>
                          <li class="tab__list-element" v-if=" user__resident_country.length > 1 && user__resident_country != null ">{{ user__resident_country }}</li>
                        </template>
                      </ul>
                      <div class="tab__description about-text-container">
                        <div class="about-text-container-wrapper">
                          {{ user__about_biograf }}
                        </div>
                        
                      </div>
                  
                        <div class="tab__btn btnV1" @click="aboutActive" v-if="about_btnStatus">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <line x1="12" y1="4.37114e-08" x2="12" y2="24" stroke="#3B465C" stroke-width="2"/>
                              <line x1="4.37114e-08" y1="12" x2="24" y2="12" stroke="#3B465C" stroke-width="2"/>
                              </svg>                    
                         </div>
               
                    </div>
                    <div class="tab__col2" :class="{'change-margin-about': !about_btnStatus}">
                      <div class="tab__photo-wrapper">
                        <img :src="user__photo" alt="" class="tab__photo">
                      </div>
                      <ul class="tab__link">

                        <template v-if="user__phones != null && user__phones != undefined">
                          <div>
                            <template v-for="item in user__phones" :key="item">
                                <li class="tab__link-element">
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
                    <div class="tab__down">
                      This viewing room was created in the <a href="https://artup.app/" target="_blank">ArtUp app</a>.<br>
                      © 2023 Art eService Ltd. Registered in England.<br>
                      ArtUp is a trademark of Art eService Ltd. All rights reserved.
                    </div>
                  </div>
                </div>  
              </div>


              <div  class="tab tab-element tab_awards" @click="tabChange($event)" :class="{'avards-full-text': avards_show_all}" v-if="avards_visible">
                <div class="tab__title-tab">Publications</div>
                <div class="tab__wrapper">
                  <div class="tab__anim-wrapper">
                    <h2 class="tab__title">{{ user__first_name }}</h2>
                    <ul class="tab__list">
                      <li class="tab__list-element" v-if="user__type_accoutn.length > 0 && user__type_accoutn != null">{{user__type_accoutn}}</li>
                      <!-- <li class="tab__list-element">London</li> -->
                      <template v-if="user__type_accoutn == 'Art Collector'">
                        <li class="tab__list-element" v-if=" user__origin_country.length > 1 && user__origin_country != null">{{ user__origin_country }}</li>
                        <!-- <li class="tab__list-element" v-if=" user__resident_country.length > 1 && user__resident_country != null">{{ user__resident_country }}</li> -->
                      </template>

                      <template v-else-if="user__type_accoutn == 'Artist'">
                        <li class="tab__list-element" v-if=" user__origin_country.length > 1 && user__origin_country != null ">{{ user__origin_country }}</li>
                        <li class="tab__list-element" v-if=" user__resident_country.length > 1 && user__resident_country != null ">{{ user__resident_country }}</li>
                      </template>
                    </ul>
                    <div class="tab__awards-row">

                      <div class="tab__awards-element" v-for="item in avards_array.slice(0, counterAvards)" :key="item" >
                        <!-- <p class="tab__awards-element-title">{{ item.title }}</p> -->
                        <ul class="tab__list">
                          <li class="tab__list-element">{{ item }}</li>
                          <!-- <li class="tab__list-element">{{ item.subtitle }}</li> -->
                        </ul>
                      </div>
                      

                      <div class="tab__btn-container" v-if="avards_btnStatus" @click="avardsActive">
                        <div class="tab__btn btnV1">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line x1="12" y1="4.37114e-08" x2="12" y2="24" stroke="#3B465C" stroke-width="2"/>
                            <line x1="4.37114e-08" y1="12" x2="24" y2="12" stroke="#3B465C" stroke-width="2"/>
                            </svg>                    
                        </div>
                      </div>

                    </div>
                    <div class="tab__down">
                      This viewing room was created in the <a href="https://artup.app/" target="_blank">ArtUp app</a>.<br>
                      © 2023 Art eService Ltd. Registered in England.<br>
                      ArtUp is a trademark of Art eService Ltd. All rights reserved.
                    </div>
                    </div>
                </div>
              </div>


              <div  class="tab tab-element tab_exhibitions" @click="tabChange($event)"  :class="{'exhibitions-full-text': exhibitions_show_all}" v-if="exhibitions_visible">
                <div class="tab__title-tab">Exhibitions</div>
                <div class="tab__wrapper">
                  <div class="tab__anim-wrapper">
                  <h2 class="tab__title">{{ user__first_name }}</h2>
                  <ul class="tab__list">
                    <li class="tab__list-element" v-if="user__type_accoutn.length > 0 && user__type_accoutn != null">{{user__type_accoutn}}</li>
                    <!-- <li class="tab__list-element">London</li> -->
                    <template v-if="user__type_accoutn == 'Art Collector'">
                      <li class="tab__list-element" v-if=" user__origin_country.length > 1 && user__origin_country != null">{{ user__origin_country }}</li>
                      <!-- <li class="tab__list-element" v-if=" user__resident_country.length > 1 && user__resident_country != null">{{ user__resident_country }}</li> -->
                    </template>

                    <template v-else-if="user__type_accoutn == 'Artist'">
                      <li class="tab__list-element" v-if=" user__origin_country.length > 1 && user__origin_country != null ">{{ user__origin_country }}</li>
                      <li class="tab__list-element" v-if=" user__resident_country.length > 1 && user__resident_country != null ">{{ user__resident_country }}</li>
                    </template>
                  </ul>
                  <div class="tab__awards-row">

                    <div class="tab__awards-element" v-for="item in exhibitions_array.slice(0, counterExhibitions)" :key="item" >
                        <!-- <p class="tab__awards-element-title">{{ item.title }}</p> -->
                        <ul class="tab__list">
                          <li class="tab__list-element">{{ item }}</li>
                          <!-- <li class="tab__list-element">{{ item.subtitle }}</li> -->
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

                  <div class="tab__down">
                    This viewing room was created in the <a href="https://artup.app/" target="_blank">ArtUp app</a>.<br>
                    © 2023 Art eService Ltd. Registered in England.<br>
                    ArtUp is a trademark of Art eService Ltd. All rights reserved.
                  </div>
                    
                  </div>
              </div>
              </div>
  
              </div>
            </div>
          </section>
          <div class="downl" id="down"></div>

  
      </div>
    </main>
  
    <popup__art_slider :popupStatus="show__slider_popup" @closePopup="closePoupArt" @openDopInfoArt="openDopArtInfo" />
  
    <popup__art_info :openDop="dopInfoStatus" :currentId="user__current_id_work"  @closeDop="closeDopInfoArt"/>


    <div class="popup-simmilat-popup" v-if="similarPop">

      <div class="popup-simmilat-popup__element simmilar-about" v-if="similarAbout">
        <div class="tab__col-photo-mob">
          <div class="tab__photo-wrapper">
            <img :src="user__photo" alt="" class="tab__photo">
          </div>
        </div>
        <div class="tab__col1">
          <h2 class="tab__title">{{ user__first_name }}</h2>
          <ul class="tab__list">
            <li class="tab__list-element" v-if="user__type_accoutn.length > 0 && user__type_accoutn != null">{{user__type_accoutn}}</li>
            <!-- <li class="tab__list-element">London</li> -->
            <template v-if="user__type_accoutn == 'Art Collector'">
              <li class="tab__list-element" v-if=" user__origin_country.length > 1 && user__origin_country != null">{{ user__origin_country }}</li>
              <!-- <li class="tab__list-element" v-if=" user__resident_country.length > 1 && user__resident_country != null">{{ user__resident_country }}</li> -->
            </template>

            <template v-else-if="user__type_accoutn == 'Artist'">
              <li class="tab__list-element" v-if=" user__origin_country.length > 1 && user__origin_country != null ">{{ user__origin_country }}</li>
              <li class="tab__list-element" v-if=" user__resident_country.length > 1 && user__resident_country != null ">{{ user__resident_country }}</li>
            </template>
          </ul>
          <div class="tab__description about-text-container">
            <div class="about-text-container-wrapper">
              {{ user__about_biograf }}
            </div>
          </div>
          
            <div class="tab__btn btnV1" @click="aboutActive" v-if="about_btnStatus">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="12" y1="4.37114e-08" x2="12" y2="24" stroke="#3B465C" stroke-width="2"/>
                  <line x1="4.37114e-08" y1="12" x2="24" y2="12" stroke="#3B465C" stroke-width="2"/>
                  </svg>                    
             </div>
         
        </div>
      </div>


      <div class="popup-simmilat-popup__element simmilar-awards" v-if="similarAwards">
        <div class="tab__wrapper">
        <div class="tab__anim-wrapper">
          <h2 class="tab__title">{{ user__first_name }}</h2>
          <ul class="tab__list">
            <li class="tab__list-element" v-if="user__type_accoutn.length > 0 && user__type_accoutn != null">{{user__type_accoutn}}</li>
            <!-- <li class="tab__list-element">London</li> -->
            <template v-if="user__type_accoutn == 'Art Collector'">
              <li class="tab__list-element" v-if=" user__origin_country.length > 1 && user__origin_country != null">{{ user__origin_country }}</li>
              <!-- <li class="tab__list-element" v-if=" user__resident_country.length > 1 && user__resident_country != null">{{ user__resident_country }}</li> -->
            </template>

            <template v-else-if="user__type_accoutn == 'Artist'">
              <li class="tab__list-element" v-if=" user__origin_country.length > 1 && user__origin_country != null ">{{ user__origin_country }}</li>
              <li class="tab__list-element" v-if=" user__resident_country.length > 1 && user__resident_country != null ">{{ user__resident_country }}</li>
            </template>
          </ul>
          <div class="tab__awards-row">

            <div class="tab__awards-element" v-for="item in avards_array.slice(0, counterAvards)" :key="item" >
              <!-- <p class="tab__awards-element-title">{{ item.title }}</p> -->
              <ul class="tab__list">
                <li class="tab__list-element">{{ item }}</li>
                <!-- <li class="tab__list-element">{{ item.subtitle }}</li> -->
              </ul>
            </div>
          </div>

          <div class="tab__btn-container" v-if="avards_btnStatus" @click="avardsActive">
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


      <div class="popup-simmilat-popup__element simmilar-exhibitions" v-if="similarExhibitions">
        <div class="tab__wrapper">
          <div class="tab__anim-wrapper">
          <h2 class="tab__title">{{ user__first_name }}</h2>
          <ul class="tab__list">
            <li class="tab__list-element" v-if="user__type_accoutn.length > 0 && user__type_accoutn != null">{{user__type_accoutn}}</li>
            <!-- <li class="tab__list-element">London</li> -->
            <template v-if="user__type_accoutn == 'Art Collector'">
              <li class="tab__list-element" v-if=" user__origin_country.length > 1 && user__origin_country != null">{{ user__origin_country }}</li>
              <!-- <li class="tab__list-element" v-if=" user__resident_country.length > 1 && user__resident_country != null">{{ user__resident_country }}</li> -->
            </template>

            <template v-else-if="user__type_accoutn == 'Artist'">
              <li class="tab__list-element" v-if=" user__origin_country.length > 1 && user__origin_country != null ">{{ user__origin_country }}</li>
              <li class="tab__list-element" v-if=" user__resident_country.length > 1 && user__resident_country != null ">{{ user__resident_country }}</li>
            </template>
          </ul>
          <div class="tab__awards-row">

            <div class="tab__awards-element" v-for="item in exhibitions_array.slice(0, counterExhibitions)" :key="item" >
                <!-- <p class="tab__awards-element-title">{{ item.title }}</p> -->
                <ul class="tab__list">
                  <li class="tab__list-element">{{ item }}</li>
                  <!-- <li class="tab__list-element">{{ item.subtitle }}</li> -->
                </ul>
              </div>
            
              
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
   
  </template>
  
  <script>
  // @ is an alias to /src
  import popup__art_slider from '@/components/component__art-popup-slider.vue'
  import popup__art_info from '@/components/component__art-info-mob.vue'
  import component__rate_value from '@/components/component__rate-value.vue'
  import component__comment_value from '@/components/component__comment-value.vue'
  import component__price from '@/components/component__price.vue'
  import component__social from '@/components/component__social.vue'

  //json to list convert plugin
  import { convertJsonToArray } from '@/plugins/plugin__convet-json-to-list.js';
  
  
  export default {
    name: 'HomeViewPc',
    components: {
        popup__art_slider,
        popup__art_info,
        component__rate_value,
        component__comment_value,
        component__price,
        component__social,
    },
    data() {
      return {
        statusLoading: true,
        show__big_art: false,
        show__all_big_art: false,
        show__work: false,
        
        show__slider_popup: false,
        show__slider_popup_full: false,
        
        dopInfoStatus: false,

        sec1_btn_more_text_status: false,
        sec1_title: '',
        sec1_description: ``,


        
        mainHide: false,
        about_text: '',
        about_btnStatus: false,
        about_show_all: false,

        avards_array: [],
        avards_btnStatus: false,
        avards_show_all: false,
        counterAvards: 5,



        exhibitions_array: [],

        exhibitions_array_string: "",
        exhibitions_btnStatus: false,
        exhibitions_show_all: false,
        counterExhibitions: 5,

        
        about_visible: true,
        avards_visible: true,
        exhibitions_visible: true,
        

        similarPop: false,
        similarAbout: false,
        similarAwards: false,
        similarExhibitions: false,


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
        user__current_id_work: 0,

        //data works reactions
        user__works_reactions: [],
      }
    },
    methods: {

      //hide about btn
      culcHeightDownAbout(){
        setTimeout(()=>{
            let textContainer = document.querySelector('.about-text-container')
            if(textContainer.offsetHeight > 128){
                this.about_btnStatus = true
                console.log(textContainer.offsetHeight)
            }
            else{
                this.about_btnStatus = false
                console.log(textContainer.offsetHeight)
            }
        },4000)
      },

      

      //hide avards btn
      culcHeightDownAvards(){
        setTimeout(()=>{

            if(this.avards_array.length > 5){
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

            if(this.exhibitions_array.length > 5){
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
          
          this.$store.commit('changeHeaderHideAll', true)
          this.$store.commit('changeBodyOverflow', true)
      
          // this.mainHide = true
          document.body.style.overflow = 'hidden';
          this.slowScroll()


          setTimeout(()=>{
            this.similarPop = true
            this.similarAbout = true

            setTimeout(()=>{
              const elementToClick = document.querySelector('.popup-simmilat-popup');

              // Симулируйте клик на элементе
              elementToClick.click();
              console.log('ffasd')
            },100)


          },800)    
          
        }
        else{
          const element = document.getElementById('down'); // Получаем элемент с якорем
          if (element) {
            element.scrollIntoView(); // Выполняем мгновенный скролл к элементу
          }

          this.similarPop = false
          this.similarAbout = false

          this.$store.commit('changeHeaderHideAll', false)
          this.$store.commit('changeBodyOverflow', false)
          
          // this.mainHide = false
          document.body.style.overflow = 'visible';

        }
       
      },

      //open avards text 
      avardsActive(){
        this.avards_show_all = !this.avards_show_all

        if(this.avards_show_all == true){
          this.$store.commit('changeHeaderHideAll', true)
          window.scrollTo(0, document.body.scrollHeight);
          this.counterAvards = 100

          this.$store.commit('changeBodyOverflow', true)
          document.body.style.overflow = 'hidden';



          setTimeout(()=>{
            this.similarPop = true
            this.similarAwards = true

            setTimeout(()=>{
              const elementToClick = document.querySelector('.popup-simmilat-popup');

              // Симулируйте клик на элементе
              elementToClick.click();
              console.log('ffasd')
            },100)



          },800)  


        }
        else{

          const element = document.getElementById('down'); // Получаем элемент с якорем
          if (element) {
            element.scrollIntoView(); // Выполняем мгновенный скролл к элементу
          }

          this.similarPop = false
          this.similarAwards = false


          this.$store.commit('changeHeaderHideAll', false)
          this.$store.commit('changeBodyOverflow', false)
          this.counterAvards = 5

          document.body.style.overflow = 'visible';
        }
      },

      
      //open exhibitions text 
      exhibitionsActive(){
        this.exhibitions_show_all = !this.exhibitions_show_all

        if(this.exhibitions_show_all == true){
          this.$store.commit('changeHeaderHideAll', true)
          this.$store.commit('changeBodyOverflow', true)
          this.counterExhibitions = 100

          document.body.style.overflow = 'hidden';
          window.scrollTo(0, document.body.scrollHeight);

          setTimeout(()=>{
            this.similarPop = true
            this.similarExhibitions = true

            setTimeout(()=>{
              const elementToClick = document.querySelector('.popup-simmilat-popup');

              // Симулируйте клик на элементе
              elementToClick.click();
              console.log('ffasd')
            },100)



          },800)  
        }
        else{
          const element = document.getElementById('down'); // Получаем элемент с якорем
          if (element) {
            element.scrollIntoView(); // Выполняем мгновенный скролл к элементу
          }

          this.similarPop = false
          this.similarExhibitions = false


          this.$store.commit('changeHeaderHideAll', false)
          this.$store.commit('changeBodyOverflow', false)
          this.counterExhibitions = 5

          document.body.style.overflow = 'visible';
        }
      },


      //плавный скрол
       slowScroll() {
          function scrollToSmoothly(container, scrollValue, duration) {
              const startTime = performance.now();
              const startScroll = window.pageYOffset;
              const difference = scrollValue - startScroll;

              function step(currentTime) {
                  const elapsedTime = currentTime - startTime;
                  if (elapsedTime < duration) {
                      const ease = easeOutCubic(elapsedTime, 0, 1, duration);
                      container.scrollTop = startScroll + ease * difference;

                      window.scrollTo(0, startScroll + ease * difference);
                      requestAnimationFrame(step);
                  } else {
                    window.scrollTo(0, scrollValue); // Заменить "window.scrollTop" на "window.scrollTo" для прокрутки body.
                  }
              }

              requestAnimationFrame(step);
          }

          function easeOutCubic(t, b, c, d) {
              t /= d;
              t--;
              return c * (t * t * t + 1) + b;
          }

          const heightBox = document.querySelector('.slide-footer');
          const container = document.body; // Используйте "document.body" как контейнер.
          const boxRect = heightBox.getBoundingClientRect();
          const distanceFromBrowserTop = boxRect.top;
          const currentScrollValue = window.pageYOffset
        
          

          const newScrollValue = currentScrollValue + distanceFromBrowserTop;
          const duration = 800; // Длительность анимации (в миллисекундах)

          console.log(currentScrollValue, distanceFromBrowserTop, newScrollValue);
          scrollToSmoothly(container, newScrollValue, duration);
      },


      //first sec text height
      culcHeightFirstSec(){
        setTimeout(()=>{
            let textContainer = document.querySelector('.big-post__description')
            if(textContainer.offsetHeight > 150){
                this.sec1_btn_more_text_status = true
            }
            else{
                this.sec1_btn_more_text_status = false
            }
        },4000)
      },
  
      //load anim first section
      animFirstSlide(){
        this.statusPage = true
        this.show__big_art = true
        this.show__work = true
  
        setTimeout(()=>{
         
        }, 700)
        
  
        setTimeout(()=>{
          this.statusLoading = false
        }, 1700)

      },
  
      
      openAllBigArt(){
        this.show__all_big_art = !this.show__all_big_art
        this.$store.commit('changeHeaderMainStatus', this.show__all_big_art)
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
        console.log(data)
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
              console.log(currentClassList);
              console.log(index);
  
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
              console.log(currentClassList);
              console.log(index);
  
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
              console.log(currentClassList);
              console.log(index);
  
              // Добавляем класс для анимации к первому элементу
              allTabs[0].classList.add('animateBig1');
              allTabs[1].classList.add('animateBig1');
  
              setTimeout(() => {
                  const firstElement = allTabs[0];
                  const secondElement = allTabs[1];
  
                  // Переупорядочивание элементов
                  parrent.removeChild(firstElement);
                  parrent.removeChild(secondElement);
  
                  parrent.appendChild(secondElement);
                  parrent.appendChild(firstElement);
  
  
  
                  firstElement.classList.remove('animateBig1');
                  secondElement.classList.remove('animateBig1');
  
                
              }, 500); // Задержка 0 миллисекунд, чтобы анимация началась сразу
            }
          }
         
  
      },

  
      //open dop info popup
      openDopArtInfo(data){
        this.dopInfoStatus = true
        this.user__current_id_work = data
        console.log(this.user__current_id_work)
      
          this.$store.commit('changeBodyOverflow', true)
          document.body.style.overflow = 'hidden';


          //ANALITICA
      this.$store.commit('changeIdCurrentOpenWork', data)
      this.$store.commit('changeArtWorkIdAnal', null)
      this.$store.commit('changeUpdateStatusAnal', true)
       
      },
  
      //close dop info popup
      closeDopInfoArt(){
        this.dopInfoStatus = false
        this.user__current_id_work = 0
        this.$store.commit('changeBodyOverflow', false)
        document.body.style.overflow = 'visible';

        let currentId = this.$store.state.idCurrentOpenWork
        console.log('_____________',currentId)
        this.$store.commit('changeArtWorkIdAnal', currentId)
        this.$store.commit('changeUpdateStatusAnal', true)
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



      //url convert for social link
      //url convert for social link


        getSocial(alias) {
        let social = this.user__socials.find(
            (el) => el.description && el.description === alias
        )
        console.log('GGG', social)
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

   
        

      //load data user home page
      home__data_user(){
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
            this.user__counter_work = this.$store.state.allDataServer.data.viewingRoomGetWeb.artworks_data.length

            //load photo
            if(this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.image_data != null &&
            this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.image_data.image_url){
                this.user__photo = this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.image_data.image_url    
            }
            else{
              this.user__photo = this.user__photo = require('@/assets/img/no-photo.jpg');
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
            if(this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.origin_country != null){
                this.user__origin_country = this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.origin_country    
            }
            else{
                this.user__origin_country = ''
            }
            
            
            //load country resident
            if(this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.residence_country != null){
                this.user__resident_country = this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.residence_country    
            }
            else{
                this.user__resident_country = ''
            } 


            //load user biograf
            if(this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.biography != null){
                this.user__about_biograf = this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.biography    
            }
            else{
                this.user__about_biograf = ''
            }

            //load user works
            if(this.$store.state.allDataServer.data.viewingRoomGetWeb.artworks_data != null && this.$store.state.allDataServer.data.viewingRoomGetWeb.artworks_data.length > 0){
              let arrayWorks = this.$store.state.allDataServer.data.viewingRoomGetWeb.artworks_data

                    for(let h = 0; h < arrayWorks.length; h++ ){
                      let imgsData = arrayWorks[h].image_data
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
                        arrayWorks[h].image_data = [
                          {'image_url': require('@/assets/img/no-works-img.jpg'), 'preview_url': require('@/assets/img/no-works-img.jpg')}
                        ]
                      
                      }
                    }
                this.user__works_array = arrayWorks
            }
            else{
                this.user__works_array = []
            }


            //load work reactions for works
            if( this.$store.state.allDataServer.data.viewingRoomGetWeb.reactions != null && this.$store.state.allDataServer.data.viewingRoomGetWeb.reactions.length > 0){
                this.user__works_reactions = this.$store.state.allDataServer.data.viewingRoomGetWeb.reactions
            }
            else{
                this.user__works_reactions = []
            }


            //load work exhibitions for works
            if(this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.exhibitions != null &&
            this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.exhibitions != ''){
                this.exhibitions_array = convertJsonToArray(this.$store.state.allDataServer.data.viewingRoomGetWeb.user_data.exhibitions)
                console.log(this.exhibitions_array_string)
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
                console.log(this.exhibitions_array_string)
                this.avards_visible = true
            }
            else{
                this.avards_array = []
                this.avards_visible = false
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
      },
  
      watch: {
          //watch data store and use function if data changed
          wachPreloaderStatus(newValue, oldValue) {
              if (newValue !== oldValue) {
                  this.animFirstSlide()
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
              this.home__data_user()
              console.log('reload______________________')
            }
          }
      },
  
      setup() {

      },
      mounted() {
        this.home__data_user()
        this.culcHeightFirstSec()
        this.culcHeightDownAbout()
        this.culcHeightDownAvards()
        this.culcHeightDownExhibitions()
      },
  }
  </script>
  