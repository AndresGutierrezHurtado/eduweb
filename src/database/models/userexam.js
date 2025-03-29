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
            user_id: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            exam_id: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            exam_score: {
                type: DataTypes.DECIMAL,
                allowNull: false,
            },
            exam_date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "UserExam",
        }
    );
    return UserExam;
};
