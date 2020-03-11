import wxRequest from './../request/wxrequest.js';
import API from './../request/api.js';

module.exports = {
    bind: function(params) {
        return wxRequest.post(API.wxbind, params);
    },
    exit: function(params) {
        return wxRequest.post(API.wxexit, params);
    },
    vehicleAll: function() {
        return wxRequest.get(API.vehicleAll);
    },
    vehicleLevel: function(params) {
        return wxRequest.post(API.vehicleLevel, params);
    },
    vehicleItem: function(id) {
        return wxRequest.get(API.vehicleItem(id));
    },
    order: function(params) {
        return wxRequest.post(API.order, params);
    },
    user: function(params) {
        return wxRequest.post(API.user, params);
    },
    orderItem: function(id) {
        return wxRequest.get(API.orderItem(id));
    },
    orderDel: function(id) {
        return wxRequest.delete(API.orderItem(id));
    },
    orderDele: function(id) {
        return wxRequest.put(API.orderItem(id));
    },
    costItem: function(id) {
        return wxRequest.get(API.costItem(id));
    },

    orderFind: function(id) {
        return wxRequest.get(API.orderFind(id));
    },
    orderPhone: function(id) {
        return wxRequest.get(API.orderPhone(id));
    },
    ordermMdify: function(id, params) {
        return wxRequest.put(API.ordermMdify(id), params);
    },
    // courseAll: function() {
    //     return wxRequest.get(API.courseAll);
    // },
    // leaveApply: function(id, params) {
    //   return wxRequest.post(API.leaveApply(id),params)
    // }
}