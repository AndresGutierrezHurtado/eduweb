"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Hooks
import { usePostData } from "@/hooks/useFetch.js";

// Components
import { FaGoogle, FaGithub } from "react-icons/fa";

export default function Page() {
    const router = useRouter();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target));

        const response = await usePostData("/users", { user: data });

        if (response.success) {
            e.target.reset();
            router.push("/login");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-10">
            <div className="card w-full max-w-md bg-black/20 shadow-xl z-1">
                <div className="card-body space-y-4">
                    <div className="space-y-2">
                        <div>
                            <Link href="/" className="uppercase text-primary font-bold">
                                EduWeb
                            </Link>
                            <h2 className="card-title text-2xl font-bold">Registrarse</h2>
                        </div>
                        <p className="text-lg leading-[1.1] text-gray-400">
                            Crea una cuenta para ser parte de nuestra comunidad
                        </p>
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="fieldset">
                            <label className="fieldset-label font-semibold after:content-['*'] after:text-red-500">
                                <span className="label-text">Nombre:</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Ingresa tu nombre"
                                className="input input-bordered focus:outline-none focus:border-primary w-full"
                                name="user_name"
                                required
                            />
                        </div>

                        <div className="fieldset">
                            <label className="fieldset-label font-semibold after:content-['*'] after:text-red-500">
                                <span className="label-text">Apellido:</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Ingresa tu apellido"
                                className="input input-bordered focus:outline-none focus:border-primary w-full"
                                name="user_lastname"
                                required
                            />
                        </div>

                        <div className="fieldset">
                            <label className="fieldset-label font-semibold after:content-['*'] after:text-red-500">
                                <span className="label-text">Correo electrónico:</span>
                            </label>
                            <input
                                type="email"
                                placeholder="Ingresa tu correo electrónico"
                                className="input input-bordered focus:outline-none focus:border-primary w-full"
                                name="user_email"
                                required
                            />
                        </div>

                        <div className="fieldset">
                            <label className="fieldset-label font-semibold after:content-['*'] after:text-red-500">
                                <span className="label-text">Teléfono:</span>
                            </label>
                            <input
                                type="tel"
                                placeholder="Ingresa tu número de teléfono"
                                className="input input-bordered focus:outline-none focus:border-primary w-full"
                                name="user_phone"
                                required
                            />
                        </div>

                        <div className="form-control">
                            <label className="fieldset-label font-semibold after:content-['*'] after:text-red-500">
                                <span className="label-text">Contraseña:</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Ingresa tu contraseña"
                                className="input input-bordered focus:outline-none focus:border-primary w-full"
                                name="user_password"
                                required
                            />
                        </div>

                        <div className="fieldset">
                            <label className="fieldset-label font-semibold after:content-['*'] after:text-red-500">
                                <span className="label-text">URL de imagen de perfil:</span>
                            </label>
                            <input
                                type="url"
                                placeholder="Ingresa la URL de tu imagen"
                                className="input input-bordered focus:outline-none focus:border-primary w-full"
                                name="user_image"
                            />
                        </div>

                        <div className="form-control">
                            <label className="fieldset-label font-semibold after:content-['*'] after:text-red-500">
                                <span className="label-text">Rol:</span>
                            </label>
                            <select
                                className="select select-bordered focus:outline-none focus:border-primary w-full"
                                name="role_id"
                                required
                            >
                                <option value="1">Estudiante</option>
                                <option value="2">Profesor</option>
                            </select>
                        </div>

                        <div className="form-control mt-6">
                            <button className="btn btn-primary shadow-none w-full">
                                Registrarse
                            </button>
                        </div>
                        <p className="text-sm text-base-content/70">
                            Ya tienes una cuenta?{" "}
                            <Link href="/login" className="text-primary font-bold">
                                Inicia sesión
                            </Link>
                        </p>
                    </form>

                    <div className="divider">OR</div>

                    <div className="space-y-3">
                        <button onClick={() => signIn("google")} className="btn btn-outline w-full">
                            <FaGoogle className="mr-2" />
                            Iniciar sesión con Google
                        </button>

                        <button onClick={() => signIn("github")} className="btn btn-outline w-full">
                            <FaGithub className="mr-2" />
                            Iniciar sesión con GitHub
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
