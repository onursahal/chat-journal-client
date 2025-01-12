'use server'

import { gql } from '@apollo/client'
import { getClient } from '@/app/apollo-client/ApolloClient'
import { cookies } from 'next/headers'

export const signInAction = async (email: string, password: string) => {
  try {
    const signInQuery = gql`
      query SignIn($email: String!, $password: String!) {
        signIn(email: $email, password: $password) {
          accessToken
          refreshToken
        }
      }
    `

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
  const query = gql`
    mutation SignUp(
      $firstName: String!
      $lastName: String!
      $email: String!
      $password: String!
    ) {
      signUp(
        firstName: $firstName
        lastName: $lastName
        email: $email
        password: $password
      ) {
        id
      }
    }
  `

  try {
    const data = await getClient().mutate({
      mutation: query,
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
