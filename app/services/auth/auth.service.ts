import { gql } from '@apollo/client'

export const authQueries = {
  login: () => gql`
    query Login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        accessToken
        refreshToken
      }
    }
  `,
}
