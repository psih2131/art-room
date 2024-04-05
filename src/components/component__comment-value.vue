<template>
    <div class="work-comment" v-if="reaction_data.comments != null && reaction_data.comments.length > 0 && reaction_data.comments != undefined">
        <template v-for="item in reaction_data.comments" :key="item">
            <p class="work-comment__text">{{ item }}</p>
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

        }
    },

    components: {
    
    },

    methods: {

    },

    computed: {

    },

    watch: {

    },

    mounted(){

    },

}
</script>