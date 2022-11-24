import Fastify from 'fastify'
import { z } from 'zod'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import ShortUniqueId from 'short-unique-id'

import { poolRoutes } from './routes/pool'
import { userRoutes } from './routes/user'
import { guessRoutes } from './routes/guess'
import { authRoutes } from './routes/auth'
import { gameRoutes } from './routes/game'

//Inicia prisma e loga as queries

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  })

  await fastify.register(cors, {
    origin: true,
  })

  //Em produção isso precisa estar em uma variavel de ambiente
  await fastify.register(jwt, {
    secret: 'nlwcopa',
  })

  await fastify.register(poolRoutes)
  await fastify.register(userRoutes)
  await fastify.register(authRoutes)
  await fastify.register(guessRoutes)
  await fastify.register(gameRoutes)

  await fastify.listen({ port: 3333, host: '172.23.72.133' })
}

bootstrap()