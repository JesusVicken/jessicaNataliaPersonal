'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { ArrowRight, MapPin, Globe, WhatsappLogo } from '@phosphor-icons/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function Services() {
    const gridRef = useRef<HTMLDivElement | null>(null)
    const cardsRef = useRef<HTMLDivElement[]>([])

    useEffect(() => {
        if (!gridRef.current || !cardsRef.current.length) return

        // Animação stagger com revelação em máscara (clip-path) para unidade estética com a seção Sobre
        gsap.fromTo(
            cardsRef.current,
            {
                clipPath: 'inset(100% 0% 0% 0%)',
                opacity: 0,
                y: 60,
            },
            {
                clipPath: 'inset(0% 0% 0% 0%)',
                opacity: 1,
                y: 0,
                duration: 1.4,
                ease: 'power4.out',
                stagger: 0.2,
                scrollTrigger: {
                    trigger: gridRef.current,
                    start: 'top 85%',
                },
            }
        )
    }, [])

    const whatsappLink = "https://wa.me/5561996844400?text=Olá%20Jéssica!%20Acessei%20seu%20site%20e%20gostaria%20de%20saber%20mais%20sobre%20seu%20acompanhamento%20personalizado."

    return (
        <section
            id="programs"
            className="bg-[#F5F2EB] py-24 md:py-36 px-6 md:px-12 border-t border-[#e6e2da] overflow-hidden relative font-sans text-[#111111]"
        >
            {/* Linhas decorativas estéticas */}
            <div className="absolute top-0 left-1/3 w-[1px] h-full bg-[#e6e2da]/30 pointer-events-none hidden lg:block" />
            <div className="absolute top-0 left-2/3 w-[1px] h-full bg-[#e6e2da]/30 pointer-events-none hidden lg:block" />

            <div className="container mx-auto max-w-6xl relative z-10">

                {/* Header */}
                <div className="text-center mb-20" data-aos="fade-up">
                    <span className="text-[10px] font-black tracking-[0.3em] text-[#bda07a] uppercase mb-4 inline-block">MÉTODOS DE ACOMPANHAMENTO</span>
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-[#111111] leading-none">
                        Programas de <span className="font-serif italic font-light text-[#bda07a]">Evolução</span>
                    </h2>
                </div>

                {/* Grid of Modern Bento Cards */}
                <div
                    ref={gridRef}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch"
                >
                    
                    {/* CARD 1: Presencial VIP */}
                    <div
                        ref={(el) => { if (el) cardsRef.current[0] = el }}
                        className="group relative h-[450px] md:h-[520px] rounded-[2.5rem] overflow-hidden border border-[#e6e2da] bg-zinc-950 shadow-lg hover:shadow-2xl transition-all duration-500"
                    >
                        {/* Imagem de Fundo com Zoom Lento */}
                        <Image
                            src="/image46.jpeg"
                            alt="Presencial VIP"
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out z-0"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            loading="lazy"
                        />
                        {/* Película de Contraste Escura */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#060606]/95 via-[#060606]/40 to-transparent z-10 pointer-events-none" />

                        {/* Conteúdo do Card */}
                        <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between z-20 text-white">
                            {/* Top info */}
                            <div className="flex justify-between items-start">
                                <span className="text-[8px] font-mono bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-[#bda07a] uppercase tracking-widest">
                                    PRESENCIAL
                                </span>
                                <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md text-[#bda07a] flex items-center justify-center border border-white/10 shrink-0">
                                    <MapPin size={20} weight="fill" />
                                </div>
                            </div>

                            {/* Bottom info */}
                            <div>
                                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-wide mb-3" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                                    Presencial VIP
                                </h3>
                                <p className="text-xs md:text-sm text-zinc-300 font-light leading-relaxed mb-6 max-w-md">
                                    Treinos individuais presenciais focados em alta performance, técnica biomecânica e correção postural imediata. Atendimento exclusivo e focado em resultados rápidos nas unidades da Bodytech (Lago Sul e Sudoeste) em Brasília.
                                </p>
                                
                                <a 
                                    href={whatsappLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-white text-[#111111] hover:bg-[#bda07a] hover:text-white px-6 py-3.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 pointer-events-auto"
                                >
                                    Falar com a Jéssica <WhatsappLogo size={14} weight="fill" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* CARD 2: Treine Onde Quiser */}
                    <div
                        ref={(el) => { if (el) cardsRef.current[1] = el }}
                        className="group relative h-[450px] md:h-[520px] rounded-[2.5rem] overflow-hidden border border-[#e6e2da] bg-zinc-950 shadow-lg hover:shadow-2xl transition-all duration-500"
                    >
                        {/* Imagem de Fundo com Zoom Lento */}
                        <Image
                            src="/image32.jpeg"
                            alt="Treine Onde Quiser"
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out z-0"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            loading="lazy"
                        />
                        {/* Película de Contraste Escura */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#060606]/95 via-[#060606]/40 to-transparent z-10 pointer-events-none" />

                        {/* Conteúdo do Card */}
                        <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between z-20 text-white">
                            {/* Top info */}
                            <div className="flex justify-between items-start">
                                <span className="text-[8px] font-mono bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-[#bda07a] uppercase tracking-widest">
                                    DIGITAL & HÍBRIDO
                                </span>
                                <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md text-[#bda07a] flex items-center justify-center border border-white/10 shrink-0">
                                    <Globe size={20} />
                                </div>
                            </div>

                            {/* Bottom info */}
                            <div>
                                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-wide mb-3" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                                    Treine Onde Quiser
                                </h3>
                                <p className="text-xs md:text-sm text-zinc-300 font-light leading-relaxed mb-6 max-w-md">
                                    Sua planilha e planejamento de treinos e Pilates totalmente estruturados via aplicativo. Suporte diário direto com a Jéssica, feedbacks semanais da sua execução por vídeo para você evoluir em qualquer academia, parque ou viagem.
                                </p>
                                
                                <a 
                                    href={whatsappLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-white text-[#111111] hover:bg-[#bda07a] hover:text-white px-6 py-3.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 pointer-events-auto"
                                >
                                    Falar com a Jéssica <WhatsappLogo size={14} weight="fill" />
                                </a>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    )
}
