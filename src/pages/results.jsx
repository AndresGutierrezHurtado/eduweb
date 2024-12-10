// src/pages/results.js
import React, { useState } from "react";

// Datos de ejemplo con calificaciones por actividad
const coursesData = [
    {
        id: 1,
        title: "Desarrollo Web Completo",
        activities: [
            {
                id: 1,
                title: "Crear una página web básica",
                grade: 85,
                completed: true,
            },
            {
                id: 2,
                title: "Configurar un servidor con Node.js",
                grade: 90,
                completed: true,
            },
        ],
    },
    {
        id: 2,
        title: "Introducción a la Inteligencia Artificial",
        activities: [
            {
                id: 1,
                title: "Investigar sobre aprendizaje supervisado",
                grade: 78,
                completed: false,
            },
            {
                id: 2,
                title: "Implementar un modelo básico con Python",
                grade: null,
                completed: false,
            },
        ],
    },
    {
        id: 3,
        title: "Diseño UI/UX para Aplicaciones Modernas",
        activities: [
            {
                id: 1,
                title: "Diseñar una interfaz para aplicación",
                grade: 92,
                completed: true,
            },
            {
                id: 2,
                title: "Realizar pruebas de usabilidad",
                grade: null,
                completed: false,
            },
        ],
    },
];

const Results = () => {
    const [courses, setCourses] = useState(coursesData);

    // Calcular el total de calificación para cada curso
    const getCourseGrade = (activities) => {
        const completedActivities = activities.filter(
            (activity) => activity.completed
        );
        const totalGrade = completedActivities.reduce(
            (total, activity) => total + (activity.grade || 0),
            0
        );
        return completedActivities.length > 0
            ? totalGrade / completedActivities.length
            : 0;
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Mis Resultados</h1>
            <p className="mb-4">
                En esta página, los estudiantes podrán consultar los resultados
                de las actividades que han entregado.
            </p>

            {/* Lista de cursos con resultados */}
            <div className="space-y-6">
                {courses.map((course) => (
                    <div
                        key={course.id}
                        className="p-6 bg-white rounded-lg shadow-md"
                    >
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            {course.title}
                        </h2>

                        {/* Mostrar actividades del curso */}
                        <div className="space-y-4">
                            {course.activities.map((activity) => (
                                <div
                                    key={activity.id}
                                    className="flex justify-between items-center border-b py-2"
                                >
                                    <div className="text-gray-700">
                                        <p>{activity.title}</p>
                                        <p className="text-sm text-gray-500">
                                            {activity.completed
                                                ? "Completada"
                                                : "No completada"}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        {activity.grade !== null ? (
                                            <span className="text-lg font-semibold text-green-600">
                                                {activity.grade} / 100
                                            </span>
                                        ) : (
                                            <span className="text-lg font-semibold text-gray-500">
                                                Pendiente
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Mostrar calificación total del curso */}
                        <div className="mt-4">
                            <h3 className="font-semibold">
                                Calificación total:
                            </h3>
                            <span className="text-xl font-bold text-blue-600">
                                {getCourseGrade(course.activities).toFixed(2)} /
                                100
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Mensaje cuando no haya resultados */}
            {courses.every((course) =>
                course.activities.every((activity) => !activity.completed)
            ) && (
                <p className="text-center text-gray-600 mt-10">
                    No tienes resultados para mostrar, ya que no has completado
                    ninguna actividad.
                </p>
            )}
        </div>
    );
};

export default Results;
