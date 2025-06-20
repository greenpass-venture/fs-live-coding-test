import Fastify from "fastify";
import { v4 as uuidv4 } from "uuid";

import { start } from "./app";

const app = Fastify({
  logger: true,
  genReqId: () => uuidv4(),
});

start(app).catch((err) => {
  console.error(err);
  process.exit(1);
});
