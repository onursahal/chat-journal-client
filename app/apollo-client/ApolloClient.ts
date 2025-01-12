import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support'
import { cookies } from 'next/headers'

export const { getClient } = registerApolloClient(() => {
  const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_API_URL,
  })

  const authLink = setContext((_, { headers }) => {
    const accessToken = cookies().get('accessToken')?.value || ''

    return {
      headers: {
        ...headers,
        authorization: `Bearer ${accessToken}`,
      },
    }
  })

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
    connectToDevTools: true,
  })
})
