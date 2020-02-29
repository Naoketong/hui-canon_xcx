import indexService from '../../global/service/index.js';
const app = getApp()

Page({
    data: {
        pageShow: false,
        userInfo: null,
        vehicle: [],

    },
    onLoad: function(options) {
        this.getData();
        this.getVehicle();
    },
    getData: function() {
        app.getUserInfo().then(userInfo => {
                this.setData({ userInfo });
                // userInfo.id && this.getClasses(userInfo.id);
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
    // getClasses: function(userInfo_id) {
    //     indexService.class(userInfo_id).then(res => {
    //         // console.log(res.classes)
    //         this.setData({
    //             classes: res.classes
    //         })
    //     });
    //     // console.log(this.data)
    // },
    // getCourse: function() {
    //     indexService.courseAll().then(res => {
    //         this.setData({
    //             course: res.datas
    //         });
    //     })
    // },
})