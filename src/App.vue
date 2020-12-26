<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  computed:{
    key(){
      return this.$router.name?this.$router.name+ +new Date():this.$router+ +new Date()
    }
  }
};
</script>

<style lang="less" >
@import url("./style/index");
#app {
  width: 100%;
  height: 100%;
  background-image: url("./image/bg@2x.png");
  background-size: 100%;
  background-repeat: no-repeat;
  margin-top: 75px;
  // overflow: auto;
  position: fixed;
  top: 0;
  left: 0;
  overflow: scroll;
}

</style>