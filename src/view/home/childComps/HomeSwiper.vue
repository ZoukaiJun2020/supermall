<template>
    <div>
      <swiper>
        <swiper-item v-for="item in banners">
          <a :href="item.link"><img :src="item.image" alt=""></a> <!--//要使用数组遍历出的东西就要加：-->

        </swiper-item>
      </swiper>
    </div>
</template>

<script>
  import {Swiper,SwiperItem} from "components/common/swiper";

  export default {
    name: "HomeSwiper",
    components: {
      Swiper,
      SwiperItem,
    },
    props: {
      banners :Array,
      default(){
        return[]
      }

    }
  }
</script>

<style scoped>

</style>
