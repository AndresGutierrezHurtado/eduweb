import { NextResponse } from "next/server";

import { UserCourse } from "@/database/models";

export async function GET(req, { params }) {
    try {
        const { id, cId } = await params;

        const userCourses = await UserCourse.findOne({
            where: { user_id: id, course_id: cId },
            include: [
                "lessonsTaken",
                "examsTaken",
            ],
        });

        return NextResponse.json(
            {
                success: true,
                data: userCourses,
                message: "Usuarios obtenidos correctamente",
            },
            { status: 200 }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                success: false,
                data: error,
                message: "Error al obtener los usuarios: " + error.message,
            },
            { status: 500 }
        );
    }
}
