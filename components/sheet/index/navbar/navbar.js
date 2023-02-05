// components/sheet/index/navbar/navbar.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 返回上一页
        goBack() {
            wx.navigateBack()
        },
        // 返回首页
        goHome() {
            wx.switchTab({
              url: '/pages/home/home',
            })
        }
    }
})
