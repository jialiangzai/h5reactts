// 导入页面组件
import Layout from '@/pages/Layout'
import Login from '@/pages/Login'
const routes = [
  {
    path: '/',
    element: <Layout />,
  },
  {
    path: '/login',
    element: <Login />,
  },
]
export default routes
