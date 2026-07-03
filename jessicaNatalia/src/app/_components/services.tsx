'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { ArrowRight, MapPin, Globe, WhatsappLogo, Users, Barbell, HouseLine } from '@phosphor-icons/react'
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
                stagger: 0.15,
                scrollTrigger: {
                    trigger: gridRef.current,
                    start: 'top 85%',
                },
            }
        )
    }, [])

    // Função auxiliar para gerar links de WhatsApp personalizados
    const getWhatsappLink = (text: string) => {
        return `https://wa.me/5561996844400?text=${encodeURIComponent(text)}`
    }

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

                {/* Grid of Modern Bento Cards (2x2 Grid) */}
                <div
                    ref={gridRef}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch"
                >
                    
                    {/* CARD 1: Consultoria On-line */}
                    <div
                        ref={(el) => { if (el) cardsRef.current[0] = el }}
                        className="group relative h-[450px] md:h-[500px] rounded-[2.5rem] overflow-hidden border border-[#e6e2da] bg-zinc-950 shadow-lg hover:shadow-2xl transition-all duration-500"
                    >
                        {/* Imagem de Fundo com Zoom Lento */}
                        <Image
                            src="/appjessica.jpeg"
                            alt="Consultoria On-line"
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out z-0"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            loading="lazy"
                        />
                        {/* Película de Contraste Escura */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#060606]/95 via-[#060606]/40 to-transparent z-10 pointer-events-none" />

                        {/* Conteúdo do Card */}
                        <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-between z-20 text-white">
                            {/* Top info */}
                            <div className="flex justify-between items-start">
                                <span className="text-[8px] font-mono bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-[#bda07a] uppercase tracking-widest">
                                    Consultoria On-line
                                </span>
                                <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md text-[#bda07a] flex items-center justify-center border border-white/10 shrink-0">
                                    <Globe size={20} />
                                </div>
                            </div>

                            {/* Bottom info */}
                            <div>
                                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-wide mb-3" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                                    Via Aplicativo
                                </h3>
                                <p className="text-xs md:text-sm text-zinc-300 font-light leading-relaxed mb-6 max-w-md">
                                    Treino totalmente adaptado aos seus objetivos com suporte diário pelo meu aplicativo. Você acompanha seu progresso, envia seus vídeos e recebe feedbacks personalizados, garantindo evolução constante, sem sair de casa.
                                </p>
                                
                                <a 
                                    href={getWhatsappLink("Olá Jéssica! Gostaria de saber mais sobre a Consultoria On-line.")}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-white text-[#111111] hover:bg-[#bda07a] hover:text-white px-6 py-3.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 pointer-events-auto"
                                >
                                    Falar com a Jéssica <WhatsappLogo size={14} weight="fill" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* CARD 2: Consultoria Híbrida */}
                    <div
                        ref={(el) => { if (el) cardsRef.current[1] = el }}
                        className="group relative h-[450px] md:h-[500px] rounded-[2.5rem] overflow-hidden border border-[#e6e2da] bg-zinc-950 shadow-lg hover:shadow-2xl transition-all duration-500"
                    >
                        {/* Imagem de Fundo com Zoom Lento */}
                        <Image
                            src="/image8.jpeg"
                            alt="Consultoria Híbrida"
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out z-0"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            loading="lazy"
                        />
                        {/* Película de Contraste Escura */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#060606]/95 via-[#060606]/40 to-transparent z-10 pointer-events-none" />

                        {/* Conteúdo do Card */}
                        <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-between z-20 text-white">
                            {/* Top info */}
                            <div className="flex justify-between items-start">
                                <span className="text-[8px] font-mono bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-[#bda07a] uppercase tracking-widest">
                                    Híbrido
                                </span>
                                <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md text-[#bda07a] flex items-center justify-center border border-white/10 shrink-0">
                                    <Users size={20} />
                                </div>
                            </div>

                            {/* Bottom info */}
                            <div>
                                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-wide mb-3" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                                    Consultoria Híbrida
                                </h3>
                                <p className="text-xs md:text-sm text-zinc-300 font-light leading-relaxed mb-6 max-w-md">
                                    O melhor dos dois mundos: treino personalizado no aplicativo e um encontro presencial para ajuste fino. Você recebe o treino no app, treina no seu ritmo e nos encontramos para ajustar a técnica, tirar dúvidas e garantir que você evolua com segurança, confiança e autonomia.
                                </p>
                                
                                <a 
                                    href={getWhatsappLink("Olá Jéssica! Gostaria de saber mais sobre a Consultoria Híbrida.")}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-white text-[#111111] hover:bg-[#bda07a] hover:text-white px-6 py-3.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 pointer-events-auto"
                                >
                                    Falar com a Jéssica <WhatsappLogo size={14} weight="fill" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* CARD 3: Experiência Personal Trainer em grandes academias */}
                    <div
                        ref={(el) => { if (el) cardsRef.current[2] = el }}
                        className="group relative h-[450px] md:h-[500px] rounded-[2.5rem] overflow-hidden border border-[#e6e2da] bg-zinc-950 shadow-lg hover:shadow-2xl transition-all duration-500"
                    >
                        {/* Imagem de Fundo com Zoom Lento */}
                        <Image
                            src="/image22.jpeg"
                            alt="Experiência Personal Trainer - Academias"
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out z-0"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            loading="lazy"
                        />
                        {/* Película de Contraste Escura */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#060606]/95 via-[#060606]/40 to-transparent z-10 pointer-events-none" />

                        {/* Conteúdo do Card */}
                        <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-between z-20 text-white">
                            {/* Top info */}
                            <div className="flex justify-between items-start">
                                <span className="text-[8px] font-mono bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-[#bda07a] uppercase tracking-widest">
                                    GRANDES ACADEMIAS
                                </span>
                                <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md text-[#bda07a] flex items-center justify-center border border-white/10 shrink-0">
                                    <Barbell size={20} />
                                </div>
                            </div>

                            {/* Bottom info */}
                            <div>
                                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-wide mb-3" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                                    Personal Trainer
                                </h3>
                                <p className="text-xs md:text-sm text-zinc-300 font-light leading-relaxed mb-6 max-w-md">
                                    Treinamento personalizado para quem deseja um corpo forte, funcional e preparado para a vida. Cada sessão é planejada de acordo com seus objetivos, histórico e momento atual, respeitando sua individualidade. Atendimentos presenciais na Rede Bodytech e Rede Smart Fit em Brasília.
                                </p>
                                
                                <a 
                                    href={getWhatsappLink("Olá Jéssica! Gostaria de saber mais sobre o Personal Trainer presencial nas grandes academias.")}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-white text-[#111111] hover:bg-[#bda07a] hover:text-white px-6 py-3.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 pointer-events-auto"
                                >
                                    Falar com a Jéssica <WhatsappLogo size={14} weight="fill" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* CARD 4: Experiência Personal Trainer em casa */}
                    <div
                        ref={(el) => { if (el) cardsRef.current[3] = el }}
                        className="group relative h-[450px] md:h-[500px] rounded-[2.5rem] overflow-hidden border border-[#e6e2da] bg-zinc-950 shadow-lg hover:shadow-2xl transition-all duration-500"
                    >
                        {/* Imagem de Fundo com Zoom Lento */}
                        <Image
                            src="/image29.jpeg"
                            alt="Experiência Personal Trainer - Em Casa"
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out z-0"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            loading="lazy"
                        />
                        {/* Película de Contraste Escura */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#060606]/95 via-[#060606]/40 to-transparent z-10 pointer-events-none" />

                        {/* Conteúdo do Card */}
                        <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-between z-20 text-white">
                            {/* Top info */}
                            <div className="flex justify-between items-start">
                                <span className="text-[8px] font-mono bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-[#bda07a] uppercase tracking-widest">
                                    ATENDIMENTO EM CASA
                                </span>
                                <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md text-[#bda07a] flex items-center justify-center border border-white/10 shrink-0">
                                    <HouseLine size={20} />
                                </div>
                            </div>

                            {/* Bottom info */}
                            <div>
                                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-wide mb-3" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                                    Em Casa & Condomínio
                                </h3>
                                <p className="text-xs md:text-sm text-zinc-300 font-light leading-relaxed mb-6 max-w-md">
                                    Seu treino, no seu espaço. Vou até você, seja no conforto do seu lar, no seu condomínio ou na academia do seu prédio. Treino individualizado, com foco nos seus objetivos, sem que você precise sair de casa. Acompanhamento próximo e evolução constante.
                                </p>
                                
                                <a 
                                    href={getWhatsappLink("Olá Jéssica! Gostaria de saber mais sobre o Personal Trainer presencial em casa ou condomínio.")}
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
