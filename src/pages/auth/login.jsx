import React, { useState } from "react";

// Components
import {
    EyeIcon,
    EyeSlashIcon,
    GithubIcon,
    GoogleIcon,
    LinkedinIcon,
    MicrosoftIcon,
} from "../../components/icons";

// Hooks
import { useValidateform } from "../../hooks/useValidateForm";
import { usePostData } from "../../hooks/useFetchApi";
import { Link, useNavigate } from "react-router";

export default function Login() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const data = Object.fromEntries(new FormData(e.target));
        const validation = useValidateform(data, "login-form");

        if (validation.success) {
            const response = await usePostData("/auth/login", data);

            if (response.success) {
                navigate("/");
            }
        }
    };

    return (
        <div className="hero bg-base-200 min-h-screen bg-[url('https://static.platzi.com/media/blog/semana29-blog_marketing-gastronomico-cover-5f658307-8440-4334-9823-03e9d27dc28b.png')]">
            <div className="hero-overlay bg-opacity-60 backdrop-blur-sm bg-black/70"></div>
            <div className="hero-content flex-col lg:flex-row-reverse gap-10">
                <div className="text-center lg:text-left space-y-4 text-white">
                    <div className="space-y-2">
                        <h1 className="text-5xl font-extrabold tracking-tight leading-none">
                            ¿No tienes una cuenta?
                        </h1>
                        <p>Crea una cuenta para poder iniciar sesión</p>
                    </div>
                    <Link
                        to="/register"
                        className="btn btn-primary btn-sm px-8"
                    >
                        Registrarse
                    </Link>
                </div>
                <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl">
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
                                Iniciar sesión
                            </h2>
                            <p className="text-lg text-gray-600 leading-[1.1]">
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
                            <label className="input input-bordered input-sm flex items-center gap-2 group focus-within:input-primary focus-within:outline-0">
                                <input
                                    placeholder="*******"
                                    type={showPassword ? "text" : "password"}
                                    className="grow h-[30px]"
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
                            <Link
                                to="/recovery"
                                className="label-text-alt link link-hover"
                            >
                                ¿Olvidaste tu contraseña?
                            </Link>
                        </span>
                        <div className="form-control mt-2">
                            <button className="btn btn-primary btn-sm">
                                Iniciar sesión
                            </button>
                        </div>

                        <div className="divider">O continua con</div>
                        <Link
                            to={`${import.meta.env.VITE_API_URL}/auth/google`}
                            className="btn btn-sm w-full"
                        >
                            <GoogleIcon />
                            Continua con Google
                        </Link>
                        <Link
                            to={`${import.meta.env.VITE_API_URL}/auth/github`}
                            className="btn btn-sm btn-neutral w-full"
                        >
                            <GithubIcon />
                            Continua con Github
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}
