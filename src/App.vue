<template>
  <div id="app">
    <div class="wrap">
      <div class="box">
        <handDrop :options="{dragWidth:100,dragHeight:200}" @changeBack="changeBack">
          <template v-slot:content>
          </template>
        </handDrop>
      </div>
    </div>
  </div>
</template>
<script>
import handDrop from './component/lib/main.vue'

export default {
  components: {
    handDrop
  },
  methods:{
    changeBack(bool){
      // alert(bool)
    }
  }
}
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

body, html {
  width: 100%;
  height: 100%;
}

#app {
  overflow: hidden;
  width: 100%;
  height: 100%;

  .wrap {
    overflow-y: auto;
    width: 500px;
    height: 300px;
    margin: 0 auto;
    background-color: #09c;

    .box {
      height: 500px;
    }
  }
}
</style>
