import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";

import { keys } from "./keys";

neonConfig.webSocketConstructor = ws;

const pool = new Pool({ connectionString: keys().DATABASE_URL });
export const db = drizzle({ client: pool });
