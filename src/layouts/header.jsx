import React from "react";
import { Link } from "react-router";

// Contexts
import { useAuthContext } from "../contexts/authContext";

// Components
import {
    LoginIcon,
    LogoutIcon,
    SettingsIcon,
    TrashIcon,
    UserIcon,
    UserPlusIcon,
} from "../components/icons";

export default function Header() {
    const { userSession, handleLogout } = useAuthContext();

    window.onscroll = () => {
        const header = document.querySelector("header .navbar");
        if (window.scrollY > 50) {
            header.classList.add("bg-black/10", "px-3");
        } else {
            header.classList.remove("bg-black/10", "px-3");
        }
    };

    return (
        <header className="w-full sticky top-0 z-50 px-3 pt-2">
            <div className="navbar backdrop-blur w-full max-w-[1200px] mx-auto rounded-full backdrop-blur px-0 duration-300">
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
                    <ul className="flex gap-5 px-5 px-1 text-[18px]">
                        <li className="hover:scale-[1.15] hover:text-sky-500 duration-300">
                            <Link to="/">Inicio</Link>
                        </li>
                        <li className="hover:scale-[1.15] hover:text-sky-500 duration-300">
                            <Link to="/courses">Cursos</Link>
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
                                    <span className="text-xs uppercase">
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
                                        <Link to="/profile">
                                            <UserIcon />
                                            Perfil
                                        </Link>
                                    </li>
                                    {userSession.role_id == 3 && (
                                        <li>
                                            <Link to="/admin/users">
                                                <SettingsIcon />
                                                Administrar usuarios
                                            </Link>
                                        </li>
                                    )}
                                    <li>
                                        <a
                                            onClick={handleLogout}
                                            className="text-red-500 font-semibold"
                                        >
                                            <LogoutIcon />
                                            Cerrar sesión
                                        </a>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <Link to="/login">
                                            <LoginIcon />
                                            Iniciar sesión
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/register">
                                            <UserPlusIcon />
                                            Registrarse
                                        </Link>
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
