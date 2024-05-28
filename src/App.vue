<template>
  <div v-if="appStatus == 1" class="app-container" 
  :class="{ 'day-mode': dayMode, 'night-mode': !dayMode, 'overflowChange': hiddenStatus, 'public-status-false': showContentStatus == false }">

    <preloader v-if="dataLoad == true" />

    <component__publick_user_data  v-if="dataLoad == true && publicStatus == true && showContentStatus == false" />

    <headerComponents v-if="dataLoad == true"/>

    <router-view v-if="dataLoad == true" />

  </div>

  <div v-else-if="appStatus == 0" class="app-container no-load-app">
      <component__app_no_load />
  </div>

  <div v-else-if="appStatus == 2" class="app-container no-load-app no-longer-active">
    <component__app_no_active />
  </div>

  <div v-else-if="appStatus == 3 || $route.path != 'home' || $route.path != '/'" class="app-container eror-404">
    <!-- <component__app_no_active /> -->
    <component__eror404 />
  </div>

  <div v-else class="app-container eror-404">
    <!-- <component__app_no_active /> -->
    
  </div>

</template>

<script>
// import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'

import preloader from '@/components/component__preloader.vue'
import component__publick_user_data from '@/components/component__public-data-user.vue'

import headerComponents from '@/components/component__header.vue'
import component__app_no_load from '@/components/component__app-no-load.vue'
import component__app_no_active from '@/components/component__no-active.vue'
import component__eror404 from '@/components/conponent__eror404.vue'

export default {
  name: 'art-room',
  components: {
    preloader,
    component__publick_user_data,
    headerComponents,
    component__app_no_load,
    component__app_no_active,
    component__eror404,
  },
  data() {
    return {
      dayMode: this.$store.state.themeDayMode,
      hiddenStatus: false,
      dataLoad: false,
      appStatus: null,// 0 , 1, 2 , 3
      publicStatus: null,
      showContentStatus: null,
      lastExecutionTime: 0,
    }
  },
  methods: {
    changeThemeStatus() {
      this.dayMode = this.$store.state.themeDayMode
    },

    changeHiddenOverflow() {
      this.hiddenStatus = this.$store.state.bodyOverflow
    },



    //get url alias
    grafQLserverLoad(){

    // Получаем текущий URL
    let currentUrl = window.location.href;

    // Разбиваем URL на сегменты
    let urlSegments = currentUrl.split('/');

    // Ищем сегмент, следующий сразу за доменным именем
    let targetSegment = urlSegments[3]; // Индекс 3 соответствует сегменту после доменного имени
  
    // Наща переменная с символами
    let myVariable = targetSegment.slice(0, 6);

    if(myVariable != "" && myVariable != null && myVariable.length > 1){
      this.$store.commit('changeLinkAleas', myVariable)
    }
    else{
      this.$store.commit('changeLinkAleas', '1de13b')
      // 1de13b
      // c45427
      // 937011
      // ae3de1
      // 12573d  not work
      // ae3de1
      // e4d147
      // 4eb420
    }
      this.grafQLserver()
    },

    grafQLserver() {
      const url = 'https://ma-artist-api-dev.herokuapp.com/graphql';

      const query = `
      query ViewingRoomGetWeb($linkAlias: String) {
      viewingRoomGetWeb(linkAlias: $linkAlias) {
        artist_data {
          first_name
          biography
          origin_country
          residence_country
          image_data {
            bg_removed_url
            image_url
            preview_url
            system_image_name
            ui_height
            ui_width
            web_url
            aspect_ratio
          }
        }

    user_data {
     
   first_name
      last_name
      phones {
        type
        value
        description
      }
      emails {
        type
        value
        description
      }
      socials {
        type
        value
        description
      }
      biography
      origin_country
      residence_country
      image_data {
        image_url
        preview_url
        web_url
        bg_removed_url
        aspect_ratio
        system_image_name
        ui_width
        ui_height
        crop_state {
          viewFrame {
            x
            y
            width
            height
          }
          angle
          rotationAngle
          straightenAngle
          flipAngle
          imageOrientationRawValue
          scrollViewTransform {
            a
            b
            c
            d
            tx
            ty
          }
          scrollViewCenter {
            x
            y
          }
          scrollViewBounds {
            x
            y
            width
            height
          }
          scrollViewContentOffset {
            x
            y
          }
          scrollViewMinimumZoomScale
          scrollViewMaximumZoomScale
          scrollViewZoomScale
          cropBoxFrame {
            x
            y
            width
            height
          }
          photoTranslation {
            x
            y
          }
          imageViewTransform {
            a
            b
            c
            d
            tx
            ty
          }
          imageViewBoundsSize {
            width
            height
          }
        }
      }
      profile_type
      publications
      exhibitions
    }
    title
    reactions {
      artwork_id
      comments
      reaction
      user_token
    }
    description
    valid_from
    valid_until
    is_archived
    is_suspended
    is_demo
    artworks_data {
      id
      artwork_title
      artist_name
      sale_price {
        currency
        value
      }
      country
      size_params {
        depth_in
        width_in
        height_in
        depth_ft
        width_ft
        height_ft
        depth_cm
        width_cm
        height_cm
        is_inches
      }
      description
      image_data {
        image_url
        preview_url
        web_url
        bg_removed_url
        aspect_ratio
        system_image_name
        ui_width
        ui_height
        crop_state {
          viewFrame {
            x
            y
            width
            height
          }
          angle
          rotationAngle
          straightenAngle
          flipAngle
          imageOrientationRawValue
          scrollViewTransform {
            a
            b
            c
            d
            tx
            ty
          }
          scrollViewCenter {
            x
            y
          }
          scrollViewBounds {
            x
            y
            width
            height
          }
          scrollViewContentOffset {
            x
            y
          }
          scrollViewMinimumZoomScale
          scrollViewMaximumZoomScale
          scrollViewZoomScale
          cropBoxFrame {
            x
            y
            width
            height
          }
          photoTranslation {
            x
            y
          }
          imageViewTransform {
            a
            b
            c
            d
            tx
            ty
          }
          imageViewBoundsSize {
            width
            height
          }
        }
      }
      updated_at
      created_at
      is_demo
      year
      mediums_txt
      styles_txt
      is_framed
      frame_details
      provenance
      exhibition_history
      publication_history
      file_data {
        file_url
        file_name
        file_extension
        file_size
      }
      category
      status
    }
    created_at
    updated_at
    deleted_at
    is_public
  }
    }
      `;

      const variables = {
        linkAlias: this.$store.state.linkAleas,
      };
      

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: query,
          variables: variables,
        }),
      })
        .then((response) => response.json())
        .then((data) => this.dataServerToStore(data))
        .catch((error) => function(){
          this.loadAppStatusFor404()
          console.error('Ошибка:', error)
        });
    },

    dataServerToStore(data){
   



      if( data.data.viewingRoomGetWeb.valid_from != null && data.data.viewingRoomGetWeb.valid_until != null){

        this.publicStatus = data.data.viewingRoomGetWeb.is_public
        this.$store.commit('changePublickStatus', data.data.viewingRoomGetWeb.is_public)

        // if(this.publicStatus == true){
        //   this.showContentStatus = false
        // }
        // else{
        //   this.showContentStatus = true
        // }

        console.log('PUBLIC STAUTS', this.publicStatus)



        this.$store.commit('changeAllDataServer', data)
        this.dataLoad = true
        this.chechLifeTile(data)
        this.$store.commit('changeReloadHomePageStatus', !this.$store.state.reloadHomePageStatus)  


        this.TOCEN_CONTROLLER()

        this.metaDataLoad()
      }
      else{
        this.loadAppStatusFor404()
      }

    },


    //load meta title and meta description
    metaDataLoad(){
      let serverTitle = this.$store.state.allDataServer.data.viewingRoomGetWeb.title
      let serverDescription = this.$store.state.allDataServer.data.viewingRoomGetWeb.description

      console.log(serverTitle,'XXXXXXXXXXX')
      if(serverTitle && serverTitle !=""){
        document.title = serverTitle; // Обновляем заголовок страницы
      }
      
      if(serverDescription && serverDescription != ""){
        const metaDescription = document.querySelector('meta[name="description"]');
        metaDescription.setAttribute('content', serverDescription); // Обновляем описание сайта
      }
      
    },

    //check life time app
    chechLifeTile(data){
      let allDate = data.data
      let appLifeTimeFrom = +allDate.viewingRoomGetWeb.valid_from
      let appLifeTimeUntil = +allDate.viewingRoomGetWeb.valid_until

      let currentDate = new Date();
      let currentLifeTime = Math.floor(currentDate.getTime() / 1000);

      if(currentLifeTime > appLifeTimeFrom && currentLifeTime < appLifeTimeUntil){
        this.appStatus = 1
      }
      else if(currentLifeTime < appLifeTimeFrom){
        this.appStatus = 0
      }
      else if(currentLifeTime > appLifeTimeUntil){
        this.appStatus = 2
      }
      

      // this.appStatus =  1, 2 or 3 for test    
    },

    //404 page load status
    loadAppStatusFor404(){
      this.appStatus = 3
    },

    

    //ANALITICA  START________________________________________ 
    analFunction(){
      let getUid = this.generateSessionUid(10)
      let getCurrentTime = this.getCurrentUnixTimestamp()
      let startAtLocalStorage = localStorage.getItem('start_at')
      let getUidLocalStorage = localStorage.getItem('Uid')
      let timeReloadValue = 900 //15 минут
      let statusPublick = this.$store.state.publickStatus

       //проверка наличия значение в локал строредж и его присвоение если его ранее небыло Uid
       if(!getUidLocalStorage){
          localStorage.setItem('Uid', getUid)
        }
      
      //проверка наличия значение в локал строредж и его присвоение если его ранее небыло start_at
      if(!startAtLocalStorage){
        localStorage.setItem('start_at', getCurrentTime)
      }
      else{

        let typeEvent =this.$store.state.workAnalTypeReaction

        if(typeEvent == null){
          this.$store.commit('changeArtWorkIdAnal', null)
        }
   
  

        if(statusPublick == true){
          this.$store.commit('changeUpdateStatusAnal', true)
        }
        else{
          this.$store.commit('changeUpdateStatusAnal', true)
        }
        // let timeDiferent = +getCurrentTime - +startAtLocalStorage

        // if(timeDiferent > timeReloadValue){
        //   let nevUid = this.generateSessionUid(10)

        //   localStorage.setItem('start_at', getCurrentTime)
        //   localStorage.setItem('Uid', nevUid)
        //   this.$store.commit('changeArtWorkIdAnal', null)
        //   this.$store.commit('changeCloseLogStatus', true)
        //   this.$store.commit('changeUpdateStatusAnal', true)
        // }
        // else{
        //   this.$store.commit('changeCloseLogStatus', false)
        //   this.$store.commit('changeArtWorkIdAnal', null)
        //   this.$store.commit('changeUpdateStatusAnal', true)
        // }
      }
    },

    //генерация альфанумерической строки
    generateSessionUid(length) {
    let charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (var i = 0; i < length; i++) {
      var randomIndex = Math.floor(Math.random() * charset.length);
      result += charset[randomIndex];
    }
    return result;
  },

  //получение времени в формате unicode в текущий момент
  getCurrentUnixTimestamp() {
    return Math.floor(Date.now() / 1000);
  },

  //добовление значения времени в локал сторедж
  addToLocalStorage(key, value) {
    localStorage.setItem(key, value);
  },


  //запрос сервера на обновление аналитики
  SERVER_QUERY_SEND_NEW_ANALITIC(){

      const serverUrl = 'https://ma-artist-api-dev.herokuapp.com/graphql';

      let getCurrentTime = this.getCurrentUnixTimestamp()
      let startAtLocalStorage = localStorage.getItem('start_at')
      

      let linkAlias = this.$store.state.linkAleas;
      let sessionUid = localStorage.getItem('Uid')
      let startAt = localStorage.getItem('start_at')
      let arcWorkId = this.$store.state.artWorkIdAnal
      let endAt = null
      let user_token = this.$store.state.userToken
      let event_type = this.$store.state.workAnalTypeReaction
  
 
      


      let timeDiferent = +getCurrentTime - +startAtLocalStorage


      if(timeDiferent > 900){
        endAt = +startAt + 900

        this.$store.commit('changeCloseLogStatusAnal', true)

        // let nevUid = this.generateSessionUid(10)
        // localStorage.setItem('Uid', nevUid)
        // localStorage.setItem('start_at', getCurrentTime)
      }
      else{
        endAt = this.getCurrentUnixTimestamp()
      }


      // if(this.$store.state.closeLogStatus == true){
      //   endAt = +startAt + 900
      // }
      // else{
      //   endAt = this.getCurrentUnixTimestamp()
      // }
    

      const mutation = `
      mutation Mutation($viewingRoom: OfferReactionLogInput) {
        updateViewingRoomLogWeb(viewing_room: $viewingRoom) {
          success
        }
      }
      `;

      const variables = {
        "viewingRoom": {
            "link_alias": linkAlias,
            "artwork_id": arcWorkId,
            "event_type": event_type,
            "session_uid": sessionUid,
            "start_at": +startAt,
            "end_at": +endAt,
            "user_token": user_token,
        }
      };

      console.log('Anal data',variables)

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
      .then(data => this.sendAnalChange(data))
      .catch(error => this.erorAnalChange(error));
  },

  sendAnalChange(data){

    //сброс переменной отвечающей за реакцию для статистики
    this.$store.commit('changeWorkAnalTypeReaction', null)

    let getCurrentTime = this.getCurrentUnixTimestamp()
    console.log(data.data.updateViewingRoomLogWeb)
      if(data.data.updateViewingRoomLogWeb.success == true){
        this.addToLocalStorage('start_at', getCurrentTime)


        let analLogClose = this.$store.state.closeLogStatusAnal
        if(analLogClose == true){

          let getUid = this.generateSessionUid(10)
          localStorage.setItem('Uid', getUid)


          this.analFunction();
          this.$store.commit('changeCloseLogStatusAnal', false)
        }
      }
    
    
    console.log('send analitic',data)
  },

  erorAnalChange(data){
    console.log(data)
  },




  //TOKEN CONTROLLER
  TOCEN_CONTROLLER(){
    
    let publicStatus = this.$store.state.publickStatus
    //если паблик статус false то просто вызываем аналитику
    if(publicStatus == false){
      this.analFunction()
    }

    //если паблик статус true то получаем с локалсторедж токен
    else if(publicStatus == true){


      //получаем с локалсторедж токен
      let tokenLocalStorage = localStorage.getItem('USER_TOKEN')


      //если токен сушествует
      if(tokenLocalStorage){
        //помещаем токен с локал стореджа в vuex в переменную токена
        this.$store.commit('changeUserToken', tokenLocalStorage)

        //отображаем весь скрытый конетен
        this.showContentStatus = true


        this.$store.commit('changePublicDataUserStatus', true)

        console.log('token from local storage:  ', tokenLocalStorage)
        
        // this.analFunction()
       
      }

      //если токен ещен е создан то ничего не делаем и скрываем весь контент
      else{
        this.showContentStatus = false
      }
    }
    else{
  
    }
  }


  },
  computed: {
    watchThemeModeStatus() {
      return this.$store.state.themeDayMode
    },

    watchHiddenOverflow() {
      return this.$store.state.bodyOverflow
    },

    watchDataChangeStatus() {
      return this.$store.state.dataUpdateStatus
    },

    watchAnalUpdate() {
      return this.$store.state.dataUpdateStatusAnal
    },


    watchPublicDataStatus() {
      return this.$store.state.publicDataUserStatus
    },




    
  },
  watch: {
    //watch theme status
    watchThemeModeStatus(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.changeThemeStatus()
      }
    },

    //watch overflow status
    watchHiddenOverflow(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.changeHiddenOverflow()
      }
    },

    //watch change data status
    watchDataChangeStatus(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.grafQLserverLoad()
        
      }
    },

    //watch change data status
    watchAnalUpdate(newValue, oldValue) {
      if (newValue !== oldValue) {

        if(newValue == true){

          this.SERVER_QUERY_SEND_NEW_ANALITIC()
          this.$store.commit('changeUpdateStatusAnal', false)
         
         
        }

      }
    },

    //watch change data status
    watchPublicDataStatus(newValue, oldValue) {
      if (newValue !== oldValue) {

        if(newValue == true){
          this.showContentStatus = true
          this.analFunction()
        }

      }
    },
  },

  mounted() {
    // this.analFunction()
    this.grafQLserverLoad()
    

    
    
    console.log('app status', this.appStatus)
  },
}
</script>



