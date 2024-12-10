import React, { useState } from "react";

const coursesData = [
  {
    id: 1,
    title: "Desarrollo Web Completo",
    description:
      "Aprende HTML, CSS, JavaScript y frameworks populares como React y Node.js para convertirte en un desarrollador web completo.",
    category: "Desarrollo",
    duration: "60 horas",
    level: "Intermedio",
    activities: [
      { id: 1, title: "Crear una página web básica", status: "Pendiente" },
      { id: 2, title: "Configurar un servidor con Node.js", status: "Pendiente" },
    ],
  },
  {
    id: 2,
    title: "Introducción a la Inteligencia Artificial",
    description:
      "Descubre los fundamentos de la inteligencia artificial y explora aplicaciones prácticas como aprendizaje automático y redes neuronales.",
    category: "Tecnología",
    duration: "40 horas",
    level: "Básico",
    activities: [
      { id: 1, title: "Investigar sobre aprendizaje supervisado", status: "Pendiente" },
      { id: 2, title: "Implementar un modelo básico con Python", status: "Pendiente" },
    ],
  },
  // Agrega más cursos con actividades si lo deseas
];

export default function Courses() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedCourse, setSelectedCourse] = useState(null);

  const categories = ["Todos", "Desarrollo", "Tecnología", "Diseño"];

  const filteredCourses = coursesData.filter((course) => {
    const matchesSearchTerm = course.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "Todos" || course.category === selectedCategory;
    return matchesSearchTerm && matchesCategory;
  });

  const handleViewCourse = (course) => {
    setSelectedCourse(course);
  };

  const handleActivityStatusChange = (courseId, activityId) => {
    setSelectedCourse((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        activities: prev.activities.map((activity) =>
          activity.id === activityId
            ? { ...activity, status: activity.status === "Pendiente" ? "Completada" : "Pendiente" }
            : activity
        ),
      };
    });

    // Actualizar globalmente en `coursesData` (en un backend real, este sería un cambio persistente)
    coursesData.forEach((course) => {
      if (course.id === courseId) {
        course.activities = course.activities.map((activity) =>
          activity.id === activityId
            ? { ...activity, status: activity.status === "Pendiente" ? "Completada" : "Pendiente" }
            : activity
        );
      }
    });
  };

  return (
    <section className="w-full px-3 py-10 bg-gray-50">
      <div className="w-full max-w-[1200px] mx-auto">
        {!selectedCourse ? (
          <>
            <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-6">
              Explora Nuestros Cursos
            </h2>
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
              <input
                type="text"
                placeholder="Buscar cursos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full md:w-1/4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition"
                >
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <div className="text-sm text-gray-500 mb-2">
                    <p>
                      <strong>Categoría:</strong> {course.category}
                    </p>
                    <p>
                      <strong>Duración:</strong> {course.duration}
                    </p>
                    <p>
                      <strong>Nivel:</strong> {course.level}
                    </p>
                  </div>
                  <button
                    onClick={() => handleViewCourse(course)}
                    className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                  >
                    Ver Más
                  </button>
                </div>
              ))}
            </div>
            {filteredCourses.length === 0 && (
              <p className="text-center text-gray-600 mt-10">
                No se encontraron cursos que coincidan con los criterios.
              </p>
            )}
          </>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <button
              onClick={() => setSelectedCourse(null)}
              className="mb-4 text-blue-500 underline"
            >
              Volver a los cursos
            </button>
            <h2 className="text-3xl font-bold mb-4">{selectedCourse.title}</h2>
            <p className="text-gray-600">{selectedCourse.description}</p>
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-4">Actividades</h3>
              <ul>
                {selectedCourse.activities.map((activity) => (
                  <li
                    key={activity.id}
                    className="p-4 border-b flex justify-between items-center"
                  >
                    <span>{activity.title}</span>
                    <button
                      onClick={() =>
                        handleActivityStatusChange(selectedCourse.id, activity.id)
                      }
                      className={`px-4 py-2 rounded ${
                        activity.status === "Pendiente"
                          ? "bg-gray-300"
                          : "bg-green-500 text-white"
                      }`}
                    >
                      {activity.status}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
