// import { db } from "@repo/database";
import { db } from "@repo/database";
import * as schema from "@repo/database/schema/auth-schema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { openAPI, organization } from "better-auth/plugins";

import { env } from "@/env";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      ...schema,
    },
  }),

  // TODO: Add env here
  trustedOrigins: [env.CLIENT_ORIGIN],

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    autoSignIn: false,
    // TODO: Implement Password Reset Mail Here
  },

  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: 60 * 60, // 1 hour
    sendVerificationEmail: async ({ user, token }) => {
      const callbackURL = "/auth/email-verified";
      const url = `http://localhost:3000/api/auth/verify-email?token=${token}&callbackURL=${callbackURL}`;
      console.log(url, user.email);

      // TODO: Later uncomment it in production environment
      // await resend.emails.send({
      //   to: user.email,
      //   from: "dev-server@pixelactstudios.com",
      //   subject: "Verify your email",
      //   text: `Click on the link to verify your email: ${url}`,
      // });
    },
  },

  socialProviders: {
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
  },

  rateLimit: {
    enabled: true,
    window: 10, // Time window in seconds
    max: 100, // Max Requests in a window
    storage: "memory", // "memory" | "redis"
  },

  session: {
    expiresIn: 60 * 60 * 24 * 7, // 1 week,
    updateAge: 60 * 60 * 24, // 1 day ( every 1 day the session expiresAt will be updated )
    freshAge: 60 * 5, // 5 minutes ( the session is fresh if created within last 5 minutes )

    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes
    },
  },

  plugins: [organization(), openAPI()],
});
