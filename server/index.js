import express from "express";
import cors from "cors";

import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(express.json());
app.use(
    cors({
        origin: process.env.VITE_CLIENT_URL,
        credentials: true,
    })
);

app.use("/", userRoutes);

app.listen(process.env.PORT, () => console.log("Server is running"));
