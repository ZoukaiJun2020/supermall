<template>
  <div class="wrapper">
    <ul class="content">
      <li>分类标签1</li>
      <li>分类标签2</li>
      <li>分类标签3</li>
      <li>分类标签4</li>
      <li>分类标签5</li>
      <li>分类标签6</li>
      <li>分类标签7</li>
      <li>分类标签8</li>
      <li>分类标签9</li>
      <li>分类标签10</li>
      <li>分类标签11</li>
      <li>分类标签12</li>
      <li>分类标签13</li>
      <li>分类标签14</li>
      <li>分类标签15</li>
      <li>分类标签16</li>
      <li>分类标签17</li>
      <li>分类标签18</li>
      <li>分类标签19</li>
      <li>分类标签20</li>
      <li>分类标签21</li>
      <li>分类标签22</li>
      <li>分类标签23</li>
      <li>分类标签24</li>
      <li>分类标签25</li>
      <li>分类标签26</li>
      <li>分类标签27</li>
      <li>分类标签28</li>
      <li>分类标签29</li>
      <li>分类标签30</li>
      <li>分类标签31</li>
      <li>分类标签32</li>
      <li>分类标签33</li>
      <li>分类标签34</li>
      <li>分类标签35</li>
      <li>分类标签36</li>
      <li>分类标签37</li>
      <li>分类标签38</li>
      <li>分类标签39</li>
      <li>分类标签40</li>
      <li>分类标签41</li>
      <li>分类标签42</li>
      <li>分类标签43</li>
      <li>分类标签44</li>
      <li>分类标签45</li>
      <li>分类标签46</li>
      <li>分类标签47</li>
      <li>分类标签48</li>
      <li>分类标签49</li>
      <li>分类标签50</li>
      <li>分类标签51</li>
      <li>分类标签52</li>
      <li>分类标签53</li>
      <li>分类标签54</li>
      <li>分类标签55</li>
      <li>分类标签56</li>
      <li>分类标签57</li>
      <li>分类标签58</li>
      <li>分类标签59</li>
      <li>分类标签60</li>
      <li>分类标签61</li>
      <li>分类标签62</li>
      <li>分类标签63</li>
      <li>分类标签64</li>
      <li>分类标签65</li>
      <li>分类标签66</li>
      <li>分类标签67</li>
      <li>分类标签68</li>
      <li>分类标签69</li>
      <li>分类标签70</li>
      <li>分类标签71</li>
      <li>分类标签72</li>
      <li>分类标签73</li>
      <li>分类标签74</li>
      <li>分类标签75</li>
      <li>分类标签76</li>
      <li>分类标签77</li>
      <li>分类标签78</li>
      <li>分类标签79</li>
      <li>分类标签80</li>
      <li>分类标签81</li>
      <li>分类标签82</li>
      <li>分类标签83</li>
      <li>分类标签84</li>
      <li>分类标签85</li>
      <li>分类标签86</li>
      <li>分类标签87</li>
      <li>分类标签88</li>
      <li>分类标签89</li>
      <li>分类标签90</li>
      <li>分类标签91</li>
      <li>分类标签92</li>
      <li>分类标签93</li>
      <li>分类标签94</li>
      <li>分类标签95</li>
      <li>分类标签96</li>
      <li>分类标签97</li>
      <li>分类标签98</li>
      <li>分类标签99</li>
      <li>分类标签100</li>
    </ul>
  </div>

</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Category",
    data(){
      return {
        scroll:null,
      }
    },
    created() {
    },
    mounted() {
      this.scroll = new BScroll(document.querySelector('.wrapper'),{
        probeType: 3,
        pullUpLoad:true,
        click:true,

      })//document.querySelector css样式选择器
      this.scroll.on('scroll',(position) =>{
        console.log(position);
      })
      this.scroll.on('pullingUp',() => {
        console.log('上拉加载更多');
      })

    }


  }

</script>

<style scoped>
.wrapper{
  height: 150px;
  overflow-y: scroll;
  background-color: #cccccc;
}
</style>
