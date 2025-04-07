"use client";

import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Swal from "sweetalert2";

// Components
import { GearIcon, LogOutIcon, SearchIcon, UserIcon } from "@/components/icons";

export default function Header() {
    const { data, status } = useSession();
    const userSession = data?.user;

    const logout = () => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Esta acción cerrará tu sesión",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, cerrar sesión",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                signOut();
            }
        });
    };

    return (
        <header className="w-full px-3">
            <div className="w-full max-w-[1200px] mx-auto py-2">
                <div className="w-full flex justify-between navbar p-0">
                    <Link href="/" className="navbar-start">
                        <h1 className="text-4xl font-bold font-alegreya">
                            Edu<span className="text-primary">Web</span>
                        </h1>
                    </Link>
                    <label className="input rounded-lg bg-base-100/50 focus-within:outline-0 border-white/80 focus-within:border-primary w-full max-w-[400px]">
                        <input type="text" name="search" placeholder="Buscar cursos" />
                        <button className="btn btn-ghost hover:bg-white/10 btn-sm btn-circle">
                            <SearchIcon size={15} />
                        </button>
                    </label>
                    <div className="flex items-center justify-end gap-8 navbar-end">
                        <ul className="flex items-center gap-4">
                            <li className="hover:text-primary hover:scale-105 duration-300">
                                <Link href="/courses">Cursos</Link>
                            </li>
                            <li className="hover:text-primary hover:scale-105 duration-300">
                                <Link href="/certifications">Certificaciones</Link>
                            </li>
                        </ul>
                        {userSession ? (
                            <>
                                <div className="dropdown dropdown-end">
                                    <div
                                        tabIndex={0}
                                        role="button"
                                        className="btn btn-ghost btn-circle avatar"
                                    >
                                        <div className="w-10 rounded-full">
                                            <img
                                                alt="Tailwind CSS Navbar component"
                                                fetchPriority="low"
                                                src={userSession.user_image}
                                            />
                                        </div>
                                    </div>
                                    <ul
                                        tabIndex={0}
                                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                                    >
                                        <li>
                                            <Link href="/profile">
                                                <UserIcon size={15} />
                                                Perfil
                                            </Link>
                                        </li>
                                        {userSession?.role_id === 3 && (
                                            <li>
                                                <Link href="/admin/users">
                                                    <GearIcon />
                                                    Usuarios
                                                </Link>
                                            </li>
                                        )}
                                        <li className="text-error font-medium">
                                            <a onClick={logout}>
                                                <LogOutIcon size={15} />
                                                Cerrar sesión
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </>
                        ) : (
                            <Link
                                href="/login"
                                className="btn btn-primary shadow-none rounded-lg btn-sm text-sm px-4 font-medium"
                            >
                                <button>Autentícate</button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
