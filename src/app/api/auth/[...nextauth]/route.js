import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import { connection, User } from "@/database/models";
import SequelizeAdapter from "@auth/sequelize-adapter";

const handler = NextAuth({
    providers: [
        Credentials({
            name: "credentials",
            credentials: {
                user_email: {
                    label: "Correo electrónico",
                    type: "email",
                    placeholder: "ejemplo@gmail.com",
                },
                user_password: {
                    label: "Contraseña",
                    type: "password",
                    placeholder: "******",
                },
            },
            async authorize(credentials) {
                const { user_email, user_password } = credentials;

                const user = await User.findOne({ where: { user_email } });
                if (!user) throw new Error("El usuario no existe");

                const isPasswordValid = await bcrypt.compare(user_password, user.user_password);
                if (!isPasswordValid) throw new Error("La contraseña es incorrecta");

                return user.toJSON();
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.user_id;
                token.email = user.user_email;
                token.name = user.user_name + " " + user.user_lastname;
                token.role = user.role_id;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = await User.findOne({
                where: { user_email: token.email },
                attributes: {
                    exclude: ["user_password"],
                },
                include: ["role"],
            });

            session.user.id = token.id;
            session.user.role = token.role;

            return session;
        },
    },
    adapter: SequelizeAdapter(connection),
    session: { strategy: "jwt" },
    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
