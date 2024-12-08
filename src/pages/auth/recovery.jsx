import React from "react";
import { Link, useNavigate } from "react-router";

// Hooks
import { useValidateform } from "../../hooks/useValidateForm";
import { usePostData } from "../../hooks/useFetchApi";

export default function Recovery() {
    const navigate = useNavigate();

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const data = Object.fromEntries(new FormData(e.target));
        const validation = useValidateform(data, "recovery-form");

        if (validation.success) {
            const response = await usePostData("/auth/recovery", data);

            if (response.success) {
                navigate("/login");
            }
        }
    };

    return (
        <div className="hero bg-base-200 min-h-screen bg-[url('https://static.platzi.com/media/blog/semana29-blog_marketing-gastronomico-cover-5f658307-8440-4334-9823-03e9d27dc28b.png')]">
            <div className="hero-overlay bg-opacity-60 backdrop-blur-sm bg-black/70"></div>
            <div className="hero-content flex-col lg:flex-row-reverse gap-10">
                <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-2xl">
                    <form onSubmit={handleFormSubmit} className="card-body">
                        <div className="text-center">
                            <Link
                                to="/"
                                className="w-fit block mx-auto mb-2 avatar"
                            >
                                <div className="w-full max-w-[100px] rounded-full">
                                    <img
                                        src="/logo.jpg"
                                        alt="Logo de Eduweb"
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            </Link>
                            <h2 className="text-4xl font-extrabold tracking-tight">
                                Recupera tu cuenta
                            </h2>
                            <p className="text-lg text-gray-600 leading-[1.1]">
                                Ingresa el correo electrónico asociado a tu
                                cuenta y te enviaremos un enlace para
                                restablecer tu contraseña
                            </p>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold after:content-['*'] after:ml-1 after:text-red-500 ">
                                    Correo electrónico:
                                </span>
                            </label>
                            <input
                                placeholder="ejemplo@gmail.com"
                                className="input input-bordered input-sm focus:outline-0 focus:input-primary"
                                name="user_email"
                            />
                        </div>
                        <div className="form-control mt-2">
                            <button className="btn btn-primary btn-sm">
                                Recuperar contraseña
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
