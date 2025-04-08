"use client";

import { useState, useEffect } from "react";

import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";

// Components
import { PencilIcon, PlusIcon, TrashIcon, DraggableIcon } from "@/components/icons";
import Swal from "sweetalert2";

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
    const organizeBlocks = (blocks) => {
        const lessonsList = blocks.flatMap((block) => block.lessons);
        const sortedLessons = lessonsList.map((lesson, index) => ({
            ...lesson,
            lesson_order: index + 1,
        }));

        const updatedBlocks = blocks.map((block) => ({
            ...block,
            lessons: sortedLessons.filter((lesson) => lesson.block_id === block.block_id),
        }));

        const sortedBlocks = updatedBlocks.map((block, index) => ({
            ...block,
            block_order: index + 1,
        }));

        return sortedBlocks;
    };

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

    const handleAddBlock = () => {
        const newBlock = {
            block_id: crypto.randomUUID(),
            block_title: "Nuevo bloque",
            block_description: "Descripción del bloque",
            block_order: blocks.length + 1,
            lessons: [],
        };
        setBlocks([...blocks, newBlock]);
    };

    const handleAddLesson = (blockId) => {
        const newLesson = {
            lesson_id: crypto.randomUUID(),
            block_id: blockId,
            lesson_title: "Nueva lección",
            lesson_description: "Descripción de la lección",
            lesson_video: "https://www.youtube.com/watch?v=",
            lesson_image: "https://img.youtube.com/vi/id/0.jpg",
            lesson_duration: "00:00:00",
            lesson_order: 0,
        };

        const updatedBlocks = blocks.map((block) => {
            if (block.block_id === blockId) {
                return {
                    ...block,
                    lessons: [...block.lessons, newLesson],
                };
            }
            return block;
        });

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
    };

    const handleEditBlock = (blockId) => {
        console.log(blockId);
    };

    const handleDeleteBlock = (blockId) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "No podrás revertir esto.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedBlocks = blocks.filter((block) => block.block_id !== blockId);
                const sortedBlocks = organizeBlocks(updatedBlocks);
                setBlocks(sortedBlocks);
            }
        });
    };

    const handleEditLesson = (lessonId) => {
        console.log(lessonId);
    };

    const handleDeleteLesson = (lessonId) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "No podrás revertir esto.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
        }).then((result) => {
            if (result.isConfirmed) {
                const lessonsList = blocks.flatMap((block) => block.lessons).filter((lesson) => lesson.lesson_id !== lessonId);
                const updatedBlocks = blocks.map((block) => ({
                    ...block,
                    lessons: lessonsList.filter((lesson) => lesson.block_id === block.block_id),
                }));
                const sortedBlocks = organizeBlocks(updatedBlocks);
                setBlocks(sortedBlocks);
            }
        });
    };

    return (
        <>
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
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-ghost"
                                                        onClick={() =>
                                                            document
                                                                .getElementById(
                                                                    `modal-block-${block.block_id}`
                                                                )
                                                                .showModal()
                                                        }
                                                    >
                                                        <PencilIcon />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-ghost"
                                                        onClick={() =>
                                                            handleDeleteBlock(block.block_id)
                                                        }
                                                    >
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
                                                                                {
                                                                                    lesson.lesson_title
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                        <div className="flex gap-2">
                                                                            <button
                                                                                type="button"
                                                                                className="btn btn-xs btn-ghost"
                                                                                onClick={() =>
                                                                                    document
                                                                                        .getElementById(
                                                                                            `modal-lesson-${lesson.lesson_id}`
                                                                                        )
                                                                                        .showModal()
                                                                                }
                                                                            >
                                                                                <PencilIcon />
                                                                            </button>
                                                                            <button
                                                                                type="button"
                                                                                className="btn btn-xs btn-ghost"
                                                                                onClick={() =>
                                                                                    handleDeleteLesson(
                                                                                        lesson.lesson_id
                                                                                    )
                                                                                }
                                                                            >
                                                                                <TrashIcon />
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </Draggable>
                                                        ))}
                                                        <button
                                                            type="button"
                                                            className="btn btn-sm btn-ghost w-full"
                                                            onClick={() =>
                                                                handleAddLesson(block.block_id)
                                                            }
                                                        >
                                                            <PlusIcon />
                                                            <span>Agregar lección</span>
                                                        </button>
                                                        {provided.placeholder}
                                                    </div>
                                                )}
                                            </Droppable>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            <button
                                type="button"
                                className="btn btn-sm btn-ghost w-full"
                                onClick={handleAddBlock}
                            >
                                <PlusIcon />
                                <span>Agregar bloque</span>
                            </button>
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

            {blocks.map((block) => (
                <dialog key={block.block_id} id={`modal-block-${block.block_id}`} className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg mb-4">Editar bloque</h3>
                        <fieldset
                            role="form"
                            onSubmit={handleEditBlock}
                            method="dialog"
                            className="space-y-4"
                        >
                            <fieldset className="fieldset">
                                <label className="fieldset-label text-sm">
                                    <span className="label-text">Título del bloque:</span>
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full focus:outline-none focus:border-primary"
                                    name="block_title"
                                    defaultValue={block.block_title}
                                />
                            </fieldset>
                            <fieldset className="fieldset">
                                <label className="fieldset-label text-sm">
                                    <span className="label-text">Descripción del bloque:</span>
                                </label>
                                <textarea
                                    className="textarea textarea-bordered w-full focus:outline-none focus:border-primary"
                                    name="block_description"
                                    defaultValue={block.block_description}
                                />
                            </fieldset>
                            <div className="modal-action">
                                <button className="btn btn-ghost">Cancelar</button>
                                <button type="submit" className="btn btn-primary">
                                    Guardar
                                </button>
                            </div>
                        </fieldset>
                    </div>
                </dialog>
            ))}

            {blocks.map((block) =>
                block.lessons.map((lesson) => (
                    <dialog
                        key={lesson.lesson_id}
                        id={`modal-lesson-${lesson.lesson_id}`}
                        className="modal"
                    >
                        <div className="modal-box">
                            <h3 className="font-bold text-lg mb-4">Editar lección</h3>
                            <fieldset
                                role="form"
                                onSubmit={handleEditLesson}
                                method="dialog"
                                className="space-y-4"
                            >
                                <fieldset className="fieldset">
                                    <label className="fieldset-label text-sm">
                                        <span className="label-text">Título de la lección:</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="input input-bordered w-full focus:outline-none focus:border-primary"
                                        name="lesson_title"
                                        defaultValue={lesson.lesson_title}
                                    />
                                </fieldset>
                                <fieldset className="fieldset">
                                    <label className="fieldset-label text-sm">
                                        <span className="label-text">
                                            Descripción de la lección:
                                        </span>
                                    </label>
                                    <textarea
                                        className="textarea textarea-bordered w-full focus:outline-none focus:border-primary"
                                        name="lesson_description"
                                        defaultValue={lesson.lesson_description}
                                    />
                                </fieldset>
                                <fieldset className="fieldset">
                                    <label className="fieldset-label text-sm">
                                        <span className="label-text">Contenido de la lección:</span>
                                    </label>
                                    <textarea
                                        className="textarea textarea-bordered w-full focus:outline-none focus:border-primary"
                                        name="lesson_content"
                                        defaultValue={lesson.lesson_content}
                                    />
                                </fieldset>
                                <div className="modal-action">
                                    <button className="btn btn-ghost">Cancelar</button>
                                    <button type="submit" className="btn btn-primary">
                                        Guardar
                                    </button>
                                </div>
                            </fieldset>
                        </div>
                    </dialog>
                ))
            )}
        </>
    );
}
