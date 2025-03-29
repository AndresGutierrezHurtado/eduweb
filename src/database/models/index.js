const { Sequelize, DataTypes } = require("sequelize");

const AnswerModel = require("./answer");
const BlockModel = require("./block");
const CategoryModel = require("./category");
const CourseModel = require("./course");
const ExamModel = require("./exam");
const LessonModel = require("./lesson");
const QuestionModel = require("./question");
const RoleModel = require("./role");
const UserModel = require("./user");
const UserCourseModel = require("./usercourse");
const UserExamModel = require("./userexam");
const UserLessonModel = require("./userlesson");

const config = require("../config.json");

const sequelize = new Sequelize({
    ...config[process.env.NODE_ENV],
    logging: false,
    dialectModule: require("mysql2"),
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
})();

const Answer = AnswerModel(sequelize, DataTypes);
const Block = BlockModel(sequelize, DataTypes);
const Category = CategoryModel(sequelize, DataTypes);
const Course = CourseModel(sequelize, DataTypes);
const Exam = ExamModel(sequelize, DataTypes);
const Lesson = LessonModel(sequelize, DataTypes);
const Question = QuestionModel(sequelize, DataTypes);
const Role = RoleModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);
const UserCourse = UserCourseModel(sequelize, DataTypes);
const UserExam = UserExamModel(sequelize, DataTypes);
const UserLesson = UserLessonModel(sequelize, DataTypes);

Role.hasMany(User, { as: "users", foreignKey: "user_role" });
User.belongsTo(Role, { as: "role", foreignKey: "user_role" });

User.hasMany(Course, { as: "courses", foreignKey: "teacher_id" });
Course.belongsTo(User, { as: "teacher", foreignKey: "teacher_id" });

Course.hasMany(Block, { as: "blocks", foreignKey: "course_id" });
Block.belongsTo(Course, { as: "course", foreignKey: "course_id" });

Block.hasMany(Lesson, { as: "lessons", foreignKey: "block_id" });
Lesson.belongsTo(Block, { as: "block", foreignKey: "block_id" });

Course.hasOne(Exam, { as: "exam", foreignKey: "course_id" });
Exam.belongsTo(Course, { as: "course", foreignKey: "course_id" });

Exam.hasMany(Question, { as: "questions", foreignKey: "exam_id" });
Question.belongsTo(Exam, { as: "exam", foreignKey: "exam_id" });

Question.hasMany(Answer, { as: "answers", foreignKey: "question_id" });
Answer.belongsTo(Question, { as: "question", foreignKey: "question_id" });

User.belongsToMany(Course, { through: UserCourse, as: "courses" });
Course.belongsToMany(User, { through: UserCourse, as: "users" });

User.belongsToMany(Exam, { through: UserExam, as: "exams" });
Exam.belongsToMany(User, { through: UserExam, as: "users" });

User.belongsToMany(Lesson, { through: UserLesson, as: "lessons" });
Lesson.belongsToMany(User, { through: UserLesson, as: "users" });

module.exports = {
    Answer,
    Block,
    Course,
    Exam,
    Lesson,
    Question,
    Role,
    User,
    UserCourse,
    UserExam,
    connection: sequelize,
};
