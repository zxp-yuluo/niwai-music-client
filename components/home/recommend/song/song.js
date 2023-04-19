// components/home/recommend/song/song.js
import {
    playerStore
} from "../../../../stores/player"
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        songList: {
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
        // 播放推荐歌曲列表
        play() {
            const songList = this.data.songList
            let tempList = []
            for (let index = 0; index < songList.length; index++) {
                tempList.push(...songList[index])
            }
            // playerStore.dispatch("playListAction", tempList)
            playerStore.setState("playList",tempList)
            const id = tempList[0].id
            playerStore.dispatch("getSongInfoDataAction", {id})
            wx.navigateTo({
                url: '/pages/player/player',
            })
            wx.setStorage({
                key: "playList",
                data: JSON.stringify(tempList)
            })
        },
        // 播放选择的歌曲
        playSong(e) {
            const songInfo = e.currentTarget.dataset.song
            playerStore.dispatch("getSongInfoDataAction", {id:songInfo.id})
            let playList = wx.getStorageSync('playList')
            if (playList) {
                playList = JSON.parse(playList)
                const boolean = playList.some(item => item.id == songInfo.id)
                if (!boolean) {
                    playList.push(songInfo)
                    // playerStore.dispatch("playListAction", playList)
                    playerStore.setState("playList",playList)
                }
            } else {
                playList = [songInfo]
                // playerStore.dispatch("playListAction", playList)
                playerStore.setState("playList",playList)
            }
            wx.setStorage({
                key: "playList",
                data: JSON.stringify(playList)
            })
            wx.navigateTo({
                url: '/pages/player/player'
            })
        }
    }
})