"use client";

import { useState, useEffect } from "react";

import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";

// Components
import { PencilIcon, PlusIcon, TrashIcon, DraggableIcon } from "@/components/icons";

export default function CourseEditForm({ course = { blocks: [] } }) {
    const { blocks: courseBlocks, ...data } = course;
    const [blocks, setBlocks] = useState([]);

    useEffect(() => {
        const lessonsList = courseBlocks.flatMap((block) => block.lessons);
        const sortedLessons = lessonsList.sort((a, b) => a.lesson_order - b.lesson_order);
        const sortedBlocks = [...courseBlocks].sort((a, b) => a.block_order - b.block_order);
        const updatedBlocks = sortedBlocks.map((block) => ({
            ...block,
            lessons: sortedLessons.filter((lesson) => lesson.block_id === block.block_id),
        }));

        setBlocks(updatedBlocks);
    }, [courseBlocks]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = Object.fromEntries(new FormData(e.target));
        delete formData["edit-course"];

        const lessonsList = [...blocks].flatMap((block) => block.lessons);
        const blockList = [...blocks].map((b) => {
            delete b.lessons;
            return b;
        });

        const data = {
            course: formData,
            blocks: blockList,
            lessons: lessonsList,
        };

        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                <input type="radio" name="edit-course" defaultChecked />
                <div className="collapse-title font-semibold">
                    <h2 className="text-xl font-bold">Editar Curso</h2>
                </div>
                <div className="collapse-content text-sm">
                    <CourseForm course={data} />
                </div>
            </div>
            <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                <input type="radio" name="edit-course" />
                <div className="collapse-title font-semibold">
                    <h2 className="text-xl font-bold">Editar contendio del curso</h2>
                </div>
                <div className="collapse-content text-sm">
                    <ContentForm blocks={blocks} setBlocks={setBlocks} />
                </div>
            </div>
            <div className="flex justify-center gap-8 mt-5 mb-10">
                <button type="button" className="btn btn-ghost" onClick={() => router.back()}>
                    Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                    Guardar cambios
                </button>
            </div>
        </form>
    );
}

function CourseForm({ course }) {
    return (
        <>
            <fieldset className="fieldset">
                <label className="fieldset-label text-sm after:content-['*'] after:text-red-500 after:ml-0.5">
                    <span className="label-text">Nombre del curso:</span>
                </label>
                <input
                    type="text"
                    className="input input-bordered w-full focus:outline-none focus:border-primary"
                    name="course_name"
                    defaultValue={course?.course_name}
                />
            </fieldset>

            <fieldset className="fieldset">
                <label className="fieldset-label text-sm after:content-['*'] after:text-red-500 after:ml-0.5">
                    <span className="label-text">Descripción:</span>
                </label>
                <textarea
                    className="textarea textarea-bordered h-30 w-full resize-none focus:outline-none focus:border-primary"
                    name="course_description"
                    defaultValue={course?.course_description}
                />
            </fieldset>

            <fieldset className="fieldset">
                <label className="fieldset-label text-sm after:content-['*'] after:text-red-500 after:ml-0.5">
                    <span className="label-text">Dificultad:</span>
                </label>
                <select
                    name="course_difficulty"
                    className="select select-bordered w-full focus:outline-none focus:border-primary"
                    defaultValue={course?.course_difficulty}
                >
                    <option value="" disabled>
                        Selecciona una dificultad
                    </option>
                    <option value="básico">Básico</option>
                    <option value="intermedio">Intermedio</option>
                    <option value="avanzado">Avanzado</option>
                </select>
            </fieldset>

            <fieldset className="fieldset">
                <label className="fieldset-label text-sm after:content-['*'] after:text-red-500 after:ml-0.5">
                    <span className="label-text">Imagen del curso (URL)</span>
                </label>
                <input
                    type="url"
                    className="input input-bordered w-full focus:outline-none focus:border-primary"
                    name="course_image"
                    defaultValue={course?.course_image}
                />
            </fieldset>

            <fieldset className="fieldset">
                <label className="fieldset-label text-sm after:content-['*'] after:text-red-500 after:ml-0.5">
                    <span className="label-text">Categoría</span>
                </label>
                <select
                    className="select select-bordered w-full focus:outline-none focus:border-primary"
                    name="category_id"
                    defaultValue={course?.category_id}
                >
                    <option value="" disabled>
                        Selecciona una categoría
                    </option>
                    {[
                        { id: 1, name: "Programación Web" },
                        { id: 2, name: "Diseño Gráfico" },
                    ].map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </fieldset>
        </>
    );
}

function ContentForm({ blocks, setBlocks }) {
    const handleDragEnd = (result) => {
        const { source, destination, draggableId, type } = result;

        if (!destination) return;

        if (type === "BLOCKS") {
            const newBlocks = [...blocks];
            const [removed] = newBlocks.splice(source.index - 1, 1);
            newBlocks.splice(destination.index - 1, 0, removed);

            const updatedBlocks = newBlocks.map((block, index) => ({
                ...block,
                block_order: index + 1,
            }));

            const lessonsList = updatedBlocks.flatMap((block) => block.lessons);
            const sortedLessonsList = lessonsList.map((lesson, index) => ({
                ...lesson,
                lesson_order: index + 1,
            }));

            const sortedBlocks = updatedBlocks.map((block) => ({
                ...block,
                lessons: sortedLessonsList.filter((lesson) => lesson.block_id === block.block_id),
            }));

            setBlocks(sortedBlocks);
        }

        if (type === "LESSONS") {
            // se debe reorganizar el array de lecciones y cambiar su lesson_order
            const lessonsList = blocks.flatMap((block) => block.lessons);
            const [removed] = lessonsList.splice(source.index - 1, 1);
            lessonsList.splice(destination.index - 1, 0, removed);

            const orderedLessons = lessonsList.map((lesson, index) => ({
                ...lesson,
                lesson_order: index + 1,
            }));

            // se debe actualizar el lesson.block_id de la lección que se mueve
            const updatedLessons = orderedLessons.map((lesson) => {
                if (lesson.lesson_id === removed.lesson_id) {
                    return {
                        ...lesson,
                        block_id: destination.droppableId.replace("block-", ""),
                    };
                }
                return lesson;
            });

            // se deben obtener los bloques y asignar sus lecciones
            const updatedBlocks = blocks.map((block) => ({
                ...block,
                lessons: updatedLessons.filter((lesson) => lesson.block_id === block.block_id),
            }));

            // se debe actualizar los bloques
            setBlocks(updatedBlocks);
        }
    };

    console.log(
        blocks
            .flatMap((block) => block.lessons)
            .map((lesson) => ({ order: lesson.lesson_order, title: lesson.lesson_title }))
    );
    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable
                droppableId="blocks"
                type="BLOCKS"
                isDropDisabled={false}
                isCombineEnabled={false}
                ignoreContainerClipping={false}
                direction="vertical"
            >
                {(provided) => (
                    <div
                        className="flex flex-col gap-4"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {blocks.map((block) => (
                            <Draggable
                                key={block.block_id}
                                draggableId={block.block_id.toString()}
                                index={block.block_order}
                            >
                                {(provided) => (
                                    <div
                                        className="bg-base-200/60 p-4 rounded-lg space-y-5"
                                        {...provided.draggableProps}
                                        ref={provided.innerRef}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div
                                                    className="btn btn-sm btn-ghost cursor-grab active:cursor-grabbing"
                                                    {...provided.dragHandleProps}
                                                >
                                                    <DraggableIcon />
                                                </div>
                                                <h2 className="text-lg font-semibold">
                                                    {block.block_title}
                                                </h2>
                                            </div>
                                            <div className="flex gap-2">
                                                <button className="btn btn-sm btn-ghost">
                                                    <PencilIcon />
                                                </button>
                                                <button className="btn btn-sm btn-ghost">
                                                    <TrashIcon />
                                                </button>
                                            </div>
                                        </div>
                                        <Droppable
                                            droppableId={`block-${block.block_id}`}
                                            type="LESSONS"
                                            isDropDisabled={false}
                                            isCombineEnabled={false}
                                            ignoreContainerClipping={false}
                                            direction="vertical"
                                        >
                                            {(provided) => (
                                                <div
                                                    className="space-y-2"
                                                    {...provided.droppableProps}
                                                    ref={provided.innerRef}
                                                >
                                                    {block.lessons.map((lesson) => (
                                                        <Draggable
                                                            key={lesson.lesson_id}
                                                            draggableId={lesson.lesson_id.toString()}
                                                            index={lesson.lesson_order}
                                                        >
                                                            {(provided) => (
                                                                <div
                                                                    {...provided.draggableProps}
                                                                    ref={provided.innerRef}
                                                                    id={`lesson-${lesson.lesson_id}`}
                                                                    className="bg-base-100 p-3 rounded flex items-center justify-between"
                                                                >
                                                                    <div className="flex items-center gap-2">
                                                                        <div
                                                                            className="btn btn-sm btn-ghost cursor-grab active:cursor-grabbing"
                                                                            {...provided.dragHandleProps}
                                                                        >
                                                                            <DraggableIcon />
                                                                        </div>
                                                                        <span>
                                                                            {lesson.lesson_title}
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex gap-2">
                                                                        <button className="btn btn-xs btn-ghost">
                                                                            <PencilIcon />
                                                                        </button>
                                                                        <button className="btn btn-xs btn-ghost">
                                                                            <TrashIcon />
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </Draggable>
                                                    ))}
                                                    {provided.placeholder}
                                                </div>
                                            )}
                                        </Droppable>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}
