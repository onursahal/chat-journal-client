import { Menu } from 'lucide-react'
import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu'
import { Button } from './button'

interface NavbarProps {
  brandName?: string
  brandLogo?: React.ReactNode
}

const Navbar: React.FC<NavbarProps> = ({ brandName, brandLogo }) => (
  <div className="w-1/2 fixed top-10 bg-gray-700 h-16 rounded-md items-center justify-between flex px-4">
    <span className="text-white text-2xl font-bold">
      {brandLogo || brandName}
    </span>
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button>
          <Menu />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Sign Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
)

export { Navbar }
