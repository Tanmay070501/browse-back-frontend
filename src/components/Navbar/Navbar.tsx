import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { AvatarIcon, ExitIcon, IdCardIcon } from '@radix-ui/react-icons'
import { DropdownWithSearch } from '../DropdownWithSearch/DropdownWithSearch'
import { useUserStore } from '@/store/useUserStore'
import { useProjectStore } from '@/store/useProjectStore'

type Props = {}

const Navbar = (props: Props) => {
  const projectsList = useProjectStore(state => state.projectsList)
  const currentProject = useProjectStore(state => state.currentProject)
  const setCurrentProject = useProjectStore(state => state.setCurrentProject)
  const logout = useUserStore(state => state.logout)
  const handleChange = (val: string) => {
    const project = projectsList.find(el => el.name === val)
    console.log(project, val)
    if(!project) return
    setCurrentProject(project)
  }
//   const [project, setProject] = React.useState("")

  const user = useUserStore(state => state.user) 
  return (
    <nav className='min-h-16 h-16 bg-white shadow-sm relative z-[1]'>
        <div className='flex items-center w-full h-full px-4'>
        <DropdownWithSearch 
            label='Select Project' 
            notFoundLabel='No project found' 
            searchLabel='Search Project' 
            value={currentProject?.name ?? ""} 
            onChange={(v) => handleChange(v)} 
            options={projectsList.map(project => project.name)} 
        />
        <DropdownMenu>
            <DropdownMenuTrigger asChild className='ml-auto'>
            <Avatar className='cursor-pointer'>
                {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                
                <AvatarFallback><AvatarIcon className='h-6 w-6'/></AvatarFallback>
            </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-64 max-w-64' hideWhenDetached collisionPadding={5}>
                <DropdownMenuLabel className='text-center'>
                    <p className='text-lg'>My account</p>
                    {
                        user && 
                        <>
                            <p className='text-wrap break-all'>Name: {user.name}</p>
                            <p className='text-wrap break-all'>{user.email}</p>
                        </>
                    }
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className='cursor-pointer justify-center items-center'>
                  <span className='flex justify-start items-center w-max gap-2'>
                    <span>Team</span>
                    <IdCardIcon className="h-4 w-4"/>
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={_e => logout()} className='cursor-pointer justify-center items-center'>
                  <span className='flex justify-start items-center w-max gap-2'>
                    <span>Log out</span>
                    <ExitIcon className="h-4 w-4"/>
                  </span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        
        </div>
    </nav>
  )
}

export default Navbar