import React from "react";

export default function Courses() {
    return (
        <section className="w-full px-3 min-h-[200vh]">
            <div className="w-full max-w-[1200px] mx-auto py-10">
                <div className="space-y-10">
                    <h2 className="text-5xl font-extrabold tracking-tight text-gray-900">
                        Cursos:
                    </h2>
                    <div className="w-full h-[500px] skeleton"></div>
                </div>
            </div>
        </section>
    );
}
