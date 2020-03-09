import indexService from '../../global/service/index.js';
const app = getApp()
Page({
    data: {
        order: [],
    },
    onLoad: function(options) {
        this.getData();
    },
    getData: function() {
        app.getUserInfo().then(userInfo => {
            this.setData({ userInfo })
            let id = this.data.userInfo.phone;
            indexService.orderPhone(id).then(order => {
                // console.log(order)
                this.setData({ order: order })
            })
        })
    },
})