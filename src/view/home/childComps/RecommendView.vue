<template>
    <div class="recommend">
      <div v-for="item in recommends" class="recommend-item">
        <a :href="item.link">
          <img :src="item.image" alt="">
          <div>{{item.title}}</div>
        </a>
      </div>

    </div>
</template>

<script>
    export default {
      name: "RecommendView",
      props: {
        recommends: {
          type: Array,
          default() {
            return [];
          }
        }
      }
    }
</script>

<style scoped>
  .recommend{
    display: flex;
    text-align: center;
    font-size: 12px;
    padding: 20px 0px 10px;
    border-bottom: 8px solid#eeeeee;


  }
  .recommend-item{
    flex: 1px;
    margin-bottom: 10px;
  }
  .recommend-item img{
    height: 72px;
    weight: 72px;
  }

</style>
