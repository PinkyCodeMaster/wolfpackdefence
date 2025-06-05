import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "@/db/schema";
import env from "@/lib/env";

const isDev = env.NODE_ENV === "development";

const client = createClient({ url: env.DATABASE_URL, authToken: env.DATABASE_AUTH_TOKEN, });

const db = drizzle(client, { schema, logger: isDev });

export default db;