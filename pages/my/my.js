import indexService from '../../global/service/index.js';
const app = getApp()

Page({
    data: {
        userInfo: {},
        order_number: '',
    },
    onLoad: function() {
        this.getData();
    },
    getData: function() {
        app.getUserInfo().then(userInfo => {
            this.setData({ userInfo })
            let id = this.data.userInfo.phone;
            indexService.orderPhone(id).then(res => {
                this.setData({ order_number: res[0].order_number })
            })
        })
    },

})