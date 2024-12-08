import React, { useState } from "react";

// Components
import { EyeIcon, EyeSlashIcon } from "../../components/icons";

// Hooks
import { useValidateform } from "../../hooks/useValidateForm";
import { usePostData } from "../../hooks/useFetchApi";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const data = Object.fromEntries(new FormData(e.target));
        const validation = useValidateform(data, "login-form");

        if (validation.success) {
            const response = usePostData("/auth/login", data);

            if (response.success) {
                window.location.href = "/";
            }
        }
    };
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left space-y-2">
                    <div className="space-y-1">
                        <h1 className="text-5xl font-extrabold tracking-tight leading-none">
                            ¿No tienes una cuenta?
                        </h1>
                        <p>Crea una cuenta para poder iniciar sesión</p>
                    </div>
                    <button className="btn btn-primary btn-sm px-8">
                        Registrarse
                    </button>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleFormSubmit} className="card-body">
                        <div>
                            <h2 className="text-4xl font-extrabold tracking-tight">
                                Iniciar sesión
                            </h2>
                            <p className=" text-lg text-gray-600 leading-[1.1]">
                                Ingresa tus datos para poder acceder a todas las
                                funcionalidades
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
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold after:content-['*'] after:ml-1 after:text-red-500 ">
                                    Contraseña:
                                </span>
                            </label>
                            <label className="input input-bordered flex items-center gap-2 group focus-within:input-primary focus-within:outline-0">
                                <input
                                    placeholder="*******"
                                    type={showPassword ? "text" : "password"}
                                    className="grow"
                                    name="user_password"
                                />
                                <kbd
                                    className="kbd kbd-sm cursor-pointer"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    {showPassword ? (
                                        <EyeSlashIcon />
                                    ) : (
                                        <EyeIcon />
                                    )}
                                </kbd>
                            </label>
                        </div>
                        <span className="label">
                            <a
                                href="#"
                                className="label-text-alt link link-hover"
                            >
                                ¿Olvidaste tu contraseña?
                            </a>
                        </span>
                        <div className="form-control mt-2">
                            <button className="btn btn-primary btn-sm">
                                Iniciar sesión
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
