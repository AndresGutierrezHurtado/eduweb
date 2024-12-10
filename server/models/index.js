import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const User = sequelize.define(
    "users",
    {
        user_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        user_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        user_lastname: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        user_email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
        user_phone: {
            type: DataTypes.DECIMAL(10, 0),
            allowNull: true,
        },
        user_address: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        user_password: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        role_id: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            allowNull: false,
        },
    },
    {
        tableName: "users",
        timestamps: false,
    }
);

const Recovery = sequelize.define(
    "recoveries",
    {
        recovery_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        recovery_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
    },
    {
        tableName: "recoveries",
        timestamps: false,
    }
);

const Session = sequelize.define(
    "sessions",
    {
        sid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        expires: {
            type: DataTypes.DATE,
        },
        data: {
            type: DataTypes.TEXT,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        tableName: "sessions",
    }
);

const Role = sequelize.define(
    "roles",
    {
        role_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        role_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
    },
    {
        tableName: "roles",
        timestamps: false,
    }
);

const Course = sequelize.define(
    "courses",
    {
        course_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        course_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
        course_description: {
            type: DataTypes.TEXT,
        },
        course_image_url: {
            type: DataTypes.TEXT,
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
    },
    {
        tableName: "courses",
        timestamps: false,
    }
);

const Lesson = sequelize.define(
    "lessons",
    {
        lesson_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        lesson_title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        lesson_content: {
            type: DataTypes.TEXT,
        },
        video_url: {
            type: DataTypes.TEXT,
        },
        course_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
    },
    {
        tableName: "lessons",
        timestamps: false,
    }
);

const Certificate = sequelize.define(
    "certificates",
    {
        certificate_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        course_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        issue_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        certificate_url: {
            type: DataTypes.TEXT,
        },
    },
    {
        tableName: "certificates",
        timestamps: false,
    }
);
const Assessment = sequelize.define(
    "assessments",
    {
        assessment_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        course_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        question: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        correct_answer: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        options: {
            type: DataTypes.TEXT,
        },
    },
    {
        tableName: "assessments",
        timestamps: false,
    }
);

const Enrollment = sequelize.define(
    "enrollments",
    {
        enrollment_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        course_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        enrolled_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: "enrollments",
        timestamps: false,
    }
);

const Progress = sequelize.define(
    "progress",
    {
        progress_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        course_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        lesson_id: {
            type: DataTypes.INTEGER,
        },
        completed_at: {
            type: DataTypes.DATE,
        },
    },
    {
        tableName: "progress",
        timestamps: false,
    }
);

// Relation one-to-many
Role.hasMany(User, {
    foreignKey: "role_id",
    as: "users",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
User.belongsTo(Role, {
    foreignKey: "role_id",
    as: "role",
});

// Relation one-to-many
User.hasMany(Recovery, {
    foreignKey: "user_id",
    as: "recoveries",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
Recovery.belongsTo(User, {
    foreignKey: "user_id",
    as: "user",
});

// Relation one-to-many
User.hasMany(Course, {
    foreignKey: "user_id",
    as: "courses",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
Course.belongsTo(User, {
    foreignKey: "user_id",
    as: "creator",
});

// Relation one-to-many
Course.hasMany(Lesson, {
    foreignKey: "course_id",
    as: "lessons",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
Lesson.belongsTo(Course, {
    foreignKey: "course_id",
    as: "course",
});

// Relation one-to-many
User.hasMany(Certificate, {
    foreignKey: "user_id",
    as: "certificates",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
Certificate.belongsTo(User, {
    foreignKey: "user_id",
    as: "user",
});

// Relation one-to-many
Course.hasMany(Assessment, {
    foreignKey: "course_id",
    as: "assessments",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
Assessment.belongsTo(Course, {
    foreignKey: "course_id",
    as: "course",
});

// Relation one-to-many
User.hasMany(Enrollment, {
    foreignKey: "user_id",
    as: "enrollments",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
Enrollment.belongsTo(User, {
    foreignKey: "user_id",
    as: "user",
});

// Relation one-to-many
Course.hasMany(Enrollment, {
    foreignKey: "course_id",
    as: "enrollments",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
Enrollment.belongsTo(Course, {
    foreignKey: "course_id",
    as: "course",
});

// Relation one-to-many
User.hasMany(Progress, {
    foreignKey: "user_id",
    as: "progresses",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
Progress.belongsTo(User, {
    foreignKey: "user_id",
    as: "user",
});

// Relation one-to-many
Course.hasMany(Progress, {
    foreignKey: "course_id",
    as: "progresses",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
Progress.belongsTo(Course, {
    foreignKey: "course_id",
    as: "course",
});

// Relation one-to-many
Lesson.hasMany(Progress, {
    foreignKey: "lesson_id",
    as: "progresses",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
Progress.belongsTo(Lesson, {
    foreignKey: "lesson_id",
    as: "lesson",
});
export { User, Role, Course, Session, Recovery };
