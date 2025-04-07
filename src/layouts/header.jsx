"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Swal from "sweetalert2";

// Components
import { GearIcon, LogOutIcon, SearchIcon, UserIcon } from "@/components/icons";

// Hooks
import { getData } from "@/hooks/useFetch";

export default function Header() {
    const { data, status } = useSession();
    const userSession = data?.user;

    const [courses, setCourses] = useState([]);
    const [search, setSearch] = useState("");
    const modalRef = useRef(null);

    const closeModal = () => {
        if (modalRef.current) {
            modalRef.current.close();
        }
    };

    const openModal = () => {
        if (modalRef.current) {
            modalRef.current.showModal();
        }
    };

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

    useEffect(() => {
        const handleSearch = async (e) => {
            const { data } = await getData(`/courses?search=${search}`, false);
            setCourses(data);
        };

        handleSearch();
    }, [search]);

    return (
        <>
            <header className="w-full px-3">
                <div className="w-full max-w-[1200px] mx-auto py-2">
                    <div className="w-full flex justify-between navbar p-0">
                        <Link href="/" className="navbar-start">
                            <h1 className="text-4xl font-bold font-alegreya">
                                Edu<span className="text-primary">Web</span>
                            </h1>
                        </Link>
                        <label className="input rounded-lg bg-base-100/50 focus-within:outline-0 border-white/80 focus-within:border-primary w-full max-w-[400px]">
                            <input
                                type="text"
                                name="search"
                                placeholder="Buscar cursos"
                                onClick={openModal}
                            />
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
            <dialog ref={modalRef} id="search-modal" className="modal">
                <div className="modal-box p-0 rounded-none bg-transparent border-none">
                    <div className="bg-base-100 rounded-lg p-4">
                        <input
                            type="text"
                            placeholder="Buscar cursos..."
                            className="input input-bordered w-full"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <div className="mt-4 flex flex-col gap-2">
                            {courses?.map((course) => (
                                <Link
                                    key={course.course_id}
                                    href={`/courses/${course.course_id}`}
                                    className="p-2 group rounded-lg"
                                    onClick={closeModal}
                                >
                                    <div className="flex items-center gap-3">
                                        <div>
                                            <h4 className="font-medium group-hover:underline group-hover:text-primary">
                                                {course.course_name}
                                            </h4>
                                            <p className="text-sm text-base-content/70 line-clamp-2">
                                                {course.course_description}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    );
}
