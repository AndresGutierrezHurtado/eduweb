import React from "react";
import { useParams } from "react-router";

// Contexts
import { useAuthContext } from "../../contexts/authContext";

// Hooks
import { useGetData, usePutData } from "../../hooks/useFetchApi";
import { useValidateform } from "../../hooks/useValidateForm";

// Components
import LoadingContent from "../../components/loadingContent";
import { UploadIcon } from "../../components/icons";

export default function UserProfile() {
    const { id } = useParams();
    const { userSession, reloadUserSession } = useAuthContext();
    if (!userSession) return null;

    const {
        data: user,
        loading: loadingUser,
        reload: reloadUser,
    } = useGetData(`/users/${id ? id : userSession.user_id}`);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const data = Object.fromEntries(new FormData(e.target));
        const validation = useValidateform(data, "update-user-form");

        if (data.user_phone == "") data.user_phone = null;

        if (validation.success) {
            const response = await usePutData(
                `/users/${id ? id : userSession.user_id}`,
                { user: data }
            );

            if (response.success) {
                reloadUserSession();
                reloadUser();
            }
        }
    };

    if (loadingUser) return <LoadingContent />;
    return (
        <>
            <section className="w-full px-3">
                <div className="w-full max-w-[1200px] mx-auto py-10">
                    <div className="space-y-5">
                        <div>
                            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
                                Información del usuario
                            </h2>
                            <p className="text-lg text-gray-600">
                                Aquí podrás ver y editar tu Información,
                                cualquier cambio realizado será reflejado en tu
                                perfil
                            </p>
                        </div>
                        <div className="collapse collapse-arrow bg-base-200">
                            <input type="checkbox" />
                            <div className="collapse-title text-xl font-medium">
                                Hazme clic para ver/ocultar la información
                            </div>
                            <div className="collapse-content">
                                <form
                                    onSubmit={handleFormSubmit}
                                    className="space-y-2"
                                >
                                    <div className="form-group flex gap-5 w-full [&>*]:grow">
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text font-semibold after:content-['*'] after:ml-1 after:text-red-500 ">
                                                    Nombre:
                                                </span>
                                            </label>
                                            <input
                                                placeholder="Ingresa tu nombre"
                                                className="input input-bordered input-sm focus:outline-0 focus:input-primary"
                                                name="user_name"
                                                defaultValue={user.user_name}
                                            />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text font-semibold after:content-['*'] after:ml-1 after:text-red-500 ">
                                                    Apellidos:
                                                </span>
                                            </label>
                                            <input
                                                placeholder="Ingresa tus apellidos"
                                                className="input input-bordered input-sm focus:outline-0 focus:input-primary"
                                                name="user_lastname"
                                                defaultValue={
                                                    user.user_lastname
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-semibold after:content-['*'] after:ml-1 after:text-red-500 ">
                                                Correo electrónico:
                                            </span>
                                        </label>
                                        <input
                                            placeholder="ejemplo@gmail.com"
                                            className="input input-bordered input-sm focus:outline-0 focus:input-primary disabled:input-bordered"
                                            name="user_email"
                                            defaultValue={user.user_email}
                                            disabled
                                        />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-semibold after:content-['*'] after:ml-1 after:text-red-500 ">
                                                Teléfono:
                                            </span>
                                        </label>
                                        <input
                                            placeholder="320 920 2188"
                                            className="input input-bordered input-sm focus:outline-0 focus:input-primary"
                                            name="user_phone"
                                            defaultValue={user.user_phone}
                                        />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-semibold after:content-['*'] after:ml-1 after:text-red-500 ">
                                                Dirección:
                                            </span>
                                        </label>
                                        <input
                                            placeholder="Dirección de tu vivienda"
                                            className="input input-bordered input-sm focus:outline-0 focus:input-primary"
                                            name="user_address"
                                            defaultValue={user.user_address}
                                        />
                                    </div>
                                    {userSession.role_id == 3 &&
                                        user.user_id !==
                                            userSession.user_id && (
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text font-semibold after:content-['*'] after:ml-1 after:text-red-500 ">
                                                        Rol:
                                                    </span>
                                                </label>
                                                <select
                                                    className="select select-bordered select-sm focus:outline-0 focus:select-primary"
                                                    name="role_id"
                                                    defaultValue={user.role_id}
                                                >
                                                    <option disabled>
                                                        Selecciona un rol
                                                    </option>
                                                    <option value="1">
                                                        Estudiante
                                                    </option>
                                                    <option value="2">
                                                        Profesor
                                                    </option>
                                                    <option value="3">
                                                        Administrador
                                                    </option>
                                                </select>
                                            </div>
                                        )}

                                    <div className="form-control pt-5">
                                        <button className="btn btn-sm w-full btn-primary text-white">
                                            <UploadIcon />
                                            Subir
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="w-full px-3">
                <div className="w-full max-w-[1200px] mx-auto py-10">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
                            Certificados:
                        </h2>
                        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5">
                            {new Array(5).fill(0).map((item, i) => (
                                <div
                                    key={i}
                                    className="w-[300px] aspect-video skeleton"
                                ></div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
