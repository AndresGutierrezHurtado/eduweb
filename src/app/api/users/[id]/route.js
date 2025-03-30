import { NextResponse } from "next/server";

import { User, UserCourse } from "@/database/models";

export async function GET(request, { params }) {
    try {
        const { id } = await params;

        const user = await User.findByPk(id, {
            include: ["role", {
                model: UserCourse,
                as: "userCourses",
                include: ["course", "lessonsTaken", "examsTaken"],
            }],
        });

        return NextResponse.json(
            {
                success: true,
                data: user,
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
