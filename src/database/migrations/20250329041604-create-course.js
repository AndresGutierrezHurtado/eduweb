"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Courses", {
            course_id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
            },
            teacher_id: {
                type: Sequelize.UUID,
                allowNull: false,
            },
            course_name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            course_description: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            course_image: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            category_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Courses");
    },
};
