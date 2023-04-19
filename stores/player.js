import {
    HYEventStore
} from "hy-event-store";
import {
    getSongInfoById
} from "../api/index";
import {
    parseLyrics
} from "../utils/parse-lyrics"

// 播放器
export const bam = wx.getBackgroundAudioManager()
export const playerStore = new HYEventStore({
    state: {
        bool: false,
        isStop: false, // 是否停止
        isFristPlay: true, // 是否是第一次播放
        id: -1, // 歌曲id
        songInfo: {}, // 歌曲信息
        lyrics: [], // 歌词
        isPlay: false, // 是否播放

        songTime: 0.01, // 歌曲时间
        currentTime: 0, // 当前播放位置
        currentLyricsIndex: 0, // 当前播放歌词的下标

        playList: [], // 播放列表
    },
    actions: {
        // 获取歌曲信息并播放歌曲
        async getSongInfoDataAction(ctx, {
            id,
            replay = false,
            bool = false
        }) {
            if (ctx.id == id && !replay) {
                this.dispatch("changePlayStatusAction", true)
                return
            }
            ctx.id = id
            ctx.currentLyricsIndex = 0
            ctx.songInfo = null
            ctx.lyrics = []
            ctx.songTime = 0.01
            ctx.currentTime = 0
            // 请求数据
            const result = await getSongInfoById(id)
            const {
                status,
                data
            } = result
            if (status === 0) return
            const lyrics = parseLyrics(data.lyrics)
            ctx.songInfo = data
            ctx.lyrics = lyrics
            wx.setStorage({
                key: "currentSong",
                data: JSON.stringify(data)
            })
            // 播放歌曲
            bam.stop()
            bam.src = data.url
            // bam.src = "https://webfs.ali.kugou.com/202303311827/49c2f8a692d7cec176abdf47fa65ce18/KGTX/CLTX001/17ba99409864591f3006e89595f5d13f.mp3"
            bam.title = data.song_name
            bam.singer = data.author_name
            bam.coverImgUrl = data.image
            if (bool) {
                bam.stop()
            }
            ctx.isPlay = true
            // 调用监听函数
            // this.dispatch("setupAudioContextListenAction", {
            //   songInfo: data,
            //   lyrics
            // })
            if (ctx.isFristPlay) {
                this.dispatch("setupAudioContextListenAction")
                ctx.isFristPlay = false
            }
        },
        // 音频方法监听函数 
        // setupAudioContextListenAction(ctx, {songInfo,lyrics})
        setupAudioContextListenAction(ctx) {
            // 监听歌曲进入可播放状态
            bam.onCanplay(() => {
                bam.play()
            })
            // 监听背景音频播放
            bam.onPlay(() => {
                ctx.isPlay = true
            })
            // 监听背景音频暂停
            bam.onPause(() => {
                ctx.isPlay = false
            })
            // 监听歌曲播放进度
            bam.onTimeUpdate(() => {
                const {lyrics} = ctx
                const currentTime = bam.currentTime
                ctx.currentTime = currentTime
                ctx.songTime = bam.duration

                // 根据时间匹配歌词
                const {
                    currentLyricsIndex
                } = ctx
                for (let index = 0; index < lyrics.length; index++) {
                    if (currentTime * 1000 < lyrics[index].time) {
                        const tempLyricsIndex = index - 1
                        if (currentLyricsIndex != tempLyricsIndex) {
                            ctx.currentLyricsIndex = tempLyricsIndex
                        }
                        break
                    }
                    if (index == lyrics.length - 1) {
                        if (currentTime * 1000 >= lyrics[lyrics.length - 1].time) {
                            if (currentLyricsIndex !== lyrics.length - 1) {
                                ctx.currentLyricsIndex = lyrics.length - 1
                            }
                        }
                    }
                }
            })
            // 监听歌曲停止
            bam.onStop(() => {
                ctx.isPlay = false
                ctx.isStop = true
            })
            // 监听歌曲播放结束
            bam.onEnded(() => {
                const playModel = wx.getStorageSync('playModel')
                this.dispatch("changePlayStatusAction", false)
                if (playModel == "only") {
                    this.dispatch("getSongInfoDataAction", {
                        id: ctx.id,
                        replay: true
                    })
                } else {
                    this.dispatch("songTabAction", "next")
                }
            })
        },
        // 播放暂停
        changePlayStatusAction(ctx, isPlay) {
            // isPlay 
            // false 代表歌曲正在播放，点击按钮暂停
            // true  代表歌曲为暂停状态，点击按钮播放
            ctx.isPlay = isPlay
            const songInfo = ctx.songInfo
            if (isPlay && ctx.isStop) {
                bam.src = songInfo.url
                bam.title = songInfo.song_name
                bam.singer = songInfo.author_name
                bam.coverImgUrl = songInfo.image
                // bam.startTime = ctx.currentTime / 1000
                ctx.isStop = false
            }
            if (isPlay) {
                bam.play()
            } else {
                bam.pause()
            }
        },
        // 播放列表
        playListAction(ctx, list) {
            ctx.playList = list
        },
        // 歌曲切换（上一首，下一首，自动）
        songTabAction(ctx, action) {
            const playList = JSON.parse(wx.getStorageSync('playList'))
            if (playList && playList.length == 0) return
            if (playList.length == 1) {
                this.dispatch("getSongInfoDataAction", {
                    id: ctx.id,
                    replay: true
                })
                return
            }
            const playModel = wx.getStorageSync('playModel')
            const id = ctx.songInfo.id
            const index = playList.findIndex(item => item.id == id)
            let randomIndex = -1
            let nextIndex, previousIndex
            if (playModel == "random") {
                do {
                    randomIndex = Math.floor(Math.random() * playList.length)
                } while (randomIndex == index);
            }
            if (index == playList.length - 1) {
                nextIndex = 0
                previousIndex = index - 1
            } else if (index == 0) {
                nextIndex = index + 1
                previousIndex = playList.length - 1
            } else {
                nextIndex = index + 1
                previousIndex = index - 1
            }
            switch (playModel) {
                case "random":
                    this.dispatch("getSongInfoDataAction", {
                        id: playList[randomIndex].id
                    })
                    break;
                default:
                    if (action == "next") {
                        this.dispatch("getSongInfoDataAction", {
                            id: playList[nextIndex].id
                        })
                        break;
                    } else {
                        this.dispatch("getSongInfoDataAction", {
                            id: playList[previousIndex].id
                        })
                    }
                    break;
            }
        },
        // bam stop
        songStopAction(ctx) {
            bam.stop()
            ctx.id = -1
            ctx.currentLyricsIndex = 0
            ctx.lyrics = []
            ctx.songTime = 0.01
            ctx.currentTime = 0
            ctx.currentLyricsIndex = 0
        }
    }
})