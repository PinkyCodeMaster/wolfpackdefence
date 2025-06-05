import { adminClient, usernameClient } from "better-auth/client/plugins";
import { stripeClient } from "@better-auth/stripe/client";
import { createAuthClient } from "better-auth/react";
import env from "@/lib/env";

export const authClient = createAuthClient({
    baseURL: env.BETTER_AUTH_URL,
    plugins: [
        usernameClient(),
        adminClient(),
        stripeClient({
            subscription: true
        })
    ]
});