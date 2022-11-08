// 导入页面组件
import Layout from '@/pages/Layout'
import Login from '@/pages/Login'
import Test from '@/pages/test'
const routes = [
  {
    path: '/',
    element: <Layout />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/test',
    element: <Test />,
  },
]
export default routes
