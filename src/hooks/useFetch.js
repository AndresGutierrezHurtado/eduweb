import React, { useEffect, useState } from "react";

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
    const [loading, setLoading] = useState(false);
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
