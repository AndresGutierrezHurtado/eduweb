"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class UserAnswer extends Model {}
    UserAnswer.init(
        {
            user_id: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            user_exam_id: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            question_id: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            answer_id: {
                type: DataTypes.UUID,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "UserAnswer",
            timestamps: false,
        }
    );
    return UserAnswer;
};
