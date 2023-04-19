// components/sheet/detail/info/info.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        sheetList: {
            type: Object,
            value: null
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        navBarHeight: 0,
        show: false, // page-container
        customStyle: "height: 100%;",
    },
    lifetimes: {
        attached() {
            this.setData({
                navBarHeight: getApp().globalData.navBarHeight
            })
        },
    },
    /**
     * 组件的方法列表
     */
    methods: {
        // 点击描述
        showSheetInfoClick() {
            this.setData({
                show: true
            })
        },
        // 隐藏
        hideSheetInfoClick() {
            this.setData({
                show: false
            })
        },
        // 获取#detail-info的高度
        getDetailInfoHeight() {
            const query = wx.createSelectorQuery()
            query.select('.bg-image-wrap').boundingClientRect(rect => {
                console.log(rect);
            }).exec();
        }
    }
})