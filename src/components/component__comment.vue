<template>
    
    <div class="popup-work-info__comment" :class="{'hide-comment-after-load': hideComponent, 'open-comment-form': openForm, 'redact-style-comments': editStatus, 'focus-inp': focusStatus}" >
        <div class="btn-comment">
            <div class="btn-comment__btn-wrapper" @click="openCommentForm" @mouseenter="showCommentText" @mouseleave="hideHoverCommentText">
                <svg class="svg-icon-comment" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.33301 13.968C5.33301 8.47067 10.1157 4 15.9997 4C21.8837 4 26.6663 8.47067 26.6663 13.968C26.6663 20.7347 20.4983 25.352 14.6663 28V24C9.12901 23.7253 5.33301 19.328 5.33301 13.968Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span class="btn-store__text">Add a comment</span>
            </div>
           
            <div class="btn-comment__btn-form btn-comment__btn-form-wrapper">
                <div class="btn-comment__inp-container">
                    <textarea :readonly="editStatus" ref="myInput" class="btn-comment__inp" placeholder="Enter comment" v-model="comments"  @input="adjustTextarea($event)"></textarea>
                    <!-- <input :readonly="editStatus" ref="myInput" type="text" class="btn-comment__inp" placeholder="ENTER COMMENT" v-model="comments"> -->
                </div>
                <div class="btn-comment__controls-btn btn-comment__form-content"  :class="{ 'black-icon': editStatus === false && comments !== '' && comments !== null }">
                    <!-- <div class="btn-comment__close-form-new" @click="closeCommentForm">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line x1="29.7817" y1="9.98299" x2="9.9827" y2="29.782" stroke="#1B1D1C" stroke-width="2"/>
                            <line x1="9.98262" y1="10.2187" x2="29.7816" y2="30.0177" stroke="#1B1D1C" stroke-width="2"/>
                        </svg>                            
                    </div> -->
                    <template v-if="editStatus == false">
                        <div v-if="comments != '' && comments != null" class="btn-comment__controls-btn btn-comment__form-close " @click="clearCommentField">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <ellipse cx="15.9999" cy="7.33333" rx="10.6667" ry="3.33333" stroke="#1B1D1C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M26.6528 7.504C26.6528 7.504 25.0743 18.9056 24.3527 24.1194C24.1309 25.7813 22.891 27.1258 21.2525 27.4811C17.785 28.173 14.2149 28.173 10.7474 27.4811C9.10887 27.1257 7.86902 25.7813 7.64729 24.1194C6.92569 18.9057 5.34717 7.50392 5.34717 7.50392" stroke="#1B1D1C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>                                                          
                        </div>
                    </template>
                    
                    <div v-if="editStatus == false" class="btn-comment__controls-btn btn-comment__form-send" @click="commentSend">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.5105 16L7.18628 16" stroke="#A6A6A6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M6.98678 4.8355L26.451 14.5651C26.9946 14.8367 27.338 15.3923 27.338 16C27.338 16.6077 26.9946 17.1632 26.451 17.4348L6.98678 27.1644C6.42276 27.4465 5.74581 27.372 5.25659 26.9741C4.76737 26.5762 4.55662 25.9286 4.71794 25.3189L7.18628 16L4.71794 6.68101C4.55662 6.07137 4.76737 5.42376 5.25659 5.02582C5.74581 4.62788 6.42276 4.55342 6.98678 4.8355Z" stroke="#A6A6A6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>                        
                    </div>
                    <div class="btn-comment__controls-btn btn-comment__edit-field" v-if="editStatus == true" @click="editComments">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M28 16V21.3333C28 25.0152 25.0152 28 21.3333 28L10.6667 28C6.98477 28 4 25.0152 4 21.3333L4 10.6667C4 6.98477 6.98477 4 10.6667 4L16 4" stroke="#1B1D1C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M25.333 10.6667L21.333 6.66675" stroke="#1B1D1C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M10.667 22.6667L21.3337 22.6667" stroke="#1B1D1C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M23.1725 4.82733L15.726 12.274C15.318 12.682 15.0534 13.2114 14.9718 13.7826L14.6803 15.824C14.6221 16.2316 14.7571 16.6431 15.0455 16.937C15.3339 17.2309 15.7427 17.3737 16.1514 17.3232L18.1218 17.0799C18.7115 17.007 19.26 16.7393 19.6803 16.3192L27.171 8.83042C27.7015 8.30006 27.9997 7.58065 27.9997 6.83049C27.9997 6.08033 27.7017 5.36087 27.1713 4.83042L27.1682 4.82733C26.6384 4.29745 25.9197 3.99976 25.1703 3.99976C24.421 3.99976 23.7023 4.29745 23.1725 4.82733Z" stroke="#1B1D1C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>                            
                    </div>
                </div>
                
            </div>
        </div>
    </div>

    <span class="hidden-span-for-calc-stroke" v-if="comments.length > 0">{{comments}}</span>
    <span class="hidden-span-for-calc-stroke" v-else>.</span>

    <!-- <div v-if="commentSendStatus" class="popup-work-info__send-text">
        Your comment is sended
    </div> -->
</template>


<script>


export default {

    props: {
        openDop: Boolean,
        workId: Number,
   
  },
    
    data() {
        return {
            hideComponent: false,
            openForm: false,
            comments: "",
            commentSendStatus: false,
            editStatus: false,
            focusStatus: false,
            lineCount: '',
        }
    },

    components: {
    
    },


    methods: {

        hideCommentText(){
           setTimeout(()=>{
            this.hideComponent = true
           }, 2500)
        },
        
        showCommentText(){
            this.hideComponent = false
        },

        hideHoverCommentText(){
            this.hideComponent = true
        },

        openCommentForm(){
            this.openForm = true
            this.firstLoadHeight()
        },

        closeCommentForm(){
            this.openForm = false
        },

        clearCommentField(){
            this.comments = "";
            this.firstLoadHeight(false)
            this.commentSend();
            this.closeCommentForm();
        },
        
        editComments(){
            this.editStatus = false;
            this.$refs.myInput.focus();
        },

        textareaStrokeCalc(){
            let spanElement = document.querySelector('.hidden-span-for-calc-stroke')
            let spanHeight = spanElement.scrollHeight
            let counterStrokeValue = spanHeight / 30
            return counterStrokeValue;
        },



        adjustTextarea(event) {
            let strokeValue = this.textareaStrokeCalc()

            // Create a media condition that targets viewports at least 768px wide
            const mediaQuery = window.matchMedia('(max-width: 750px)')

            // Check if the media query is true
            if (mediaQuery.matches) {
            // Then trigger an alert
            let textarea = event.target
            console.log(event)
            textarea.style.height = 'auto';
            textarea.style.height = (textarea.scrollHeight) + 'px';
            let currentAllHeight = textarea.scrollHeight + 15
            let wrapperCommnet = document.querySelector('.btn-comment')

            


                if(strokeValue == 1){
                    textarea.style.height = 'auto';
                    wrapperCommnet.style.height = 62 + 'px'
                }
                else{
                    textarea.style.height = (textarea.scrollHeight) + 'px';
                    wrapperCommnet.style.height = currentAllHeight + 15 + 'px'
                }
            }
            else{

                if(strokeValue == 1){
                    let textarea = event.target
                    textarea.style.height = 'auto';
                    textarea.style.height = 54 + 'px';
                    
                    let wrapperCommnet = document.querySelector('.btn-comment')
                    wrapperCommnet.style.height = 72 + 'px'
                }
                else{
                    let textarea = event.target
        
                    textarea.style.height = 'auto';
                    textarea.style.height = (textarea.scrollHeight) + 'px';
                    let currentAllHeight = textarea.scrollHeight + 31
                    let wrapperCommnet = document.querySelector('.btn-comment')

                    wrapperCommnet.style.height = currentAllHeight - 2 + 'px'
                }
                
            }
       
            
        },

        firstLoadHeight(value){
            let strokeValue = this.textareaStrokeCalc()

            // Create a media condition that targets viewports at least 768px wide
            const mediaQuery = window.matchMedia('(max-width: 750px)')

            // Check if the media query is true
            if (mediaQuery.matches) {
                let textarea = document.querySelector('.btn-comment__inp')
            let wrapperCommnet = document.querySelector('.btn-comment')
            if(value == false){
                textarea.style.height = 'auto';
                    wrapperCommnet.style.height = 62 + 'px'
            }
            else{

                if(strokeValue == 1){
                    textarea.style.height = 'auto';
                    wrapperCommnet.style.height = 62 + 'px'
                }
                else if(strokeValue > 1){
                    textarea.style.height = 'auto';
                    textarea.style.height = (textarea.scrollHeight) + 'px';
                    let currentAllHeight = textarea.scrollHeight + 15
                    wrapperCommnet.style.height = currentAllHeight + 'px'
                }
                else{
                    textarea.style.height = 'auto';
                    wrapperCommnet.style.height = 62 + 'px'
                }
                
            }
            }
            else{
                let textarea = document.querySelector('.btn-comment__inp')
            let wrapperCommnet = document.querySelector('.btn-comment')
            if(value == false){
                textarea.style.height = 'auto';
                wrapperCommnet.style.height =  'auto'
            }
            else{
                if(strokeValue == 1){
                    textarea.style.height = 'auto';
                    textarea.style.height = '54px';
                    wrapperCommnet.style.height = 72 + 'px'
                    
                }
                else{

                    textarea.style.height = 'auto';
                    textarea.style.height = (textarea.scrollHeight) + 'px';
                    let currentAllHeight = textarea.scrollHeight + 31
                    wrapperCommnet.style.height = currentAllHeight + 'px'
                }
                
            }
            }
           
 
        },

        getCommentText(){
            let idWorkOpen = this.workId
            let storeData = this.$store.state.allDataServer.data.viewingRoomGetWeb.reactions
            if(storeData != null){
                for(let i = 0; i < storeData.length; i++){
                if(idWorkOpen == storeData[i].artwork_id){
                    if(storeData[i].comments != null && storeData[i].comments.length > 0 && storeData[i].comments != 'null'){
                        this.comments = storeData[i].comments[0]
                        this.openForm = true
                        this.editStatus = true
                        setTimeout(()=>{
                            this.firstLoadHeight()
                        }, 400)
                    }
                    else{
                        this.comments = ''
                        this.openForm = false
                        this.editStatus = false
                        this.firstLoadHeight(false)
                    }
                }
            }
            }
            
            

           

        },

       

        commentSend(){
            this.SERVER_QUERY_SEND_NEW_COMMENT(this.comments)
        },

        SERVER_QUERY_SEND_NEW_COMMENT(valueRate){
            console.log(valueRate)       

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
                "link_alias": this.$store.state.linkAleas,
                "artwork_id": this.workId,
                "comments": valueRate
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
            // this.commentSendStatus = true
            if(this.comments != null & this.comments.length > 0 && this.comments != ''){
                this.editStatus = true
   
                console.log('edit')
            }
            else{
                this.closeCommentForm()
                this.editStatus = false
      
                console.log('none')
            }
            // alert('done')
        },
        
    },

    computed: {

    },

    watch: {

    },

    mounted(){
        this.hideCommentText()
        this.getCommentText()
       
    },

}
</script>