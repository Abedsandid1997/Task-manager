import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";
import type { Provider } from "next-auth/providers";
// Notice this is only an object, not a full Auth.js instance

const providers: Provider[] = [
  Google({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    authorization: {
      params: {
        prompt: "consent", // Tvingar fram samtyckesskärmen
        access_type: "offline", // Ger refresh token
        response_type: "code", // Krävs för att byta kod mot token
      },
    },
  }),
];

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider();
      return { id: providerData.id, name: providerData.name };
    } else {
      return { id: provider.id, name: provider.name };
    }
  })
  .filter((provider) => provider.id !== "credentials");

export default {
  providers,
  // pages: {
  //   signIn: "/signin", Here is exampel how we can customize the signin page
  // },
  callbacks: {
    authorized: async ({ auth }) => {
      // tillåt bara om det finns en aktiv session
      return !!auth;
    },
  },
} satisfies NextAuthConfig;
