import { NextResponse } from "next/server";

import { User } from "@/database/models";

export async function GET() {
    try {
        const { rows , count } = await User.findAndCountAll({
            limit: 10,
            offset: 0,
            order: [["user_id", "ASC"]],
            include: ["role"],
        });

        return NextResponse.json({
            success: true,
            data: rows,
            total: count,
            message: "Usuarios obtenidos correctamente",
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            data: error,
            message: "Error al obtener los usuarios",
        });
    }
}
