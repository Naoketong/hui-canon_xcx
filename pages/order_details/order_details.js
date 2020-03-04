import indexService from '../../global/service/index.js';
Page({
    data: {
        order_number: '',
        car_id: '',
        order: [],
        cost: [],

    },
    onLoad: function(options) {
        // console.log(options.order_number)
        this.setData({ order_number: options.order_number })
        this.getOrder();
    },
    getOrder: function(e) {
        let id = this.data.order_number;
        indexService.orderFind(id).then(order => {
            this.setData({ order })
            let id = order[0].car_id;
            indexService.costItem(id).then(cost => {
                console.log(cost)
                this.setData({ cost })
            })
        })
    },

})