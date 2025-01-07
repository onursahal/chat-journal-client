'use client'

import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'

export const ApolloProviderWrapper = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_API_URL,
    cache: new InMemoryCache(),
  })

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
