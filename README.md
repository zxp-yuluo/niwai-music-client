# 腻歪音乐
音乐小程序练习

## 启动页

**guidance文件夹**

>使用过渡和小程序动画API完成

**动画API简单使用**

```js
// JS文件
Page({
  data: {
    animationData: {}      // 动画对象
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 创建一个动画实例
	var animation = wx.createAnimation({
      duration: 4000,
      timingFunction: 'ease',
      delay: 1000
    })
    // 调用动画实例的方法
    animation.opacity(0.2).translate(100, 100).step()

    this.setData({
      animationData: animation.export()
    })
  },
})
```

```html
<!--wxml文件-->
<view animation="{{animationData}}">动画API简单使用</view>
```

**图片展示**

| ![](picture\启动页01.png) | ![](picture\启动页02.png) |
| ------------------------- | ------------------------- |

