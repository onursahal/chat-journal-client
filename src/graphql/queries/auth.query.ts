import { gql } from '@apollo/client'

export const signInQuery = gql`
  query SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      accessToken
      refreshToken
    }
  }
`
