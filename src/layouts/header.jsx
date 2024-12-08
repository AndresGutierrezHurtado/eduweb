import React from "react";
import { Link } from "react-router";

// Contexts
import { useAuthContext } from "../contexts/authContext";

// Components
import { TrashIcon } from "../components/icons";

export default function Header() {
    const { userSession, handleLogout } = useAuthContext();

    return (
        <header className="w-full sticky top-0 z-50 px-3 pt-2">
            <div className="navbar backdrop-blur w-full max-w-[1200px] mx-auto rounded-full backdrop-blur px-0">
                <Link to="/" className="flex-1">
                    <figure className="size-[50px]">
                        <img
                            src="/logo.png"
                            alt="Logo de Eduweb"
                            className="w-full h-full object-contain"
                        />
                    </figure>
                    <h2 className="text-2xl font-extrabold ml-2">Eduweb</h2>
                </Link>
                <div className="flex-none gap-2">
                    <ul className="menu menu-horizontal px-1 text-[18px]">
                        <li>
                            <a>Inicio</a>
                        </li>
                        <li>
                            <a>Cursos</a>
                        </li>
                    </ul>
                    <div className="dropdown dropdown-end">
                        {userSession ? (
                            <div
                                tabIndex={0}
                                role="button"
                                className="btn btn-ghost btn-circle avatar placeholder"
                            >
                                <div className="bg-neutral text-neutral-content w-10 rounded-full">
                                    <span className="text-xs">
                                        {userSession.user_name
                                            .split(" ")[0]
                                            .charAt(0) +
                                            userSession.user_lastname
                                                .split(" ")[0]
                                                .charAt(0)}
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <div
                                tabIndex={0}
                                role="button"
                                className="btn btn-ghost btn-circle avatar"
                            >
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="Tailwind CSS Navbar component"
                                        src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                                    />
                                </div>
                            </div>
                        )}
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                        >
                            {userSession ? (
                                <>
                                    <li>
                                        <a className="justify-between">
                                            Perfil
                                            <span className="badge">Nuevo</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            onClick={handleLogout}
                                            className="text-red-500 font-semibold"
                                        >
                                            <TrashIcon />
                                            Cerrar sesión
                                        </a>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <Link to="/login">Iniciar sesión</Link>
                                    </li>
                                    <li>
                                        <Link to="/register">Registrarse</Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
}
