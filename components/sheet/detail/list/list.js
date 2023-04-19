// components/sheet/detail/list/list.js
import {playerStore} from "../../../../stores/index"
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        sheetList: {
            type: Object,
            value: null
        },
        listHeight: {
            type: Number,
            value: 0
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        id: -1
    },
    lifetimes: {
        attached() {
            this.listener()
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        playSheetClick() {
            const {song_info} = this.data.sheetList
            const id = song_info[0].id
            playerStore.dispatch("getSongInfoDataAction", {id})
            playerStore.setState("playList",song_info)
            wx.setStorage({
                key: "playList",
                data: JSON.stringify(song_info)
            })
            wx.navigateTo({
                url: '/pages/player/player'
            })
        },
        playSongClick(e) {
            const id = e.currentTarget.dataset.id
            const {song_info} = this.data.sheetList
            playerStore.dispatch("getSongInfoDataAction", {id})
            playerStore.setState("playList",song_info)
            wx.setStorage({
                key: "playList",
                data: JSON.stringify(song_info)
            })
            wx.navigateTo({
                url: '/pages/player/player'
            })
        },
        // 监听
        listener() {
            playerStore.onStates(["id"], ({id}) => {
                if(id) {
                    this.setData({
                        id
                    })
                }
            })
        }
    }
})
