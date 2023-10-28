import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

const globalForPrisma = globalThis 

const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
/*
   Best practice for instantiating PrismaClient with Next.js
   https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices

   @auth/prisma-adapter
   https://authjs.dev/reference/adapter/prisma

   Prisma Client API reference
   https://www.prisma.io/docs/reference/api-reference/prisma-client-reference?fbclid=IwAR38vXkekWB7-pG7R2ZFCwYNd53ocpTOCW--ZbAOzEKGBK1wrTpxWLJew6w#prismaclient
*/