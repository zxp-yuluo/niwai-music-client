// custom-tab-bar/index.js
import {
    playerStore
} from "../stores/index"
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        selected: 0,
        color: "#bfbfbf",
        selectedColor: "#ed9063",
        songInfo: {
            image: "/assess/images/tabbar/default_song.png"
        },
        isPlay: false,
        "list": [{
                "pagePath": "/pages/home/home",
                "iconPath": "/assess/images/tabbar/home.png",
                "selectedIconPath": "/assess/images/tabbar/home-active.png",
                "text": "首页",
                "isSpecial": false
            },
            {
                "pagePath": "/pages/player/player",
                "iconPath": "/assess/images/tabbar/profile.png",
                "selectedIconPath": "/assess/images/tabbar/profile-active.png",
                "text": "",
                "isSpecial": true
            },
            {
                "pagePath": "/pages/profile/index/index",
                "iconPath": "/assess/images/tabbar/profile.png",
                "selectedIconPath": "/assess/images/tabbar/profile-active.png",
                "text": "我的",
                "isSpecial": false
            }
        ]
    },

    /**
     * 组件的方法列表
     */
    lifetimes: {
        attached() {
            this.variableListener()
        }
    },
    methods: {
        switchTab(e) {
            const dataset = e.currentTarget.dataset
            const path = dataset.path
            const index = dataset.index
            const selected = this.data.selected
            if (index === selected) return
            //如果是特殊跳转界面
            if (this.data.list[index].isSpecial) {
                wx.navigateTo({
                    url: path
                })
            } else {
                //正常的tabbar切换界面
                wx.switchTab({
                    url: path
                })
                this.setData({
                    selected: index
                })
            }
        },
        variableListener() {
            playerStore.onStates(["songInfo", "isPlay"], ({
                songInfo,
                isPlay
            }) => {
                if (songInfo) {
                    if(songInfo.url) {
                        this.setData({
                            songInfo
                        })
                    }else {
                        this.setData({
                            songInfo: {
                                image: "/assess/images/tabbar/default_song.png"
                            }
                        })
                    }
                }
                this.setData({
                    isPlay
                })
            })
        }
    }
})