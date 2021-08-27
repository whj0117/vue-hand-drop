<template>
  <div id="dragFrame">
    <div class="fixed" ref="fixedFrame"
         :class="[{iconStyle:radiusImg},transformBool ? 'rightBorderRadius' : 'leftBorderRadius']"
         @mousedown.stop="mousedown($event)" @touchstart.stop="mousedown($event)" @mouseup.stop="mouseup($event)"
         @touchend.stop="mouseup($event)"
         :style="{width:config.dragWidth+'px',height:config.dragHeight+'px',opacity:config.dragOpacity,left:config.dragLeft + 'px',top:config.dragTop + 'px',transition:bool?'all .3s':'',cursor:radiusImg ?'pointer':'move'}">
      <slot name="content">
        <div style="width: 50px;height: 50px;background-color: #f60"></div>
        <!--        <img src="@assets/images/touchradius.png" alt="">-->
      </slot>
    </div>
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
         * @description 拖拽按钮的left值
         * @type {Number<String>}
         * @default 0
         */
        dragLeft: 0,
        /**
         * @description 拖拽按钮的top值
         * @type {Number<String>}
         * @default 50
         */
        dragTop: 50
      },
      //父元素left
      parentElementLeft: null,
      //父元素top
      parentElementTop: null,
      //父元素宽度
      parenrElementWidth: null,
      //父元素高度
      parenrElementHeight: null,
      //开关过渡
      bool: false,
      //旋转开关 false---左 true---右
      transformBool: false,
      //判断点击还是拖拽
      hasMove: true,
      //拖拽过程变成圆形 true--不是圆形  false--是圆形
      radiusImg: true,
      //当前鼠标点击x位置
      nowClientX: null,
      //当前鼠标点击y位置
      nowClientY: null,
    }
  },
  props: {
    options: {
      type: Object,
      default: () => {
      }
    }
  },
  mounted() {
    this.setConfig();
    window.addEventListener('resize', this.handleResize, true);
    this.getDom();
  },
  methods: {
    setConfig(){
      let options = this.options,
          config = this.config;
      if(options && Object.keys(options).length) this.config = {...config,...options}
    },
    handleResize() {
      this.getDom();
    },
    getDom() {
      //当前元素
      var dragFrame = document.getElementById('dragFrame');
      //当前元素的父元素
      var dragParent = dragFrame.parentNode;
      this.parentElementLeft = this.getOffset(dragParent).left;
      this.parentElementTop = this.getOffset(dragParent).top;
      this.parenrElementWidth = dragParent.offsetWidth
      this.parenrElementHeight = dragParent.offsetHeight
      this.config.dragLeft = this.parentElementLeft;
      this.config.dragTop = this.parentElementTop + 40;
    },
    getOffset(ele) {
      var obj = {
        top: 0,
        left: 0
      };
      while (ele !== document.body) {
        //div    定位父级div  wrap  body
        obj.left += ele.offsetLeft + ele.offsetParent.clientLeft;
        obj.top += ele.offsetTop + ele.offsetParent.clientTop;
        ele = ele.offsetParent;
      }
      return obj;
    },
    mousedown(e) {
      console.log("鼠标按下event", e);
      this.nowClientX = null;
      this.nowClientY = null;
      var that = this;
      var event = e || window.event;
      // console.log(that.$refs['fixedFrame'].clientX)
      var _target = event.target;
      var isParent = _target.className.indexOf('fixed iconStyle') > -1 //说明是点击拖拽最外面
      var ele = document.querySelector('.fixed')
      console.log(ele);
      // if(!isParent){
      //   var ele = document.querySelector('.fixed')
      //   console.log(ele);
      //   ele.onmouseup = function (ev){
      //     event = ev || window.event
      //     console.log(">>>>>>>>>>",event)
      //   }
      // }


      var startx = that.nowClientX = event.clientX;
      var starty = that.nowClientY = event.clientY;
      var sb_bkx = startx - event.target.offsetLeft;
      var sb_bky = starty - event.target.offsetTop;
      var ww = document.documentElement.clientWidth;
      var wh = window.innerHeight;
      that.hasMove = true;
      that.bool = false;
      document.onmousemove = function (ev) {
        // console.log('拖动了');
        var event = ev || window.event;
        var config = that.config;
        //判断是点击还是移动
        that.hasMove = false;
        that.radiusImg = false;
        if (event.clientY < 0 || event.clientX < 0 || event.clientY > wh || event.clientX > ww) {
          return false;
        }

        var endx = event.clientX - sb_bkx;
        var endy = event.clientY - sb_bky;
        // console.log(endy)
        _target.style.left = endx + 'px'
        _target.style.top = endy + 'px'
        //如果超过父元素最右边，元素贴附在最右边
        if (endx - that.parentElementLeft + that.config.dragWidth >= that.parenrElementWidth) {
          _target.style.left = (that.parenrElementWidth + that.parentElementLeft - that.config.dragWidth) + 'px';
        }
        //如果超过父元素最左边，元素贴附在最左边
        if (endx <= that.parentElementLeft) {
          _target.style.left = that.parentElementLeft + 'px';
        }
        //如果超过父元素最上边，元素贴附在最上边
        if (endy - that.parentElementTop + that.dragHeight >= that.parenrElementHeight) {
          _target.style.top = (that.parenrElementHeight + that.parentElementTop - that.dragHeight) + 'px';
        }
        //如果超过父元素最下边，元素贴附在最下边
        if (endy <= that.parentElementTop) {
          _target.style.top = that.parentElementTop + 'px';
        }
        //鼠标过中线就旋转dom
        that.transformBool = endx - that.parentElementLeft + (that.config.dragWidth / 2) > that.parenrElementWidth / 2;
      };
      document.onmouseup = function () {
        document.onmousemove = null;
        that.bool = true;

        if (parseInt(_target.style.left) - that.parentElementLeft + (that.config.dragWidth / 2) > that.parenrElementWidth / 2) {
          _target.style.left = that.parenrElementWidth + that.parentElementLeft - that.config.dragWidth + 'px';
        } else {
          _target.style.left = that.parentElementLeft + 'px';
        }
        that.radiusImg = true;
      };
    },
    mouseup(e) {
      var that = this;
      var event = e || window.event;
      var _target = event.target;
      that.bool = true;
      that.radiusImg = true;
      if (parseInt(_target.style.left) - that.parentElementLeft + (that.config.dragWidth / 2) > that.parenrElementWidth / 2) {
        _target.style.left = that.parenrElementWidth + that.parentElementLeft - that.config.dragWidth + 'px';
      } else {
        _target.style.left = that.parentElementLeft + 'px';
      }
      that.config.dragLeft = _target.style.left;
      document.onmousemove = null;
      document.ontouchmove = null;
      that.$emit('changeBack', that.transformBool)
    },
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize, true);
  },
  watch: {
    options: {
      handler(n, o) {
        this.setConfig()
      },
      deep: true
    }
  }
}
</script>
<style scoped>
@import "main.scss";
</style>
