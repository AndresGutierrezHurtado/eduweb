import { ClockIcon, CodeIcon, CubesIcon, TasksIcon } from "@/components/icons";
import React from "react";
import { FaGraduationCap } from "react-icons/fa";

export const metadata = {
    title: "Curso | EduWeb",
}

export default async function Page({ params }) {
    const { id } = await params;
    const response = await fetch(process.env.NEXTAUTH_URL + "/api/courses/" + id);
    const { data: course } = await response.json();

    const duration = course.blocks.reduce((acc, block) => {
        return acc + block.lessons.reduce((acc2, lesson) => {
            const [hours, minutes, seconds] = lesson.lesson_duration.split(":").map(Number);
            return acc2 + hours * 60 * 60 + minutes * 60 + seconds;
        }, 0);
    }, 0);

    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);

    return (
        <>
            <section className="w-full px-3">
                <div className="w-full max-w-[1200px] mx-auto py-10">
                    <div className="flex flex-row gap-5">
                        <div className="w-2/3 flex flex-col gap-10">
                            <article>
                                <h2 className="text-4xl font-semibold leading-tight">
                                    {course.course_name}
                                </h2>
                                <p className="text-sm text-base-content/80">
                                    Publicado el {new Date(course.createdAt).toDateString("es-CO")}
                                </p>
                                <div className="flex flex-wrap gap-2 py-3">
                                    <div className="badge badge-lg">
                                        <FaGraduationCap size={15} />
                                        {course.category.category_name}
                                    </div>
                                    <div className="badge badge-lg">
                                        <CubesIcon size={15} />
                                        {course.course_difficulty}
                                    </div>
                                    <div className="badge badge-lg">
                                        <ClockIcon size={15} />
                                        {hours}h {minutes}m
                                    </div>
                                </div>
                                <p className="text-base-content/80">{course.course_description}</p>
                            </article>
                            <ul className="timeline timeline-vertical">
                                {course.blocks
                                    .sort((a, b) => a.block_order - b.block_order)
                                    .map((block) => (
                                        <React.Fragment key={block.block_id}>
                                            <li className="grid grid-cols-[0fr_15px_2fr_!important]">
                                                {block.block_order > 1 && (
                                                    <hr className="bg-primary" />
                                                )}
                                                <div className="timeline-end pl-5 text-lg text-base-content/80 italic">
                                                    {block.block_description}
                                                </div>
                                                <div className="timeline-middle">
                                                    <div className="w-2 aspect-square bg-primary rounded-full"></div>
                                                </div>
                                                <hr className="bg-primary" />
                                            </li>
                                            {block.lessons
                                                .sort((a, b) => a.lesson_order - b.lesson_order)
                                                .map((lesson, li) => {
                                                    const url = new URL(lesson.lesson_video);
                                                    const videoId = url.searchParams.get("v");
                                                    if (!videoId) return null;

                                                    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`;
                                                    return (
                                                        <li
                                                            key={lesson.lesson_id}
                                                            className="grid grid-cols-[0fr_15px_2fr_!important]"
                                                        >
                                                            <hr className="bg-primary" />
                                                            <div className="timeline-middle">
                                                                <div className="w-5 outline-primary/50 outline-2 outline-offset-1 aspect-square bg-primary rounded-full flex items-center justify-center">
                                                                    <p className="text-center text-sm text-primary-content leading-tight font-bold">
                                                                        {lesson.lesson_order}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="timeline-end pl-5 py-3">
                                                                <div className="flex flex-row gap-5">
                                                                    <img
                                                                        src={thumbnailUrl}
                                                                        className="w-18 aspect-square object-cover rounded-lg"
                                                                        alt={
                                                                            "Imagen " +
                                                                            lesson.lesson_title
                                                                        }
                                                                    />
                                                                    <div className="flex flex-col text-sm">
                                                                        <p className="grow">
                                                                            {lesson.lesson_title}
                                                                        </p>
                                                                        <p className="text-base-content/70">
                                                                            {parseInt(
                                                                                lesson.lesson_duration.split(
                                                                                    ":"
                                                                                )[0]
                                                                            ) > 0 && (
                                                                                <span className="mr-2">
                                                                                    {lesson.lesson_duration.split(
                                                                                        ":"
                                                                                    )[0] + " horas"}
                                                                                </span>
                                                                            )}
                                                                            <span>
                                                                                {lesson.lesson_duration.split(
                                                                                    ":"
                                                                                )[1] + " minutos"}
                                                                            </span>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <hr className="bg-primary" />
                                                        </li>
                                                    );
                                                })}
                                        </React.Fragment>
                                    ))}
                                <li className="grid grid-cols-[0fr_15px_2fr_!important]">
                                    <hr className="bg-primary" />
                                    <div className="timeline-middle">
                                        <div className="w-2 aspect-square bg-primary rounded-full"></div>
                                    </div>
                                    <div className="timeline-end pl-5 py-3">
                                        <div className="flex gap-5">
                                            <figure className="w-18 aspect-square object-cover rounded-lg bg-black/30 flex items-center justify-center">
                                                <TasksIcon className="text-3xl text-primary" />
                                            </figure>
                                            <div>
                                                <h3 className="text-lg font-semibold">
                                                    Evaluación final
                                                </h3>
                                                <p className="text-base-content/70">
                                                    completa esta evaluación para obtener tu certificado
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="w-1/3">
                            <div className="bg-base-100 rounded-lg border border-white/20 overflow-hidden sticky top-10">
                                <figure className="w-full h-48 flex items-center justify-center overflow-hidden bg-white relative">
                                    <img
                                        src={course.course_image}
                                        alt={course.course_name}
                                        className="w-full h-full object-contain"
                                    />
                                </figure>
                                <div className="p-4 flex flex-col gap-5">
                                    <div>
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
                                    <button className="btn btn-primary shadow-none rounded-lg">
                                        Empezar curso
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
