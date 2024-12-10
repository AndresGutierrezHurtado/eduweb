import React, { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Gracias, ${form.name}. Hemos recibido tu mensaje.`);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="w-full min-h-screen bg-gray-100">
      
      
      {/* Navbar principal */}
      <header className="fixed w-full top-16 bg-white shadow-lg z-20">
        <div className="max-w-[1000px] mx-auto py-4 px-6 flex justify-center items-center">
          <nav>
            <ul className="flex space-x-6">
              <li>
                <a href="#home" className="hover:text-blue-600 transition duration-300">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-blue-600 transition duration-300">
                  Características
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-blue-600 transition duration-300">
                  Testimonios
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-blue-600 transition duration-300">
                  Contacto
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Segundo Navbar (Cursos, Actividades, Resultados, Inscripción en Cursos) */}
      <header className="fixed w-full top-32 bg-white shadow-lg z-40">
        <div className="max-w-[1000px] mx-auto py-6 px-6 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-400"></h1>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <a href="/courses" className="hover:text-blue-500 transition">
                  Cursos
                </a>
              </li>
              <li>
                <a href="/activities" className="hover:text-blue-500 transition">
                  Actividades
                </a>
              </li>
              <li>
                <a href="/results" className="hover:text-blue-500 transition">
                  Resultados
                </a>
              </li>
              <li>
                <a href="/student/courses" className="hover:text-blue-500 transition">
                  Inscripción en Cursos
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-40">
        {/* Hero Section */}
        <section
          id="home"
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center py-32 px-4"
        >
          <h2 className="text-6xl font-extrabold mb-4">Bienvenido a Mi Página Web</h2>
          <p className="text-xl mb-8">
            Explora soluciones innovadoras diseñadas para tu éxito.
          </p>
          <a
            href="#features"
            className="bg-white text-blue-600 px-8 py-3 rounded-xl shadow-md hover:bg-gray-200 transition duration-300"
          >
            Ver Características
          </a>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-gray-50">
          <div className="max-w-[1200px] mx-auto px-6">
            <h3 className="text-4xl font-semibold text-center mb-12">Características Destacadas</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {["Análisis Avanzado", "Alto Rendimiento", "Seguridad"].map((feature, index) => (
                <div
                  key={index}
                  className="p-8 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition duration-300"
                >
                  <div className="w-20 h-20 bg-blue-100 text-blue-500 flex items-center justify-center rounded-full mb-6">
                    {index === 0 ? "📈" : index === 1 ? "⚡" : "🛡️"}
                  </div>
                  <h4 className="text-2xl font-semibold mb-4">{feature}</h4>
                  <p className="text-gray-600">
                    {feature === "Análisis Avanzado"
                      ? "Decisiones inteligentes basadas en datos."
                      : feature === "Alto Rendimiento"
                      ? "Velocidad y fluidez garantizadas."
                      : "Protección de datos de primer nivel."}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="bg-white py-24">
          <div className="max-w-[1200px] mx-auto px-6 text-center">
            <h3 className="text-4xl font-semibold mb-12">Lo que dicen nuestros clientes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="p-8 bg-gray-50 rounded-xl shadow-lg hover:shadow-2xl transition duration-300">
                <p className="italic text-gray-600 mb-6">
                  "El servicio es excepcional. He visto resultados increíbles."
                </p>
                <h4 className="text-lg font-bold">- Juan Pérez</h4>
              </div>
              <div className="p-8 bg-gray-50 rounded-xl shadow-lg hover:shadow-2xl transition duration-300">
                <p className="italic text-gray-600 mb-6">
                  "Una experiencia insuperable, lo recomiendo."
                </p>
                <h4 className="text-lg font-bold">- María González</h4>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="bg-blue-600 text-white py-24">
          <div className="max-w-[1200px] mx-auto px-6 text-center">
            <h3 className="text-4xl font-semibold mb-8">Contáctanos</h3>
            <p className="text-lg mb-12">
              Envíanos un mensaje y te responderemos lo antes posible.
            </p>
            <form
              onSubmit={handleSubmit}
              className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-lg text-gray-800"
            >
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleInputChange}
                placeholder="Tu Nombre"
                className="w-full mb-6 px-6 py-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleInputChange}
                placeholder="Tu Correo"
                className="w-full mb-6 px-6 py-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                name="message"
                value={form.message}
                onChange={handleInputChange}
                placeholder="Tu Mensaje"
                className="w-full mb-6 px-6 py-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="6"
              ></textarea>
              <button
                type="submit"
                className="bg-blue-600 text-white px-8 py-4 rounded-xl shadow-lg hover:bg-blue-700 transition duration-300"
              >
                Enviar
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="max-w-[1200px] mx-auto text-center">
          <p>&copy; 2024 Mi Página Web. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
