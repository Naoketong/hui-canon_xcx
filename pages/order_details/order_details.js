import indexService from '../../global/service/index.js';
Page({
    data: {
        order_number: '',
        car_id: '',
        order: [],
        cost: [],
        order_state: '',

    },
    onLoad: function(options) {
        // console.log(options.order_number)
        this.setData({ order_number: options.order_number })
        this.getOrder();
    },
    getOrder: function(e) {
        let id = this.data.order_number;
        indexService.orderFind(id).then(order => {
            console.log(order[0].order_state)
            this.setData({ order })
            this.setData({ order_state: order[0].order_state })
            let id = order[0].car_id;
            indexService.costItem(id).then(cost => {
                // console.log(cost)
                this.setData({ cost })
            })
        })
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