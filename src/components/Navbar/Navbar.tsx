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
import { AvatarIcon } from '@radix-ui/react-icons'

type Props = {}

const Navbar = (props: Props) => {
  return (
    <nav className='min-h-16 h-16 bg-white shadow-sm relative z-[1]'>
        <div className='flex items-center w-full h-full px-4'>
        <DropdownMenu>
            <DropdownMenuTrigger asChild className='ml-auto'>
            <Avatar className='cursor-pointer'>
                {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                
                <AvatarFallback><AvatarIcon className='h-6 w-6'/></AvatarFallback>
            </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent hideWhenDetached collisionPadding={5}>
                <DropdownMenuLabel className='text-center'>
                    <p>
                        My Account
                    </p>
                    <p>email@email.com</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {/* <DropdownMenuItem className='cursor-pointer'>Profile</DropdownMenuItem> */}
                <DropdownMenuItem className='cursor-pointer'>Team</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        
        </div>
    </nav>
  )
}

export default Navbar