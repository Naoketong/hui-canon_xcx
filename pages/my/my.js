import indexService from '../../global/service/index.js';
const app = getApp()

Page({
    data: {
        userInfo: {},
        phone: '',
    },
    onLoad: function() {
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
            indexService.orderPhone(id).then(res => {
                // console.log(res)
                this.setData({ phone: res[0].phone })
            })
        })
    },
    exitLogin: function() {
        wx.showModal({
            title: '提示',
            content: '确认退出登录吗？',
            success: function(res) {
                if (res.confirm) {
                    let open_id = wx.getStorageSync('open_id')
                    indexService.exit({ open_id }).then(user => {
                        console.log(user)
                        wx.showToast({
                            title: '退出成功',
                        });
                        setTimeout(() => {
                            wx.redirectTo({
                                url: '/pages/login/login',
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

})