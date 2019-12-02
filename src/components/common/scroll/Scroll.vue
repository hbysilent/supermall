<template>
  <div class="wrapper" ref="wrapper">
      <div class="content">
          <slot></slot>
      </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
    data(){
        return{
            scroll:null
        }
    },
    props:{
        probeType:{
            type:Number,
            default:0
        },
        pullUpLoad:{
            type:Boolean,
            default:false
        }
    },
    mounted(){
        //1.创建better-scroll对象BSroll
        this.scroll=new BScroll(this.$refs.wrapper,{
            click:true,
            probeType:this.probeType,
            pullUpLoad:this.pullUpLoad
        })
        //2.监听滚动的位置
        this.scroll.on('scroll',(position)=>{
            // console.log(position)
            this.$emit('scroll',position)//自定义事件，通过$emit()把position传出去
        })
        //3.监听上拉事件
        if(this.pullUpLoad){
            this.scroll.on('pullingUp',()=>{
            // console.log('上拉加载更多')
            this.$emit('pullingUp')
        })
        }
    },
    methods:{
        scrollTo(x,y,time=400){
            this.scroll && this.scroll.scrollTo(x,y,time)
        },
        finishPullUp(){
            this.scroll && this.scroll.finishPullUp()
        },
        refresh(){
            this.scroll && this.scroll.refresh()
        },
        getScrollY(){
            return this.scroll ? this.scroll.y:0
        }
    }
}
</script>

<style>

</style>