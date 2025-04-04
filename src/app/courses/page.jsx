"use client";

import Link from "next/link";
import React, { useState } from "react";

// Hooks
import { useGetData } from "@/hooks/useFetch.js";

// Icons
import { CodeIcon, PaintBrushIcon } from "@/components/icons.jsx";

export default function Page() {
    const [categories, setCategories] = useState(null);
    const { data: courses, loading: loadingCourses } = useGetData(
        "/courses?order=createdAt:DESC" + (categories ? `category=${categories}&` : "")
    );

    if (loadingCourses) return <>Cargando...</>;
    return (
        <>
            <section className="w-full px-3">
                <div className="w-full max-w-[1200px] mx-auto py-10">
                    <div className="flex flex-col gap-3">
                        <h2 className="text-2xl font-bold">Descubre las categorias</h2>
                        <div className="flex gap-5">
                            <button
                                onClick={() => setCategories((prev) => (prev == 1 ? null : 1))}
                                className={`badge badge-lg ${
                                    categories == 1 ? "" : "badge-soft hover:bg-primary/30"
                                } badge-primary border border-primary duration-300 cursor-pointer`}
                            >
                                <CodeIcon /> Programación
                            </button>
                            <div
                                onClick={() => setCategories((prev) => (prev == 2 ? null : 2))}
                                className={`badge badge-lg ${
                                    categories == 2 ? "" : "badge-soft hover:bg-primary/30"
                                } badge-primary border border-primary duration-300 cursor-pointer`}
                            >
                                <PaintBrushIcon /> Diseño gráfico
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="w-full px-3">
                <div className="w-full max-w-[1200px] mx-auto py-10">
                    <div className="flex flex-col gap-8">
                        <h2 className="text-2xl font-bold">Explora nuestros cursos</h2>
                        <div className="flex flex-row w-full overflow-x-auto gap-10">
                            {courses.map((course, i) => (
                                <div
                                    key={course.course_id + i}
                                    className="bg-base-100 rounded-lg border border-white/20 overflow-hidden w-full min-w-[300px] max-w-[350px]"
                                >
                                    <Link className="w-full" href={`/courses/${course.course_id}`}>
                                        <figure className="w-full h-48 group flex items-center justify-center overflow-hidden bg-white relative">
                                            <img
                                                src={course.course_image}
                                                alt={course.course_name}
                                                className="w-full h-full object-contain scale-100 group-hover:scale-110 duration-300"
                                            />
                                            <div className="absolute w-full h-full bg-gradient-to-t from-black/80 to-transparent flex items-end justify-start opacity-0 group-hover:opacity-100 duration-300">
                                                <button className="btn btn-primary btn-sm text-sm ml-2 mb-2 shadow-none">
                                                    Ver curso
                                                </button>
                                            </div>
                                        </figure>
                                        <div className="p-4">
                                            <h3 className="text-lg font-semibold">
                                                {course.course_name}
                                            </h3>
                                            <p className="text-base-content/70">
                                                Por{" "}
                                                {course.teacher.user_name +
                                                    " " +
                                                    course.teacher.user_lastname}
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
