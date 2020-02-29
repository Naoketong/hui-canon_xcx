import indexService from '../../global/service/index.js';
const app = getApp()

Page({
    data: {
        pageShow: false,
        userInfo: null,
        vehicle: [],
        background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
        indicatorDots: true,
        vertical: false,
        autoplay: false,
        interval: 2000,
        duration: 500

    },
    onLoad: function(options) {
        this.getData();
        this.getVehicle();
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

    getVehicle: function() {
        indexService.vehicleAll().then(vehicle => {
            this.setData({ vehicle })

        })
    },
})