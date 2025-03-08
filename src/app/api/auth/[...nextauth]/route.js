import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import client from "@/database/mongodb"

// https://discord.com/developers/docs/topics/oauth2#shared-resources-oauth2-scopes

const handler = NextAuth({

  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        profile(profile) {
          return {
            id: profile.sub, 
            name: profile.name,
            email: profile.email,
            image: profile.picture, 
            username: null
          };
        }
    })
  ],
  adapter: MongoDBAdapter(client)
})

export { handler as GET, handler as POST }