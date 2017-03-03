const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
const web = r => require.ensure([], () => r(require('../page/web/web')), 'web')

const product = r => require.ensure([], () => r(require('../page/product/product')), 'product')
const buyProduct = r => require.ensure([], () => r(require('../page/product/buyProduct')), 'buyProduct')

const productList = r => require.ensure([], () => r(require('../page/product/productList')), 'productList')
const orderInfo = r => require.ensure([], () => r(require('../page/order/orderInfo')), 'orderInfo')
const payOrder = r => require.ensure([], () => r(require('../page/order/payOrder')), 'payOrder')





//college route
const collegeEventInfo = r => require.ensure([], () => r(require('../page/college/collegeEventInfo')), 'collegeEventInfo')


const demo = r => require.ensure([], () => r(require('../page/demo')), 'demo')
const menu = r => require.ensure([], () => r(require('../page/menu')), 'menu')


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
        component: buyProduct,
        name:'buyProduct'
    },
    {
        path: '/buyProduct/:id',
        component: product,
        name:'product'
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



    //college route
    {
        path: '/collegeEventInfo/:id',
        component: collegeEventInfo,
        name:'collegeEventInfo'
     },






    {
        path: '/demo',
        component: demo,
        name:'demo'
    },
]