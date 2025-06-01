// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import connectDB from "../../../../../lib/mongodb";
// import User from "../../../../../models/User";

// export const authOptions = {
//     providers: [
//         GoogleProvider({
//             clientId: process.env.GOOGLE_CLIENT_ID,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         }),
//     ],
//     callbacks: {
//         async signIn({ user }) {
//             await connectDB();
//             const existingUser = await User.findOne({ email: user.email });

//             if (!existingUser) {
//                 await User.create({
//                     email: user.email,
//                     name: user.name,
//                     bookedRooms: [],
//                     transactions: [],
//                 });
//             }
//             return true;
//         },
//         async session({ session }) {
//             const dbUser = await User.findOne({ email: session.user.email });
//             session.user.id = dbUser._id;
//             return session;
//         },
//     },
//     secret: process.env.NEXTAUTH_SECRET,
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "../../../../../lib/mongodb";
import User from "../../../../../models/User";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async signIn({ user }) {
            try {
                await connectDB();

                const existingUser = await User.findOne({ email: user.email });

                if (!existingUser) {
                    await User.create({
                        email: user.email,
                        name: user.name,
                        bookedRooms: [],
                        transactions: [],
                    });
                }

                return true;
            } catch (error) {
                console.error("Error in signIn callback:", error);
                return false; // Deny sign-in if something fails
            }
        },

        async session({ session }) {
            try {
                const dbUser = await User.findOne({ email: session.user.email });

                if (dbUser) {
                    session.user.id = dbUser._id;
                } else {
                    console.warn("User not found in session callback:", session.user.email);
                }

                return session;
            } catch (error) {
                console.error("Error in session callback:", error);
                return session; // Return session even if DB fails (to prevent app crash)
            }
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
