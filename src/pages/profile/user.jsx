import React from "react";

// Contexts
import { useAuthContext } from "../../contexts/authContext";

export default function UserProfile() {
    const { userSession } = useAuthContext();
    if (!userSession) window.location.href = "/";

    console.log(userSession);
    return (
        <section className="w-full px-3 min-h-[200vh]">
            <div className="w-full max-w-[1200px] mx-auto py-10">
                <div className="space-y-10">
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
                        Perfil de usuario {userSession.user_name}
                    </h2>
                </div>
            </div>
        </section>
    );
}
