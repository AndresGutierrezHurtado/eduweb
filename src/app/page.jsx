import Image from "next/image";

// Components
import { ArrowRight, CalendarIcon, CertificateIcon, ClockIcon, UserIcon } from "@/components/icons";

export default async function Home() {
    return (
        <>
            <section className="w-full px-3">
                <div className="w-full max-w-[1200px] mx-auto py-10">
                    <div className="flex items-center lg:py-14 mb-15gt">
                        <div className="w-full flex flex-col gap-5">
                            <div>
                                <h3 className="uppercase text-xl font-bold text-primary">
                                    EduWeb
                                </h3>
                                <h1 className="text-5xl font-bold">
                                    Impulsa tu conocimiento, transforma tu
                                    futuro
                                </h1>
                            </div>
                            <p className="text-base-content/80">
                                Accede a cursos de alta calidad y obtén
                                certificados gratuitos que avalen tu progreso.
                                Aprende a tu ritmo, desarrolla nuevas
                                habilidades y prepárate para transformar tu
                                futuro profesional con contenidos actualizados y
                                una comunidad de apoyo.
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
                                className="object-contain drop-shadow-[0_0_30px_var(--color-primary)]"
                            />
                        </div>
                    </div>
                </div>
            </section>
            <section className="w-full px-3">
                <div className="w-full max-w-[1200px] mx-auto py-10">
                    <div className="w-full text-center flex flex-col gap-10">
                        <h2 className="text-3xl font-extrabold">
                            ¿Por qué{" "}
                            <span className="text-primary">
                                aprender con EduWeb?
                            </span>
                        </h2>
                        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-10">
                            <div className="flex flex-col gap-5 items-center w-full">
                                <UserIcon size={70} />
                                <div className="flex flex-col gap-1">

                                <h3 className="text-xl font-bold">Expertos en Latam</h3>
                                <p className="text-sm text-pretty text-base-content/80">
                                    Tu equipo aprenderá de profesionales
                                    reconocidos de Latinoamérica y España.
                                </p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-5 items-center w-full">
                                <ClockIcon size={70} />
                                <div className="flex flex-col gap-1">

                                <h3 className="text-xl font-bold">Expertos en Latam</h3>
                                <p className="text-sm text-pretty text-base-content/80">
                                    Tu equipo aprenderá de profesionales
                                    reconocidos de Latinoamérica y España.
                                </p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-5 items-center w-full">
                                <CalendarIcon size={70} />
                                <div className="flex flex-col gap-1">

                                <h3 className="text-xl font-bold">Expertos en Latam</h3>
                                <p className="text-sm text-pretty text-base-content/80">
                                    Tu equipo aprenderá de profesionales
                                    reconocidos de Latinoamérica y España.
                                </p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-5 items-center w-full">
                                <CertificateIcon size={70} />
                                <div className="flex flex-col gap-1">

                                <h3 className="text-xl font-bold">Expertos en Latam</h3>
                                <p className="text-sm text-pretty text-base-content/80">
                                    Tu equipo aprenderá de profesionales
                                    reconocidos de Latinoamérica y España.
                                </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
