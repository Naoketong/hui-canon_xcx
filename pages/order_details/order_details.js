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
        console.log(options.order_number)
        this.setData({ order_number: options.order_number })
        this.getOrder();
    },
    getOrder: function(e) {
        let id = this.data.order_number;
        indexService.orderFind(id).then(order => {
            console.log(order)
            this.setData({ order })
            this.setData({ order_state: order[0].order_state })
            let id = order[0].car_id;
            indexService.costItem(id).then(cost => {
                this.setData({ cost })
            })
        })
    },
    orderCancel: function() {
        let id = this.data.order_number;
        let order_state = 3;
        console.log(id, order_state)
        wx.showModal({
            title: '提示',
            content: '确认取消订单吗？',
            success: function(res) {
                if (res.confirm) {
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

                } else if (res.cancel) {
                    wx.showToast({
                        title: '取消操作',
                        icon: 'success',
                        duration: 1000
                    })
                }
            }
        })



    },

    orderDel: function() {
        let id = this.data.order[0].id;
        wx.showModal({
            title: '提示',
            content: '确定删除订单吗？',
            success: function(res) {
                if (res.confirm) {
                    indexService.orderDel(id).then(res => {
                        wx.navigateTo({
                            url: '/pages/order_toview/order_toview'
                        })
                    })
                    wx.showToast({
                        title: '已删除！',
                        icon: 'success',
                        duration: 1000
                    })
                } else if (res.cancel) {
                    console.log('用户点击取消')
                    wx.showToast({
                        title: '已取消！',
                        icon: 'success',
                        duration: 1000
                    })
                }
            }
        })






    },

})