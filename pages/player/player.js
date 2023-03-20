// pages/player/player.js
import {
    getSongInfoById
} from "../../api/index.js"
const app = getApp()
Page({
    data: {
        id: '',
        navBarHeight: 0,
        songInfo: null
    },
    // 获取歌曲信息
    async getSongInfoByIdData(id) {
        const result = await getSongInfoById(id)
        const {
            status,
            data,
            message
        } = result
        if (data && data.lyrics) {
            let lyricsArr = data.lyrics.split("\r\n")
            data.lyrics = lyricsArr
        }
        if (status === 1) {
            this.setData({
                songInfo: data
            })
        } else {
            wx.showToast({
                title: message,
                icon: "error"
            })
        }
    },
    onLoad(options) {
        const {
            id
        } = options
        this.setData({
            id,
            navBarHeight: app.globalData.navBarHeight
        })
        this.getSongInfoByIdData(id)
    },
})