<template>
      <swiper>
        <swiper-item v-for="item in banners">
          <a :href="item.link">
            <img :src="item.image" alt="" @load="imageLoad">
          </a> <!--//要使用数组遍历出的东西就要加：-->
        </swiper-item>
      </swiper>
</template>

<script>
  import {Swiper,SwiperItem} from "components/common/swiper";

  export default {
    name: "HomeSwiper",
    components: {
      Swiper,
      SwiperItem,
    },
    data(){
      return{
        isLoad: false

      }
    },
    props: {
      banners :Array,
      default(){
        return[]
      }
    },

    methods:{
      imageLoad() {
        if(!this.isLoad){
          this.$emit('swiperImageLoad')
          this.isLoad = true;


        }

      },
    }
  }
</script>

<style scoped>

</style>
