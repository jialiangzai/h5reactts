import { ReactElement } from 'react'
import { isAuth } from '@/utils/token'
import { Navigate } from 'react-router-dom'
type Props = {
  element: ReactElement
}
const AuthRoute = ({ element }: Props) => {
  return <>{isAuth() ? element : <Navigate to="/login" replace={true} />}</>
}
export default AuthRoute
