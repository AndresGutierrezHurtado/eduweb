// src/pages/activities.js
import React, { useState } from "react";

const Activities = () => {
    const [activities, setActivities] = useState([
        {
            id: 1,
            name: "Actividad 1",
            description: "Lee el capítulo 1 del libro y responde las preguntas.",
            instructions: "Entrega un archivo PDF con tus respuestas.",
            completed: false,
            file: null,
        },
        {
            id: 2,
            name: "Actividad 2",
            description: "Investiga sobre los ecosistemas y prepara una presentación.",
            instructions: "Sube un archivo PowerPoint con tu presentación.",
            completed: false,
            file: null,
        },
        {
            id: 3,
            name: "Actividad 3",
            description: "Resuelve los ejercicios de matemáticas en la hoja de trabajo.",
            instructions: "Entrega una foto o escaneo de tu trabajo.",
            completed: false,
            file: null,
        },
    ]);

    // Manejar la entrega de un archivo
    const handleFileUpload = (id, file) => {
        setActivities((prevActivities) =>
            prevActivities.map((activity) =>
                activity.id === id ? { ...activity, file, completed: true } : activity
            )
        );
    };

    // Calcular el progreso
    const calculateProgress = () => {
        const completedActivities = activities.filter((activity) => activity.completed).length;
        return Math.round((completedActivities / activities.length) * 100);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Mis Actividades</h1>
            <p className="mb-4">En esta página puedes ver las actividades, seguir las instrucciones, entregarlas y hacer seguimiento de tu progreso.</p>

            {/* Progreso */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold">Progreso</h2>
                <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden mt-2">
                    <div
                        className="bg-green-500 h-6 text-xs font-medium text-white text-center"
                        style={{ width: `${calculateProgress()}%` }}
                    >
                        {calculateProgress()}%
                    </div>
                </div>
            </div>

            {/* Lista de actividades */}
            <div>
                <h2 className="text-xl font-semibold mb-4">Actividades</h2>
                <ul className="space-y-6">
                    {activities.map((activity) => (
                        <li
                            key={activity.id}
                            className={`p-6 border rounded-lg ${
                                activity.completed ? "bg-green-100" : "bg-white"
                            }`}
                        >
                            <h3 className="text-lg font-bold">{activity.name}</h3>
                            <p className="text-gray-700 mt-2">{activity.description}</p>
                            <p className="text-gray-600 mt-2 italic">Instrucciones: {activity.instructions}</p>

                            {activity.file ? (
                                <div className="mt-4">
                                    <p className="text-green-700 font-semibold">
                                        Archivo entregado: {activity.file.name}
                                    </p>
                                </div>
                            ) : (
                                <div className="mt-4">
                                    <label
                                        htmlFor={`file-upload-${activity.id}`}
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Subir archivo
                                    </label>
                                    <input
                                        id={`file-upload-${activity.id}`}
                                        type="file"
                                        onChange={(e) => handleFileUpload(activity.id, e.target.files[0])}
                                        className="mt-2 p-2 border rounded-lg w-full"
                                    />
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Activities;
