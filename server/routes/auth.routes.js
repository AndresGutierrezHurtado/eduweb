import { Router } from "express";
import passport from "passport";
import bcrypt from "bcrypt";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import * as models from "../models/index.js";

passport.serializeUser((user, done) => {
    done(null, user.user_id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await models.User.findByPk(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.VITE_API_URL + "/auth/google/callback",
        },
        async function (accessToken, refreshToken, profile, cb) {
            const info = profile._json;

            const user = await models.User.findOrCreate({
                where: {
                    user_email: info.email,
                },
                defaults: {
                    user_name: info.given_name,
                    user_lastname: info.family_name,
                    user_email: info.email,
                    user_password: bcrypt.hashSync(info.sub, 10),
                },
            });

            return cb(null, user[0]);
        }
    )
);

passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: process.env.VITE_API_URL + "/auth/github/callback",
        },
        async function (accessToken, refreshToken, profile, cb) {
            const info = profile._json;

            const user = await models.User.findOrCreate({
                where: {
                    user_email: info.email,
                },
                defaults: {
                    user_name: info.name.split(" ")[0],
                    user_lastname: info.name.split(" ")[1],
                    user_email: info.email,
                    user_password: bcrypt.hashSync(info.id, 10),
                },
            });

            return cb(null, user[0]);
        }
    )
);

// Routes
const authRoutes = Router();

authRoutes.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);
authRoutes.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
        req.session.user_id = req.user.user_id;
        res.redirect(process.env.VITE_CLIENT_URL);
    }
);

authRoutes.get("/auth/github", passport.authenticate("github"));
authRoutes.get(
    "/auth/github/callback",
    passport.authenticate("github"),
    (req, res) => {
        req.session.user_id = req.user.user_id;
        res.redirect(process.env.VITE_CLIENT_URL);
    }
);

export default authRoutes;
