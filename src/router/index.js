// 路由配置
import Layout from '@/pages/Layout'
import Login from '@/pages/Login'
import { createBrowserRouter } from 'react-router-dom'
import { AuthRoute } from '@/components/AuthRoute'
import Artical from '@/pages/Artical'
import Publish from '@/pages/Publish'
import Home from '@/pages/Home'

const router = createBrowserRouter([
  {
    path:'/',
    element: <AuthRoute><Layout/></AuthRoute>,
    children:[
      {
        index:true,
        element: <Home />
      },
      {
        path:'artical',
        element: <Artical />
      },
      {
        path:'publish',
        element: <Publish />
      }
    ]
  },
  {
    path:'/login',
    element:<Login/>
  }
])
export default router 