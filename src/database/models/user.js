"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
    class User extends Model {}

    User.init(
        {
            user_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            user_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            user_lastname: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            user_email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            user_phone: {
                type: DataTypes.DECIMAL,
                allowNull: false,
                unique: true,
            },
            user_password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            user_image: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            role_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "User",
        }
    );

    User.beforeCreate((user, options) => {
        user.user_password = bcrypt.hashSync(user.user_password, 10);
        return user;
    });

    return User;
};
