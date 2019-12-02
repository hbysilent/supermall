<template>
  <div id="detail">
      <detail-nav-bar />
  </div>
</template>

<script>
import DetailNavBar from  './childComps/DetailNavBar'
export default {
    components:{
       DetailNavBar
    },
    data(){
        return{
            iid:null
        }
    },
    created(){
        console.log(this.$route.params.iid)
        this.iid=this.$route.params.iid
    }
}
</script>

<style>

</style>