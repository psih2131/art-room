import { createStore } from 'vuex'

export default createStore({
  state: {
    linkAleas: '',

    preloaderStatus: true,
    mainHeaderHide: false,
    swipeIndex: null,
    hideBurger: false,
    swiperScrollCurrent: null,
    headerHideAll: false,

    sliderId: null,
    themeDayMode: false,
    burgerHideFirstWindowOpen: false,
    bodyOverflow: false,
    headerPopupFull: false,

    allDataServer: null,
    dataUpdateStatus: false,
    reloadHomePageStatus: false,

    //analitica
    Uid: null,
    artWorkIdAnal: null,
    endAt: null,
    dataUpdateStatusAnal: false,
    closeLogStatus: false,
    idCurrentOpenWork: null,

    //public status
    publickStatus: null,

    //public data user send
    publicDataUserStatus: null,

    //user token
    userToken: null,

    //data for user token
    userTokenData: {
      'name': null,
      'email': null,
      'phone': null,
    },

    //work id for rate anal query
    workAnalTypeReaction: null,


    //close log after 900 sec triger
    closeLogStatusAnal: false,

  },
  getters: {
  },
  mutations: {
    changeUid(state, newValue) {
      state.Uid = newValue
    },

    changeArtWorkIdAnal(state, newValue) {
      state.artWorkIdAnal = newValue
    },

    changeEndAtl(state, newValue) {
      state.endAt = newValue
    },

    changeUpdateStatusAnal(state, newValue) {
      state.dataUpdateStatusAnal = newValue
    },

    changeCloseLogStatus(state, newValue) {
      state.closeLogStatus = newValue
    },

    changeIdCurrentOpenWork(state, newValue) {
      state.idCurrentOpenWork = newValue
    },


    changeLinkAleas(state, newValue) {
      state.linkAleas = newValue
    },

    changePreloader(state, nevValue) {
      state.preloaderStatus = nevValue
    },

    changeHeaderMainStatus(state, newValue) {
      state.mainHeaderHide = newValue
      console.log(newValue)
    },

    changeSwipeIndex(state, newValue) {
      state.swipeIndex = newValue
      console.log(newValue)
    },

    changeHideBurger(state, newValue) {
      state.hideBurger = newValue
      console.log(newValue)
    },

    changeSwiperScrollCurrent(state, newValue) {
      state.swiperScrollCurrent = newValue
      console.log(newValue)
    },


    changeSliderId(state, newValue) {
      state.sliderId = newValue
      console.log(newValue)

    },

    changeThemeDayMode(state, newValue) {
      state.themeDayMode = newValue
      console.log(newValue)

    },

    changeBurgerHideFirstWindowOpen(state, newValue) {
      state.burgerHideFirstWindowOpen = newValue
      console.log(newValue)

    },

    changeHeaderHideAll(state, newValue) {
      state.headerHideAll = newValue
      console.log(newValue)

    },

    changeBodyOverflow(state, newValue) {
      state.bodyOverflow = newValue
      console.log(newValue)

    },

    changeHeaderPopupFull(state, newValue) {
      state.headerPopupFull = newValue
      console.log(newValue)

    },

    changeAllDataServer(state, newValue) {
      state.allDataServer = newValue
      console.log(newValue)

    },

    changeDataUpdateStatus(state, newValue) {
      state.dataUpdateStatus = newValue
      console.log(newValue)
    },


    changeReloadHomePageStatus(state, newValue) {
      state.reloadHomePageStatus = newValue
      console.log(newValue)
    },


    changePublickStatus(state, newValue) {
      state.publickStatus = newValue
      console.log(newValue)
    },


    changePublicDataUserStatus(state, newValue) {
      state.publicDataUserStatus = newValue
      console.log(newValue)
    },


    changeUserToken(state, newValue) {
      state.userToken = newValue
      console.log(newValue)
    },

    changeUserTokenData(state, newValue) {
      state.userTokenData = newValue
      console.log(newValue)
    },



    changeWorkAnalTypeReaction(state, newValue) {
      state.workAnalTypeReaction = newValue
      console.log(newValue)
    },


    changeCloseLogStatusAnal(state, newValue) {
      state.closeLogStatusAnal = newValue
      console.log(newValue)
    },






  },
  actions: {
  },
  modules: {
  }
})
