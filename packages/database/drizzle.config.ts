import { defineConfig } from "drizzle-kit";
import path from "path";

import { keys } from "./src/keys";

export default defineConfig({
  out: path.resolve(__dirname, "./src/migrations"),
  schema: path.resolve(__dirname, "./src/schema/index.ts"),
  dialect: "postgresql",
  dbCredentials: {
    url: keys().DATABASE_URL,
  },
});
