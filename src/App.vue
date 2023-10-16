<template>
  <div id="app">
    <Home/>
  </div>
</template>

<script>
import VConsole from "vconsole"
import Home from "./views/Home"
export default {
  name: 'App',
  methods: {
    dev() {
      if (process.env.NODE_ENV === "development") {
        new VConsole()
      }
    }
  },
  created(){
    this.dev()
  },
  components: {
    Home
  }
}
</script>

<style lang="less">
</style>
