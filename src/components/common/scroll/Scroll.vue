<template>
    <div class="wrapper" ref="wrapper">
     <div class="content">
       <slot></slot>           <!-- 设置一个插槽，在home用这个组件就可以替换这个插槽，实现包裹起来-->
     </div>
    </div>
</template>

<script>
  import BScroll from 'better-scroll'
    export default {
        name: "Scroll",
      props:{
        probeType:{
          type: Number,
          default: 0
        },
        pullUpLoad:{
          type:Boolean,
          default: false
        }
      },
      data(){
          return{
            scroll:null
          }
      },
      mounted() {
          //1.创建BSccroll对象
          /*this.scroll = new BScroll(document.querySelector('.wrapper'),{ 这个方法不好 使用下面*/
        this.scroll = new BScroll(this.$refs.wrapper,{
            probeType: this.probeType,
            click:true,
/*
          在第一层div里面的button按钮默认设置为true，第二层div里面的必须要在者设置click为true
*/
            pullUpLoad:this.pullUpLoad,

          })
        //2.监听滚动位置
        if(this.probeType === 2 || this.probeType ===3){
          this.scroll.on('scroll',(position) =>{
            this.$emit('scroll',position)

          })


        //3. 监听上拉事件
          if(this.pullUpLoad){
            this.scroll.on('pullingUp',() =>{
              this.$emit('pullingUp')

            })
          }
        }




      },
      methods: {
          //返回顶部
          scrollTo(x,y,time=500){
            this.scroll && this.scroll.scrollTo(x,y,time)

          },
        //完成加载
        finishPullUp(){
          this.scroll.finishPullUp()

        },
        refresh(){
          this.scroll && this.scroll.refresh();
        },
      /*  getScrollY(){
           return this.scroll ? this.scroll.y : 0
        }*/

      },

    }
</script>

<style scoped>

</style>
