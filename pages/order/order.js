import indexService from '../../global/service/index.js';
const app = getApp()
Page({
    data: {
        userInfo: {},
        sat_at: '',
        end_at: '',
        car_id: null,
        vehicles: [],
        cost: [],
        rent_days: '',
        cost_total: '',
        Yesterday: '',

    },
    onLoad: function(option) {
        this.getlogin();
        this.setData({ car_id: option.car_id })
        this.getVehicle();
        this.getCost();
        this.getData();
        this.Yesterday();

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
            // console.log(userInfo)
            this.setData({ userInfo })
        })
    },

    getVehicle: function(e) {
        let id = this.data.car_id
            // console.log(id)
        indexService.vehicleItem(id).then(vehicles => {
            // console.log(vehicles)
            this.setData({ vehicles })
        })
    },
    getCost: function(e) {
        let id = this.data.car_id
            // console.log(id)
        indexService.costItem(id).then(cost => {
            // console.log(cost)
            this.setData({ cost })
        })
    },
    Yesterday: function(e) {
        let day = new Date();
        day.setTime(day.getTime());
        let Yesterday = day.getFullYear() + "-" + (day.getMonth() + 1) + "-" + day.getDate();
        this.setData({ Yesterday: Yesterday })
    },
    bindstartStart: function(e) {
        // console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            sat_at: e.detail.value,
        })
        let sat_at = this.data.sat_at;
        let end_at = this.data.end_at;
        let d1 = new Date(sat_at);
        let d2 = new Date(end_at);

        let rent_days = (d2 - d1) / (24 * 60 * 60 * 1000)
        let price = this.data.vehicles[0].price;
        let total = this.data.cost[0].cost_total
        let cost_total = Number(price) * Number(rent_days) + Number(total);
        this.setData({ cost_total });
        this.setData({ rent_days })
    },
    bindDateEnd: function(e) {
        // console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            end_at: e.detail.value,
        })
        if (!this.data.sat_at) {
            wx.showToast({
                icon: 'none',
                title: '没选开始日期',
            })
            return
        }
        let sat_at = this.data.sat_at;
        let end_at = this.data.end_at;
        let d1 = new Date(sat_at);
        let d2 = new Date(end_at);
        let rent_days = (d2 - d1) / (24 * 60 * 60 * 1000) || 1
        let price = this.data.vehicles[0].price;
        let total = this.data.cost[0].cost_total
        let cost_total = Number(price) * Number(rent_days) + Number(total);
        this.setData({ cost_total });
        this.setData({ rent_days })
    },
    handSave: function(e) {
        let order_number = ""; //订单号
        for (let i = 0; i < 6; i++) //6位随机数，用以加在时间戳后面。
        {
            order_number += Math.floor(Math.random() * 10);
        }
        order_number = new Date().getTime() + order_number; //时间戳，用来生成订单号。

        let name = this.data.userInfo.name;
        let phone = this.data.userInfo.phone;
        let car_id = this.data.car_id;
        let sat_at = this.data.sat_at;
        let end_at = this.data.end_at;

        let strDateArrayStart = sat_at.split("-");
        let strDateArrayEnd = end_at.split("-");
        let strDateS = new Date(strDateArrayStart[0] + "/" + strDateArrayStart[1] + "/" + strDateArrayStart[2] + " 00:00:00");
        let strDateE = new Date(strDateArrayEnd[0] + "/" + strDateArrayEnd[1] + "/" + strDateArrayEnd[2] + " 23:59:59");
        let intDay = (strDateE - strDateS) / (1000 * 3600 * 24);
        // console.log(intDay)
        if (intDay < 0) {
            wx.showToast({
                icon: 'none',
                title: '结束年月不能小于开始年月',
            })
            this.setData({
                cost_total: '',
                sat_at: '',
                end_at: '',
            });
            return
        }
        let rent_days = this.data.rent_days || 1;
        let cost_total = this.data.cost_total;
        // console.log(name, phone, car_id, sat_at, end_at, rent_days, cost_total)
        if (!name || !phone || !car_id || !sat_at || !end_at || !rent_days || !cost_total) {
            wx.showToast({
                title: '缺少必要参数',
            })
            return
        }
        indexService.order({
            order_number,
            name,
            phone,
            car_id,
            sat_at,
            end_at,
            rent_days,
            cost_total
        }).then(res => {
            setTimeout(() => {
                wx.navigateTo({
                    url: '/pages/order_success/order_success?order_number=' + order_number
                })
            }, 500);
        }).catch(err => {
            console.log(err)
        }).finally(() => {
            wx.hideLoading();
        })

    },
})