'use client'

import { Menu } from 'lucide-react'
import React, { Suspense } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu'
import { Button } from './button'
import dynamic from 'next/dynamic'
import { Loader2 } from 'lucide-react'

const ThemeToggle = dynamic(() => import('./theme-toggle'), {
  ssr: false,
})

interface NavbarProps {
  brandName?: string
  brandLogo?: React.ReactNode
}

const Navbar: React.FC<NavbarProps> = ({ brandName, brandLogo }) => (
  <div className="w-[calc(100%-2rem)] bg-card flex h-16 rounded-md items-center justify-between px-4 absolute top-4 z-20 items-start content-start">
    <span className="text-primary-foreground text-2xl font-bold">
      {brandLogo || brandName}
    </span>
    <div className="flex items-center gap-2">
      <Suspense fallback={<Loader2 className="h-4 w-4" />}>
        <ThemeToggle />
      </Suspense>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
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
  </div>
)

export { Navbar }
