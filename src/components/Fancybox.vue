<template>

  <div ref="container">
   
    <slot></slot>
  </div>
</template>


<script>
import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';

export default {
  props: {
    options: Object,
  },
  methods: {
    
    closeHeader(){
      this.$store.commit('changeHeaderPopupFull', false)
    }
  },
  mounted() {
    

    Fancybox.bind(this.$refs.container, '[data-fancybox]', {
      ...(this.options || {}),

      
    });
    
    
    
  },
  updated() {
    Fancybox.unbind(this.$refs.container);
    Fancybox.close();

    Fancybox.bind(this.$refs.container, '[data-fancybox]', {
      ...(this.options || {} ),
    } 
    
    );

   

    
    
  },
  unmounted() {
    Fancybox.destroy();
    
  },
};
</script>


