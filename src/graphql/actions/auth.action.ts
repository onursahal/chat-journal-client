'use server'

import { getClient } from '@/src/graphql/ApolloClient'
import { cookies } from 'next/headers'
import { signInQuery } from '@/src/graphql/queries/auth.query'
import { signUpQuery } from '@/src/graphql/mutations/auth.mutation'

export const signInAction = async (email: string, password: string) => {
  try {
    const data = await getClient().query({
      query: signInQuery,
      variables: { email, password },
    })

    cookies().set('accessToken', data.data.signIn.accessToken)
    cookies().set('refreshToken', data.data.signIn.refreshToken)

    return { data: data.data.signIn, errorMessage: null }
  } catch {
    return { data: null, errorMessage: 'Something went wrong' }
  }
}

// TODO: Backend error handling will change

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
  } catch {
    return { data: null, errorMessage: 'Something went wrong' }
  }
}

// TODO: Backend error handling will change
