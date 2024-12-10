import React from "react";

// Hooks
import { useGetData } from "../../hooks/useFetchApi";

export default function UsersDashboard() {
    const { data: users, loading: loadingUsers } = useGetData("/users");
    return <div>UsersDashboard</div>;
}
