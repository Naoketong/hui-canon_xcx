import indexService from '../../global/service/index.js';
Page({
	data: {
		order_number: '',
		car_id: '',
		order: [],
		cost: [],
		order_state: '',
		get_car: '',
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
	let id = this.data.order_number;
	indexService.orderFind(id).then(order => {
		this.setData({ order })
		this.setData({ order_state: order[0].order_state })
		this.setData({ get_car: order[0].get_car })
		this.setData({ car_id: order[0].car_id })
		let id = order[0].car_id;
		indexService.costItem(id).then(cost => {
				this.setData({ cost })
		})
	})
},
	orderCancel: function() {
		let id = this.data.order_number;
		let order_state = 3;
		let car_id = this.data.car_id;
		wx.showModal({
			title: '提示',
			content: '确认取消订单吗？',
			success: function(res) {
				if (res.confirm) {
					indexService.ordermMdify(id, { order_state, car_id }).then(order => {
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
						wx.showToast({
							title: '已取消！',
							icon: 'success',
							duration: 1000
						})
				}
			}
		})
	},
	handGetCar: function() {
		let id = this.data.order_number;
		let get_car = 2;
		wx.showModal({
			title: '提示',
			content: '确定你已在店铺并且取到车钥匙吗？',
			success: function(res) {
				if (res.confirm) {
					indexService.ordermMdify(id, { get_car }).then(order => {
						wx.showToast({
							title: '已取车！',
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