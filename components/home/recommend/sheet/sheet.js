// components/home/recommend/sheet/sheet.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        sheetList: {
            type: Array,
            value: []
        }
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
        // 跳转歌单页面
        goSheet() {
            wx.navigateTo({
                url: '/pages/sheet/sheet',
            })
        },
        // 跳转歌单详情页面
        goSheetDetail(e) {
            const id = e.currentTarget.dataset.id
            wx.navigateTo({
                url: '/pages/sheet_detail/sheet_detail?id=' + id,
            })
        }
    },
    lifetimes() {

    }
})