import indexService from '../../global/service/index.js';
Page({
	data: {
		name: '',
		phone: '',
	},
	onLoad: function(options) {
		this.getlogin();
	},
	getlogin: function() {
		let open_id = wx.getStorageSync('open_id')
		if (open_id) {
			wx.switchTab({
				url: '/pages/index/index',
			})
		}
	},
	onReady: function() {
		this.tips = this.selectComponent('#pd-tips');
	},
	loginName: function(e) {
		this.setData({
			name: e.detail.value
		})
	},
	loginPhone: function(e) {
		this.setData({
			phone: e.detail.value
		})
	},
	getUserInfo: function(e) {
		let userInfo = e.detail.userInfo;
		if (userInfo) {
			this.submitLogin()
		}
	},
	submitLogin: function() {
		let name = this.data.name;
		let phone = this.data.phone;
		let is_online = 1;
		if (!name) {
			this.tips.show('error', '请输入真实姓名', 3000);
			return
		}
		if (!phone) {
			this.tips.show('error', '请输入手机号', 3000);
			return
		}
		if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone))) {
			this.tips.show('error', '手机号码有误，请重填', 3000);
			return
		}
		wx.login({
			success: (wxLoginRes) => {
				wx.showLoading({ title: "加载中", mask: true });
				indexService.bind({
					name,
					phone,
					is_online,
					code: wxLoginRes.code
				}).then(res => {
					wx.setStorageSync('open_id', res.open_id)
					this.tips.show('success', "绑定成功", 3000);
					setTimeout(() => {
						wx.switchTab({
							url: '/pages/index/index'
						})
					}, 500);
				}).catch(err => {
					this.tips.show('error', err.message, 3000);
				}).finally(() => {
					wx.hideLoading();
				})
			}
		})
	},
})