import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { NextRequest } from 'next/server'
import { userTypeDefs } from './type/User'
import prisma from '@/app/lib/prisma'

const typeDefs = [userTypeDefs]

const resolvers = {
  Mutation: {
    createUser: async (
      _: never,
      { email, name }: { email: string; name: string }
    ) => {
      const user = await prisma.user.create({
        data: { email, name },
      })
      return user
    },
  },
  Query: {
    users: async () => await prisma.user.findMany(),
    user: async (_: never, { id }: { id: string }) =>
      await prisma.user.findUnique({ where: { id } }),
  },
}

const apolloServer: ApolloServer = new ApolloServer({
  typeDefs,
  resolvers,
})

const handler = startServerAndCreateNextHandler<NextRequest>(apolloServer)

export async function GET(request: NextRequest) {
  return handler(request)
}
export async function POST(request: NextRequest) {
  return handler(request)
}
