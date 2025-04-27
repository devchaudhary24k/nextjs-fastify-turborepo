import "fastify";

declare module "fastify" {
  interface FastifyRequest {
    startTime?: [number, number]; // [seconds, nanoseconds] from process.hrtime()
    routerPath?: string; // optional route path (fallback to raw url)
  }
}
