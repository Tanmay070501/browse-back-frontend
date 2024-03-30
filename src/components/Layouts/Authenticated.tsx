import { useUserStore } from '@/store/useUserStore'
import React from 'react'
import { Outlet } from 'react-router'
import CommonLayout from './CommonLayout'

type Props = {

}

const Authenticated = ({}: Props) => {
  const authToken = useUserStore(state => state.authToken)

  React.useEffect(() => {
    console.log(authToken)
  }, [])

  return (
    <>
    <CommonLayout>
        <Outlet/>
    </CommonLayout>
    </>
  )
}

export default Authenticated