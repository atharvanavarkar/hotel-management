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



// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
// import connectDB from "../../../../../lib/mongodb";
// import User from "../../../../../models/User";
// import bcrypt from "bcryptjs";

// export const authOptions = {
//     providers: [
//         GoogleProvider({
//             clientId: process.env.GOOGLE_CLIENT_ID,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         }),
//         CredentialsProvider({
//             name: "Credentials",
//             credentials: {
//                 email: { label: "Email", type: "email" },
//                 password: { label: "Password", type: "password" },
//             },
//             async authorize(credentials) {
//                 await connectDB();

//                 const user = await User.findOne({ email: credentials.email });
//                 if (!user || !user.password) return null;

//                 const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
//                 if (!isPasswordValid) return null;

//                 return {
//                     id: user._id,
//                     name: user.name,
//                     email: user.email,
//                     isAdmin: user.isAdmin || false,
//                 };
//             },
//         }),
//     ],
//     callbacks: {
//         async signIn({ user }) {
//             try {
//                 await connectDB();

//                 const existingUser = await User.findOne({ email: user.email });

//                 if (!existingUser) {
//                     await User.create({
//                         email: user.email,
//                         name: user.name,
//                         bookedRooms: [],
//                         transactions: [],
//                     });
//                 }

//                 return true;
//             } catch (error) {
//                 console.error("Error in signIn callback:", error);
//                 return false; // Deny sign-in if something fails
//             }
//         },

//         async session({ session }) {
//             try {
//                 const dbUser = await User.findOne({ email: session.user.email });

//                 if (dbUser) {
//                     session.user.id = dbUser._id;
//                 } else {
//                     console.warn("User not found in session callback:", session.user.email);
//                 }

//                 return session;
//             } catch (error) {
//                 console.error("Error in session callback:", error);
//                 return session; // Return session even if DB fails (to prevent app crash)
//             }
//         },
//     },
//     secret: process.env.NEXTAUTH_SECRET,
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };


import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "../../../../../lib/mongodb";
import User from "../../../../../models/User";
import bcrypt from "bcryptjs";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                await connectDB();
                const user = await User.findOne({ email: credentials.email });
                if (!user || !user.password) return null;

                const isValid = await bcrypt.compare(credentials.password, user.password);
                if (!isValid) return null;

                return {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                    isAdmin: user.isAdmin,
                };
            },
        }),
    ],
    callbacks: {
        async signIn({ user, account }) {
            await connectDB();
            if (account.provider === "google") {
                const existingUser = await User.findOne({ email: user.email });
                if (!existingUser) {
                    await User.create({
                        name: user.name,
                        email: user.email,
                        bookedRooms: [],
                        transactions: [],
                        isAdmin: false,
                    });
                }
            }
            return true;
        },

        async session({ session, token }) {
            if (session?.user?.email) {
                await connectDB();
                const dbUser = await User.findOne({ email: session.user.email });
                if (dbUser) {
                    session.user.id = dbUser._id;
                    session.user.isAdmin = dbUser.isAdmin || false;
                }
            }
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
