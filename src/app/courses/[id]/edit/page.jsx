import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";

// Components
import CourseEditForm from "@/components/CourseEditForm";

// Hooks
import { getData } from "@/hooks/serverFetch";

export const metadata = {
    title: "Editar Curso | EduWeb",
};

export default async function Page({ params }) {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }

    const course = await getData(`/courses/${id}`);

    // Verify if the logged user is the course teacher
    if (course.teacher_id !== session.user.user_id) {
        redirect("/profile");
    }

    return (
        <section className="w-full px-3">
            <div className="w-full max-w-[1200px] mx-auto py-10">
                <div className="flex flex-col gap-6">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Editar Curso</h1>
                        <p className="text-base-content/70">Actualiza la información de tu curso</p>
                    </div>

                    <CourseEditForm course={course} />
                </div>
            </div>
        </section>
    );
}
