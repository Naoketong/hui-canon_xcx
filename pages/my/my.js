import indexService from '../../global/service/index.js';
const app = getApp()

Page({
    data: {
        userInfo: {},
        phone: '',
    },
    onLoad: function() {
        this.getData();
    },
    getData: function() {
        app.getUserInfo().then(userInfo => {
            this.setData({ userInfo })
            let id = this.data.userInfo.phone;
            indexService.orderPhone(id).then(res => {
                // console.log(res)
                this.setData({ phone: res[0].phone })
            })
        })
    },

})