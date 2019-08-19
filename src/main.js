import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

// Axios
import Axios from 'axios'
Vue.prototype.$ajax = Axios

Vue.config.productionTip = false

import { Lazyload } from 'vant'
Vue.use(Lazyload, {
    preLoad: 1.3,
    error: "https://developers.google.com/maps/documentation/maps-static/images/error-image-generic.png",
    loading: 'http://belganal.com/wpbn/wp-content/uploads/img-loading.gif',
    attempt: 3
})

import Vuex from 'vuex'
Vue.use(Vuex)

var store = new Vuex.Store({
    state: {
        goodsDetailShow: false,
        goodsItemId: 0,
        currentProduct: {},
        cart: [
            {
                id: '773',
                name: '強生define新美瞳日拋30片裝',
                img: 'mock/img/2f_2.jpg',
                price: '169',
                num: 3,
            },
        ],
        pendingForPaymentList: [
            {
                orderId: '336661',
                type: 1,
                orderTime: '2019-05-12',
                img: 'mock/img/10f-1.jpg',
                desc: '安瞳Mandol（蔓朵）系列美瞳日拋混血自然彩色隱形眼鏡5片裝',
                price: '168',
                num: 3,
            },
            {
                orderId: '336664',
                type: 1,
                orderTime: '2019-05-11',
                img: 'mock/img/10f-2.jpg',
                desc: '安瞳Mandol（蔓朵）系列美瞳日拋混血自然彩色隱形眼鏡5片裝',
                price: '211',
                num: 2,
            },
            {
                orderId: '336665',
                type: 1,
                orderTime: '2019-04-10',
                img: 'mock/img/10f-3.jpg',
                desc: '安瞳Mandol（蔓朵）系列美瞳日拋混血自然彩色隱形眼鏡5片裝',
                price: '112',
                num: 5,
            },
        ],
        cartTabberNotify: false
    },
    mutations: {
        changeGoodsDetailShow(state) {
            state.goodsDetailShow = !state.goodsDetailShow
        },
        changeGoodsItemId(state, goodsID) {
            state.goodsItemId = goodsID
        },
        changeCurrentProduct(state, product) {
            state.currentProduct = JSON.parse(JSON.stringify(product))
        },
        addCart(state, product) {
            state.cart.push(product)
        },
        clearCart(state) {
            state.cart = []
        },
        addPendingForPaymentList(state, cartList) {
            state.pendingForPaymentList = state.pendingForPaymentList.concat(cartList)
        },
        cartTabberSwitch(state) {
            state.cartTabberNotify = !state.cartTabberNotify
            console.log('state.cartTabberNotify',state.cartTabberNotify);
        }
    },
})

import HomeView from './components/HomeView/HomeView.vue'
import AssortView from './components/AssortView/AssortView.vue'
import SearchView from './components/SearchView/SearchView.vue'
import CartView from './components/CartView/CartView.vue'
import MineView from './components/MineView/MineView.vue'

var routes = [
    {
        path: '/',
        // component: HomeView
        redirect: '/home',
    },
    {
        path: '/home',
        component: HomeView,
    },
    {
        path: '/assort',
        component: AssortView,
    },
    {
        path: '/search',
        component: SearchView,
    },
    {
        path: '/cart',
        component: CartView,
    },
    {
        path: '/mine',
        component: MineView,
    },
]

var router = new VueRouter({
    // routes:routes
    routes,
})

new Vue({
    render: h => h(App),
    router,
    store,
}).$mount('#app')
