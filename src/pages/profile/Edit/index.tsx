import { AppDispatch, RootState } from '@/store'
import { getUserProfile, updateUserProfile } from '@/store/actions/profile'
import { Button, List, DatePicker, NavBar, Popup, Toast } from 'antd-mobile'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import styles from './index.module.scss'
import EditInput from '../EditInput'

const Item = List.Item

const ProfileEdit = () => {
  const [inputVisible, setinputVisible] = useState(false)

  const onInputShow = () => {
    setinputVisible(true)
  }
  const navg = useNavigate()
  const dis = useDispatch<AppDispatch>()

  const {
    editUser: { photo, name, intro, gender, birthday },
  } = useSelector((state: RootState) => state.profile)
  const onInputHide = () => {
    setinputVisible(false)
  }
  const onUpdateName = async (value: string) => {
    console.log('父组件拿到修改后的昵称：', value)

    try {
      await dis(updateUserProfile({ name: value }))
      Toast.show({
        content: '更新成功',
        duration: 1000,
      })
      // 关闭弹出层
      onInputHide()
    } catch (error) {}
  }
  useEffect(() => {
    dis(getUserProfile())
  }, [dis])
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
            <Item arrow extra={name} onClick={onInputShow}>
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
      <Popup visible={inputVisible} position="right">
        <EditInput
          onClose={onInputHide}
          value={name}
          onUpdateName={onUpdateName}
        />
      </Popup>
    </div>
  )
}

export default ProfileEdit