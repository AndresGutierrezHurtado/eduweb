"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class UserExam extends Model {}
    UserExam.init(
        {
            user_exam_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
        },
        {
            sequelize,
            modelName: "UserExam",
        }
    );
    return UserExam;
};
