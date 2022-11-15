// 导入页面组件
import Layout from '@/pages/Layout'
import Login from '@/pages/Login'
import Test from '@/pages/test'
// 导入子页面
import Home from '@/pages/home'
import Question from '@/pages/question'
import Video from '@/pages/video'
import Profile from '@/pages/profile'
import ProfileEdit from '@/pages/profile/Edit'
const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/question',
        element: <Question />,
      },
      {
        path: '/video',
        element: <Video />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
    ],
  },
  {
    path: '/profile/edit',
    element: <ProfileEdit />,
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
