import { NextResponse } from "next/server";

import { User } from "@/database/models";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get("page")) || 1;
        const limit = parseInt(searchParams.get("limit")) || 5;
        const offset = (page - 1) * limit;

        const { rows, count } = await User.findAndCountAll({
            limit,
            offset,
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
