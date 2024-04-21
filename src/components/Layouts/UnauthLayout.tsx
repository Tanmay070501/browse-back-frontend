import { Outlet } from 'react-router'
import Logo from '../Icons/Logo'
import { Link } from 'react-router-dom'

type Props = {
}

const UnauthLayout = (_props: Props) => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-4">
       <div className='min-h-16 h-16'>
            <Link className='p-4 w-full h-full flex' to={"/"}>
                <Logo/>
            </Link>
        </div>
        <Outlet/>
    </div>
  )
}

export default UnauthLayout