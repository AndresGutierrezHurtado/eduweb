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

const Block = sequelize.define(
    "blocks",
    {
        block_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        block_order: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        course_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        block_info: {
            type: DataTypes.TEXT,
        },
    },
    {
        tableName: "blocks",
        timestamps: false,
    }
);

// Relation one-to-many
Role.hasMany(User, {
    foreignKey: "role_id",
    as: "users",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
})
User.belongsTo(Role, {
    foreignKey: "role_id",
    as: "role",
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
Block.belongsTo(Course, {
    foreignKey: "course_id",
    as: "course",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

export { User, Role, Course, Block, Session, Recovery };