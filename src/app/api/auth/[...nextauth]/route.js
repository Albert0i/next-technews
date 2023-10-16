import NextAuth from "next-auth/next";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
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
*/