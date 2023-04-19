// pages/sheet/detail/detail.js
const app = getApp();
import {
    getSheetInfoById
} from '../../../api/index.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: '',
        navBarHeight: 0,
        sheetList: null,
        listHeight: 0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const id = options.id
        this.setData({
            id,
            navBarHeight: app.globalData.navBarHeight,
            clientHeight:  app.globalData.clientHeight
        })
        this.getSheetInfoByIdData(id)
    },
    onReady() {
        this.getDetailInfoHeight()
    },
    // 网络请求获取歌单信息
    async getSheetInfoByIdData(id) {
        const result = await getSheetInfoById(id)
        if (result.status === 1) {
            result.data.song_info = JSON.parse(result.data.song_info)
            this.setData({
                sheetList: result.data
            })
        }
    },
    getDetailInfoHeight() {
        const query = wx.createSelectorQuery()
        query.select('.sheet-info').boundingClientRect(rect => {
            const infoHeight = rect.height
            const {navBarHeight,clientHeight} = this.data
            this.setData({
                listHeight: clientHeight - navBarHeight - infoHeight
            })
        }).exec()
    }
})