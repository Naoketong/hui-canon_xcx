import indexService from '../../global/service/index.js';
const app = getApp()
Page({
    data: {
        userInfo: null,
        vehicles: [],
        level: 0
    },
    onLoad: function() {
        this.getData();
        this.getVehicleData();

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
            this.setData({ vehicles })
        })
    },
    changeLevel: function(e) {
        this.setData({
            level: e.currentTarget.dataset.level
        })
        let level = e.currentTarget.dataset.level
        indexService.vehicleLevel({ level }).then(vehicles => {
            this.setData({ vehicles })
        })
    },


})