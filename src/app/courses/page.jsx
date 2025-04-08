"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

// Hooks
import { useGetData } from "@/hooks/useFetch.js";
import { useSession } from "next-auth/react";

// Icons
import { CodeIcon, PaintBrushIcon, ArrowRight } from "@/components/icons.jsx";
import LoadingComponent from "@/components/loading";

export default function Page() {
    const [categories, setCategories] = useState(null);
    const { data, status } = useSession();
    const userSession = data?.user;

    const { data: courses, loading: loadingCourses } = useGetData(
        "/courses?order=createdAt:DESC&" + (categories ? `category=${categories}&` : "")
    );
    const { data: userCourses, loading: loadingUCourses } = useGetData(
        `/users/${userSession?.user_id}/courses`
    );

    const calculateProgress = (userCourse) => {
        const totalLessons = userCourse.course.blocks.reduce(
            (acc, block) => acc + block.lessons.length,
            1
        );
        const completedLessons = userCourse.lessonsTaken.length;
        return Math.round((completedLessons / totalLessons) * 100);
    };

    useEffect(() => {
        document.title = "Cursos | Eduweb";
    }, []);

    if (loadingCourses || loadingUCourses || status === "loading") return <LoadingComponent />;
    return (
        <>
            {userSession && (
                <section className="w-full px-3">
                    <div className="w-full max-w-[1200px] mx-auto py-10">
                        <div className="flex flex-col gap-8">
                            <div className="flex w-full justify-between">
                                <h2 className="text-2xl font-bold">Mis cursos pendientes</h2>
                                <Link
                                    href="/profile"
                                    className="border-b border-primary leading-[1] text-primary flex items-center gap-5"
                                >
                                    Ir a mis cursos <ArrowRight size={12} />
                                </Link>
                            </div>
                            <div className="flex flex-row w-full overflow-x-auto gap-10">
                                {userCourses.map((userCourse) => (
                                    <div
                                        key={userCourse.course_id}
                                        className="bg-base-100 rounded-lg border border-white/20 overflow-hidden w-full min-w-[300px] max-w-[350px]"
                                    >
                                        <Link
                                            className="w-full"
                                            href={`/courses/${userCourse.course_id}`}
                                        >
                                            <figure className="w-full h-48 group flex items-center justify-center overflow-hidden bg-white relative">
                                                <img
                                                    src={userCourse.course.course_image}
                                                    alt={userCourse.course.course_name}
                                                    className="w-full h-full object-contain scale-100 group-hover:scale-110 duration-300"
                                                />
                                                <div className="absolute w-full h-full bg-gradient-to-t from-black/80 to-transparent flex items-end justify-start opacity-0 group-hover:opacity-100 duration-300">
                                                    <button className="btn btn-primary btn-sm text-sm ml-2 mb-2 shadow-none">
                                                        Continuar curso
                                                    </button>
                                                </div>
                                            </figure>
                                            <div className="p-4">
                                                <div className="flex justify-between items-center gap-5">
                                                    <div className="relative">
                                                        <div className="avatar">
                                                            <div className="w-8 rounded-full">
                                                                <img
                                                                    src={
                                                                        userCourse.course.teacher
                                                                            .user_image
                                                                    }
                                                                    alt={
                                                                        userCourse.course.teacher
                                                                            .user_name
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="radial-progress text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                                            style={{
                                                                "--value":
                                                                    calculateProgress(userCourse),
                                                                "--size": "2.8rem",
                                                                "--thickness": "3px",
                                                            }}
                                                            role="progressbar"
                                                        ></div>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-base-content/70">
                                                            Clase {userCourse.lessonsTaken.length}{" "}
                                                            de{" "}
                                                            {userCourse.course.blocks.flatMap(
                                                                (block) => block.lessons
                                                            ).length + 1}
                                                        </p>
                                                        <h3 className="text-lg font-semibold leading-[1.1]">
                                                            {userCourse.course.course_name}
                                                        </h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                                {userCourses.length == 0 && (
                                    <p className="text-base-content/70">
                                        No tienes cursos pendientes
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            )}
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
                            {courses.map((course) => (
                                <div
                                    key={course.course_id}
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
