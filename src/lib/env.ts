import { expand } from "dotenv-expand";
import { config } from "dotenv";
import path from "node:path";
import { z } from "zod";

expand(config({
    path: path.resolve(
        process.cwd(),
        process.env.NODE_ENV === "test" ? ".env.test" : ".env",
    ),
}));

const EnvSchema = z.object({
    NODE_ENV: z.string().default("development"),
    DATABASE_URL: z.string().url(),
    DATABASE_AUTH_TOKEN: z.string().optional(),
    UPLOADTHING_TOKEN: z.string(),
    BETTER_AUTH_SECRET: z.string(),
    BETTER_AUTH_URL: z.string().url().default("http://localhost:3000"),
    STRIPE_PUBLISHABLE_KEY: z.string(),
    STRIPE_SECRET_KEY: z.string(),
    STRIPE_WEBHOOK_SECRET: z.string(),
    SENTRY_AUTH_TOKEN: z.string(),
    NEXT_PUBLIC_POSTHOG_KEY: z.string(),
    NEXT_PUBLIC_POSTHOG_HOST: z.string().url(),
}).superRefine((input, ctx) => {
    if (input.NODE_ENV === "production" && !input.DATABASE_AUTH_TOKEN) {
        ctx.addIssue({
            code: z.ZodIssueCode.invalid_type,
            expected: "string",
            received: "undefined",
            path: ["DATABASE_AUTH_TOKEN"],
            message: "Must be set when NODE_ENV is 'production'",
        });
    }
});

export type env = z.infer<typeof EnvSchema>;

const { data: env, error } = EnvSchema.safeParse(process.env);

if (error) {
    console.error("❌ Invalid env:");
    console.error(JSON.stringify(error.flatten().fieldErrors, null, 2));
    process.exit(1);
}

export default env!;