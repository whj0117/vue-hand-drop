<template>
  <div
    :id="'drag' + timeStamp"
    class="fixed"
    ref="fixedFrame"
    :class="[
      { transitionClass: transitionClassBool },
      isLeft ? 'leftBorderRadius' : 'rightBorderRadius',
    ]"
    :style="{
      width: config.dragWidth + 'px',
      height: config.dragHeight + 'px',
      opacity: config.dragOpacity,
      left: config.dragLeft + 'px',
      top: config.dragTop + 'px'
    }"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "vue-hand-drop",
  data() {
    return {
      //默认配置项
      config: {
        /**
         * @description 拖拽按钮的宽度
         * @type {Number<String>}
         * @default 50
         */
        dragWidth: 50,
        /**
         * @description 拖拽按钮的高度
         * @type {Number<String>}
         * @default 40
         */
        dragHeight: 40,
        /**
         * @description 拖拽按钮的透明度
         * @type {Number<String>}
         * @default 1
         */
        dragOpacity: 1,
        /**
         * @description 拖拽按钮的left值,鼠标抬起还是会根据父级定位
         * @type {Number<String>}
         * @default 0
         */
        dragLeft: 0,
        /**
         * @description 拖拽按钮的top值
         * @type {Number<String>}
         * @default 0
         */
        dragTop: 0
      },
      //父元素left
      parentElementLeft: null,
      //父元素top
      parentElementTop: null,
      //父元素宽度
      parenrElementWidth: null,
      //父元素高度
      parenrElementHeight: null,
      //旋转开关 true---左 false---右
      isLeft: true,
      // 获取当前时间戳做唯一标识
      timeStamp: Date.now(),
      // 当前dom元素
      app: null,
      // 添加过度class
      transitionClassBool: false,
    };
  },
  props: {
    options: {
      type: Object,
      default: () => {},
    },
  },
  mounted() {
    window.addEventListener("resize", this.getDom, true);
    this.setConfig();//合并传参和props
    this.getDom();//根据父元素获取位置
    this.setFun();//拖拽的功能
  },
  methods: {
    setFun() {
      this.app = document.getElementById("drag" + this.timeStamp);
      const box = this.app;
      app.onmousedown = (ev) => {
        var oEvent = ev || window.event;
        console.log(oEvent)
        //求出鼠标和box的位置差值
        var x = oEvent.clientX - box.offsetLeft;
        var y = oEvent.clientY - box.offsetTop;
        document.onmousemove = (ev) => {
          var oEvent = ev || window.event;
          //保证拖拽框一直保持在浏览器窗口内部，不能被拖出的浏览器窗口的范围
          var l = oEvent.clientX - x;
          var t = oEvent.clientY - y;
          if (l < this.parentElementLeft) {
            l = this.parentElementLeft;
          } else if (
            l >
            this.parentElementLeft + this.parenrElementWidth - box.offsetWidth
          ) {
            l =
              this.parentElementLeft +
              this.parenrElementWidth -
              box.offsetWidth;
          }
          if (t < this.parentElementTop) {
            t = this.parentElementTop;
          } else if (
            t >
            this.parentElementTop + this.parenrElementHeight - box.offsetHeight
          ) {
            t =
              this.parentElementTop +
              this.parenrElementHeight -
              box.offsetHeight;
          }
          box.style.left = l + "px";
          box.style.top = t + "px";
           if (
            parseInt(box.style.left) >
            this.parentElementLeft +
              this.parenrElementWidth / 2 -
              this.config.dragWidth / 2
          ){
             this.isLeft = false;
          }else{
            this.isLeft = true;
          }
           this.$emit("moveDrag", {
            isLeft: this.isLeft,
            left: parseInt(box.style.left),
            top: parseInt(box.style.top),
          });
        };
        //鼠标抬起的函数
        document.onmouseup = (ev) => {
          document.onmousemove = null;
          document.onmouseup = null;
          this.transitionClassBool = true;
          setTimeout(() => {
            this.transitionClassBool = false;
          }, 500);
          if (
            parseInt(box.style.left) >
            this.parentElementLeft +
              this.parenrElementWidth / 2 -
              this.config.dragWidth / 2
          ) {
            this.isLeft = false;
            box.style.left =
              this.parentElementLeft +
              this.parenrElementWidth -
              this.config.dragWidth +
              "px";
          } else {
            this.isLeft = true;
            box.style.left = this.parentElementLeft + "px";
          }
          this.$emit("upDrag", {
            isLeft: this.isLeft,
            left: parseInt(box.style.left),
            top: parseInt(box.style.top),
          });
        };
        //火狐浏览器在拖拽空div时会出现bug
        //return false阻止默认事件，解决火狐的bug
        return false;
      };
    },
    setConfig() {
      let options = this.options,
        config = this.config;
      if (options && Object.keys(options).length)
        this.config = { ...config, ...options };
    },
    getDom() {
      //当前元素的父元素
      const dragParent = this.$el.parentNode;
      const config = this.config;
      this.parentElementLeft = this.getOffset(dragParent).left;
      this.parentElementTop = this.getOffset(dragParent).top;
      this.parenrElementWidth = dragParent.offsetWidth;
      this.parenrElementHeight = dragParent.offsetHeight;
      config.dragLeft = config.dragLeft || this.parentElementLeft;
      config.dragTop = config.dragTop || this.parentElementTop + 40;
    },
    getOffset(ele) {
      var obj = {
        top: 0,
        left: 0,
      };
      while (ele !== document.body) {
        //div    定位父级div  wrap  body
        obj.left += ele.offsetLeft + ele.offsetParent.clientLeft;
        obj.top += ele.offsetTop + ele.offsetParent.clientTop;
        ele = ele.offsetParent;
      }
      return obj;
    },
  },
  beforeDestroy() {
    window.removeEventListener("resize", ()=>{}, true);
  },
  watch: {
    options: {
      handler(n, o) {
        this.setConfig();
      },
      deep: true,
    },
  },
};
</script>
<style scoped>
@import "main.scss";
</style>