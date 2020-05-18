<template>
  <div id="home">
    <nav-bar class="home_nav">
      <div slot="center" >购物街</div>
    </nav-bar>
    <tab-control :title="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ref="tabControl1" class="tab-control" v-show="isTabFixed"/><!--isTabFixed在到达吸顶的距离之前是影藏的false 下面有一个判断超过一个值就可以显示-->
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll"
            :pull-up-load="true" @pullingUp="loadMore">   <!--/*下面使用this.$refs=""拿到组件对象*/-->

      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper><!--在子组件写了props 等于是加了一个属性，所以标签内写胆识要加：-->
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :title="['流行','新款','精选']"
                   @tabClick="tabClick"
                   ref="tabControl2"/>
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
  import {debounce} from "common/utils";

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
        tabOffsetTop:0,
        isTabFixed:false,
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
    mounted() {
      //监听item中图片加载//添加防抖函数
      const refresh = debounce(this.$refs.scroll.refresh(),200)
      this.$bus.$on('itemImgLoad',() => {
        refresh();

      })


    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    destroyed() {

    },
    /*activated() {
      this.$refs.scroll.scrollTo(0,this.saveY)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY()
    },*/
    methods:{
      /**
       * 网络请求
       */
      getHomeMultidata(){
        getHomeMultidata().then(res =>{
          //console.log(res);
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
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      //回到顶部
      clicktop(){
        this.$refs.scroll.scrollTo(0,0)

      },
      contentScroll(position){
        //1.判断BackTop是否出现
        this.isShowBackTop = -(position.y) > 1000
        //2.决定tabControl是否吸顶（positiion :fixed）
        this.isTabFixed = (-position.y) > this.tabOffsetTop

      },
      loadMore(){
        //上拉加载更多
        // console.log('loadmore');
        this.getHomeGoods(this.currentType)
        this.$refs.scroll.finishPullUp()//不写这个只能多加载一次 这样写可以一直加载数据
      },
      swiperImageLoad(){
        //获取tabControl的offsetTop
        //所有的组件都有一个属性￥el 用用于获取组件中低端元素

            this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
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

   /*在使用浏览器原生滚动时，为了让导航不跟着一起滚动
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;*/
  }
/*  .tab-control{
    position: sticky;  简单的吸顶效果这样实现
    top: 44px;
    z-index: 9;
  }*/


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
  .tab-control{
    position: relative;
    z-index: 9;
  }
</style>
