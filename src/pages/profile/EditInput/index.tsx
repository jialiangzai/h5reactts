import { Input, NavBar } from 'antd-mobile'
import { useState } from 'react'
import styles from './index.module.scss'
type Props = {
  onClose: () => void
  value: string
  onUpdateName: (val: string) => void
}
const EditInput = ({ onClose, value, onUpdateName }: Props) => {
  const [inputValue, setInputValue] = useState(value)
  return (
    <div className={styles.root}>
      <NavBar
        onBack={onClose}
        className="navbar"
        right={
          <span className="commit-btn" onClick={() => onUpdateName(inputValue)}>
            提交
          </span>
        }>
        编辑昵称
      </NavBar>

      <div className="edit-input-content">
        <h3>昵称</h3>

        <div className="input-wrap">
          {/* onChange={setInputValue}传入修改函数 */}
          <Input
            placeholder="请输入"
            value={inputValue}
            onChange={setInputValue}
          />
        </div>
      </div>
    </div>
  )
}

export default EditInput
