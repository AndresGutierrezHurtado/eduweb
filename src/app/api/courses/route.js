import { NextResponse } from "next/server";

import { Course } from "@/database/models";
import { Op } from "sequelize";

export async function GET(request) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const category = searchParams.get("category");
        const order = searchParams.get("order")
            ? searchParams.get("order").split(":")
            : ["course_id", "ASC"];
        const search = searchParams.get("search") || "";

        const limit = searchParams.get("limit") || 10;
        const page = searchParams.get("page") || 1;
        const offset = (page - 1) * limit;

        const { rows, count } = await Course.findAndCountAll({
            where: {
                category_id: category ? category : { [Op.ne]: null },
                [Op.or]: [
                    { course_name: { [Op.like]: `%${search.toLowerCase()}%` } },
                    { course_description: { [Op.like]: `%${search.toLowerCase()}%` } },
                ],
            },
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

export async function POST(request) {
    const transaction = await Course.sequelize.transaction();
    try {
        const { course, blocks, lessons, exam, questions, answers } = await request.json();

        // logic to create a course and its blocks, lessons, exam, questions and answers

        return NextResponse.json({
            success: true,
            // data: newCourse,
            message: "Curso creado correctamente",
        });
    } catch (error) {
        await transaction.rollback();
        console.log(error);
        return NextResponse.json({
            success: false,
            data: error,
            message: "Error al crear el curso",
        });
    }
}
