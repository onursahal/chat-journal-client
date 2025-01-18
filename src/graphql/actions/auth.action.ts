'use server'

import { getClient } from '@/src/graphql/ApolloClient'
import { cookies } from 'next/headers'
import {
  getTokenPairQuery,
  signInQuery,
} from '@/src/graphql/queries/auth.query'
import { signUpQuery } from '@/src/graphql/mutations/auth.mutation'
import { errorHandlerAction } from '@/src/lib/errorHandler'

export const signInAction = async (
  email: string,
  password: string,
  rememberMe?: boolean
) => {
  try {
    const data = await getClient().query({
      query: signInQuery,
      variables: { email, password },
    })

    cookies().set('accessToken', data.data.signIn.accessToken)
    cookies().set('refreshToken', data.data.signIn.refreshToken)
    cookies().set('rememberMe', rememberMe ? 'true' : 'false')

    return { data: data.data.signIn, error: null }
  } catch (error) {
    return errorHandlerAction(error)
  }
}

export const signUpAction = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  try {
    const data = await getClient().mutate({
      mutation: signUpQuery,
      variables: {
        firstName,
        lastName,
        email,
        password,
      },
    })

    return { data: data.data.signUp, errorMessage: null }
  } catch (error) {
    return errorHandlerAction(error)
  }
}

export const getTokenPairAction = async (refreshToken: string) => {
  try {
    const data = await getClient().query({
      query: getTokenPairQuery,
      variables: { refreshToken },
    })

    cookies().set('accessToken', data.data.getTokenPair.accessToken)
    cookies().set('refreshToken', data.data.getTokenPair.refreshToken)

    return { data: data.data.getTokenPair, errorMessage: null }
  } catch (error) {
    return errorHandlerAction(error)
  }
}
