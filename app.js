App({
    onLaunch() {
        // 获取系统信息
        let systemInfo = wx.getSystemInfoSync();
        // 胶囊按钮位置信息
        let menuButtonInfo = wx.getMenuButtonBoundingClientRect()
        // 导航栏高度 = 状态栏到胶囊的间距（胶囊距上距离-状态栏高度） * 2 + 胶囊高度 + 状态栏高度
        this.globalData.navBarHeight = (menuButtonInfo.top - systemInfo.statusBarHeight) * 2 + menuButtonInfo.height + systemInfo.statusBarHeight;
        // 状态栏高度
        this.globalData.statusBarHeight = systemInfo.statusBarHeight;
        // 胶囊到右边的宽度
        this.globalData.menuRight = systemInfo.screenWidth - menuButtonInfo.right;
        // 胶囊到状态栏的高度
        this.globalData.menuBotton = menuButtonInfo.top - systemInfo.statusBarHeight;
        // 胶囊高度
        this.globalData.menuHeight = menuButtonInfo.height;
        // 胶囊宽度
        this.globalData.menuWidth = menuButtonInfo.width;
        // 设备宽度
        this.globalData.clientWidth = systemInfo.windowWidth;
    },
    watch: function (variate, method) {
        var obj = this.globalData;
        let val = obj[variate]; // 单独变量来存储原来的值
        Object.defineProperty(obj, variate, {
            configurable: false,
            enumerable: true,
            set: function (value) {
                val = value; // 重新赋值
                method(variate, value); // 执行回调方法
            },
            get: function () {
                // 在其他界面调用getApp().globalData.variate的时候，这里就会执行。
                return val; // 返回当前值
            }
        })
    },
    globalData: {
        userInfo: null,
        navBarHeight: 0, // 导航栏高度
        statusBarHeight: 0, // 状态栏高度
        menuRight: 0, // 胶囊距右方间距（方保持左、右间距一致）
        menuBotton: 0, // 胶囊距底部间距（保持底部间距一致）
        menuHeight: 0, // 胶囊高度（自定义内容可与胶囊高度保证一致）
        menuWidth: 0, // 胶囊宽度
        songInfo: { // 播放歌曲的信息
            image: 'http://139.196.78.237:5000/image/default_song.png', //歌曲图片
        },
        image: "http://139.196.78.237:5000/image/default_song.png",
        isPlay: false, // 是否正在播放
    }
})