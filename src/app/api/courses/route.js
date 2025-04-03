import { NextResponse } from "next/server";

import { Course } from "@/database/models";

export async function GET() {
    try {
        const { rows, count } = await Course.findAndCountAll({
            limit: 10,
            offset: 0,
            order: [["course_id", "ASC"]],
            include: ["category", "teacher"],
        });

        return NextResponse.json({
            success: true,
            data: rows,
            total: count,
            message: "Cursos obtenidos correctamente",
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            data: error,
            message: "Error al obtener los cursos",
        });
    }
}
