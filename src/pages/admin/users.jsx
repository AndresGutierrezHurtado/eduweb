import React, { useState } from "react";

// Hooks
import { useDeleteData, usePaginateData } from "../../hooks/useFetchApi";
import { EditIcon, SearchIcon, TrashIcon } from "../../components/icons";
import LoadingContent from "../../components/loadingContent";
import Swal from "sweetalert2";
import { Link } from "react-router";

export default function UsersDashboard() {
    const [sort, setSort] = useState("user_id:asc");
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const {
        data: users,
        loading: loadingUsers,
        reload: reloadUsers,
    } = usePaginateData(`/users?sort=${sort}&search=${search}&page=${page}`);

    const handleUserDelete = async (id) => {
        Swal.fire({
            icon: "warning",
            title: "Eliminar usuario",
            text: "Estas seguro de eliminar el usuario?",
            showDenyButton: true,
            confirmButtonText: "Si, eliminar",
            denyButtonText: "No, cancelar",
            confirmButtonColor: "#d33",
            denyButtonColor: "#3085d6",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await useDeleteData(`/users/${id}`);

                if (response.success) {
                    reloadUsers();
                }
            }
        });
    };

    if (loadingUsers) return <LoadingContent />;
    return (
        <section className="w-full px-3">
            <div className="w-full max-w-[1200px] mx-auto py-10">
                <div className="space-y-10">
                    <div className="flex justify-between">
                        <h2 className="text-5xl font-extrabold tracking-tight">
                            Gestionar usuarios:
                        </h2>
                        <label className="input input-sm input-bordered focus-within:outline-0 focus-within:input-primary flex items-center gap-2 w-full max-w-sm h-auto py-1">
                            <input
                                className="grow group"
                                placeholder="Buscar usuarios"
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    setPage(1);
                                }}
                            />
                            <kbd className="kbd kbd-sm cursor-pointer hover:bg-gray-300 p-1 px-1.5">
                                <SearchIcon className="opacity-70 w-4 h-4" />
                            </kbd>
                        </label>
                    </div>

                    <div className="overflow-x-auto pt-8">
                        <table className="table border">
                            <thead className="bg-gray-200">
                                <tr className="[&>*]:cursor-pointer [&>*]:table-cell [&>*]:text-start">
                                    <th
                                        onClick={() => setSort("user_id:asc")}
                                        className="tooltip"
                                        data-tip="Ordenar por identificador"
                                    >
                                        ID
                                    </th>
                                    <th
                                        onClick={() => setSort("user_name:asc")}
                                        className="tooltip"
                                        data-tip="Ordenar por nombre"
                                    >
                                        Nombre
                                    </th>
                                    <th
                                        onClick={() =>
                                            setSort("user_email:asc")
                                        }
                                        className="tooltip"
                                        data-tip="Ordenar por correo"
                                    >
                                        Correo
                                    </th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users?.map((user) => (
                                    <tr key={user.user_id}>
                                        <td>{user.user_id.split("-")[1]}</td>
                                        <td>{`${user.user_name} ${user.user_lastname}`}</td>
                                        <td>{user.user_email}</td>
                                        <td>
                                            <div className="flex gap-2">
                                                <Link to={`/profile/${user.user_id}`} className="btn btn-sm">
                                                    <EditIcon />
                                                    Editar
                                                </Link>
                                                <button
                                                    onClick={() =>
                                                        handleUserDelete(
                                                            user.user_id
                                                        )
                                                    }
                                                    className="btn btn-error btn-sm text-white"
                                                >
                                                    <TrashIcon />
                                                    Eliminar
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
}
