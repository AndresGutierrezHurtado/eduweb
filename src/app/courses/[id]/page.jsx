import React from "react";

export default async function Page({ params }) {
    const { id } = await params;
    const response = await fetch(process.env.NEXTAUTH_URL + "/api/courses/" + id);
    const { data: course } = await response.json();

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
                                <p className="text-base-content/80">{course.course_description}</p>
                            </article>
                            <ul className="timeline timeline-vertical">
                                {course.blocks.map((block) => (
                                    <React.Fragment key={block.block_id}>
                                        <li className="grid grid-cols-[0fr_15px_2fr_!important]">
                                            <div className="timeline-end pl-5">
                                                {block.block_description}
                                            </div>
                                            <div className="timeline-middle">
                                                <div className="w-2 aspect-square bg-primary rounded-full"></div>
                                            </div>
                                            <hr className="bg-primary" />
                                        </li>
                                        {block.lessons.map((lesson, li) => {
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
                                                                {li + 1}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="timeline-end pl-5 py-3">
                                                        <div className="flex flex-row gap-5">
                                                            <img
                                                                src={thumbnailUrl}
                                                                className="w-18 aspect-square object-cover rounded-lg"
                                                                alt={
                                                                    "Imagen " + lesson.lesson_title
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
                            </ul>
                        </div>

                        <div className="w-1/3">
                            <div className="bg-base-100 rounded-lg border border-white/20 overflow-hidden">
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
