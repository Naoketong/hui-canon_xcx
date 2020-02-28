// import indexService from '../../global/service/index.js';
Page({
    data: {
        guest_name: '',
        phone: '',
    },
    onReady: function() {
        this.tips = this.selectComponent('#pd-tips');
    },
    loginName: function(e) {
        this.setData({
            guest_name: e.detail.value
        })
    },
    loginPhone: function(e) {
        this.setData({
            phone: e.detail.value
        })
    },
    getUserInfo: function(e) {
        // let userInfo = e.detail.userInfo;
        // if (userInfo) {
        this.submitLogin()
            // }
    },
    submitLogin: function() {
        let guest_name = this.data.guest_name;
        let phone = this.data.phone;
        if (!guest_name) {
            this.tips.show('error', '请输入真实姓名', 3000);
            return
        }
        if (!phone) {
            this.tips.show('error', '请输入手机号', 3000);
            return
        }
        console.log(guest_name, phone)
        wx.login({
            success: (wxLoginRes) => {
                console.log(wxLoginRes)
                    // wx.showLoading({ title: "加载中", mask: true });
                    // indexService.bind({
                    //     guest_name,
                    //     phone,
                    //     code: wxLoginRes.code
                    // }).then(res => {
                    //     this.tips.show('success', "绑定成功", 3000);
                    //     setTimeout(() => {
                    //         wx.navigateTo({
                    //             url: '/pages/index/index'
                    //         })
                    //     }, 500);
                    // }).catch(err => {
                    //     this.tips.show('error', err.message, 3000);
                    // }).finally(() => {
                    //     wx.hideLoading();
                    // })
            }
        })
    },
})