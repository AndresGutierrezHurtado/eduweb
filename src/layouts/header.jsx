import React from "react";
import { Link } from "react-router";

export default function Header() {
    return (
        <header className="w-full sticky top-0 z-50 px-3 pt-2">
            <div className="navbar backdrop-blur w-full max-w-[1200px] mx-auto rounded-full backdrop-blur px-0">
                <Link to="/" className="flex-1">
                    <figure className="size-[50px]">
                        <img src="/logo.png" alt="Logo de Eduweb" className="w-full h-full object-contain" />
                    </figure>
                    <a className="text-2xl font-extrabold ml-2">Eduweb</a>
                </Link>
                <div className="flex-none gap-2">
                    <ul class="menu menu-horizontal px-1 text-[18px]">
                        <li>
                            <a>Inicio</a>
                        </li>
                        <li>
                            <a>Cursos</a>
                        </li>
                    </ul>
                    <div className="dropdown dropdown-end">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost btn-circle avatar"
                        >
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                        >
                            <li>
                                <Link to="/login">
                                    Iniciar sesión
                                </Link>
                            </li>
                            <li>
                                <Link to="/register">
                                    Registrarse
                                </Link>
                            </li>                            
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li>
                                <a>Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
}
