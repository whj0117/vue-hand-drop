<template>
  <div id="app">
    <div class="wrap">
      <div class="box">
        <handDrop
            :options="{ dragWidth: 100, dragHeight: 200 }"
            @upDrag="upDrag"
            @moveDrag="upDrag"
          >
            <div style="width:50px;height:50px;background:#f60"></div>
          </handDrop>
      </div>
    </div>
  </div>
</template>
<script>
import handDrop from "./component/lib/main.vue";
export default {
  components: {
    handDrop,
  },
  methods: {
    upDrag(obj) {
      console.log(obj)
    },
  },
};
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
body,
html {
  width: 100%;
  height: 100%;
}
#app {
  overflow: hidden;
  width: 100%;
  height: 100%;
  .wrap {
    position: relative;
    // overflow-y: auto;
    width: 1000px;
    // height: 300px;
    margin: 0 auto;
    background-color: #09c;
    .box {
      height: 500px;
    }
  }
}
</style>