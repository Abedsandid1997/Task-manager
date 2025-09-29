import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      role: "ADMIN" | "USER";
      name?: string | null;
      image?: string | null;
    };
  }

  interface User {
    id: string;
    role: "ADMIN" | "USER";
  }
}
