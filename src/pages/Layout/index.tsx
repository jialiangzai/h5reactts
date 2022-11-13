import { Route } from 'react-router-dom'
import { TabBar } from 'antd-mobile'
import styles from './index.module.scss'
import Icon from '@/components/Icon'
import { Outlet } from 'react-router-dom'

// 菜单数据
const tabs = [
  { path: '/', icon: 'iconbtn_home', text: '首页' },
  { path: '/question', icon: 'iconbtn_qa', text: '问答' },
  { path: '/video', icon: 'iconbtn_video', text: '视频' },
  { path: '/profile', icon: 'iconbtn_mine', text: '我的' },
]

const Layout = () => {
  return (
    <div className={styles.root}>
      {/* 子路由挂载点 */}
      <Outlet />

      <TabBar className="tab-bar">
        {tabs.map((item) => (
          <TabBar.Item
            key={item.path}
            icon={(active) => (
              <Icon
                type={active ? `${item.icon}_sel` : item.icon}
                className="tab-bar-item-icon"
              />
            )}
            title={item.text}
          />
        ))}
      </TabBar>
    </div>
  )
}

export default Layout
