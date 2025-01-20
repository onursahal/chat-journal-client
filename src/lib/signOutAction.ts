'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const signOutAction = () => {
  cookies().delete('accessToken')
  cookies().delete('refreshToken')

  return redirect('/sign-in')
}
