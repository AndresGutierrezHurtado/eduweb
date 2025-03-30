import { NextResponse } from "next/server";

import { Block, Course } from "@/database/models";

export async function GET(req, { params }) {
    try {
        const { id } = await params;

        const course = await Course.findByPk(id, {
            include: [
                "category",
                {
                    model: Block,
                    as: "blocks",
                    include: ["lessons"],
                },
            ],
        });

        return NextResponse.json(
            {
                success: true,
                data: course,
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
