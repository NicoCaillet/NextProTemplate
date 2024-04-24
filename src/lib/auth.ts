import prisma from "./db";
import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { toast } from "sonner";
import { authSchema } from "./validations";

const config = {
  pages: {
    signIn: "/dev/login",
  },
  session: {
    maxAge: 30 * 24 * 24 * 60,
    strategy: "jwt",
  },
  callbacks: {
    authorized: ({ auth, request }) => {
      // if user should be auth in a given request -- runs on every request on middleware
      const isLoggedIn = Boolean(auth?.user);
      const isTryingtoAccessApp = request.nextUrl.pathname.includes("/app");
      if (!isLoggedIn && isTryingtoAccessApp) {
        return false;
      }

      if (isLoggedIn && isTryingtoAccessApp) {
        return true;
      }

      if (isLoggedIn && !isTryingtoAccessApp) {
        const baseUrl = "http://localhost:3000"; // or https if using SSL
        const redirectUrl = new URL("/app/dashboard", baseUrl);
        return Response.redirect(redirectUrl.toString());
      }
      if (!isLoggedIn && !isTryingtoAccessApp) {
        return true;
      }
      return false;
    },
    jwt: ({ token, user }) => {
      if (user) {
        token.userId = user.id;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (session.user) {
        session.user.id = token.userId;
      }
      return session;
    },
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        // validation 
        const validatedFormData = authSchema.safeParse(credentials);
        if(!validatedFormData.success){
          return null
        }
        // authorize user based on credentials, runs on login
        const { email, password } = credentials;
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });
        if (!user) {
          console.log("No user found/");
          return null;
        }

        const passWordsMatch = await bcrypt.compare(
          password,
          user.hashedPassword
        );

        if (!passWordsMatch) {
          console.log("Invalid credentials");
          toast.warning("Invalid credentials");
          return null;
        }
        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(config);
