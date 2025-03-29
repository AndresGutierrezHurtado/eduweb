"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("UserAnswers", {
            user_id: {
                type: Sequelize.UUID,
            },
            user_exam_id: {
                type: Sequelize.UUID,
            },
            question_id: {
                type: Sequelize.UUID,
            },
            answer_id: {
                type: Sequelize.UUID,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("UserAnswers");
    },
};
