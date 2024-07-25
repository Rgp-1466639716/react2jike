// 路由配置
import Layout from '@/pages/Layout'
import Login from '@/pages/Login'
import { createBrowserRouter } from 'react-router-dom'
import { AuthRoute } from '@/components/AuthRoute'
import { Suspense, lazy } from 'react'

const Home = lazy((()=>import('@/pages/Home')))
const Publish = lazy((()=>import('@/pages/Publish')))
const Artical = lazy((()=>import('@/pages/Artical')))

const router = createBrowserRouter([
  {
    path:'/',
    element: <AuthRoute><Layout/></AuthRoute>,
    children:[
      {
        index:true,
        element: <Suspense fallback={'加载中'}><Home /></Suspense>
      },
      {
        path:'artical',
        element: <Suspense fallback={'加载中'}><Artical /></Suspense>
      },
      {
        path:'publish',
        element: <Suspense fallback={'加载中'}><Publish /></Suspense>
      }
    ]
  },
  {
    path:'/login',
    element:<Login/>
  }
])
export default router 