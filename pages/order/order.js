Page({
    data: {

        date: '2016-04-01',
        dates: '2020-09-01',

    },

    bindDateChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            date: e.detail.value
        })
    },
})