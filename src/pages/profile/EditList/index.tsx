import styles from './index.module.scss'
type Props = {
  type: '' | 'gender' | 'photo'
  onClose: () => void
  onUpdateProfile: (type: '' | 'gender' | 'photo', value: string) => void
}
const genderList = [
  { text: '男', value: '0' },
  { text: '女', value: '1' },
]

const photoList = [
  { text: '拍照', value: '' },
  { text: '本地选择', value: '' },
]

// 要渲染的数据为：
const EditList = ({ onClose, type, onUpdateProfile }: Props) => {
  const list = type === 'gender' ? genderList : photoList
  return (
    <div className={styles.root}>
      {list.map((item) => (
        <div
          className="list-item"
          key={item.text}
          onClick={() => {
            if (type === '') return
            onUpdateProfile(type, item.value)
          }}>
          {item.text}
        </div>
      ))}

      <div className="list-item" onClick={onClose}>
        取消
      </div>
    </div>
  )
}

export default EditList
