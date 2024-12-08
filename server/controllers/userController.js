import * as models from "../models/index.js";

export default class UserController {
    static async createUser(req, res) {
        try {
            req.body.user.user_password = await bcrypt.hash(
                req.body.user.user_password,
                10
            );

            const user = await models.User.create(req.body.user);

            res.status(200).json({
                sucess: true,
                message: "Usuario creado con exito",
                data: user,
            });
        } catch (error) {
            res.status(500).json({
                sucess: true,
                message: error.message,
                data: error,
            });
        }
    }

    static async getUsers(req, res) {
        try {
            const users = await models.User.findAll({
                include: ["role"],
            });

            res.status(200).json({
                sucess: true,
                message: "Usuarios encontrados",
                data: users,
            });
        } catch (error) {
            res.status(500).json({
                sucess: true,
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
                sucess: true,
                message: "Usuario encontrado",
                data: {},
            });
        } catch (error) {
            res.status(500).json({
                sucess: true,
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
                sucess: true,
                message: "Autenticacion exitosa",
                data: user,
            });
        } catch (error) {
            res.status(500).json({
                sucess: true,
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
                sucess: true,
                message: "Sesion verificada con exito",
                data: req.session.user,
            });
        } catch (error) {
            res.status(500).json({
                sucess: true,
                message: error.message,
                data: error,
            });
        }
    }

    static async logoutUser(req, res) {
        try {
            req.session.destroy();

            res.status(200).json({
                sucess: true,
                message: "Sesion cerrada con exito",
                data: null,
            });
        } catch (error) {
            res.status(500).json({
                sucess: true,
                message: error.message,
                data: error,
            });
        }
    }
}
