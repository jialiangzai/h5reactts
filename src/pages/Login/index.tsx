import { Button, NavBar, Form, Input, Toast } from 'antd-mobile'
import styles from './index.module.scss'
import { LoginFormTy } from '@/types/data'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store/index'
import { asyncLoginAction } from '@/store/actions/login'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const dis = useDispatch<AppDispatch>()
  const usn = useNavigate()
  const onFinish = async (loginForm: LoginFormTy) => {
    console.log('loginForm', loginForm)
    try {
      await dis(asyncLoginAction(loginForm))
      Toast.show({
        icon: 'success',
        content: '登录成功',
      })
      usn('/')
    } catch (error) {}
  }
  return (
    <div className={styles.root}>
      <div className="login-form">
        <h2 className="title">账号登录</h2>

        <Form onFinish={onFinish}>
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
            <Input placeholder="请输入手机号" />
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
            extra={<span className="code-extra">发送验证码</span>}>
            <Input placeholder="请输入验证码" autoComplete="off" />
          </Form.Item>

          {/* noStyle 表示不提供 Form.Item 自带的样式 */}
          <Form.Item noStyle>
            <Button
              block
              type="submit"
              color="primary"
              className="login-submit">
              登 录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
