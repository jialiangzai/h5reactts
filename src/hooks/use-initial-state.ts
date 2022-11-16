import { AppDispatch, RootState } from '@/store'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { AppThunk } from '@/store'
/**
 * 1. 将相同的逻辑直接拷贝到函数中
   2. 不同的数据或逻辑通过函数参数传入
   3. 需要返回数据，就通过函数返回值返回
 */

export function useInitState<stateName extends keyof RootState>(
  action: () => AppThunk,
  stateName: stateName
) {
  const dis = useDispatch<AppDispatch>()
  const data = useSelector((state: RootState) => state[stateName])
  useEffect(() => {
    dis(action())
  }, [dis])
  return data
}
