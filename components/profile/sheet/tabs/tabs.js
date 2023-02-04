// components/profile/sheet/tabs/tabs.js
const app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        list: { // 列表
            type: Array,
            value: []
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        selected: '0',
        navBarHeight: 0
    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 选择tabs
        tabs(e) {
            const selected = e.currentTarget.dataset.select
            this.setData({
                selected
            })
        },
        // 添加歌单
        addSheet() {
            wx.navigateTo({
              url: '/pages/sheet/add/add',
            })
        },
        // 清空歌单或收藏
        delete() {
            const selected = this.data.selected
            if (selected === '0') {
                // 清空歌单
                wx.showModal({
                    title: '提示',
                    content: '确定清空个歌单吗？',
                    complete: (res) => {
                        if (res.confirm) {
                            console.log('清空歌单');
                        }
                    }
                })
            } else if (selected === '1') {
                // 清空收藏
                wx.showModal({
                    title: '提示',
                    content: '确定清空个收藏吗？',
                    complete: (res) => {
                        if (res.confirm) {
                            console.log('清空收藏');
                        }
                    }
                })
            }
        },
        // 点击更多操作
        operate(e) {
            // const id = e.currentTarget.dataset.info.id
            const id = e.currentTarget.dataset.info
            const selected = this.data.selected
            console.log(id, selected);
            wx.showActionSheet({
                itemList: ['删除', '分享'],
                success: (data) => {
                    console.log(data);
                },
                fail: (err) => {
                    console.log(err);
                }
            })
        },
        // 跳转歌单详情页面
        goSheetDetail(e) {
            // const id = e.currentTarget.dataset.info.id
            // wx.navigateTo({
            //   url: '/pages/sheet/detail/detail?id=' + id,
            // })
            console.log('跳转歌单详情页面');
        }
    },
    lifetimes: {
        attached() {
            this.setData({
                navBarHeight: app.globalData.navBarHeight
            })
        }
    }
})