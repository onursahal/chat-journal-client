import axios, { AxiosResponse } from 'axios'

const url = '/api/graphql'

type User = {
  name: string
  email: string
  id: string
}

export const fetcher = <T extends string>(
  query: string
): Promise<{ [key in T]: User | User[] }> =>
  axios.post(url, { query }).then((res: AxiosResponse) => res.data.data)

// getAllUsers
const getAllUsersQuery = `
  query {
    users {
      name
      email
      id
    }
  }
`

export const getAllUsersFetcher = () => fetcher<'users'>(getAllUsersQuery)

// getUserById
const getUserByIdQuery = (id: string) => `
  query {
    user(id: "${id}") {
      name
      email
      id
    }
  }
`
export const getUserByIdFetcher = (id: string) =>
  fetcher<'user'>(getUserByIdQuery(id))

// createUser
const createUserQuery = (email: string, name: string) => `
  mutation {
    createUser(email: "${email}", name: "${name}") {
      name
    }
  }
`

export const createUserFetcher = (email: string, name: string) =>
  fetcher(createUserQuery(email, name))
