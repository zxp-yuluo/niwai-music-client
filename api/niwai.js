const BASE_URL = 'http://localhost:5000'

export default function nwQuery(options) {
    return new Promise((resolve, reject) => {
        wx.request({
            url: BASE_URL + options.url,
            method: options.method || 'GET',
            data: options.data || {},
            success: (res) => {
                resolve(res.data)
            },
            fail: (err) => {
                wx.showToast({
                    icon: 'error',
                    title: '请求错误！' + err.errMsg
                })
                reject(err)
            }
        })
    })
}