import { NextResponse } from "next/server";

import { UserAnswer, UserExam } from "@/database/models";

export async function GET(req, { params }) {
    try {
        const { id, cId, eId } = await params;

        const userExam = await UserExam.findOne({
            where: { user_exam_id: eId },
            include: [{ model: UserAnswer, as: "userAnswers", include: ["answer"] }],
        });

        return NextResponse.json(
            {
                success: true,
                data: userExam,
                message: "Examen obtenido correctamente",
            },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                success: false,
                data: error,
                message: "Error al obtener el examen",
            },
            { status: 500 }
        );
    }
}

export async function POST(req, { params }) {
    try {
        const { id, cId, eId } = await params;
        const { answers } = await req.json();

        const responses = await UserAnswer.bulkCreate(
            answers.map((a) => ({ answer_id: a, user_exam_id: eId }))
        );

        // falta logica para validar si paso el examen y actualizar el userCourse.course_state

        return NextResponse.json(
            {
                success: true,
                data: responses,
                message: "Examen obtenido correctamente",
            },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                success: false,
                data: error,
                message: "Error al obtener el examen",
            },
            { status: 500 }
        );
    }
}
