const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
const web = r => require.ensure([], () => r(require('../page/web/web')), 'web')

const product = r => require.ensure([], () => r(require('../page/product/product')), 'product')
const buyProduct = r => require.ensure([], () => r(require('../page/product/buyProduct')), 'buyProduct')

const productList = r => require.ensure([], () => r(require('../page/product/productList')), 'productList')
const orderInfo = r => require.ensure([], () => r(require('../page/order/orderInfo')), 'orderInfo')
const payOrder = r => require.ensure([], () => r(require('../page/order/payOrder')), 'payOrder')




// people route

const addTraveler = r => require.ensure([], () => r(require('../page/people/addTraveler')), 'addTraveler')
const chooseTraveler = r => require.ensure([], () => r(require('../page/people/chooseTraveler')), 'chooseTraveler')



//college route
const collegeEventInfo = r => require.ensure([], () => r(require('../page/college/collegeEventInfo')), 'collegeEventInfo')





//dynamic route
const dynamicList = r => require.ensure([], () => r(require('../page/dynamic/dynamicList')), 'dynamicList')
const dynamicInfo = r => require.ensure([], () => r(require('../page/dynamic/dynamicInfo')), 'dynamicInfo')


const demo = r => require.ensure([], () => r(require('../page/demo')), 'demo')
const menu = r => require.ensure([], () => r(require('../page/menu')), 'menu')





//this is for vip
const applySuccess = r => require.ensure([], () => r(require('../page/vip/applySuccess')), 'applySuccess')
const applyVip = r => require.ensure([], () => r(require('../page/vip/applyVip')), 'applyVip')
const firmApplied = r => require.ensure([], () => r(require('../page/vip/firmApplied')), 'firmApplied')
const firmVipAuth = r => require.ensure([], () => r(require('../page/vip/firmVipAuth')), 'firmVipAuth')

export default [
    {
        path: '/',
        component: home, //顶层路由，对应index.html
        name:'home'
    },
    {
        path: '/demo',
        component: demo,
        name:'demo'
    },
    {
        path: '/menu',
        component: menu,
        name:'menu'
    },
    {
        path: '/web',
        component: web,
        name:'web'
    },


    {
        path: '/product/:id',
        component: product,
        name:'product'
    },
    {
        path: '/buyProduct/:id',
        component: buyProduct,
        name:'buyProduct'
    },
    {
        path: '/productList/:id',
        component: productList,
        name:'productList'
    },




     {
        path: '/orderInfo/:id',
        component: orderInfo,
        name:'orderInfo'
     },
     {
        path: '/payOrder/:id',
        component: payOrder,
        name:'payOrder'
     },







     // people for traveler
     {
        path: '/addTraveler/:id',
        component: addTraveler,
        name:'addTraveler'
     },
     {
        path: '/chooseTraveler',
        component: chooseTraveler,
        name:'chooseTraveler'
     },


    //college route
    {
        path: '/collegeEventInfo/:id',
        component: collegeEventInfo,
        name:'collegeEventInfo'
    },


    
    
    
    
    
    //dynamic route
    {
        path: '/dynamicList',
        component: dynamicList,
        name:'dynamicList'
    },
    {
        path: '/dynamicInfo/:id',
        component: dynamicInfo,
        name:'dynamicInfo'
    },



    //Vip route

    {
        path: '/applySuccess',
        component: applySuccess,
        name:'applySuccess'
    },
    {
        path: '/applyVip',
        component: applyVip,
        name:'applyVip'
    },
    {
        path: '/firmApplied',
        component: firmApplied,
        name:'firmApplied'
    },
    {
        path: '/firmVipAuth',
        component: firmVipAuth,
        name:'firmVipAuth'
    },

    {
        path: '/demo',
        component: demo,
        name:'demo'
    },
]