import { useUserStore } from '@/store/useUserStore'
import React from 'react'
import { Outlet } from 'react-router'
import CommonLayout from './CommonLayout'
import { getUserDetails } from '@/actions/user'
import { getProjects } from '@/actions/project'

type Props = {

}

const Authenticated = ({}: Props) => {
  const authToken = useUserStore(state => state.authToken)

  React.useEffect(() => {
    const init = async () => {
      await getUserDetails()
      await getProjects()
    }
    init()
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