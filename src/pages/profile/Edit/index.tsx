import { AppDispatch, RootState } from '@/store'
import { getUserProfile } from '@/store/actions/profile'
import { Button, List, DatePicker, NavBar } from 'antd-mobile'
import classNames from 'classnames'
import { stat } from 'fs'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import styles from './index.module.scss'

const Item = List.Item

const ProfileEdit = () => {
  const navg = useNavigate()
  const dis = useDispatch<AppDispatch>()
  useEffect(() => {
    dis(getUserProfile())
  }, [dis])
  const {
    editUser: { photo, name, intro, gender, birthday },
  } = useSelector((state: RootState) => state.profile)
  return (
    <div className={styles.root}>
      <div className="content">
        {/* 标题 */}
        <NavBar
          onBack={() => navg(-1)}
          style={{
            '--border-bottom': '1px solid #F0F0F0',
          }}>
          个人信息
        </NavBar>

        <div className="wrapper">
          {/* 列表 */}
          <List className="profile-list">
            {/* 列表项 */}
            <Item
              extra={
                <span className="avatar-wrapper">
                  <img width={24} height={24} src={photo} alt="" />
                </span>
              }
              arrow>
              头像
            </Item>
            <Item arrow extra={name}>
              昵称
            </Item>
            <Item
              arrow
              extra={
                <span className={classNames('intro', intro && 'normal')}>
                  {intro || '未填写'}
                </span>
              }>
              简介
            </Item>
          </List>

          <List className="profile-list">
            <Item arrow extra={gender === 0 ? '男' : '女'}>
              性别
            </Item>
            <Item arrow extra={birthday}>
              生日
            </Item>
          </List>

          <DatePicker
            visible={false}
            value={new Date()}
            title="选择年月日"
            min={new Date(1900, 0, 1, 0, 0, 0)}
            max={new Date()}
          />
        </div>

        <div className="logout">
          <Button className="btn">退出登录</Button>
        </div>
      </div>
    </div>
  )
}

export default ProfileEdit
