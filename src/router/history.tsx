/**
 * 获取react-router路由对象，在js中跳转页面
 */
import { useState, useLayoutEffect, FC } from 'react'
import { createHashHistory, createBrowserHistory } from 'history'
import { HistoryRouterProps, Router } from 'react-router-dom'

// history 模式
// export const history = createBrowserHistory();
// hash 模式
// 1. 创建路由实例对象 => 作用：js中跳转页面
export const history = createHashHistory()
// 2. 创建路由函数组件 => 作用：包裹根组件,注册history
export const HistoryRouter: FC<HistoryRouterProps> = ({
  history,
  children,
}) => {
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  })

  useLayoutEffect(() => {
    history.listen(setState)
  }, [history])

  return <Router children={children} navigator={history} {...state} />
}
