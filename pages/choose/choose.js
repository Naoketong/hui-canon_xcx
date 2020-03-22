import indexService from '../../global/service/index.js';
const app = getApp()
Page({
    data: {
        userInfo: null,
        vehicles: [],
        level: 0
    },
    onLoad: function() {
        this.getlogin();
        this.getData();
        this.getVehicleData();

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
                this.setData({ userInfo });
                userInfo.id && this.getClasses(userInfo.id);
            })
            .catch(() => {})
            .finally(() => {
                this.setData({ pageShow: true })
            })

    },
    getVehicleData: function(e) {
        let level = this.data.level;
        indexService.vehicleLevel({ level }).then(vehicles => {
            console.log(vehicles.datas)
            this.setData({ vehicles: vehicles.datas })
        })
    },
    changeLevel: function(e) {
        this.setData({
            level: e.currentTarget.dataset.level
        })
        let level = e.currentTarget.dataset.level
        indexService.vehicleLevel({ level }).then(vehicles => {
            console.log(vehicles)
            this.setData({ vehicles: vehicles.datas })
        })
    },


})