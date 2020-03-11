import indexService from '../../global/service/index.js';
const app = getApp()
Page({
    data: {
        order: [],
    },
    onLoad: function(options) {
        this.getlogin();
        this.getData();
    },
    getlogin: function() {
        let open_id = wx.getStorageSync('open_id')
        if (!open_id) {
            wx.redirectTo({
                url: '/pages/login/login',
            })
        }
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