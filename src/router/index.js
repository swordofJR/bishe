import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Dashboard from '@/pages/Dashboard'
import BasicTable from '@/pages/BasicTable'
import EditableTable from '@/pages/EditableTable'
import Widget from '@/pages/Widget'
import Panels from '@/pages/Panels'
import Editor from '@/pages/Editor'
import ImageList from '@/pages/ImageList'
import Charts from '@/pages/Charts'
import Login from '@/pages/Login'
import LockScreen from '@/pages/LockScreen'
import Loading from '@/pages/Loading'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/',
            component: Home,
            children: [
                {
                    path: '/',
                    name: 'Dashboard',
                    component: Dashboard
                },
                {
                    path: 'widget',
                    name: 'Widget',
                    component: Widget
                },
                {
                    path: 'panels',
                    name: 'Panels',
                    component: Panels,
                    meta: {
                        title: '上传版权'
                    }
                },
                {
                    path: 'editor',
                    name: 'Editor',
                    component: Editor
                },
                {
                    path: 'imagelist',
                    name: 'ImageList',
                    component: ImageList
                },
                {
                    path: 'basic-table',
                    name: 'BasicTable',
                    component: BasicTable,
                    meta: {
                        keepAlive: true,
                        title: '我的数字藏品版权'
                    }
                },
                {
                    path: 'editable-table',
                    name: 'EditableTable',
                    component: EditableTable,
                    meta: {
                        keepAlive: true,
                        title: '审核版权申请'
                    }
                },
                {
                    path: 'charts',
                    name: 'Charts',
                    component: Charts
                }
            ]
        },
        {
            path: '/login',
            name: 'Login',
            components: {
                blank: Login
            }
        },
        {
            path: '/lockscreen',
            name: 'Lockscreen',
            components: {
                blank: LockScreen
            }
        },
        {
            path: '/loading',
            name: 'Loading',
            components: {
                blank: Loading
            }
        }
    ]
})
