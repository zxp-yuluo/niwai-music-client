// pages/sheet/index/index.js
const app = getApp()
import {
    getAllSheetList
} from '../../../api/index.js';
Page({
    data: {
        navBarHeight: 0,
        sheetList: []
    },
    // ----------- 网络请求 -----------
    async getAllSheetListData() {
        const result = await getAllSheetList()
        if(result.status === 1) {
            console.log(result);
            this.setData({
                sheetList: result.data
            })
        }
    },
    onLoad(options) {
        this.getAllSheetListData()
        this.setData({
            navBarHeight: app.globalData.navBarHeight
        })
    },
    // 歌单详情
    goDetail(e) {
        const {id} = e.currentTarget.dataset.info
        wx.navigateTo({
          url: '/pages/sheet/detail/detail?id=' + id,
        })
    }
})