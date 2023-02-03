// components/custom-nav-bar/custom-nav-bar.js
const app = getApp()
Component({
    options: {
        multipleSlots: true
    },
    /**
     * 组件的属性列表
     */
    properties: {
        backgroundColor: {
            type: String,
            value: '#fff'
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
        contentHeight: 0,  // 内容高度  导航栏高度 - 状态栏高度 
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
            } = app.globalData
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

    }
})