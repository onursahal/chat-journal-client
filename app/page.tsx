import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

const Root = () =>
  cookies().get('accessToken') ? redirect('/home') : redirect('/sign-in')

export default Root
