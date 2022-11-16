import { FastifyInstance } from "fastify"
import { prisma } from "../lib/prisma"

  //http://localhost:3333/pools/count
  export async function userRoutes(fastify: FastifyInstance) {
    fastify.get('/users/count', async () => {
      const count = await prisma.user.count()
      return { count }
    })
  
}