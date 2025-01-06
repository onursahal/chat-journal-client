import axios, { AxiosResponse } from 'axios'

const url = process.env.NEXT_PUBLIC_API_URL

export const fetcher = (query: string) => {
  if (!url) {
    throw new Error('NEXT_API_URL environment variable is not set')
  }

  return axios
    .post(url, { query })
    .then(
      (res: AxiosResponse<{ data: { data: unknown } }>) =>
        res.data.data as unknown
    )
    .catch((err) => console.log(err))
}

export const login = (email: string, password: string) => {
  return fetcher(`
    query {
      login(email: "${email}", password: "${password}") {
        accessToken,
        refreshToken
      }
    }
    `)
}

export const createUser = (
  email: string,
  password: string,
  firstName?: string,
  lastName?: string
) => {
  console.log('email', email)
  return fetcher(`
    mutation {
      createUser(createUserData: {email: "${email}", password: "${password}", firstName: "${firstName}", lastName: "${lastName}"}) {
        id
      }
    }
    `)
}
