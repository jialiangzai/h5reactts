import Icon from '@/components/Icon'
const Test = () => {
  return (
    <>
      <div>Test页面</div>
      <div>
        <svg className="icon" aria-hidden="true">
          {/* 使用时，只需要将此处的 iconbtn_like_sel 替换为 icon 的名称即可*/}
          <use xlinkHref="#iconbtn_like_sel"></use>
        </svg>
        <Icon
          type="iconbtn_mine"
          className="ll"
          onClick={() => console.log('123')}></Icon>
      </div>
    </>
  )
}
export default Test
