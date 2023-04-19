// pages/home/home.js
import {
    getSheetList,
    getSongList
} from '../../api/index';
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        navBarHeight: 0,
        sheetList: [],
        songList: []
    },
    // --------------------- 请求 ---------------------
    async getSheetListData() {
        const result = await getSheetList()
        if (result.status === 1) {
            this.setData({
                sheetList: result.data
            })
        }
    },
    async getSongListData() {
        const result = await getSongList()
        const data = result.data
        const songList = []
        let temList = []
        for (let index = 0; index < data.length; index++) {
            if(temList.length === 3) {
                songList.push(temList)
                temList = []
                temList.push(data[index])
            }else {
                temList.push(data[index])
            }
            if(index === data.length - 1) {
                songList.push(temList)
            }
        }
        if (result.status === 1) {
            this.setData({
                songList: songList
            })
        }
    },
    // --------------------- 请求 ---------------------
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getSheetListData()
        this.getSongListData()
        this.setData({
            navBarHeight: app.globalData.navBarHeight
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        if (typeof this.getTabBar === 'function' &&
            this.getTabBar()) {
            this.getTabBar().setData({
                selected: 0
            })
        }
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})