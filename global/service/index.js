import wxRequest from './../request/wxrequest.js';
import API from './../request/api.js';

module.exports = {
    bind: function(params) {
        return wxRequest.post(API.wxbind, params);
    },
    vehicleAll: function() {
        return wxRequest.get(API.vehicleAll);
    },
    vehicleLevel: function(params) {
        return wxRequest.post(API.vehicleLevel, params);
    },
    order: function(params) {
        return wxRequest.post(API.order, params);
    },
    orderItem: function(id) {
        return wxRequest.get(API.orderItem(id));
    },
    costItem: function(id) {
        return wxRequest.get(API.costItem(id));
    },

    // classItem: function(user_id, class_id) {
    //     return wxRequest.get(API.classItem(user_id, class_id));
    // },
    // courseAll: function() {
    //     return wxRequest.get(API.courseAll);
    // },
    // leaveApply: function(id, params) {
    //   return wxRequest.post(API.leaveApply(id),params)
    // }
}