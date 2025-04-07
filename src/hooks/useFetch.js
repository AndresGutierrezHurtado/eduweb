import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const fetchData = async (endpoint, config) => {
    const response = await fetch(process.env.NEXT_PUBLIC_APP_DOMAIN + "/api" + endpoint, {
        headers: {
            "Content-Type": "application/json",
            accept: "application/json",
        },
        method: "GET",
        ...config,
    });
    const data = await response.json();

    return data;
};

export const useGetData = (endpoint) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [trigger, setTrigger] = useState(0);

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            try {
                const { data } = await fetchData(endpoint);
                setData(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, [trigger, endpoint]);

    const reload = () => setTrigger((prev) => prev + 1);

    return {
        data,
        error,
        loading,
        reload,
    };
};

export const usePutData = async (endpoint, body) => {
    const { success, data, message } = await fetchData(endpoint, {
        method: "PUT",
        body: JSON.stringify(body),
    });

    if (!success) Swal.fire("Error", message, "error");
    else Swal.fire("Éxito", message, "success");

    return { success, data, message };
};

export const usePostData = async (endpoint, body) => {
    const { success, data, message } = await fetchData(endpoint, {
        method: "POST",
        body: JSON.stringify(body),
    });

    if (!success) Swal.fire("Error", message, "error");
    else Swal.fire("Éxito", message, "success");

    return { success, data, message };
};

export const getData = async (endpoint, body) => {
    const { success, data, message } = await fetchData(endpoint, {
        method: "GET",
        body: JSON.stringify(body),
    });

    if (!success) Swal.fire("Error", message, "error");
    else Swal.fire("Éxito", message, "success");

    return { success, data, message };
};
