import Logo from '../Icons/Logo'
import { Link } from 'react-router-dom'
import { authenticatedRouterPaths } from '@/constants/router'
import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'
import CreateProject from '../CreateNewProject/CreateProject'

const navItems = [
    {
        path: authenticatedRouterPaths.DASHBOARD,
        name: "Dashboard"
    },
    {
        path: authenticatedRouterPaths.SESSION_REPLAYS,
        name: "Session Replays"
    }
]

type Props = {}

const SideNavbar = (_props: Props) => {
  return (
    <nav className='h-full w-64 min-w-64 shadow-md'>
        <div className='flex flex-col w-full h-full gap-4'>
            <div className='min-h-16 h-16'>
                <Link className='p-4 w-full h-full flex' to={"/"}>
                    <Logo/>
                </Link>
            </div>
            <ul className='px-5 flex-1 flex flex-col gap-[2px]'>
                {
                    navItems.map((item) => {
                        return (<li className='w-full' key={item.name}>
                            <NavLink 
                            className={({isActive}) => 
                                cn('flex items-center justify-center hover:bg-zinc-300 min-w-16 h-9 min-h-9 p-3 rounded-md', {
                                    'bg-black  hover:bg-black text-white hover:bg-opacity-75 pointer-events-none': isActive
                                })
                            } 
                            to={`/${item.path}`}
                            >
                                {item.name}
                            </NavLink>
                        </li>)
                    })
                }
                <li className='mt-auto mb-4'>
                {/* <Button className='w-full'>
                    + Create New Project
                </Button> */}
                    <CreateProject className='w-full'/>
                </li>
            </ul>
            
        </div>
    </nav>
  )
}

export default SideNavbar