import { getServerSession } from "next-auth";
import Image from "next/image";


export default async function Home() {
    const session = await getServerSession();
    console.log("SESSION FRONTEND", JSON.stringify(session));
    return (
        <>
            <section className="w-full px-3">
                <div className="w-full max-w-[1200px] mx-auto py-10">
                    <h1 className="text-3xl font-bold">Bienvenidos a eduweb</h1>
                </div>
            </section>
        </>
    );
}
