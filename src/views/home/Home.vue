<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore">
      <home-swiper :banners="banners"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control class="tab-control" :titles="['流行','新款','精选']" @tabClick="tabClick"/>
      <goods-list :goods="showGoods" />
    </scroll>
    <back-top @click.native="backTop" v-show="isShowBackTop" />
  </div>
</template>

<script>
  //公共组件
  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'

  //子组件
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'
  
  //方法
  import {getHomeMultidata,getHomeGoods} from "network/home";

  import BScroll from 'better-scroll'


  export default {
    name: "Home",
    components: {
      NavBar,
      TabControl,
      HomeSwiper,
      RecommendView,
      FeatureView,
      GoodsList,
      Scroll,
      BackTop
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]},
        },
        currentType:"pop",
        isShowBackTop:false
      }
    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    
    created() {
      //1.请求多个数据
     this._getHomeMultidata()

      //2.请求所有商品数据
      this._getHomeGoods('pop')
      this._getHomeGoods('new')
      this._getHomeGoods('sell')
     
    },
    mounted(){
      //3.监听item图片加载完成
      this.$bus.$on("itemImageLoad",()=>{
        this.$refs.scroll.refresh()
      })
    },
    methods:{
      /*
      事件监听相关的方法
      */ 
      tabClick(index){
        switch(index){
          case 0:
            this.currentType='pop'
            break
          case 1:
            this.currentType='new'
            break
          case 2:
            this.currentType='sell'
            break
        }
      },
      contentScroll(position){//监听滚动条位置
        this.isShowBackTop=(-position.y)>1000
      },
      //回到顶部
      //在需要监听一个组件的原生事件时，必须给对应的事件加上.native修饰符，才能监听，<back-top @click.native="backTop" />
      backTop(){
        this.$refs.scroll.scrollTo(0,0,500)
      },
      loadMore(){
        this._getHomeGoods(this.currentType)
        //解决上拉卡顿：将重新加载的图片刷新重新计算高度
        this.$refs.scroll.refresh()
      },
      /*
        网络请求相关的方法
      */
      _getHomeMultidata(){
        getHomeMultidata().then(res => {
        // this.result = res;
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
        })
      },
      _getHomeGoods(type){
        const page=this.goods[type].page+1
        getHomeGoods(type,page).then(resp=>{
          // this.goods[type].list=resp.data.list   不能直接赋值，后面请求的数据会把之前的覆盖掉
          const newList = resp.data.list
          this.goods[type].list.push(...newList)
          this.goods[type].page+=1

          this.$refs.scroll.finishPullUp()
        })
      },
        
    }
  }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  }

  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  /* .content{
    height: calc(100%-93px);
    overflow: hidden;
    margin-top: 44px;
  } */
</style>
