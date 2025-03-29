"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Questions", {
            question_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            exam_id: {
                type: Sequelize.UUID,
                allowNull: false,
            },
            question_text: {
                type: Sequelize.STRING,
                allowNull: false,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Questions");
    },
};
