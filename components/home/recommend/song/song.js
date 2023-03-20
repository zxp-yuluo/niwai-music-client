// components/home/recommend/song/song.js
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
        },
        // 播放选择的歌曲
        playSong(e) {
            const songInfo = e.currentTarget.dataset.song
            getApp().globalData.songInfo = songInfo
            getApp().globalData.image = songInfo.image
            getApp().globalData.isPlay = true
            wx.navigateTo({
              url: '/pages/player/player?id=' + songInfo.id,
            })
        }
    }
})
