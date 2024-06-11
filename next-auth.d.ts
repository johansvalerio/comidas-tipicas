import NextAuth from 'next-auth';
declare module 'next-auth' {
interface Session {
 user: {
  id: string;
  role: number,
  email: string,
  name: string
   } & DefaultSession['user'];
  }
 }