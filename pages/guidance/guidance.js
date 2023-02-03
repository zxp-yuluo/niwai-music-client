// pages/guidance/guidance.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tab: true, // true：显示第一屏, false：显示第二屏
        oneStart: false, // 第一屏动画是否开始
        twoStart: false,
        nextAni: '', // 下一页动画
        amplifyAni: '', // 放大动画
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        // 点击下一屏的动画
        const nextAni = wx.createAnimation({
            duration: 1000,
            timingFunction: 'ease'
        })
        this.clearId = setInterval(() => {
            nextAni.opacity(0).step()
            nextAni.opacity(1).step()
            this.setData({
                nextAni: nextAni.export()
            })
        }, 2000)
    },
    // logo图片加载完成
    loadding() {
        this.setData({
            oneStart: true
        })
    },
    // 点击下一页
    handleNext() {
        clearInterval(this.clearId)
        this.setData({
            tab: false,
        }, () => {
            this.setTimeoutId = setTimeout(() => {
                const amplifyAni = wx.createAnimation({
                    duration: 2000,
                    timingFunction: 'ease',
                })
                amplifyAni.opacity(1).scale(1).step()
                // Animation.
                this.setData({
                    amplifyAni: amplifyAni.export(),
                    twoStart: true
                })
            }, 2000)
        })
    },
    // 跳转页面
    handleSkip() {
        clearTimeout(this.setTimeoutId)
        wx.redirectTo({
            url: '/pages/home/home',
        })
    }
})