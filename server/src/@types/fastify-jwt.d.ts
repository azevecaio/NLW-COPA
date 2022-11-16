import '@fastify/jwt'
//Resolve problema do sub dentro de pools no reconhecimento de um objeto opcional
declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: {
      sub: string;
      name: string;
      avatarUrl: string;
    }
  }
}