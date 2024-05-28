<template>
    <li class="tab__link-element" >
        <template v-if="itemData.description == 'instagram'">
          <a target="_blank" :href="getSocialLink(itemData.description, itemData)" class="tab__link-text">
              <div class="header-meny__icon-wrapper">
                  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M7.496 3.23999H16.505C18.987 3.23999 21 5.25199 21 7.73599V16.745C21 19.227 18.988 21.24 16.504 21.24H7.496C5.013 21.24 3 19.228 3 16.744V7.73599C3 5.25299 5.012 3.23999 7.496 3.23999V3.23999Z" stroke="#1B1D1C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M16.949 6.95303C16.763 6.95403 16.612 7.10503 16.612 7.29103C16.612 7.47703 16.764 7.62803 16.95 7.62803C17.136 7.62803 17.287 7.47703 17.287 7.29103C17.288 7.10403 17.136 6.95303 16.949 6.95303" stroke="#1B1D1C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M14.5456 9.69443C15.9515 11.1003 15.9515 13.3797 14.5456 14.7856C13.1397 16.1915 10.8603 16.1915 9.45444 14.7856C8.04855 13.3797 8.04855 11.1003 9.45444 9.69443C10.8603 8.28854 13.1397 8.28854 14.5456 9.69443" stroke="#1B1D1C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>                                                        
              </div>
              {{ getLastSegment(getSocialLink(itemData.description, itemData),itemData) }}
          </a>
      </template>

      <template v-else-if="itemData.description == 'facebook'">
          <a target="_blank" :href="getSocialLink(itemData.description, itemData)" class="tab__link-text">
                <div class="header-meny__icon-wrapper">
                  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.68396 11.554H14.315" stroke="#1B1D1C" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round"/>
                      <path d="M14.316 7.69495H13.506C12.249 7.69495 11.229 8.71495 11.229 9.97195V10.7819V16.7849" stroke="#1B1D1C" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M12 22.24C17.5228 22.24 22 17.7628 22 12.24C22 6.71714 17.5228 2.23999 12 2.23999C6.47715 2.23999 2 6.71714 2 12.24C2 17.7628 6.47715 22.24 12 22.24Z" stroke="#1B1D1C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>                                                        
                </div>
                {{ getLastSegment(getSocialLink(itemData.description, itemData),itemData) }}
            </a>
        </template>

        <template v-else-if="itemData.description == 'tikTok'">
          <a target="_blank" :href="getSocialLink(itemData.description, itemData)" class="tab__link-text">
                <div class="header-meny__icon-wrapper">
                  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M7.5 3.23999H16.504C18.987 3.23999 21 5.25299 21 7.73599V16.745C21 19.227 18.987 21.24 16.504 21.24H7.496C5.013 21.24 3 19.227 3 16.744V7.73999C3 5.25499 5.015 3.23999 7.5 3.23999V3.23999Z" stroke="#1B1D1C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M14.4487 7.23999H12.9459V14.2813C12.9459 14.9755 12.0896 15.7689 11.2509 15.7689C10.4819 15.7689 9.57335 15.24 9.57335 14.2813C9.5504 13.2069 10.2198 12.6449 11.3557 12.645V11.1574C9.34579 11.1573 7.9657 12.5788 8.00065 14.2813C8.0356 15.9838 9.50385 17.24 11.2509 17.24C12.998 17.24 14.4487 15.7193 14.4487 14.397V10.0499C15.0603 10.9425 16.336 11.3392 17 11.2565V9.60363C15.5846 9.68627 14.4487 7.9342 14.4487 7.23999Z" fill="#1B1D1C"/>
                  </svg>                                                            
                </div>
                {{ getLastSegment(getSocialLink(itemData.description, itemData),itemData) }}
            </a>
        </template>

        <template v-else-if="itemData.description == 'youTube'">
          <a target="_blank" :href="getSocialLink(itemData.description, itemData)" class="tab__link-text">
                <div class="header-meny__icon-wrapper">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M21.583 6.37299C21.354 5.36899 20.676 4.57699 19.814 4.30499C18.255 3.81799 12 3.81799 12 3.81799C12 3.81799 5.748 3.81799 4.186 4.30499C3.327 4.57299 2.649 5.36499 2.417 6.37299C2 8.19499 2 12 2 12C2 12 2 15.805 2.417 17.627C2.646 18.631 3.324 19.423 4.186 19.695C5.748 20.182 12 20.182 12 20.182C12 20.182 18.255 20.182 19.814 19.695C20.673 19.427 21.351 18.635 21.583 17.627C22 15.805 22 12 22 12C22 12 22 8.19499 21.583 6.37299Z" stroke="#1B1D1C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M10.002 15L15.198 12L10.002 9V15Z" stroke="#1B1D1C" stroke-width="1.5" stroke-linecap="round"/>
                  </svg>                                                                                                                    
                </div>
                {{ getLastSegment(getSocialLink(itemData.description, itemData),itemData) }}
            </a>
        </template>

        <template v-else-if="itemData.type == 'web'">
          <a target="_blank" :href="getSocialLink(itemData.description, itemData)" class="tab__link-text web-link">{{ getLastSegment(getSocialLink(itemData.description, itemData), itemData) }}</a>
      </template>

      <template v-else>
          <a target="_blank" :href="getSocialLink(itemData.description, itemData)" class="tab__link-text">{{ itemData.value }}</a>
      </template>
      </li>
</template>

<script>
export default {

    props: {
        itemData: Object,

    },
    
    data() {
        return {

        }
    },

    components: {
    
    },

    methods: {
            //url convert for social link
      getSocialLink(alias, allLinkData) {
        let linkValue = allLinkData.value
        let typeLink = allLinkData.type
        let typeSoial = allLinkData.description
        let searchString = "https://";

        if(typeLink == 'web'){
            if(linkValue.includes(searchString)){
                return linkValue
            }
            else if( !linkValue.includes("://")){
                return 'https://' + linkValue
            }
            else{
                return linkValue
            }
        }
        else if(typeLink == 'social'){

            //facebook
            if(typeSoial == 'facebook'){
                let facebookUrl = 'facebook.com'

                if(linkValue.includes(facebookUrl)){
                    return linkValue
                }
                else{
                    return 'https://www.facebook.com/'
                }  
            }
            else if(typeSoial == 'instagram'){
                let instagramUrl = 'instagram.com'

                if(linkValue.includes(instagramUrl)){
                    return linkValue
                }
                else{
                    return 'https://instagram.com'
                } 
            }
            else if(typeSoial == 'youTube'){
                let yotubeUrl1 = 'youtube.com'
                let yotubeUrl2 = '@'

                if(linkValue.includes(yotubeUrl1)){
                    return linkValue
                }
                else if(!linkValue.includes(yotubeUrl1) && linkValue.includes(yotubeUrl2)){
                    return 'https://www.youtube.com/'+linkValue
                }
                else if(!linkValue.includes(yotubeUrl1) && !linkValue.includes(yotubeUrl2) && !linkValue.includes('.com') && !linkValue.includes('/') && !linkValue.includes('.')){
                    return 'https://www.youtube.com/@'+linkValue
                }
                else{
                    return 'https://www.youtube.com/'
                } 
            }
            else if(typeSoial == 'tikTok'){
                let tikTokUrl1 = 'tiktok.com'
                let tikTokUrl2 = '@'

                if(linkValue.includes(tikTokUrl1)){
                    return linkValue
                }
                else if(!linkValue.includes(tikTokUrl1) && linkValue.includes(tikTokUrl2)){
                    return 'https://www.tiktok.com/'+linkValue
                }
                else if(!linkValue.includes(tikTokUrl1) && !linkValue.includes(tikTokUrl2) && !linkValue.includes('.com') && !linkValue.includes('/') && !linkValue.includes('.')){
                    return 'https://www.tiktok.com/@'+linkValue
                }
                else{
                    return 'https://www.tiktok.com/@'
                }
            }
        }
        else{
            return ''
        }
        
        },

        

        getLastSegment(url, allData) {

            let typeLink = allData.type
            if(typeLink == 'web'){
                if(url.length > 30){
                    let newUrl = url.substring(0, 29);
                    return newUrl + '...'
                }
                else{
                    return url
                }
            }
            else{
                if(url.includes('instagram.com')){
                    return 'Instagram'
                }

                else if(url.includes('facebook.com')){
                    return 'Facebook'
                }

                else if(url.includes('youtube.com')){
                    return 'YouTube'
                }

                else if(url.includes('tiktok.com/@')){
                    return 'TikTok'
                }
                else{
                    if(url.length > 20){
                        let newUrl = url.substring(0, 19);
                        return newUrl + '...'
                    }
                    else{
                        return url
                    }
                }
            }      
            
        }, 
    },

    computed: {

    },

    watch: {

    },

    mounted(){

    },

}
</script>