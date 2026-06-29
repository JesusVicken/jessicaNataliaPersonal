'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function Services() {
    const gridRef = useRef<HTMLDivElement | null>(null)
    const cardsRef = useRef<HTMLDivElement[]>([])

    useEffect(() => {
        if (!gridRef.current || !cardsRef.current.length) return

        gsap.fromTo(
            cardsRef.current,
            {
                opacity: 0,
                y: 80,
                scale: 0.9,
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1,
                ease: 'power4.out',
                stagger: 0.18,
                scrollTrigger: {
                    trigger: gridRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                },
            }
        )
    }, [])

    return (
        <section
            className="bg-black py-28 border-y border-white/10"
            data-aos="fade-up"
        >
            <div className="container mx-auto px-6">

                {/* Intro */}
                <div
                    className="max-w-4xl mx-auto text-center mb-20"
                    data-aos="fade-up"
                >
                    <h2 className="text-5xl md:text-7xl font-black text-white uppercase leading-none mb-6">
                        Metodologia de<span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600"> Treinamento</span>
                    </h2>
                    <p className="text-gray-400 text-lg leading-relaxed">
                        Transformação física não acontece por acaso. Ela é o resultado de uma metodologia estruturada, que combina periodização inteligente, análise biomecânica e consistência diária.
                    </p>
                </div>

                {/* Cards técnicos grandes */}
                <div className="max-w-5xl mx-auto grid gap-10 mb-24">
                    <div className="border border-white/5 bg-zinc-900/30 backdrop-blur-sm rounded-lg p-8" data-aos="fade-up">
                        <h3 className="text-white font-semibold mb-3">
                            Periodização Baseada em Evidências
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Cada treino é planejado com base na sua rotina, nível de condicionamento e objetivos específicos. Mapeamos o volume, intensidade e descanso ideais para garantir que você evolua sem risco de lesões.
                        </p>
                    </div>

                    <div
                        className="border border-white/5 bg-zinc-900/30 backdrop-blur-sm rounded-lg p-8"
                        data-aos="fade-up"
                        data-aos-delay="100"
                    >
                        <h3 className="text-white font-semibold mb-3">
                            Análise e Ajuste de Biomecânica
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            A execução correta do movimento é a chave para ativar os músculos certos e proteger suas articulações. Ajustamos sua postura e técnica detalhadamente para máxima eficiência em cada repetição.
                        </p>
                    </div>
                </div>

                {/* GRID com GSAP */}
                <div
                    ref={gridRef}
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center"
                >
                    {[
                        {
                            title: "Hipertrofia",
                            subtitle: "Volume & Tensão Mecânica",
                            desc: "Foco no ganho de massa muscular magra, definição e tonificação corporal de forma estruturada.",
                        },
                        {
                            title: "Emagrecimento",
                            subtitle: "Déficit & Gasto Energético",
                            desc: "Métodos metabólicos eficientes para acelerar a queima de gordura e aumentar o condicionamento.",
                        },
                        {
                            title: "Mobilidade",
                            subtitle: "Amplitude & Postura",
                            desc: "Prevenção de dores e lesões, melhoria articular e flexibilidade para as atividades diárias.",
                        },
                        {
                            title: "Performance",
                            subtitle: "Força & Condicionamento",
                            desc: "Desenvolvimento de força funcional integrada e resistência cardiovascular de elite.",
                        },
                    ].map((item, index) => (
                        <div
                            key={item.title}
                            ref={(el) => {
                                if (el) cardsRef.current[index] = el
                            }}
                            className="
                                p-6
                                border border-white/5
                                rounded-lg
                                hover:border-white/20
                                transition-all
                                will-change-transform
                            "
                        >
                            <span className="block text-white font-bold text-lg">
                                {item.title}
                            </span>
                            <span className="block text-xs text-gray-500 mt-1">
                                {item.subtitle}
                            </span>
                            <p className="text-gray-400 text-xs mt-3 leading-relaxed">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}
