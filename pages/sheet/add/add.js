// pages/sheet/add/add.js
const app = getApp()
import {
    addSongSheet,
    deleteImage
} from '../../../api/index.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        navBarHeight: 0,
        name: '',
        describe: '',
        cover: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    // ------------ 网络请求 ------------
    // 创建歌单
    async addSongSheetData(data) {
        const result = await addSongSheet(data)
        console.log(result);
        if (result.status === 1) {
            wx.showToast({
                title: result.message,
                icon: 'success'
            })
            this.setData({
                name: '',
                describe: '',
                cover: ''
            })
        } else {
            wx.showToast({
                title: result.message,
                icon: 'none'
            })
        }
    },
    // 删除图片
    async deleteImageData(name,isTips=false) {
        const result = await deleteImage(name)
        console.log(result);
        if(isTips) return
        if(result.status === 1) {
            wx.showToast({
                title: result.message,
                icon: 'success'
            })
            this.setData({
                cover: ''
            })
        }else {
            wx.showToast({
                title: result.message,
                icon: 'none'
            })
        }
    },
    onLoad(options) {
        this.setData({
            navBarHeight: app.globalData.navBarHeight
        })
    },
    // input输入
    inputChange(e) {
        const attribute = e.currentTarget.dataset.attribute
        const value = e.detail.value
        this.setData({
            [attribute]: value
        })
    },
    // 上传文件
    upload() {
        wx.chooseMedia({
            count: 1,
            mediaType: ['image'],
            success: (res) => {
                const url = res.tempFiles[0].tempFilePath
                wx.uploadFile({
                    filePath: url,
                    name: 'image',
                    url: 'http://localhost:5000/upload/image',
                    success: (res) => {
                        const url = this.data.cover
                        if (url) {
                            // 如果上传过了，先删除之前上传的
                            const tempName = url.split('/').reverse()[0]
                            this.deleteImageData(tempName,true)
                        }
                        const cover = JSON.parse(res.data).data.url
                        this.setData({
                            cover
                        })
                    },
                    fail: (err) => {
                        wx.showToast({
                            title: '上传失败！',
                            icon: 'error',
                        })
                        console.log(err);
                    }
                })
            },
            fail: () => {
                
            }
        })
    },
    // 添加按钮
    submit() {
        const {
            name,
            describe,
            cover
        } = this.data
        if (!cover) {
            wx.showToast({
                title: '请输上传图片',
                icon: 'none'
            })
        }
        if (!describe.trim()) {
            wx.showToast({
                title: '请输入歌单描述',
                icon: 'none'
            })
        }
        if (!name.trim()) {
            wx.showToast({
                title: '请输入歌单名字',
                icon: 'none'
            })
        }
        this.addSongSheetData({name,describe,cover,create_author:'腻歪音乐'})
    },
    // 预览图片
    previewImage() {
        const url = this.data.cover
        if (!url) return
        wx.previewImage({
            urls: [url]
        })
    },
    // 删除图片
    deleteImage() {
        wx.showModal({
            title: '提示',
            content: '你确定删除吗？',
            complete: (res) => {
                if (res.confirm) {
                    const cover = this.data.cover
                    if(!cover) return
                    const name = cover.split('/').reverse()[0]
                    console.log(name);
                    this.deleteImageData(name)
                }
            }
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
        const cover = this.data.cover
        const name = cover.split('/').reverse()[0]
        this.deleteImageData(name,true)
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