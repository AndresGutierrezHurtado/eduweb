import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    dialect: "mysql",
    logging: false,
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
})

try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
} catch (error) {
    console.error("Unable to connect to the database:", error.message);
}

export default sequelize