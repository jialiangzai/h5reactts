import classNames from 'classnames'

// 自定义图标组件
type Props = {
  type: string
  onClick?: () => void
  className?: string
}
const Icon = ({ type, onClick, className }: Props) => {
  return (
    <>
      <svg
        className={classNames('icon', className)}
        aria-hidden="true"
        onClick={onClick}>
        {/* 使用时，只需要将此处的 iconbtn_like_sel 替换为 icon 的名称即可*/}
        <use xlinkHref={`#${type}`}></use>
      </svg>
    </>
  )
}
export default Icon
