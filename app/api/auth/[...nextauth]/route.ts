import { authOptions } from "@/lib/auth";
import NextAuth from "next-auth";

// export const authOptions: AuthOptions = {
//     adapter: PrismaAdapter(db) as Adapter,
//     providers: [
//         GoogleProvider({
//             clientId: process.env.GOOGLE_CLIENT_ID as string,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//         }),
//     ],
//     callbacks: {
//         async session({ session, user }) {
//             session.user = { ...session.user, id: user.id } as {
//                 id: string;
//                 name: string;
//                 email: string;
//             };
//             return session;
//         },
//     },
//     secret: process.env.NEXT_AUTH_SECRET,
// };

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };