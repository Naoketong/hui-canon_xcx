const MODE = 'devlopment';
// const MODE = 'production';
const PRODUCTION_PREFIX = 'https://www.jevescript.com/liuyinshe/api';
const DEVELOPMENT_PREFIX = 'http://localhost:3000/api';
const VERSION = 'V0.0.1';
const PRODUCTION_APPID = 6;
// const PREFIX =  ( MODE === 'production' ) ? PRODUCTION_PREFIX : DEVELOPMENT_PREFIX;
const PREFIX = DEVELOPMENT_PREFIX;
export default {
    MODE: MODE,
    version: VERSION,
    wxlogin: `${PREFIX}/miniprogram/wxlogin`,
    wxbind: `${PREFIX}/miniprogram/wxbind`,
    vehicleAll: `${PREFIX}/vehicle`,
    vehicleLevel: `${PREFIX}/vehicle/level`,
    vehicleItem: (id) => `${PREFIX}/vehicle/${id}`,
    order: `${PREFIX}/order`,
    user: `${PREFIX}/user`,
    orderItem: (id) => `${PREFIX}/order/${id}`,
    orderFind: (id) => `${PREFIX}/order/find/${id}`,
    ordermMdify: (id) => `${PREFIX}/order/modify/${id}`,
    costItem: (id) => `${PREFIX}/cost/${id}`,
    // class: (user_id) => `${PREFIX}/miniprogram/user/${user_id}/class`,

    // classItem: (user_id, class_id) => `${PREFIX}/miniprogram/user/${user_id}/class/${class_id}`,
    // leaveApply: (id) => `${PREFIX}/miniprogram/user-lesson/${id}/leave-apply`,
    // courseAll: `${PREFIX}/course`,
}