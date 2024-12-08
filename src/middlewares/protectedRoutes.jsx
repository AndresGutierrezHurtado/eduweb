import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import Swal from "sweetalert2";

import { useAuthContext } from "../contexts/authContext";

const ProtectedRoutes = ({ mustBeAuth, mustBeGuest, mustBeAdmin }) => {
    const navigate = useNavigate();
    const { userSession } = useAuthContext();

    useEffect(() => {
        if (mustBeAuth && !userSession) {
            Swal.fire({
                icon: "info",
                title: "No estas logueado",
                text: "Por favor inicia sesion para acceder a la pagina",
            });
            navigate("/login");
        }

        if (mustBeAdmin && (!userSession || userSession.role_id !== 3)) {
            navigate("/");
        }

        if (mustBeGuest && userSession) {
            Swal.fire({
                icon: "info",
                title: "Ya estas logueado",
                text: "Ya has iniciado sesion, por favor cerrar sesion para acceder a la pagina",
            });
            navigate("/");
        }
    }, [userSession]);

    return <Outlet />;
};

export default ProtectedRoutes;
