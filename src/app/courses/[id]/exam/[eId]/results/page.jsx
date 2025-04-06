import { ArrowRight, CheckIcon, CloseIcon } from "@/components/icons";
import { getData } from "@/hooks/serverFetch";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";

export default async function Page({ params }) {
    const { id, eId } = await params;
    const data = await getServerSession(authOptions);
    const user = data?.user;

    const course = await getData(`/courses/${id}`);
    const exam = await getData(`/courses/${id}/exam`);
    const ucourse = await getData(`/users/${user.user_id}/courses/${id}`);
    const userExam = await getData(`/users/${user.user_id}/courses/${id}/exams/${eId}`);

    const assertions = userExam.userAnswers.reduce((acc, answer) => {
        if (answer.answer.is_correct) acc += 1;
        return acc;
    }, 0);
    const score = (assertions / exam.questions.length) * 100;

    if (userExam.exam_state !== "completed") {
        return (
            <section className="w-full px-3">
                <div className="w-full max-w-[1200px] mx-auto py-10">
                    <h1 className="text-3xl font-bold text-primary">
                        El examen no está completado
                    </h1>
                    <Link href={`/courses/${id}/exam/questions`} className="btn btn-primary ">
                        Volver al examen
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <>
            <section className="w-full px-3">
                <div className="w-full max-w-[1200px] mx-auto py-10">
                    <div className="flex flex-col gap-10">
                        <header className="w-full flex items-center justify-between">
                            <div className="flex items-center gap-6">
                                <Link href={`/courses/${id}`} className="btn btn-ghost btn-circle">
                                    <div className="avatar">
                                        <div className="w-16 aspect-square rounded-full bg-black/25 border border-base-300">
                                            <img
                                                src={course.course_image}
                                                alt={course.course_title}
                                                className="[object-fit:contain_!important]"
                                            />
                                        </div>
                                    </div>
                                </Link>
                                <div>
                                    <Link
                                        href={`/courses/${id}`}
                                        className="text-xl text-base-content"
                                    >
                                        {course.course_name}
                                    </Link>
                                    <p className="text-base-content/80">Resultado evaluación</p>
                                </div>
                            </div>
                            <nav className="flex items-center gap-4"></nav>
                        </header>
                        <hr className="border-base-300" />
                        <div className="flex gap-10 py-10">
                            <div className="w-1/2">
                                {score >= 80 ? (
                                    <>
                                        <h1 className="text-3xl font-bold mb-2">¡Excelente!</h1>
                                        <p className="text-lg text-base-content/80 mb-4 text-pretty">
                                            ¡Felicitaciones! Has aprobado la evaluación. Ahora
                                            puedes obtener tu certificado digital.
                                        </p>
                                        <button className="btn btn-primary shadow-none w-fit rounded-lg font-medium text-base">
                                            Obtener certificado <ArrowRight />
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <h1 className="text-3xl font-bold mb-2">¡No te rindas!</h1>
                                        <p className="text-lg text-base-content/80 mb-4 text-pretty">
                                            Para aprovar necesitas una calificación de al menos 80%.
                                            Vuelve a intentarlo cuando estés listo.
                                        </p>
                                        <Link
                                            href={`/courses/${id}/exam/`}
                                            className="btn btn-primary shadow-none w-fit rounded-lg font-medium text-base"
                                        >
                                            <button className="btn btn-primary shadow-none w-fit rounded-lg font-medium text-base">
                                                Volver a intentarlo <ArrowRight />
                                            </button>
                                        </Link>
                                    </>
                                )}
                            </div>
                            <article className="w-1/2 p-8 rounded-lg bg-black/25 border border-base-300 h-fit">
                                <div className="flex gap-10 divide-x divide-base-300">
                                    <div className="w-1/2 text-center">
                                        <h3 className="text-3xl font-bold">{score.toFixed(2)}%</h3>
                                        <p>Calificacion</p>
                                    </div>
                                    <div className="w-1/2 text-center">
                                        <h3 className="text-3xl font-bold">
                                            {assertions} / {exam.questions.length}
                                        </h3>
                                        <p>Aciertos</p>
                                    </div>
                                </div>
                            </article>
                        </div>
                        <hr className="border-base-300" />
                        <div className="flex flex-col gap-10">
                            {exam.questions.map((question, index) => {
                                const answer = userExam.userAnswers.find(
                                    (el) => el.answer.question_id === question.question_id
                                )?.answer;
                                const is_correct = answer?.is_correct || false;

                                return (
                                    <div key={question.question_id} className="flex flex-col gap-2">
                                        <p className="text-lg">
                                            <span className="text-base-content/50 mr-4">
                                                {index + 1}.{" "}
                                            </span>
                                            <span>{question.question_text}</span>
                                        </p>
                                        <div
                                            role="alert"
                                            className={`alert ${
                                                is_correct ? "alert-success" : "alert-error"
                                            } alert-outline flex items-center justify-between`}
                                        >
                                            {answer ? (
                                                <span>{answer.answer_text}</span>
                                            ) : (
                                                <span className="text-base-content/50">
                                                    No respondido
                                                </span>
                                            )}
                                            {is_correct ? <CheckIcon /> : <CloseIcon />}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
