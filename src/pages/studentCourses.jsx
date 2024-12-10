import React, { useState } from "react";

export default function StudentCourses() {
  const [availableCourses, setAvailableCourses] = useState([
    {
      id: 1,
      title: "Curso de Matemáticas",
      description: "Aprende los fundamentos de las matemáticas con enfoque práctico.",
      duration: "40 horas",
      level: "Básico",
      category: "Ciencias",
    },
    {
      id: 2,
      title: "Curso de Física",
      description: "Estudia los conceptos básicos de la física, ideal para principiantes.",
      duration: "45 horas",
      level: "Intermedio",
      category: "Ciencias",
    },
    {
      id: 3,
      title: "Curso de Historia",
      description: "Descubre los eventos históricos que dieron forma al mundo moderno.",
      duration: "30 horas",
      level: "Básico",
      category: "Humanidades",
    },
  ]);

  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const handleCourseSelection = (course) => {
    setSelectedCourse(course);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEnrollment = (course) => {
    if (formData.name && formData.email) {
      if (enrolledCourses.includes(course.title)) {
        alert("Ya estás inscrito en este curso.");
      } else {
        setEnrolledCourses((prev) => [...prev, course.title]);
        setAvailableCourses((prev) =>
          prev.filter((item) => item.title !== course.title)
        );
        alert(`Te has inscrito exitosamente en el curso: ${course.title}`);
        setFormData({ name: "", email: "" }); // Limpiar formulario
      }
    } else {
      alert("Por favor, completa el formulario antes de inscribirte.");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 p-6">
      <div className="max-w-[800px] mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">Inscripción en Cursos</h1>

        {/* Lista de cursos disponibles */}
        <div className="space-y-6">
          {availableCourses.map((course) => (
            <div key={course.id} className="p-4 border rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800">{course.title}</h3>
              <p className="text-gray-600">{course.description}</p>
              <p className="text-sm text-gray-500">Categoría: {course.category}</p>
              <p className="text-sm text-gray-500">Duración: {course.duration}</p>
              <p className="text-sm text-gray-500">Nivel: {course.level}</p>

              <button
                onClick={() => handleCourseSelection(course)}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Inscribirse
              </button>
            </div>
          ))}
        </div>

        {/* Mostrar formulario de inscripción si se seleccionó un curso */}
        {selectedCourse && (
          <div className="mt-8 p-6 bg-gray-50 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Formulario de Inscripción en {selectedCourse.title}</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleEnrollment(selectedCourse);
              }}
            >
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border rounded"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border rounded"
                />
              </div>

              <button
                type="submit"
                className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 transition w-full"
              >
                Completar Inscripción
              </button>
            </form>
          </div>
        )}

        {/* Mostrar cursos inscritos */}
        {enrolledCourses.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-2">Cursos Inscritos</h3>
            <ul className="list-disc pl-5">
              {enrolledCourses.map((course, index) => (
                <li key={index} className="text-gray-700">{course}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
