<template>
    <div id="detail">
     <detail-nav-bar class="detail-nav"/>
     <scroll class="content" ref="scroll">
       <detail-swiper :topImages="topImages"></detail-swiper>
       <detail-base-info :goods="goods" />
       <detail-shop-info :shop="shop"/>
       <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
       <detail-param-info :param-info="paramInfo"/>
     </scroll>

    </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import Scroll from "components/common/scroll/Scroll";


  import {getDetail,Goods,Shop,GoodsParam} from "network/detail";


  export default {
        name: "Detail",
      components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailParamInfo,
        Scroll,
      },
      data(){
          return{
            iid:null,
            topImages:[],
            goods:{},
            shop:{},
            detailInfo:{},
            detailImage:[],
            paramInfo:{},


          }
      },
      created() {
          //1.保存iid请求详情数据
          this.iid = this.$route.params.iid//获取到iid需要保存下来 就添加一个data 里面有iid保存数据
        //2.根据iid请求详细数据 --->在这里写不好，需要封装 创建detail。js
        getDetail(this.iid).then(res => {
          //1.获取顶部图片轮播数据
          const data = res.result
          this.topImages = data.itemInfo.topImages

          //2.获取商品信息
          this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
          //3.创建店铺信息的对象
          this.shop = new Shop(data.shopInfo)
          //4.获取商品详细信息
          this.detailInfo = data.detailInfo
          //5.获取参数信息
          this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
        })
      },
    methods:{
          imageLoad(){
            this.$refs.scroll.refresh()
          }
    }
  }
</script>

<style scoped>
#detail{
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
  .content{
    height: calc(100% - 44px);
  }
  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
</style>
