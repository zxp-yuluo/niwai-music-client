// components/player/info/info.js
import {
    playerStore
} from "../../../stores/index"
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        songInfo: {
            type: Object,
            value: null
        },
        lyrics: {
            type: Array,
            value: []
        },
        currentTime: {
            type: Number,
            value: 0
        },
        songTime: {
            type: Number,
            value: 0
        },
        percent: {
            type: Number,
            value: 0
        },
        currentLyricsIndex: {
            type: String,
            value: "0"
        },
        scrollHeight: {
            type: Number,
            value: 0
        },
        isPlay: {
            type: Boolean,
            value: false
        },
        rowHeight: {
            type: Number,
            value: 32
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        playModel: 'default',
        playList: [],
        show: false, // page-container是否显示
        customStyle: "height: 70%;",
        height: 0,
        id: '-1'
    },
    lifetimes: {
        attached() {
            const playModel = wx.getStorageSync('playModel')
            if (playModel) {
                this.setData({
                    playModel
                })
            }
            this.playerStoreListener()
        },
        ready() {
            const query = wx.createSelectorQuery()
            query.select('#container-scroll')
            query.selectViewport().scrollOffset()
            query.exec((res) => {
                this.setData({
                    height: res[0].scrollHeight
                })
            })
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        // 点击播放暂停
        playPauseClick(e) {
            //   const {
            //     tag
            //   } = e.currentTarget.dataset
            const {
                songInfo
            } = this.data
            if (songInfo && songInfo.url) {
                this.triggerEvent("playAndPauseClick")
                return
                switch (tag) {
                    case 'neg':

                        break;
                    case 'play':
                        this.triggerEvent("playAndPauseClick")
                        break;
                    case 'pause':
                        this.triggerEvent("playAndPauseClick")
                        break;
                }
            }
        },
        // 点击进度条
        handleSliderChange(e) {
            const {
                value
            } = e.detail
            // 传给父组件player
            this.triggerEvent("handleSliderChange", {
                value
            })
        },
        // 拖拽进度条滑块
        handleSliderChanging(e) {
            const {
                value
            } = e.detail
            this.triggerEvent("handleSliderChanging", {
                value
            })
        },
        // 上一首
        previousSongClick() {
            this.triggerEvent("previousSongClick")
            playerStore.dispatch("songTabAction", "previous")
        },
        // 下一首
        nextSongClick() {
            this.triggerEvent("nextSongClick")
            playerStore.dispatch("songTabAction", "next")

        },
        // 切换播放模式
        switchModel(e) {
            const {
                model
            } = e.currentTarget.dataset
            switch (model) {
                case 'default':
                    this.setData({
                        playModel: "random"
                    })
                    wx.setStorage({
                        key: "playModel",
                        data: 'random'
                    })
                    break;
                case 'random':
                    this.setData({
                        playModel: "only"
                    })
                    wx.setStorage({
                        key: "playModel",
                        data: "only"
                    })
                    break;
                default:
                    this.setData({
                        playModel: "default"
                    })
                    wx.setStorage({
                        key: "playModel",
                        data: 'default'
                    })
                    break;
            }
        },
        // 点击列表
        playListClick() {
            this.setData({
                show: true
            })
        },
        // 歌词滚到最低部执行
        scrolltolower() {
            this.triggerEvent("scrolltolower")
        },
        // 播放列表变化
        playerStoreListener() {
            playerStore.onStates(["playList", "isPlay", "songInfo", "id"], ({
                isPlay,
                playList,
                songInfo,
                id
            }) => {
                if (id) {
                    this.setData({
                        id
                    })
                }
                if (playList) {
                    this.setData({
                        playList
                    })
                }
                if (songInfo) {
                    this.setData({
                        songInfo
                    })
                }
                if (isPlay != undefined) {
                    this.setData({
                        isPlay
                    })
                }
            })
        },
        // 播放音乐
        playSongClick(e) {
            console.log("除了叉号，点击其他地方我都触发");
            const clickId = e.currentTarget.dataset.id
            const {
                isPlay,
                id
            } = this.data
            if (id == clickId) {
                if (isPlay) {
                    playerStore.dispatch("changePlayStatusAction", false)
                } else {
                    playerStore.dispatch("changePlayStatusAction", true)
                }
            } else {
                playerStore.dispatch("getSongInfoDataAction", {
                    id: clickId
                })
            }
        },
        // 从列表中删除歌曲
        deleteSongClick(e) {
            console.log("点击叉号");
            const id = e.currentTarget.dataset.id
            const playList = JSON.parse(wx.getStorageSync('playList'))
            const index = playList.findIndex(item => item.id == id)
            console.log(id, this.data.id);
            if (playList.length == 0) {
                this.deleteAllSongClick()
                return
            }
            if (id == this.data.id) {
                if (index == playList.length - 1) {
                    playList.splice(index, 1)
                    this.setData({
                        playList
                    })
                    wx.setStorage({
                        key: "playList",
                        data: JSON.stringify(playList)
                    })
                    playerStore.setState("playList", playList)
                    playerStore.setState("songInfo", playList[0])
                    playerStore.dispatch("getSongInfoDataAction", {
                        id: playList[0].id,
                        replay: true,
                        bool: true
                    })
                } else {
                    playList.splice(index, 1)
                    this.setData({
                        playList
                    })
                    wx.setStorage({
                        key: "playList",
                        data: JSON.stringify(playList)
                    })
                    playerStore.setState("playList", playList)
                    playerStore.setState("songInfo", playList[index])
                    playerStore.dispatch("getSongInfoDataAction", {
                        id: playList[index].id,
                        replay: true,
                        bool: true
                    })
                }
            } else {
                playList.splice(index, 1)
                this.setData({
                    playList
                })
                wx.setStorage({
                    key: "playList",
                    data: JSON.stringify(playList)
                })
                playerStore.setState("playList", playList)
            }
        },
        // 删除列表所有歌曲
        deleteAllSongClick() {
            wx.removeStorage({
                key: 'playList'
            })
            wx.removeStorage({
                key: 'currentSong'
            })
            this.setData({
                show: false
            })
            playerStore.setState("playList", {})
            playerStore.setState("songInfo", {})
            playerStore.dispatch("songStopAction")
        }
    }
})