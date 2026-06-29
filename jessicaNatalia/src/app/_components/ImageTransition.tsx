"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function ImageTransition() {
    const sectionRef = useRef(null)
    const image1Ref = useRef(null)
    const image2Ref = useRef(null)
    const textContainerRef = useRef(null)

    useEffect(() => {
        const section = sectionRef.current

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "+=1200",
                scrub: true,
                pin: true,
                markers: false,
            },
        })

        gsap.set(image2Ref.current, { opacity: 0, scale: 1.1 })
        tl.to(image1Ref.current, { opacity: 0, scale: 0.95, ease: "power2.inOut" })

        // AQUI ESTÁ A LINHA CORRIGIDA
        tl.to(image2Ref.current, { opacity: 1, scale: 1, ease: "power2.inOut" }, "<")

        // Animação para o texto e logo
        const textElements = gsap.utils.toArray(".animated-text")
        const logoElements = gsap.utils.toArray(".wellhub-logo")

        textElements.forEach((text: any) => {
            tl.fromTo(text,
                { x: "100vw", opacity: 0 },
                { x: "0%", opacity: 1, duration: 1, ease: "power2.out" }
            )
            tl.to(text,
                { x: "-100vw", opacity: 0, duration: 1, ease: "power2.in" },
                "+=0.25"
            )
        })

        logoElements.forEach((logo: any) => {
            tl.fromTo(logo,
                { x: "100vw", opacity: 0 },
                { x: "0%", opacity: 1, duration: 1, ease: "power2.out" },
                "-=0.8" // Sincronizado com o texto
            )
            tl.to(logo,
                { x: "-100vw", opacity: 0, duration: 1, ease: "power2.in" },
                "+=0.25"
            )
        })
    }, [])

    return (
        <section ref={sectionRef} className="relative h-screen w-full overflow-hidden">
            <div ref={image1Ref} className="absolute inset-0 h-full w-full">
                <Image src="/gym_bg.jpg" alt="Academia" fill quality={100} className="object-cover brightness-[0.4]" />
            </div>
            <div ref={image2Ref} className="absolute inset-0 h-full w-full">
                <Image src="/jessica.jpg" alt="Treinamento" fill quality={100} className="object-cover brightness-[0.3]" />
            </div>

            <div
                ref={textContainerRef}
                className="absolute inset-0 z-10 flex items-center justify-center"
            >
                <div className="flex flex-col items-center justify-center">
                    {/* Texto "Agora aceitamos" */}
                    <h2
                        className="animated-text text-3xl md:text-5xl font-bold text-white text-center p-4 mb-4"
                        style={{
                            opacity: 0,
                            textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)'
                        }}
                    >
                        Agora aceitamos
                    </h2>

                    {/* Imagem do Wellhub embaixo */}
                    <div
                        className="wellhub-logo relative w-48 h-16 md:w-64 md:h-20"
                        style={{ opacity: 0 }}
                    >
                        <Image
                            src="/wellhub-logo.png"
                            alt="Wellhub"
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}