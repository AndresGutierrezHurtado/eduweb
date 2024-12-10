import * as models from "../models/index.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import {
    passwordChangedTemplate,
    resetPasswordTemplate,
} from "../templates/emailTemplate.js";
import { Op } from "sequelize";

export default class UserController {
    static async createUser(req, res) {
        try {
            req.body.user.user_password = await bcrypt.hash(
                req.body.user.user_password,
                10
            );

            const user = await models.User.create(req.body.user);

            res.status(200).json({
                success: true,
                message: "Usuario creado con exito",
                data: user,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
                data: error,
            });
        }
    }

    static async getUsers(req, res) {
        try {
            let whereClause = {};
            if (req.query.search) {
                whereClause = {
                    [Op.or]: [
                        {
                            user_name: {
                                [Op.like]: `%${req.query.search}%`,
                            },
                        },
                        {
                            user_lastname: {
                                [Op.like]: `%${req.query.search}%`,
                            },
                        },
                        {
                            user_email: {
                                [Op.like]: `%${req.query.search}%`,
                            },
                        },
                    ],
                };
            }

            const users = await models.User.findAndCountAll({
                include: ["role"],
                where: whereClause,
                order: [
                    [
                        req.query.sort.split(":")[0],
                        req.query.sort.split(":")[1],
                    ],
                ],
                limit: req.query.limit || 10,
                offset: ((req.query.page || 1) - 1) * (req.query.limit || 10),
            });

            res.status(200).json({
                success: true,
                message: "Usuarios encontrados",
                data: {
                    ...users,
                    limit: req.query.limit || 10,
                    page: req.query.page || 1,
                },
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: error.message,
                data: error,
            });
        }
    }

    static async getUser(req, res) {
        try {
            const user = await models.User.findByPk(req.params.id, {
                include: ["role"],
            });

            res.status(200).json({
                success: true,
                message: "Usuario encontrado",
                data: user,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
                data: error,
            });
        }
    }

    static async updateUser(req, res) {
        try {
            if (req.body.user.user_password) {
                req.body.user.user_password = await bcrypt.hash(
                    req.body.user.user_password,
                    10
                );
            }

            const user = await models.User.update(req.body.user, {
                where: {
                    user_id: req.params.id,
                },
            });

            if (user[0] === 0) {
                throw new Error("Cambios no realizados");
            }

            res.status(200).json({
                success: true,
                message: "Usuario actualizado con exito",
                data: user,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
                data: error,
            });
        }
    }

    static async authUser(req, res) {
        try {
            const user = await models.User.findOne({
                where: {
                    user_email: req.body.user_email,
                },
            });

            if (!user) {
                throw new Error("El usuario no existe");
            }

            if (
                !(await bcrypt.compare(
                    req.body.user_password,
                    user.user_password
                ))
            ) {
                throw new Error("La contraseña es incorrecta");
            }

            req.session.user_id = user.user_id;

            res.status(200).json({
                success: true,
                message: "Autenticacion exitosa",
                data: user,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
                data: error,
            });
        }
    }

    static async verifyUserSession(req, res) {
        try {
            if (!req.session.user_id) {
                throw new Error("No hay una sesion activa");
            }

            res.status(200).json({
                success: true,
                message: "Sesion verificada con exito",
                data: req.session.user,
            });
        } catch (error) {
            res.status(200).json({
                success: false,
                message: error.message,
                data: null,
            });
        }
    }

    static async recoveryUser(req, res) {
        try {
            const user = await models.User.findOne({
                where: {
                    user_email: req.body.user_email,
                },
            });

            if (!user) {
                throw new Error("El usuario no existe");
            }

            const recovery = await models.Recovery.create({
                user_id: user.user_id,
            });

            const transporter = nodemailer.createTransport({
                host: process.env.EMAIL_HOST,
                port: process.env.EMAIL_PORT,
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASSWORD,
                },
            });

            const info = await transporter.sendMail({
                from: `EduWeb" <${process.env.EMAIL_USER}>`,
                to: user.user_email,
                subject: "Recuperación de cuenta | EduWeb",
                html: resetPasswordTemplate(
                    recovery.recovery_id,
                    user.user_name
                ),
            });

            res.status(200).json({
                success: true,
                message: "Correo enviado con exito",
                data: info,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
                data: error,
            });
        }
    }

    static async resetPasswordUser(req, res) {
        try {
            const recovery = await models.Recovery.findByPk(req.params.token, {
                include: ["user"],
            });

            if (!recovery) {
                throw new Error("Recovery no encontrado");
            }

            const user = recovery.user;
            user.user_password = await bcrypt.hash(req.body.user_password, 10);
            await user.save();

            await models.Recovery.destroy({
                where: {
                    recovery_id: recovery.recovery_id,
                },
            });

            const transporter = nodemailer.createTransport({
                host: process.env.EMAIL_HOST,
                port: process.env.EMAIL_PORT,
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASSWORD,
                },
            });

            const info = await transporter.sendMail({
                from: `EduWeb" <${process.env.EMAIL_USER}>`,
                to: user.user_email,
                subject: "Cambio de contraseña | EduWeb",
                html: passwordChangedTemplate(user.user_name),
            });

            res.status(200).json({
                success: true,
                message: "Contraseña cambiada con exito",
                data: user,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: error.message,
                data: error,
            });
        }
    }

    static async logoutUser(req, res) {
        try {
            req.session.destroy();

            res.status(200).json({
                success: true,
                message: "Sesion cerrada con exito",
                data: null,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
                data: error,
            });
        }
    }

    static async deleteUser(req, res) {
        try {
            await models.User.destroy({
                where: {
                    user_id: req.params.id,
                },
            });

            res.status(200).json({
                success: true,
                message: "Usuario eliminado con exito",
                data: null,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
                data: error,
            });
        }
    }
}
