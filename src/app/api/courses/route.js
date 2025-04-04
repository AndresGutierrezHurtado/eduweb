import { NextResponse } from "next/server";

import { Course } from "@/database/models";
import { Op } from "sequelize";

export async function GET(request) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const category = searchParams.get("category");
        const order = searchParams.get("order") ? searchParams.get("order").split(":") : ["course_id", "ASC"];

        const limit = searchParams.get("limit") || 10;
        const page = searchParams.get("page") || 1;
        const offset = (page - 1) * limit;

        const { rows, count } = await Course.findAndCountAll({
            where: { category_id: category ? category : { [Op.ne]: null } },
            limit,
            offset,
            order: [order],
            include: ["category", "teacher"],
        });

        return NextResponse.json(
            {
                success: true,
                data: rows,
                total: count,
                message: "Cursos obtenidos correctamente",
            },
            { status: 200 }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                success: false,
                data: error,
                message: "Error al obtener los cursos",
            },
            { status: 500 }
        );
    }
}
