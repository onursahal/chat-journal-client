import { redirect } from 'next/navigation'
import { ProtectedQueryActionMap } from './auth.utils'
import { getTokenPairQuery } from '@/src/graphql/queries/auth.query'
import { getClient } from '@/src/graphql/ApolloClient'
import { cookies } from 'next/dist/client/components/headers'
import { errorHandlerAction } from './errorHandler'

export const checkAuthAction = async <T extends keyof ProtectedQueryActionMap>(
  queryFunc: ProtectedQueryActionMap[T]
) => {
  const { accessToken, refreshToken } = returnTokenPairFromCookies()

  if (!accessToken && !refreshToken) {
    return redirect('/sign-in')
  }

  if (!accessToken && refreshToken) {
    await writeTokenPairToCookiesAction(queryFunc)
  }

  return
}

const returnTokenPairFromCookies = () => {
  const accessToken = cookies().get('accessToken')?.value
  const refreshToken = cookies().get('refreshToken')?.value
  return { accessToken, refreshToken }
}

const writeTokenPairToCookiesAction = async <
  T extends keyof ProtectedQueryActionMap,
>(
  queryFunc: ProtectedQueryActionMap[T]
) => {
  const { refreshToken } = returnTokenPairFromCookies()
  try {
    const data = await getClient().query({
      query: getTokenPairQuery,
      variables: { currentRefreshToken: refreshToken },
    })

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      data.data.getTokenPair

    cookies().set('accessToken', newAccessToken)
    cookies().set('refreshToken', newRefreshToken)
  } catch (error) {
    await errorHandlerAction(error, queryFunc)
  }
}
