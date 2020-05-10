<template>
  <div id="home">
    <nav-bar class="home_nav">
      <div slot="center" >购物街</div>
    </nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll"
            :pull-up-load="true" @pullingUp="loadMore">   <!--/*下面使用this.$refs=""拿到组件对象*/-->

      <home-swiper :banners="banners"></home-swiper><!--在子组件写了props 等于是加了一个属性，所以标签内写胆识要加：-->
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :title="['流行','新款','精选']" class="tab-control" @tabClick="tabClick"></tab-control>
      <goods-list :goods=showGoods></goods-list>

    </scroll>
    <back-top @click.native="clicktop" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  //公共组件
  import NavBar from "components/common/navbar/NavBar";
  import TabControl from  "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/content/backtop/BackTop";
  //home组件
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  //文件
  import {getHomeMultidata,getHomeGoods} from "network/home";

  export default {
    name: "Home",
    components: {
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop,



      HomeSwiper,
      RecommendView,
      FeatureView

    },
    data(){
      return{
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0 ,list :[]},
          'new': {page: 0 ,list :[]},
          'sell': {page: 0 ,list :[]}
        },
        currentType: 'pop',
        isShowBackTop:false,
      }
    },
    created() {
      //请求多个数据
      this.getHomeMultidata();
      //请求商品数据
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');

    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    methods:{
      /**
       * 网络请求
       */
      getHomeMultidata(){
        getHomeMultidata().then(res =>{
          console.log(res);
          this.banners = res.data.banner.list;      //保存数据
          this.recommends = res.data.recommend.list; //通过vue在浏览器的插件 可以看到返回的res对象有很多东西    所以可以取特定的值
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page+1
        getHomeGoods(type,page).then(res =>{
           this.goods[type].list.push(...res.data.list)
           this.goods[type].page += 1
        })


      },
      /**
       * 事件监听
       *
       */
      tabClick(index){
        switch (index) {
          case 0:
            this.currentType = 'pop';
            break
          case 1:
            this.currentType = 'new';
            break
          case 2:
            this.currentType = 'sell';
            break
        }
      },
      clicktop(){
        this.$refs.scroll.scrollTo(0,0)

      },
      contentScroll(position){
        this.isShowBackTop = -(position.y) > 1000

      },
      loadMore(){
        //上拉加载更多
        // console.log('loadmore');
        this.getHomeGoods(this.currentType)
        this.$refs.scroll.finishPullUp()
      },

    }
  }
</script>

<style scoped>
  #home {

  /*padding-top: 40px;*/

    height: 100vh;

  }
  .home_nav{
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
  .tab-control{
    position: sticky;  /*;吸顶*/
    top: 44px;
    z-index: 9;
  }
  .content{
    position: absolute;
    overflow: hidden;
    top: 44px;
    bottom: 49px;
    left: 0px;
    right: 0px;

  }/*
。content{
  height: calc(100% - 93px);
  overflow: hidden;
  margin-top: 44px;

}*/
</style>
