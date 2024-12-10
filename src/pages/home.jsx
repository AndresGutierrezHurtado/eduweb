import React, { useState } from "react";

export default function Home() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Swal.fire({
            icon: "success",
            title: "Gracias por tu mensaje",
            text: `Gracias, ${form.name}. Hemos recibido tu mensaje.`,
        });
        setForm({ name: "", email: "", message: "" });
    };

    return (
        <div className="w-full min-h-screen bg-gray-100">
            <main className="w-full">
                <section className="bg-gradient-to-r from-primary to-indigo-600 text-white text-center py-32 px-4">
                    <h2 className="text-6xl font-extrabold mb-4">
                        Bienvenido a EduWeb
                    </h2>
                    <p className="text-xl mb-8">
                        Aprende de los mejores, con cursos y una comunidad de
                        apoyo para que logres tus objetivos.
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
                        <h3 className="text-4xl font-semibold text-center mb-12">
                            Características Destacadas
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            {[
                                "Análisis Avanzado",
                                "Alto Rendimiento",
                                "Seguridad",
                            ].map((feature, index) => (
                                <div
                                    key={index}
                                    className="p-8 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition duration-300"
                                >
                                    <div className="w-20 h-20 bg-blue-100 text-blue-500 flex items-center justify-center rounded-full mb-6">
                                        {index === 0
                                            ? "📈"
                                            : index === 1
                                            ? "⚡"
                                            : "🛡️"}
                                    </div>
                                    <h4 className="text-2xl font-semibold mb-4">
                                        {feature}
                                    </h4>
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
                        <h3 className="text-4xl font-semibold mb-12">
                            Lo que dicen nuestros clientes
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="p-8 bg-gray-50 rounded-xl shadow-lg hover:shadow-2xl transition duration-300">
                                <p className="italic text-gray-600 mb-6">
                                    "El servicio es excepcional. He visto
                                    resultados increíbles."
                                </p>
                                <h4 className="text-lg font-bold">
                                    - Juan Pérez
                                </h4>
                            </div>
                            <div className="p-8 bg-gray-50 rounded-xl shadow-lg hover:shadow-2xl transition duration-300">
                                <p className="italic text-gray-600 mb-6">
                                    "Una experiencia insuperable, lo
                                    recomiendo."
                                </p>
                                <h4 className="text-lg font-bold">
                                    - María González
                                </h4>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="bg-primary text-white py-24">
                    <div className="max-w-[1200px] mx-auto px-6 text-center">
                        <h3 className="text-6xl font-extrabold tracking-tight mb-2">
                            Contáctanos
                        </h3>
                        <p className="text-lg text-gray-300 mb-12">
                            Envíanos un mensaje y te responderemos lo antes
                            posible.
                        </p>
                        <form
                            onSubmit={handleSubmit}
                            className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-lg text-gray-800 space-y-2"
                        >
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold after:content-['*'] after:text-red-500 after:ml-1">
                                        Nombre:
                                    </span>
                                </label>
                                <input
                                    name="user_name"
                                    placeholder="Tu Nombre"
                                    className="input intput-sm w-full input-bordered"
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold after:content-['*'] after:text-red-500 after:ml-1">
                                        Correo Electronico:
                                    </span>
                                </label>
                                <input
                                    name="user_email"
                                    placeholder="ejemplo@gmail.com"
                                    className="input intput-sm w-full input-bordered"
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold after:content-['*'] after:text-red-500 after:ml-1">
                                        Mensaje:
                                    </span>
                                </label>
                                <textarea
                                    name="user_message"
                                    placeholder="Tu Mensaje"
                                    className="textarea textarea-sm w-full h-32 resize-none textarea-bordered"
                                ></textarea>
                            </div>
                            <div className="form-control pt-4">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Enviar
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
            </main>
        </div>
    );
}
