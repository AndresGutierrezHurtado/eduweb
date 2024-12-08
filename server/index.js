import express from "express";
import cors from "cors";
import session from "express-session";
import sequelizeStore from "connect-session-sequelize";
import sequelize from "./config/database.js";
import * as models from "./models/index.js";

// routes
import userRoutes from "./routes/user.routes.js";

const SequelizeStore = new sequelizeStore(session.Store);

const app = express();

const store = new SequelizeStore({
    db: sequelize,
    tableName: "sessions",
    checkExpirationInterval: 15 * 60 * 1000,
    expiration: 60 * 60 * 1000,
});
await store.sync();

app.use(express.json({ limit: "50mb" }));
app.use(
    cors({
        origin: process.env.VITE_CLIENT_URL,
        credentials: true,
    })
);
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: store,
        cookie: {
            secure: process.env.NODE_ENV === "production",
            httpOnly: true,
            maxAge: 60 * 60 * 1000,
        },
    })
);
app.use(async (req, res, next) => {
    if (req.session.user_id) {
        req.session.user = await models.User.findByPk(req.session.user_id, {
            include: [{ model: models.Role, as: "role" }],
        });
    }

    next();
});

app.use("/", userRoutes);

app.listen(process.env.PORT, () => console.log("Server is running"));
