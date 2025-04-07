import React from "react";

export default function Loading() {
    return (
        <>
            <section className="w-full px-3">
                <div className="w-full max-w-[1200px] mx-auto py-10">
                    <div className="w-full flex items-center justify-center">
                        <span className="loading loading-ring loading-xl"></span>
                    </div>
                </div>
            </section>
        </>
    );
}
