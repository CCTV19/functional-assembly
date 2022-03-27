import VueRouter from "vue-router"

import GitSreach from "../pages/GitSreach.vue"
import TodoList from "../pages/TodoList.vue"
/* import News from '../pages/News.vue'
import Message from '../pages/Message.vue'
import Detail from '../pages/Detail.vue' */

const router = new VueRouter({
    routes:[
        {
            name:'GitSreach',
            path:'/GitSreach',
            component:GitSreach,
            meta:{title:'搜索'}
        },
        {
            name:'TodoList',
            path:'/TodoList',
            component:TodoList,
            meta:{title:'工具'},
        }
            /*
            children:[
                {
                    name:'xinwen',
                    path:'news',
                    component:News,
                    meta:{
                        isAuth:true,
                        title:'新闻'
                    },
                    beforeEnter:(to,from,next)=>{  //独享路由守卫
                        if(to.meta.isAuth){ //判断是否需要鉴权
                            if(localStorage.getItem('school')==='atguigu'){ //对本地的信息进行校验
                                next() //放行
                            }else{
                                alert("学校名不对，无权限查看")
                            }
                        }else{
                            next()
                        }
                    }
                },
                {
                    name:'xiaoxi',
                    path:'message',
                    component:Message,
                    meta:{
                        isAuth:true,
                        title:'消息'
                    },
                    children:[
                        {
                            name:'xiangqing',
                            path:'detail',
                            component:Detail,
                            meta:{
                                isAuth:true,
                                title:'详情'
                            },
                        }
                    ]
                }
            ]
        } */
    ]
})
//全局前置路由守卫
/* router.beforeEach((to,from,next)=>{
    
    if(to.meta.isAuth){ //判断是否需要鉴权
        if(localStorage.getItem('school')==='atguigu'){ //对本地的信息进行校验
            next() //放行
        }else{
            alert("学校名不对，无权限查看")
        }
    }else{
        next()
    }
})*/

router.afterEach((to,from)=>{
    document.title = to.meta.title || '项目'
}) 

export default router