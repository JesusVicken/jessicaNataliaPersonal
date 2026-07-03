'use client'

import React, { useEffect, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Hook useGSAP Isomórfico customizado para compatibilidade SSR do Next.js
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

function useGSAP(callback: gsap.ContextFunc, dependencies: any[] = []) {
    useIsomorphicLayoutEffect(() => {
        const ctx = gsap.context(callback);
        return () => ctx.revert();
    }, dependencies);
}

export default function PilatesSection() {
    const containerRef = useRef<HTMLDivElement>(null)
    const textGroupRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        const elements = textGroupRef.current?.querySelectorAll('.reveal-yoga')
        if (!elements) return

        // Animação suave de revelação Y + Fade-in ao entrar na viewport (Awwwards Style)
        gsap.fromTo(elements,
            { 
                y: 50, 
                opacity: 0,
                filter: "blur(5px)"
            },
            {
                y: 0,
                opacity: 1,
                filter: "blur(0px)",
                duration: 1.4,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 75%", // Inicia quando a seção está 25% visível na tela
                    toggleActions: "play none none none"
                }
            }
        )
    }, [])

    return (
        <section 
            ref={containerRef}
            id="pilates"
            className="relative h-[100dvh] w-full overflow-hidden bg-[#0A0A0A] flex items-center justify-center"
        >
            {/* Tag de vídeo de fundo em tela cheia (z-0) */}
            <video
                src="/video2.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
            />

            {/* Camada dupla de overlay escuro e gradiente de alta legibilidade (z-10) */}
            <div className="absolute inset-0 bg-black/50 z-10 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/75 z-10 pointer-events-none" />

            {/* Linhas de grid decorativas minimalistas (estética Apple/Nike) */}
            <div className="absolute inset-0 flex justify-between pointer-events-none px-6 md:px-12 z-15">
                <div className="w-[1px] h-full bg-white/5" />
                <div className="w-[1px] h-full bg-white/5 hidden md:block" />
                <div className="w-[1px] h-full bg-white/5 hidden md:block" />
                <div className="w-[1px] h-full bg-white/5" />
            </div>

            {/* Conteúdo Centralizado (z-20) */}
            <div 
                ref={textGroupRef}
                className="relative z-20 text-center px-6 max-w-4xl flex flex-col items-center justify-center select-none"
            >
                <span className="reveal-yoga text-[10px] font-black tracking-[0.45em] text-[#bda07a] uppercase mb-4 block">
                    EXPERIÊNCIA PILATES EM APARELHOS
                </span>
                
                <h2 className="reveal-yoga text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extralight tracking-tight leading-none text-white mb-6">
                    Movimento com <br />
                    <span className="font-serif italic font-light text-[#bda07a] tracking-normal">propósito</span>
                </h2>
                
                <p className="reveal-yoga text-sm sm:text-base md:text-lg text-zinc-300 font-light max-w-lg leading-relaxed">
                    Sessões individuais que unem força, mobilidade, consciência corporal e precisão, respeitando os objetivos e a individualidade de cada aluno.
                </p>

                {/* Pequeno detalhe minimalista de respiração */}
                <div className="reveal-yoga mt-10 flex flex-col items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#bda07a] animate-ping" />
                    <span className="text-[10px] md:text-xs tracking-[0.25em] uppercase text-zinc-500 font-bold">Atendimento exclusivo na Rede Bodytech</span>
                </div>
            </div>
        </section>
    )
}
