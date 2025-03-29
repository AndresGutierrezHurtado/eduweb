"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class UserLesson extends Model {}
    UserLesson.init(
        {
            user_id: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            lesson_id: {
                type: DataTypes.UUID,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "UserLesson",
            timestamps: false,
        }
    );

    return UserLesson;
};
