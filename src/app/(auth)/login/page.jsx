"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { FaGoogle, FaGithub } from "react-icons/fa";

export default function Page() {
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target));

        console.log(data);
        signIn("credentials", data);
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="card w-96 bg-black/20 shadow-xl z-1">
                <div className="card-body space-y-4">
                    <div className="space-y-2">
                        <div>
                            <Link href="/" className="uppercase text-primary font-bold">
                                EduWeb
                            </Link>
                            <h2 className="card-title text-2xl font-bold">Iniciar sesión</h2>
                        </div>
                        <p className="text-lg leading-[1.1] text-gray-400">
                            Ingresa tu correo electrónico y contraseña para iniciar sesión
                        </p>
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Correo electrónico</span>
                            </label>
                            <input
                                type="email"
                                placeholder="Ingresa tu correo electrónico"
                                className="input input-bordered focus:outline-none focus:border-primary"
                                name="user_email"
                                required
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Contraseña</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Ingresa tu contraseña"
                                className="input input-bordered focus:outline-none focus:border-primary"
                                name="user_password"
                                required
                            />
                        </div>

                        <div className="form-control mt-6">
                            <button className="btn btn-primary shadow-none w-full">
                                Iniciar sesión
                            </button>
                        </div>
                        <p className="text-sm text-base-content/70">
                            No tienes una cuenta?{" "}
                            <Link href="/register" className="text-primary font-bold">
                                Registrarse
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
