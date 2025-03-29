"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("UserCourses", {
            user_id: {
                type: Sequelize.UUID,
                allowNull: false,
            },
            course_id: {
                type: Sequelize.UUID,
                allowNull: false,
            },
            course_state: {
                type: Sequelize.ENUM("IN_PROGRESS", "LOST", "COMPLETED"),
                allowNull: false,
            },
            completion_date: {
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
        await queryInterface.dropTable("UserCourses");
    },
};
