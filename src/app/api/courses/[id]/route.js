import { NextResponse } from "next/server";

import { Block, Course, Lesson } from "@/database/models";

export async function GET(req, { params }) {
    try {
        const { id } = await params;

        const course = await Course.findByPk(id, {
            include: [
                "category",
                "teacher",
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

export async function PUT(req, { params }) {
    const transaction = await Block.sequelize.transaction();
    try {
        const { id } = await params;
        const { course, blocks, lessons } = await req.json();

        const updatedCourse = await Course.update(course, {
            where: { course_id: id },
            transaction,
        });
        const updatedBlocks = await Block.bulkCreate(blocks, {
            updateOnDuplicate: ["block_title", "block_description", "block_order"],
            transaction,
        });

        const updatedLessons = await Lesson.bulkCreate(lessons, {
            updateOnDuplicate: [
                "lesson_title",
                "lesson_description",
                "lesson_order",
                "lesson_video",
                "lesson_image",
                "lesson_duration",
            ],
            transaction,
        });

        await transaction.commit();
        return NextResponse.json(
            {
                success: true,
                data: {
                    updatedCourse,
                    updatedBlocks,
                    updatedLessons,
                },
                message: "Curso actualizado correctamente",
            },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        await transaction.rollback();
        return NextResponse.json(
            {
                success: false,
                data: error,
                message: "Error al actualizar el curso",
            },
            { status: 500 }
        );
    }
}
