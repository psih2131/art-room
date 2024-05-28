<template>
    <div class="work-comment" v-if="reaction_data.comments != null && reaction_data.comments.length > 0 && reaction_data.comments != undefined">
        <template v-for="item in reaction_data.comments" :key="item">
            
            <template v-if="publicStatus == true">
                <p v-if="reaction_data.user_token == TOKEN" class="work-comment__text">{{ cutComment(item) }}</p>    
            </template>

            <template v-else>
                <p class="work-comment__text">{{ cutComment(item) }}</p>    
            </template>
            
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
            TOKEN: this.$store.state.userToken,
            publicStatus: this.$store.state.publicDataUserStatus
        }
    },

    components: {
    
    },

    methods: {
        cutComment(data){
            if(data.length > 170){
                let newComment = data.substring(0, 167);
                return newComment + ' ...'
            }
            else{
                return data
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