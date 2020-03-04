import indexService from '../../global/service/index.js';
Page({
    data: {
        order_number: '',
        // order_number: '1583316264176764623',



    },
    onLoad: function(options) {
        // console.log(options.order_number)
        this.setData({ order_number: options.order_number })
        this.getOrder();
    },
    getOrder: function(e) {
        let order_number = this.data.order_number;
        console.log(order_number)
    },
    orderCancel: function() {
        let id = this.data.order_number;

        let order_state = 3;
        console.log(id, order_state)
        indexService.ordermMdify(id, { order_state }).then(order => {
            console.log(order)
            wx.showToast({
                title: '取消成功',
            });

            setTimeout(() => {
                wx.switchTab({
                    url: '/pages/index/index'
                })
            }, 500);

        })
    },
})