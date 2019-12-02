<template>
  <div id="detail">
      <detail-nav-bar />
      <detail-swiper :top-images="topImages" />
  </div>
</template>

<script>
import DetailNavBar from  './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'

import {getDetail} from 'network/detail'

export default {
    name:'Detail',
    components:{
       DetailNavBar,
       DetailSwiper
    },
    data(){
        return{
            iid:null,
            topImages:[],//轮播图数据
        }
    },
    created(){
        //1.保存传入的商品id
        this.iid=this.$route.params.iid
        //2.根据iid请求详情数据
        getDetail(this.iid).then(resp=>{
            console.log(resp)
            //1)获取轮播图数据
            this.topImages=resp.result.itemInfo.topImages
        })
    }
}
</script>

<style>

</style>