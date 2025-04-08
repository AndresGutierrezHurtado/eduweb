"use client";

import { useState } from "react";

import { DragDropManager } from "@dnd-kit/dom";
import { Sortable } from "@dnd-kit/dom/sortable";

// Components
import { PencilIcon, PlusIcon, TrashIcon, DraggableIcon } from "@/components/icons";

export default function CourseEditForm({ course = { blocks: [] } }) {
    const { blocks: courseBlocks, ...data } = course;
    const [blocks, setBlocks] = useState(courseBlocks);
    const [courseData, setCourseData] = useState(data);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target));
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
                    <CourseForm course={data} setCourseData={setCourseData} />
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
        </form>
    );
}

function CourseForm({ course, setCourseData }) {
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
                    onChange={(e) => setCourseData({ ...courseData, course_name: e.target.value })}
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
                    onChange={(e) =>
                        setCourseData({ ...courseData, course_description: e.target.value })
                    }
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
                    onChange={(e) =>
                        setCourseData({ ...courseData, course_difficulty: e.target.value })
                    }
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
                    onChange={(e) => setCourseData({ ...courseData, course_image: e.target.value })}
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
                    onChange={(e) => setCourseData({ ...courseData, category_id: e.target.value })}
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

            <div className="flex justify-end gap-4">
                <button type="button" className="btn btn-ghost" onClick={() => router.back()}>
                    Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                    Guardar cambios
                </button>
            </div>
        </>
    );
}

function ContentForm({ blocks, setBlocks }) {
    return (
        <>
            <div className="flex flex-col gap-4">
                {blocks.map((block) => (
                    <div
                        key={block.block_id}
                        id={`block-${block.block_id}`}
                        className="bg-base-200/60 p-4 rounded-lg"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <button className="btn btn-sm btn-ghost cursor-grab active:cursor-grabbing">
                                    <DraggableIcon />
                                </button>
                                <h2 className="text-lg font-semibold">{block.block_title}</h2>
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
                        <div className="space-y-2">
                            {block.lessons.map((lesson) => (
                                <div
                                    key={lesson.lesson_id}
                                    id={`lesson-${lesson.lesson_id}`}
                                    className="bg-base-100 p-3 rounded flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-2">
                                        <button className="btn btn-sm btn-ghost cursor-grab active:cursor-grabbing">
                                            <DraggableIcon />
                                        </button>
                                        <span>{lesson.lesson_title}</span>
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
                            ))}
                            <button className="btn btn-sm btn-ghost w-full">
                                <PlusIcon />
                                Añadir lección
                            </button>
                        </div>
                    </div>
                ))}
                <button className="btn btn-ghost w-full">
                    <PlusIcon />
                    Añadir bloque
                </button>
            </div>
        </>
    );
}
