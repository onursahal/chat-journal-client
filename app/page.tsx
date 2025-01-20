import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

const Root = () =>
  cookies().get('accessToken') ? redirect('/dashboard') : redirect('/sign-in')

export default Root
