# vue-hand-drop（未完结）
这是一个类似于微信视频小窗口拖拽吸附功能，具有左右方向识别并且现在整体吸附轮廓，能够自定义大小和背景图片

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
<vue-hand-drop :options="{}" />
```

## 配置
```
{   
    /**
     * @description 拖拽按钮的宽度
     * @type {Number|String}
     * @default 50
     */
    dragWidth: 50,
    /**
     * @description 拖拽按钮的高度
     * @type {Number|String}
     * @default 40
     */
    dragHeight: 40,
    /**
     * @description 拖拽按钮的透明度
     * @type {Number|String}
     * @default 1
     */
    dragOpacity: 1,
    /**
     * @description 拖拽按钮的left值
     * @type {Number|String}
     * @default 0
     */
    dragLeft: 0,
    /**
     * @description 拖拽按钮的top值
     * @type {Number|String}
     * @default 50
     */
    dragTop: 50
}
```
