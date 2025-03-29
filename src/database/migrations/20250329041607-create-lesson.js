"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Lessons", {
            lesson_id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
            },
            block_id: {
                allowNull: false,
                type: Sequelize.UUID,
            },
            lesson_title: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            lesson_video: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            lesson_description: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            lesson_order: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Lessons");
    },
};
