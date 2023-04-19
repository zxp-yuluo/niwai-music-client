// components/sheet/index/navbar/navbar.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        sheetName: {
            type: String,
            value: ''
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        navBarHeight: 0,
        statusBarHeight: 0,
        menuRight: 0,
        menuBotton: 0,
        menuHeight: 0,
        menuWidth: 0,
        contentHeight: 0, // 内容高度  导航栏高度 - 状态栏高度 
    },
    lifetimes: {
        attached() {
            const {
                navBarHeight,
                statusBarHeight,
                menuRight,
                menuBotton,
                menuHeight,
                menuWidth
            } = getApp().globalData
            this.setData({
                navBarHeight,
                statusBarHeight,
                menuRight,
                menuBotton,
                menuHeight,
                menuWidth,
                contentHeight: navBarHeight - statusBarHeight
            })
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        // 返回上一页
        goBack() {
            wx.navigateBack()
        }
    }
})