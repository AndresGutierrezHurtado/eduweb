import { ArrowRight } from "@/components/icons";
import Image from "next/image";

export default async function Home() {
    return (
        <>
            <section className="w-full px-3">
                <div className="w-full max-w-[1200px] mx-auto py-10">
                    <div className="flex items-center lg:py-10">
                        <div className="w-full flex flex-col gap-5">
                            <div>
                                <h3 className="uppercase text-xl font-bold text-primary">EduWeb</h3>
                                <h1 className="text-5xl font-bold">
                                    Impulsa tu conocimiento, transforma tu futuro
                                </h1>
                            </div>
                            <p className="text-base-content/80">
                                Accede a cursos de alta calidad y obtén certificados gratuitos que
                                avalen tu progreso. Aprende a tu ritmo, desarrolla nuevas
                                habilidades y prepárate para transformar tu futuro profesional con
                                contenidos actualizados y una comunidad de apoyo.
                            </p>
                            <button className="btn btn-primary shadow-none w-fit rounded-lg font-medium text-base">
                                Explora nuestros cursos <ArrowRight />
                            </button>
                        </div>
                        <div className="w-full flex items-center justify-center">
                            <Image
                                src={"/logo.png"}
                                width={350}
                                height={350}
                                alt="Hero image"
                                className="object-contain"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
