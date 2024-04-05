<template>
  <component
    v-if="showComponent"
    :is="currentComponent"
  />
</template>

<script>
// @ is an alias to /src
import component__home_page_pc from '@/components/conponent__home-pc.vue'
import component__home_page_ipad from '@/components/component__home-ipad.vue'
import component__home_page_mobile from '@/components/component__home-mobile.vue' 

export default {
  name: 'HomeView',
  components: {
    component__home_page_pc,
    component__home_page_ipad,
    component__home_page_mobile
  },
  data() {
    return {
      prevIsDesktopVersion: window.innerWidth > 1240,
      prevIsIpadVersion: window.innerWidth > 750,
      prevIsIphoneVersion: window.innerWidth > 250,
      isDesktopVersion: window.innerWidth > 1240,
      isIpadVersion: window.innerWidth > 750,
      isIphoneVersion: window.innerWidth > 250,
      timeout: null
    }
  },
  methods: {
    handleResize() {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        const newIsDesktopVersion = window.innerWidth > 1240
        const newIsIpadVersion = window.innerWidth > 750
        const newIsIphoneVersion = window.innerWidth > 250

        if (newIsDesktopVersion !== this.isDesktopVersion || newIsIpadVersion !== this.isIpadVersion || newIsIphoneVersion !== this.isIphoneVersion) {
          this.isDesktopVersion = newIsDesktopVersion
          this.isIpadVersion = newIsIpadVersion
          this.isIphoneVersion = newIsIphoneVersion
          this.reloadPageIfNeeded()
        }
      }, 1000)
    },
    reloadPageIfNeeded() {
      if (this.isDesktopVersion !== this.prevIsDesktopVersion || this.isIpadVersion !== this.prevIsIpadVersion || this.isIphoneVersion !== this.prevIsIphoneVersion) {
        window.location.reload()
      }
    }
  },
  computed: {
    currentComponent() {
      if (this.isDesktopVersion) {
        return 'component__home_page_pc'
      } else if (this.isIpadVersion) {
        return 'component__home_page_ipad'
      } else {
        return 'component__home_page_mobile'
      }
    },
    showComponent() {
      return this.isDesktopVersion || this.isIpadVersion || this.isIphoneVersion
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }
}
</script>
