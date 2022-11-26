import Icon from '@/components/Icon'
import { useInitState } from '@/hooks/use-initial-state'
import { getUserChannel } from '@/store/actions/home'
import { Tabs } from 'antd-mobile'
import styles from './index.module.scss'

const Home = () => {
  const { userChannel } = useInitState(getUserChannel, 'home')
  return (
    <div className={styles.root}>
      {userChannel.length > 0 && (
        <Tabs className="tabs" activeLineMode="fixed">
          {userChannel.map((item) => (
            <Tabs.Tab title={item.name} key={item.id}>
              {`推荐频道的内容:${item.id}`}
            </Tabs.Tab>
          ))}
        </Tabs>
      )}
      <div className="tabs-opration">
        <Icon type="iconbtn_search" />
        <Icon type="iconbtn_channel" />
      </div>
    </div>
  )
}

export default Home
