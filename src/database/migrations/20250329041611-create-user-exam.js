"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("UserExams", {
            user_exam_id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
            },
            user_id: {
                type: Sequelize.UUID,
                allowNull: false,
            },
            exam_id: {
                type: Sequelize.UUID,
                allowNull: false,
            },
            score: {
                type: Sequelize.DECIMAL,
                allowNull: false,
            },
            exam_date: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            createdAt: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW,
                allowNull: false,
            },
            updatedAt: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW,
                onUpdate: Sequelize.NOW,
                allowNull: false,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("UserExams");
    },
};
