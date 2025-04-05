"use client";
import { GlobeIcon } from "@/components/icons";
import { useGetData } from "@/hooks/useFetch";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

export default function Page() {
    const { data, status } = useSession();
    const userSession = data?.user;

    const { data: courses, loading: loadingCourses } = useGetData(
        "/users/" + userSession?.user_id + "/courses"
    );
    console.log(courses);

    if (status == "loading" || loadingCourses) return <>Cargando...</>;
    if (!userSession) return <>No estas logueado</>;
    return (
        <>
            <section className="w-full px-3">
                <div className="w-full max-w-[1200px] mx-auto py-10">
                    <div className="flex flex-row gap-5">
                        <div className="article bg-black/25 border border-base-300 p-8 rounded-lg flex flex-col gap-3 w-2/7 h-fit">
                            <div className="avatar">
                                <div className="w-24 rounded-full">
                                    <img src={userSession.user_image} alt="Imagen de perfil" />
                                </div>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold leading-[1]">
                                    {userSession.user_name} {userSession.user_lastname}
                                </h2>
                                <p className="text-base-content/80 text-lg italic font-medium capitalize">
                                    {userSession.user_profession || user.role.role_name}
                                </p>
                            </div>
                            <div>
                                <p>{userSession.user_email}</p>
                                <p>{userSession.user_phone}</p>
                            </div>
                            {userSession.user_website && (
                                <p className="flex items-center gap-2 text-primary">
                                    <span>
                                        <GlobeIcon size={20} />
                                    </span>
                                    <Link
                                        href={userSession.user_website}
                                        className="underline"
                                        target="_blank"
                                    >
                                        {userSession.user_website}
                                    </Link>
                                </p>
                            )}
                            <button className="btn btn-primary shadow-none h-auto py-1 px-5 w-fit  mt-3">
                                Editar perfil
                            </button>
                        </div>
                        <div className="w-5/7">
                            <div className="tabs tabs-lift">
                                <label className="tab">
                                    <input type="radio" name="my_tabs_4" defaultChecked />
                                    Mis cursos
                                </label>
                                <div className="tab-content bg-base-100 border-base-300 p-6">
                                    <div className="flex flex-col gap-8">
                                        <div>
                                            <h2 className="text-2xl font-bold">Tus Cursos</h2>
                                            <p className="text-base-content/80 text-lg leading-tight">
                                                Los materiales de cada curso equivalen a un 70% del
                                                total, mientras que el examen comprende el otro 30%.
                                                Puedes tomar el examen en cualquier momento cuando
                                                estés listo.
                                            </p>
                                        </div>
                                        <hr />
                                        <div className="flex flex-col gap-5">
                                            <h2 className="text-2xl font-bold">
                                                Cursos pendientes
                                            </h2>
                                            {courses.filter(
                                                (course) => course.course_state == "progress"
                                            ).length == 0 && (
                                                <div>
                                                    <p className="text-base-content/80 text-lg leading-tight">
                                                        No tienes cursos pendientes...
                                                    </p>
                                                    <Link
                                                        href="/courses"
                                                        className="btn btn-primary shadow-none h-auto py-1 px-5 w-fit  mt-3"
                                                    >
                                                        Ver cursos
                                                    </Link>
                                                </div>
                                            )}
                                            {courses
                                                .filter(
                                                    (course) => course.course_state == "progress"
                                                )
                                                .map((course) => {
                                                    const totalLessons =
                                                        course.course.blocks.reduce(
                                                            (acc, block) =>
                                                                acc + block.lessons.length,
                                                            1
                                                        );

                                                    const progress =
                                                        (course.lessonsTaken.length /
                                                            totalLessons) *
                                                        100;
                                                    return (
                                                        <article
                                                            key={course.course_id}
                                                            className="flex gap-8"
                                                        >
                                                            <Link
                                                                href={
                                                                    "/courses/" + course.course_id
                                                                }
                                                            >
                                                                <div className="avatar bg-black/25 rounded-lg">
                                                                    <div className="w-24 rounded-lg">
                                                                        <img
                                                                            src={
                                                                                course.course
                                                                                    .course_image
                                                                            }
                                                                            alt="Imagen de perfil"
                                                                            className="[object-fit:contain_!important]"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                            <div className="grow flex flex-col gap-2">
                                                                <Link
                                                                    href={
                                                                        "/courses/" +
                                                                        course.course_id
                                                                    }
                                                                >
                                                                    <h2 className="text-xl font-medium leading-[1] mb-2">
                                                                        {course.course.course_name}
                                                                        {" - "}
                                                                        <span className="text-primary font-bold leading-tight tracking-tight">
                                                                            {progress.toFixed(0)} %
                                                                        </span>
                                                                    </h2>
                                                                </Link>
                                                                <progress
                                                                    className="progress progress-primary w-full"
                                                                    value={progress}
                                                                    max="100"
                                                                ></progress>
                                                                <p className="text-base-content/80 text-lg leading-tight">
                                                                    {course.lessonsTaken.length}
                                                                    {" clases tomadas de "}
                                                                    {totalLessons}
                                                                </p>
                                                            </div>
                                                            <div className="h-full flex items-center justify-center">
                                                                <Link
                                                                    href={`/courses/${course.course_id}`}
                                                                >
                                                                    <button className="btn btn-primary shadow-none h-auto py-2 px-5 w-fit mt-3">
                                                                        Continuar curso
                                                                    </button>
                                                                </Link>
                                                            </div>
                                                        </article>
                                                    );
                                                })}
                                        </div>
                                        <div className="flex flex-col gap-5">
                                            <h2 className="text-2xl font-bold">
                                                Cursos completados
                                            </h2>
                                            {courses.filter(
                                                (course) => course.course_state == "completed"
                                            ).length == 0 && (
                                                <div>
                                                    <p className="text-base-content/80 text-lg leading-tight">
                                                        Aún no has completado ningun curso
                                                    </p>
                                                </div>
                                            )}
                                            {courses
                                                .filter(
                                                    (course) => course.course_state == "completed"
                                                )
                                                .map((course) => {
                                                    return (
                                                        <article
                                                            key={course.course_id}
                                                            className="flex gap-8"
                                                        >
                                                            <Link
                                                                href={
                                                                    "/courses/" + course.course_id
                                                                }
                                                            >
                                                                <div className="avatar bg-black/25 rounded-lg">
                                                                    <div className="w-24 rounded-lg">
                                                                        <img
                                                                            src={
                                                                                course.course
                                                                                    .course_image
                                                                            }
                                                                            alt="Imagen de perfil"
                                                                            className="[object-fit:contain_!important]"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                            <div className="grow flex flex-col gap-2">
                                                                <Link
                                                                    href={
                                                                        "/courses/" +
                                                                        course.course_id
                                                                    }
                                                                >
                                                                    <h2 className="text-xl font-medium leading-[1] mb-2">
                                                                        {course.course.course_name}
                                                                        {" - "}
                                                                        <span className="text-primary font-bold leading-tight tracking-tight">
                                                                            100 %
                                                                        </span>
                                                                    </h2>
                                                                </Link>
                                                                <p className="text-primary font-bold">
                                                                    Felicidades por completar el
                                                                    curso con éxito!
                                                                </p>
                                                            </div>
                                                            <div className="h-full flex items-center justify-center">
                                                                <Link
                                                                    href={`/pending`}
                                                                >
                                                                    <button className="btn btn-primary shadow-none h-auto py-2 px-5 w-fit mt-3">
                                                                        Descarga tu certificado
                                                                    </button>
                                                                </Link>
                                                            </div>
                                                        </article>
                                                    );
                                                })}
                                        </div>
                                    </div>
                                </div>

                                <label className="tab">
                                    <input type="radio" name="my_tabs_4" />
                                    Mis certificados
                                </label>
                                <div className="tab-content bg-base-100 border-base-300 p-6">
                                    Tab content 2
                                </div>

                                <label className="tab">
                                    <input type="radio" name="my_tabs_4" />
                                    Mi progreso
                                </label>
                                <div className="tab-content bg-base-100 border-base-300 p-6">
                                    Tab content 3
                                </div>

                                <label className="tab">
                                    <input type="radio" name="my_tabs_4" />
                                    Cursos creados
                                </label>
                                <div className="tab-content bg-base-100 border-base-300 p-6">
                                    Tab content 3
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
