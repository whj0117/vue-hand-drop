<img src="./src/assets/images/demo.gif"/>
# vue-hand-drop
这是一个小窗口拖拽吸附功能，按照微信视频小窗口模式模仿的组件，拖拽结束后根据当前位置和父元素大小来计算吸附方向，整体样式开放给开发者，根据插槽自定义样式，通过配置项能够配置拖拽组件的宽、高、left、top位置和透明度。

## 安装
```
npm安装
npm install vue-hand-drop

yarn安装
yarn add vue-hand-drop
```

## 使用
```
全局
import vueHandDrop from 'vue-hand-drop'
Vue.use(vueHandDrop);

局部
import vueHandDrop from 'vue-hand-drop'
components{vueHandDrop};

组件位置
<vue-hand-drop :options="{}">
    <div>自定义样式</div>
</vue-hand-drop>
```

## 配置
```
{   
    /**
    * @description 拖拽按钮的宽度
    * @type {Number<String>}
    * @default 100
    */
    dragWidth: 100,
    /**
    * @description 拖拽按钮的高度
    * @type {Number<String>}
    * @default 100
    */
    dragHeight: 100,
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
    dragTop: 0,
    /**
    * @description 执行动画时间，单位毫秒
    * @type {Number<String>}
    * @default 300
    */
    animationTime:300
}
```
