import { AppDispatch, RootState } from '@/store'
import {
  getUserProfile,
  updatePhoto,
  updateUserProfile,
} from '@/store/actions/profile'
import { Button, List, DatePicker, NavBar, Popup, Toast } from 'antd-mobile'
import classNames from 'classnames'
import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styles from './index.module.scss'
import EditInput from '../EditInput'
import EditList from '../EditList'
const Item = List.Item
type InputPopup = {
  type: '' | 'name' | 'intro'
  value: string
  visible: boolean
}
type ListPopup = {
  type: '' | 'gender' | 'photo'
  visible: boolean
}
const ProfileEdit = () => {
  // const [inputVisible, setinputVisible] = useState(false)
  // 现在：
  const [inputVisible, setinputVisible] = useState<InputPopup>({
    // type 属性：用于告诉 EditInput 组件，当前修改的是昵称还是简介
    type: '', // 'name' or 'intro'
    // 当前值
    value: '',
    // 展示或隐藏状态
    visible: false,
  })
  const [listPopup, setListPopup] = useState<ListPopup>({
    type: '',
    visible: false,
  })

  const onGenderShow = () => {
    setListPopup({
      type: 'gender',
      visible: true,
    })
  }
  const onGenderHide = () => {
    setListPopup({
      type: '',
      visible: false,
    })
  }
  const onInputShow = () => {
    setinputVisible({
      type: 'name',
      value: name,
      visible: true,
    })
  }
  const navg = useNavigate()
  const dis = useDispatch<AppDispatch>()

  const {
    editUser: { photo, name, intro, gender, birthday },
  } = useSelector((state: RootState) => state.profile)
  const onInputHide = () => {
    setinputVisible({
      type: '',
      value: '',
      visible: false,
    })
  }
  const fileRef = useRef<HTMLInputElement>(null)

  const onChangePhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) {
      return
    }
    const formData = new FormData()
    formData.append('photo', e.target.files[0])
    console.log(formData.get('photo'))
    await dis(updatePhoto(formData))
    Toast.show({
      content: '更新成功',
      duration: 1000,
    })
    onGenderHide()
  }

  const [showBirthday, setShowBirthday] = useState(false)

  const onBirthdayShow = () => {
    setShowBirthday(true)
  }
  const onBirthdayHide = () => {
    setShowBirthday(false)
  }
  const onUpdateName = async (type: string, value: string | number) => {
    console.log('父组件拿到修改后的昵称：', value)
    try {
      if (type === 'photo') {
        fileRef.current?.click()
      } else {
        await dis(updateUserProfile({ [type]: value }))
        Toast.show({
          content: '更新成功',
          duration: 1000,
        })
        // 关闭弹出层
        onInputHide()
        onGenderHide()
      }
    } catch (error) {}
  }
  const onIntroShow = () => {
    setinputVisible({
      type: 'intro',
      value: intro,
      visible: true,
    })
  }
  const onPhotoShow = () => {
    setListPopup({
      type: 'photo',
      visible: true,
    })
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
              arrow
              onClick={onPhotoShow}>
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
              }
              onClick={onIntroShow}>
              简介
            </Item>
          </List>

          <List className="profile-list">
            <Item
              arrow
              extra={gender === 0 ? '男' : '女'}
              onClick={onGenderShow}>
              性别
            </Item>
            <Item arrow extra={birthday} onClick={onBirthdayShow}>
              生日
            </Item>
          </List>

          <DatePicker
            visible={showBirthday}
            value={new Date(birthday)}
            onCancel={onBirthdayHide}
            title="选择年月日"
            min={new Date(1900, 0, 1, 0, 0, 0)}
          />
        </div>

        <div className="logout">
          <Button className="btn">退出登录</Button>
        </div>
      </div>
      <Popup visible={inputVisible.visible} position="right" destroyOnClose>
        <EditInput
          key={inputVisible.type}
          type={inputVisible.type}
          onClose={onInputHide}
          value={inputVisible.value}
          onUpdateName={onUpdateName}
        />
      </Popup>
      <Popup visible={listPopup.visible} onMaskClick={onGenderHide}>
        <EditList
          onClose={onGenderHide}
          type={listPopup.type}
          onUpdateProfile={onUpdateName}
        />
      </Popup>
      <input type="file" hidden ref={fileRef} onChange={onChangePhoto} />
    </div>
  )
}

export default ProfileEdit
