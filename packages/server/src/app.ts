import cors from "@fastify/cors";
import { FastifyInstance } from "fastify";

export const start = async (app: FastifyInstance) => {
  app.register(cors, {
    origin: "http://localhost:3000",
  });

  // Do not modify the endpoint url
  app.get("/activities", async (request, reply) => {
    throw new Error("Not Implemented");
  });

  // Do not modify the endpoint url
  app.post("/activities", async (request, reply) => {
    throw new Error("Not Implemented");
  });

  await app.listen({ port: 3001, host: "localhost" });
};
