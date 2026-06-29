'use client'

import { useEffect, useRef } from 'react'
import { ArrowRight } from '@phosphor-icons/react'
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
                y: 60,
                scale: 0.95,
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: 'power3.out',
                stagger: 0.15,
                scrollTrigger: {
                    trigger: gridRef.current,
                    start: 'top 80%',
                },
            }
        )
    }, [])

    return (
        <section
            id="programs"
            className="bg-[#F5F2EB] py-48 px-6 md:px-12 border-t border-[#e6e2da]"
        >
            <div className="container mx-auto max-w-7xl">

                {/* Header */}
                <div
                    className="text-center mb-24"
                    data-aos="fade-up"
                >
                    <span className="text-[10px] font-black tracking-[0.3em] text-[#bda07a] uppercase mb-4 inline-block">MÉTODOS DE ACOMPANHAMENTO</span>
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-[#111111] leading-none">
                        Programas de <span className="font-serif italic font-light text-[#bda07a]">Evolução</span>
                    </h2>
                </div>

                {/* Grid of Modern Cards */}
                <div
                    ref={gridRef}
                    className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    
                    {/* CARD 1: Emagrecimento */}
                    <div
                        ref={(el) => { if (el) cardsRef.current[0] = el }}
                        className="bg-white p-8 rounded-[2.2rem] border border-[#e6e2da] shadow-[0_15px_40px_-20px_rgba(0,0,0,0.04)] hover:scale-[1.03] transition-all duration-500 hover:shadow-md flex flex-col justify-between"
                    >
                        <div>
                            <span className="text-[8px] font-mono text-[#bda07a] uppercase tracking-widest block mb-4">MÓDULO 01</span>
                            <h3 className="text-lg font-bold uppercase text-[#111111] mb-3">Emagrecimento</h3>
                            <p className="text-xs text-[#66635f] font-light leading-relaxed mb-6">
                                Planejamento voltado para a queima calórica eficiente através de treinos tensionais e metabólicos, acelerando a queima de gordura e mantendo a massa magra.
                            </p>
                        </div>
                        <span className="text-[10px] font-black text-[#111111] flex items-center gap-2 mt-4">Consultar Detalhes <ArrowRight size={12} /></span>
                    </div>

                    {/* CARD 2: Treinamento de Força */}
                    <div
                        ref={(el) => { if (el) cardsRef.current[1] = el }}
                        className="bg-white p-8 rounded-[2.2rem] border border-[#e6e2da] shadow-[0_15px_40px_-20px_rgba(0,0,0,0.04)] hover:scale-[1.03] transition-all duration-500 hover:shadow-md flex flex-col justify-between"
                    >
                        <div>
                            <span className="text-[8px] font-mono text-[#bda07a] uppercase tracking-widest block mb-4">MÓDULO 02</span>
                            <h3 className="text-lg font-bold uppercase text-[#111111] mb-3">Treinamento de Força</h3>
                            <p className="text-xs text-[#66635f] font-light leading-relaxed mb-6">
                                Ênfase na progressão de cargas lógica e ativação muscular profunda (hipertrofia). Ajuste biomecânico dos exercícios básicos e isolados.
                            </p>
                        </div>
                        <span className="text-[10px] font-black text-[#111111] flex items-center gap-2 mt-4">Consultar Detalhes <ArrowRight size={12} /></span>
                    </div>

                    {/* CARD 3: Fitness Feminino */}
                    <div
                        ref={(el) => { if (el) cardsRef.current[2] = el }}
                        className="bg-white p-8 rounded-[2.2rem] border border-[#e6e2da] shadow-[0_15px_40px_-20px_rgba(0,0,0,0.04)] hover:scale-[1.03] transition-all duration-500 hover:shadow-md flex flex-col justify-between"
                    >
                        <div>
                            <span className="text-[8px] font-mono text-[#bda07a] uppercase tracking-widest block mb-4">MÓDULO 03</span>
                            <h3 className="text-lg font-bold uppercase text-[#111111] mb-3">Fitness Feminino</h3>
                            <p className="text-xs text-[#66635f] font-light leading-relaxed mb-6">
                                Acompanhamento especializado na anatomia e fisiologia hormonal feminina. Foco em membros inferiores (glúteos e pernas) e fortalecimento global.
                            </p>
                        </div>
                        <span className="text-[10px] font-black text-[#111111] flex items-center gap-2 mt-4">Consultar Detalhes <ArrowRight size={12} /></span>
                    </div>

                    {/* CARD 4: Consultoria Online */}
                    <div
                        ref={(el) => { if (el) cardsRef.current[3] = el }}
                        className="bg-white p-8 rounded-[2.2rem] border border-[#e6e2da] shadow-[0_15px_40px_-20px_rgba(0,0,0,0.04)] hover:scale-[1.03] transition-all duration-500 hover:shadow-md flex flex-col justify-between"
                    >
                        <div>
                            <span className="text-[8px] font-mono text-[#bda07a] uppercase tracking-widest block mb-4">MÓDULO 04</span>
                            <h3 className="text-lg font-bold uppercase text-[#111111] mb-3">Consultoria Online</h3>
                            <p className="text-xs text-[#66635f] font-light leading-relaxed mb-6">
                                Planejamento totalmente digital via aplicativo. Análise semanal de execuções em vídeo, planilha de treinos dinâmicos e suporte direto com a Jéssica.
                            </p>
                        </div>
                        <span className="text-[10px] font-black text-[#111111] flex items-center gap-2 mt-4">Consultar Detalhes <ArrowRight size={12} /></span>
                    </div>

                </div>

            </div>
        </section>
    )
}
