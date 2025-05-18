/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import EmailProvider from "next-auth/providers/nodemailer";
import { sendVerificationRequest } from '~/mailers/auth-mailer';




import { db } from "~/server/db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface User {
    id?: string;
    firstname?: string | null;
    surname?: string | null;
  }
  
  interface Session extends DefaultSession {
    user: {
      id: string;
      firstname?: string | null;
      surname?: string | null;
    } & DefaultSession["user"];
  }
}
/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
      sendVerificationRequest: sendVerificationRequest,
    })
  
  ],
  adapter: PrismaAdapter(db),
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
        firstname: (user as any).firstname, 
        surname: (user as any).surname,     
      },
    }),
  },
} satisfies NextAuthConfig;
