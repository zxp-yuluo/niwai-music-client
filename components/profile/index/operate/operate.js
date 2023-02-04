// components/profile/operate/operate.js
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

    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 跳转页面
        jump(e) {
            const operate = e.currentTarget.dataset.operate
            switch (operate) {
                case 'collect':
                    wx.navigateTo({
                        url: '/pages/profile/collect/collect',
                    })
                    break;
                case 'sheet':
                    wx.navigateTo({
                        url: '/pages/profile/sheet/sheet',
                    })
                    break;

            }
        }
    }
})