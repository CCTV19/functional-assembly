//引入Vue
import Vue from 'vue'
//引入App App是所有组件的父组件
import App from './App.vue'

import VueRouter from 'vue-router'

//引入路由器
import router from "./router"
//关闭Vue的生产提示
Vue.config.productionTip = false

Vue.use(VueRouter)
//创建vm
new Vue({
	el:'#app', //服务于index.html里的<div id='app'></div>这个容器
	render: h => h(App),//render(createElement)函数
						//(该渲染函数接收一个 createElement 方法作为第一个参数用来创建 VNode)
						//里的参数用q来代替createElement 然后引入App组件
	router:router,
	beforeCreate() {
		Vue.prototype.$bus = this  //设置全局事件总线
	},
})