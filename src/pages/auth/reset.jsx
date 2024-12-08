import React, { useState } from "react";
import { Link, useParams } from "react-router";

// Components
import { EyeIcon, EyeSlashIcon } from "../../components/icons";

// Hooks
import { useValidateform } from "../../hooks/useValidateForm";
import { usePostData } from "../../hooks/useFetchApi";
import { useNavigate } from "react-router";

export default function Reset() {
    const [showPassword, setShowPassword] = useState(false);
    const token = useParams().token;
    const navigate = useNavigate();

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const data = Object.fromEntries(new FormData(e.target));
        const validation = useValidateform(data, "reset-password-form");

        if (validation.success) {
            const response = await usePostData(`/auth/reset-password/${token}`, data);

            if (response.success) {
                navigate("/login");
            }
        }
    };

    return (
        <div className="hero bg-base-200 min-h-screen bg-[url('/background.jpg')]">
            <div className="hero-overlay bg-opacity-60 backdrop-blur-sm bg-black/70"></div>
            <div className="hero-content flex-col lg:flex-row-reverse gap-10 w-full max-w-lg">
                <div className="card bg-base-100 shrink-0 shadow-2xl">
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
                                Cambia tu contraseña
                            </h2>
                            <p className="text-lg text-gray-600 leading-[1.1]">
                                Ingresa una contraseña nueva para acceder a tu
                                cuenta
                            </p>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold after:content-['*'] after:ml-1 after:text-red-500 ">
                                    Contraseña:
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
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold after:content-['*'] after:ml-1 after:text-red-500 ">
                                    Confirmar contraseña:
                                </span>
                            </label>
                            <label className="input input-bordered input-sm flex items-center gap-2 group focus-within:input-primary focus-within:outline-0">
                                <input
                                    placeholder="*******"
                                    type={showPassword ? "text" : "password"}
                                    className="grow h-[30px]"
                                    name="user_password_confirm"
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
                        <div className="form-control mt-2">
                            <button className="btn btn-primary btn-sm">
                                Cambiar contraseña
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
