"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("UserLessons", {
            user_id: {
                type: Sequelize.UUID,
                allowNull: false,
            },
            lesson_id: {
                type: Sequelize.UUID,
                allowNull: false,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("UserLessons");
    },
};
