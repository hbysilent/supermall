import {debounce} from './utils'

//两个组件之间想要复用代码可以利用混入【mixin】

export const itemListenerMixin={
    data(){
        return {
            itemImageLister:null
        }
    },
    mounted(){
       // 1.图片加载完成的事件监听  debounce防抖动
      const refresh = debounce(this.$refs.scroll.refresh, 50)
      //2.对监听的事件进行保存
      this.itemImageLister= () => { refresh() }
      this.$bus.$on('itemImageLoad',this.itemImageLister)
    }
}