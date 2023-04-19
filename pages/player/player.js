// pages/player/player.js
import {
    bam,
    playerStore
} from "../../stores/index"
const app = getApp()
Page({
    data: {
        navBarHeight: 0,
        songInfo: null,
        lyrics: [], //歌词
        songTime: 0.01, // 歌曲时间
        currentTime: 0, // 当前播放位置
        percent: 0,
        isPlay: false,
        isSliderChaning: false, //是否正在拖拽滑块 
        currentLyricsIndex: 0, // 当前播放歌词的下标
        scrollHeight: 0, // 歌词滑动的高度
        isIncrease: false, // scrollHeight是否增加
        rowHeight: 32, // 歌词依次滑动的高度
    },

    onLoad(options) {
        this.setData({
            navBarHeight: app.globalData.navBarHeight,
        })
        this.setupPlayerStoreListen()
    },
    onReady() {
        const {
            clientWidth
        } = app.globalData
        this.setData({
            rowHeight: Math.floor((clientWidth * 2 * 32) / 750)
        })
    },
    setupPlayerStoreListen() {
        // 监听歌曲信息、歌词
        playerStore.onStates(["songInfo", "lyrics"], ({
            songInfo,
            lyrics
        }) => {
            if (songInfo) this.setData({
                songInfo
            })
            if (lyrics) this.setData({
                lyrics
            })
        })
        // 监听歌曲时间、当前歌词下标、当前歌曲播放时间
        playerStore.onStates(["songTime", "currentTime", "currentLyricsIndex"], ({
            songTime,
            currentTime,
            currentLyricsIndex
        }) => {
            if (songTime) {
                this.setData({
                    songTime
                })
            }
            if (currentTime) {
                const percent = currentTime / this.data.songTime * 100
                this.setData({
                    currentTime,
                    percent
                })
            }
            if (currentTime && !this.data.isSliderChaning) {
                const percent = currentTime / this.data.songTime * 100
                this.setData({
                    currentTime,
                    percent
                })
            }
            if (currentLyricsIndex) {
                const {
                    isIncrease
                } = this.data
                this.setData({
                    currentLyricsIndex
                })
                if (!isIncrease) {
                    const scrollHeight = currentLyricsIndex * this.data.rowHeight
                    this.setData({
                        scrollHeight
                    })
                }
            }
            if (currentLyricsIndex == 0) {
                this.setData({
                    scrollHeight: 1,
                    isIncrease: false
                })
            }
        })
        // 监听歌曲是否播放
        playerStore.onStates(["isPlay"], ({
            isPlay
        }) => {
            this.setData({
                isPlay
            })
        })
    },
    // 播放暂停
    playOrPauseClick() {
        const {
            isPlay
        } = this.data
        // isPlay  
        //true正在播放，把状态改为false
        //false正在播放，把状态改为true
        if (isPlay) {
            playerStore.dispatch("changePlayStatusAction", false)
        } else {
            playerStore.dispatch("changePlayStatusAction", true)
        }
    },
    // 点击进度条
    handleSliderChange(e) {
        const {
            value
        } = e.detail
        let currentTime = value / 100 * bam.duration
        currentTime = Math.floor(currentTime * 100) / 100;
        const percent = currentTime / bam.duration * 100
        // bam.pause()
        bam.seek(currentTime)
        this.setData({
            percent,
            currentTime,
            isSliderChaning: false,
        })

    },
    // 拖拽滑块
    handleSliderChanging(e) {
        const {
            value
        } = e.detail
        let currentTime = value / 100 * bam.duration
        this.setData({
            isSliderChaning: true,
            currentTime,
        })
    },
    // 歌词滚到最低部执行
    scrolltolower() {
        this.setData({
            isIncrease: true
        })
    },
    // 获取0到n之间的随机整数
    getRandom(n) {
        const num = (n) * Math.random();
        return Math.floor(num);
    },
})