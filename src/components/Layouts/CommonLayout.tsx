import React from 'react'
import Navbar from '../Navbar/Navbar'
import SideNavbar from '../Navbar/SideNavbar'
import { InviteUser } from '../InviteUser/InviteUser'

type Props = {
    children: React.ReactNode
}

const CommonLayout = (props: Props) => {
  return (
    <>
        <div className='flex w-full h-full'>
            <SideNavbar/>
            <div className='flex-1 flex flex-col'>
                <Navbar/>
                <div className='flex-1 p-4 w-full overflow-hidden relative'>
                {props.children}
                </div>
            </div>
        </div>
        <InviteUser/>
    </>
  )
}

export default CommonLayout