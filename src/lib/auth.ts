import { username, admin, openAPI } from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { stripe } from "@better-auth/stripe";
import { betterAuth } from "better-auth";
import Stripe from "stripe";
import db from "@/db";

const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-05-28.basil",
})

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "sqlite",
    }),
    emailAndPassword: {
        enabled: true
    },
    plugins: [
        username({
            minUsernameLength: 5,
            maxUsernameLength: 20,
            usernameValidator: async (username) => {
                if (username === "admin") {
                    return false;
                }
                if (!/^[a-zA-Z0-9]+$/.test(username)) {
                    return false;
                }
                if (username === "wolfpackdefence") {
                    return false;
                }
                if (username === "wolfpackdefence.co.uk") {
                    return false;
                }
                return true;
            }
        }),
        admin({
            adminUserIds: [],
            impersonationSessionDuration: 60 * 60 * 24,
            defaultBanReason: "Spamming",
            defaultBanExpiresIn: 60 * 60 * 24 * 30,
            bannedUserMessage: "You have been banned from the platform",
            defaultBanType: "ban",
        }),
        openAPI(),
        stripe({
            stripeClient,
            stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
            createCustomerOnSignUp: true,
            subscription: {
                enabled: true,
                plans: [
                    {
                        name: "starter",
                        priceId: "price_1RP7GZIJqlQqRGOH0qUGViMq",
                        annualDiscountPriceId: "price_starter_annual_123",
                        group: "individual",
                        limits: {
                            products: 10,
                        },
                    },
                    {
                        name: "pro",
                        priceId: "price_1RP7JLIJqlQqRGOHZ0umBLBb",
                        annualDiscountPriceId: "price_pro_annual_456",
                        group: "individual",
                        limits: {
                            products: 25,
                        },
                    },
                    {
                        name: "business",
                        priceId: "price_business_789",
                        annualDiscountPriceId: "price_business_annual_789",
                        group: "professional",
                        limits: {
                            products: -1,
                        },
                    },
                ],
                requireEmailVerification: true,
                onSubscriptionComplete: async ({ subscription }) => {
                    // Called when a subscription is successfully created
                    console.log(`Subscription ${subscription.id} created`);
                    // TODO: send welcome email
                },
                onSubscriptionUpdate: async ({ subscription }) => {
                    // Called when a subscription is updated
                    console.log(`Subscription ${subscription.id} updated`);
                    // TODO: send update email
                },
                onSubscriptionCancel: async ({ subscription }) => {
                    // Called when a subscription is canceled 
                    console.log(`Subscription ${subscription.id} cancelled`);
                    // TODO: send cancellation email
                },
                onSubscriptionDeleted: async ({ subscription }) => {
                    // Called when a subscription is deleted
                    console.log(`Subscription ${subscription.id} deleted`);
                    // TODO: send deletion email
                }
            },
            onEvent: async (event) => {
                // Handle any Stripe event
                switch (event.type) {
                    case "invoice.paid":
                        // Handle paid invoice
                        break;
                    case "payment_intent.succeeded":
                        // Handle successful payment
                        break;
                    case "customer.subscription.created":
                        // Handle subscription created
                        break;
                    case "customer.subscription.updated":
                        // Handle subscription updated
                        break;
                    case "customer.subscription.deleted":
                        // Handle subscription deleted
                        break;
                    case "customer.subscription.paused":
                        // Handle subscription paused
                        break;
                    case "customer.subscription.resumed":
                        // Handle subscription resumed
                        break;
                    case "customer.subscription.trial_will_end":
                        // Handle trial will end
                        break;
                }
            },

        })
    ]
});