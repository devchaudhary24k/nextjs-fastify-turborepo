import { keys as database } from "@repo/database/keys";
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  extends: [database()],
  server: {
    SERVER_ORIGIN: z.string().url().min(1),
    BASE_URL: z.string().url().min(1),
  },
  client: {},

  // eslint-disable-next-line n/no-process-env
  experimental__runtimeEnv: process.env,
});
