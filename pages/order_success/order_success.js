import indexService from '../../global/service/index.js';
Page({
	data: {
		order_number: '',
	},
	onLoad: function(options) {
		this.getlogin();
		this.setData({ order_number: options.order_number })
		this.getOrder();
	},
	getlogin: function() {
		let open_id = wx.getStorageSync('open_id')
		if (!open_id) {
			wx.redirectTo({
				url: '/pages/login/login',
			})
		}
	},
	getOrder: function(e) {
		let order_number = this.data.order_number;
	},
	orderCancel: function() {
		let id = this.data.order_number;
		let order_state = 3;
		wx.showModal({
			title: '提示',
			content: '这是一个模态弹窗',
			success: function(res) {
				if (res.confirm) {
					indexService.ordermMdify(id, { order_state }).then(order => {
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
})