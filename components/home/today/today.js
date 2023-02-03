// components/home/today/today.js
Component({
    /**
     * 组件的初始数据
     */
    data: {
        week: '',
        day: '',
        month: '',
        location: '',
        weatherInfo: null
    },
    /**
     * 组件的方法列表
     */
    methods: {
        // 获取今天信息
        getToday() {
            let date = new Date()
            // 得到日期
            let day = date.getDate()
            let month
            let week
            // 得到月份
            if (date.getMonth() == 0) month = "Jan"
            if (date.getMonth() == 1) month = "Feb"
            if (date.getMonth() == 2) month = "Mar"
            if (date.getMonth() == 3) month = "Apr"
            if (date.getMonth() == 4) month = "May"
            if (date.getMonth() == 5) month = "Jun"
            if (date.getMonth() == 6) month = "Jul"
            if (date.getMonth() == 7) month = "Aug"
            if (date.getMonth() == 8) month = "Sep"
            if (date.getMonth() == 9) month = "Oct"
            if (date.getMonth() == 10) month = "Nov"
            if (date.getMonth() == 11) month = "Dec"
            // 得到星期
            if (date.getDay() == 0) week = "星期日"
            if (date.getDay() == 1) week = "星期一"
            if (date.getDay() == 2) week = "星期二"
            if (date.getDay() == 3) week = "星期三"
            if (date.getDay() == 4) week = "星期四"
            if (date.getDay() == 5) week = "星期五"
            if (date.getDay() == 6) week = "星期六"

            this.setData({
                week,
                day,
                month
            })
        },
        // 获取天气
        getWeatherData(location) {
            wx.request({
                url: 'https://devapi.qweather.com/v7/weather/now?',
                data: {
                    key: 'cb0e97fa62fc4052b3ab36a9549cd557',
                    location
                },
                success: (data) => {
                    const temp = data.data.now
                    this.setData({
                        weatherInfo: {
                            weather: temp.text,
                            temperature: temp.temp
                        }
                    })
                },
                fail: (err) => {
                    console.log(err, '获取失败！');
                }
            })
        }
    },
    lifetimes: {
        attached() {
            wx.getLocation({
                type: 'wgs84',
                success: (res) => {
                    this.setData({
                        location: res.longitude + ',' + res.latitude
                    }, () => {
                        // this.getWeatherData(this.data.location)
                    })
                },
                fail: (err) => {
                    wx.showToast({
                        title: '获取失败！',
                        icon: 'error',
                        duration: 1000
                    })
                }
            })
        }
    },
    pageLifetimes: {
        show() {
            this.getToday()
        }
    }
})
