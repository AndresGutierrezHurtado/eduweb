import React from "react";
import { Link, useParams } from "react-router";

export default function Course() {
    const { id } = useParams();

    const course = {
        id: 1,
        title: "Desarrollo Web Completo",
        description:
            "Aprende HTML, CSS, JavaScript y frameworks populares como React y Node.js para convertirte en un desarrollador web completo.",
        activities: [
            {
                id: 1,
                title: "Crear una p gina web b sica",
                status: "Pendiente",
            },
            {
                id: 2,
                title: "Configurar un servidor con Node.js",
                status: "Pendiente",
            },
        ],
    };

    return (
        <section className="w-full">
            <div className="w-full max-w-[1200px] mx-auto py-10">
                <div className="flex justify-between">
                    <h2 className="text-3xl font-extrabold">
                        Curso: {course.title}
                    </h2>

                    <Link
                        to="/courses"
                        className="mb-4 text-blue-500 underline"
                    >
                        Volver a los cursos
                    </Link>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <p className="text-gray-600">{course.description}</p>
                    <div className="mt-6">
                        <h3 className="text-xl font-semibold mb-4">
                            Actividades
                        </h3>
                        <ul>
                            {course.activities.map((activity) => (
                                <li
                                    key={activity.id}
                                    className="p-4 border-b flex justify-between items-center"
                                >
                                    <span>{activity.title}</span>
                                    <button className="btn" disabled>
                                        {activity.status}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <button className="btn btn-sm btn-wide bg-green-500 hover:bg-green-600 mt-4">
                        Inscribirse
                    </button>
                </div>
            </div>
        </section>
    );
}
