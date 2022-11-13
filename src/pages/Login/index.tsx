import { Button, NavBar, Form, Input, Toast } from 'antd-mobile'
import styles from './index.module.scss'
import { LoginFormTy } from '@/types/data'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store/index'
import { asyncLoginAction } from '@/store/actions/login'
import { useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'
import { useRef } from 'react'
import { InputRef } from 'antd-mobile/es/components/input'
import { onGetCode } from '@/api/login'
const Login = () => {
  const dis = useDispatch<AppDispatch>()
  const usn = useNavigate()
  const mobileRef = useRef<InputRef>(null)
  const [form] = Form.useForm()
  const sendCode = async () => {
    const mobile = form.getFieldValue('mobile') || ''
    const iseor = form.getFieldError('mobile').length > 0
    if (!mobile.trim() || iseor) {
      return mobileRef.current!.focus()
    }
    // 发送验证码请求
    try {
      await onGetCode(mobile)
      Toast.show({
        icon: 'success',
        content: '发送成功',
      })
    } catch (error) {}
  }
  const onFinish = async (loginForm: LoginFormTy) => {
    console.log('loginForm', loginForm)
    try {
      await dis(asyncLoginAction(loginForm))
      Toast.show({
        icon: 'success',
        content: '登录成功',
      })
      usn('/')
    } catch (error) {
      const _err = error as AxiosError<{ message: string }>
      Toast.show({
        icon: 'fail',
        content: _err.response?.data.message,
      })
    }
  }
  return (
    <div className={styles.root}>
      <div className="login-form">
        <h2 className="title">账号登录</h2>

        <Form onFinish={onFinish} form={form}>
          <Form.Item
            className="login-item"
            name="mobile"
            rules={[
              { required: true, message: '手机号不能为空' },
              {
                pattern:
                  /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/,
                message: '请输入正确的11位手机号',
              },
            ]}>
            <Input placeholder="请输入手机号" maxLength={11} ref={mobileRef} />
          </Form.Item>

          <Form.Item
            className="login-item"
            name="code"
            rules={[
              { required: true, message: '请输入验证码' },
              {
                len: 6,
                message: '验证码为6位',
              },
            ]}
            extra={
              <span className="code-extra" onClick={sendCode}>
                发送验证码
              </span>
            }>
            <Input placeholder="请输入验证码" autoComplete="off" />
          </Form.Item>

          {/* noStyle 表示不提供 Form.Item 自带的样式 */}
          <Form.Item noStyle shouldUpdate>
            {() => {
              // isFieldsTouched(true) 检查是否所有字段都被操作过
              const untouched = !form.isFieldsTouched(true)
              // getFieldsError() 获取所有字段名对应的错误信息
              const hasError =
                form.getFieldsError().filter(({ errors }) => errors.length)
                  .length !== 0
              const disabled = untouched || hasError

              return (
                <Button
                  block
                  type="submit"
                  color="primary"
                  className="login-submit"
                  disabled={disabled}>
                  提交
                </Button>
              )
            }}
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
