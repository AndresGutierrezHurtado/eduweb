import { getData } from "@/hooks/serverFetch";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";

export default async function Page({ params }) {
    const { id } = await params;
    const { user } = await getServerSession(authOptions);

    const course = await getData(`/courses/${id}`);
    const { examsTaken } = await getData(`/users/${user?.user_id}/courses/${id}`);

    return (
        <>
            <section className="w-full px-3 flex-1 flex items-center">
                <div className="w-full max-w-[1200px] mx-auto flex gap-10 items-center">
                    <div className="w-1/2 flex flex-col gap-5">
                        <div className="avatar">
                            <div className="w-40 bg-black/10 rounded-lg drop-shadow-[0_0_20px_var(--color-primary)]">
                                <img
                                    src={course.course_image}
                                    alt={course.course_title}
                                    className="[object-fit:contain_!important]"
                                />
                            </div>
                        </div>
                        <p className="uppercase tracking-tight font-bold text-primary">
                            Certificación
                        </p>
                        <div>
                            <h1 className="text-3xl mb-1">{course.course_name}</h1>
                            <p className="text-base-content/80">
                                ¡Excelente! Estás a punto de validar todo lo aprendido. Para
                                certificarte, puedes presentar el examen las veces que quieras.
                            </p>
                        </div>
                        <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                            <input type="radio" name="my-accordion-2" />
                            <div className="collapse-title font-semibold">Intentos anteriores</div>
                            <div className="collapse-content text-sm flex flex-col gap-2">
                                {examsTaken.map((exam) => {
                                    const answers = exam.userAnswers.flatMap(
                                        (answer) => answer.answer
                                    );
                                    const correctAnswers = answers.filter(
                                        (answer) => answer.is_correct
                                    ).length;
                                    return (
                                        <div key={exam.user_exam_id}>
                                            <Link
                                                href={`/courses/${id}/exam/${exam.user_exam_id}/results`}
                                                className="flex items-center justify-between gap-2 hover:underline cursor-pointer"
                                            >
                                                <span className="flex items-center gap-4">
                                                    <span>
                                                        Intento {examsTaken.indexOf(exam) + 1}
                                                    </span>
                                                    <span>
                                                        {correctAnswers}/{answers.length}
                                                    </span>
                                                </span>
                                                <span>
                                                    {new Date(exam.createdAt).toLocaleString()}
                                                </span>
                                            </Link>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <Link href={`/courses/${id}/exam/questions`}>
                            <button className="btn btn-primary shadow-none h-auto py-2 w-fit">
                                Comenzar
                            </button>
                        </Link>
                    </div>
                    <div className="bg-black/25 p-8 rounded-lg border border-base-300 w-1/2">
                        <p className="font-semibold text-lg mb-5">Presentando el examen:</p>
                        <ul className="flex flex-col gap-2">
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 aspect-square rounded-full bg-primary"></span>
                                <span>El examen se pierde si no se resuelve en 10 minutos.</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 aspect-square rounded-full bg-primary"></span>
                                <span>El examen se pierde si se abandona.</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 aspect-square rounded-full bg-primary"></span>
                                <span>El examen consta de 5 preguntas</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 aspect-square rounded-full bg-primary"></span>
                                <span>Necesitas 4 respuestas correctas para aprobarlo</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </>
    );
}
