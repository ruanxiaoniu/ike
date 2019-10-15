<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { log } from 'util'
export default {
  name: 'App',
  provide(){
     return {
      reload:this.reload
    }
  },
  data() {
    return{
      IsRouterAlive:true
    }
  },
  created(){
    console.log("刷新了吗？")
  },
  methods:{
    reload(){
      this.IsRouterAlive=false,
      this.$nextTick(function(){
        console.log("reload零零零零")
        this.IsRouterAlive=true
      })
    }
  }
}
</script>
