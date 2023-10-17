import NextAuth from "next-auth/next";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prismadb";

export const authOptions = {
    adapter: PrismaAdapter(prisma), 
    
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    pages: {
        signIn: '/sign-in',
    }, 
    secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

/*
   NextAuth.js | Documentation | Provider | Google 
   https://next-auth.js.org/providers/google

   Documentation
   https://developers.google.com/identity/protocols/oauth2

   Configuration
   https://console.developers.google.com/apis/credentials

   For production: https://{YOUR_DOMAIN}/api/auth/callback/google
   For development: http://localhost:3000/api/auth/callback/google

   http://localhost:3000/sign-in?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2Fsign-in&error=OAuthAccountNotLinked
   https://github.com/nextauthjs/next-auth/issues/519

   If you see 'OAuthAccountNotLinked' it means you have already signed in with a different provider that is associated with the same email address.
*/