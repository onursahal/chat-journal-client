import { ApolloError } from '@apollo/client'
import { ProtectedQueryActionMap } from './auth.utils'
import { cookies } from 'next/headers'

export const errorHandlerAction = async <
  T extends keyof ProtectedQueryActionMap,
>(
  error: unknown,
  queryFunc?: ProtectedQueryActionMap[T]
) => {
  if (error instanceof ApolloError) {
    const extensions = error.graphQLErrors[0].extensions
    const errorCode = extensions?.errorCode as string

    if (queryFunc) {
      handleAuthError(errorCode, queryFunc)
    }

    return { data: null, error: extensions }
  }

  return {
    data: null,
    error: {
      errorCode: 'SOMETHING_WENT_WRONG',
      type: 'CLIENT_ERROR_HANDLER',
    },
  }
}

const handleAuthError = <T extends keyof ProtectedQueryActionMap>(
  errorCode: string,
  queryFunc: ProtectedQueryActionMap[T]
) => {
  if (
    errorCode === 'INVALID_REFRESH_TOKEN' ||
    errorCode === 'REFRESH_TOKEN_EXPIRED'
  ) {
    cookies().delete('refreshToken')

    return queryFunc
  }

  if (
    errorCode === 'INVALID_ACCESS_TOKEN' ||
    errorCode === 'ACCESS_TOKEN_EXPIRED'
  ) {
    cookies().delete('accessToken')

    return queryFunc
  }

  return
}
