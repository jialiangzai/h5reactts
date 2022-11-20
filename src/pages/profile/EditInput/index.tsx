import { Input, NavBar, TextArea } from 'antd-mobile'
import { useState } from 'react'
import styles from './index.module.scss'
type Props = {
  type: '' | 'name' | 'intro'
  value: string
  onClose: () => void
  // onUpdateName: (val: string) => void
  onUpdateName: (type: 'name' | 'intro', value: string) => void
}

const EditInput = ({ onClose, value, onUpdateName, type }: Props) => {
  const [inputValue, setInputValue] = useState(value ?? '')
  const isName = type === 'name'
  // antd-mobile 中的 Popup 组件在隐藏时，不会销毁所渲染的内容，而是隐藏
  // useState` hook 默认值的特点只会在组件第一次渲染时生效
  // 通过 useEffect 监听 props.value 变化(注意空value 为 null 或 undefined 时，设置为默认值为空字符串 ?? )
  // 为 Popup 组件添加 destroyOnClose 属性
  // React 内部 diff 时，首先判断 key 是否相同，key 不同直接重新渲染该组件
  return (
    <div className={styles.root}>
      <NavBar
        onBack={onClose}
        className="navbar"
        right={
          <span
            className="commit-btn"
            onClick={() => {
              if (type === '') return
              onUpdateName(type, inputValue)
            }}>
            提交
          </span>
        }>
        编辑{isName ? '昵称' : '简介'}
      </NavBar>

      <div className="edit-input-content">
        <h3>{isName ? '昵称' : '简介'}</h3>

        {isName ? (
          <div className="input-wrap">
            <Input
              placeholder="请输入"
              value={inputValue}
              onChange={setInputValue}
            />
          </div>
        ) : (
          <TextArea
            className="textarea"
            placeholder="请输入"
            // 展示：右下角的字数统计
            showCount
            // 指定内容最大长度
            maxLength={100}
            // 指定 文本域 展示内容的行数（文本域高度）
            rows={4}
            value={inputValue}
            onChange={setInputValue}
          />
        )}
      </div>
    </div>
  )
}

export default EditInput
