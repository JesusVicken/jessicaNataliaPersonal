'use client'

import React, { useLayoutEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { GraduationCap, Trophy, FlowerLotus, Sparkle, MapPin } from '@phosphor-icons/react'

gsap.registerPlugin(ScrollTrigger)

export function About() {
    const containerRef = useRef<HTMLDivElement>(null)
    const imageRef = useRef<HTMLDivElement>(null)
    const textRef = useRef<HTMLDivElement>(null)
    const statsRef = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Efeito parallax / zoom suave na imagem principal conforme scroll
            gsap.fromTo(".about-photo",
                { scale: 1.15 },
                {
                    scale: 1,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true
                    }
                }
            )

            // 2. Revelação em máscara (clip-path) da imagem
            gsap.fromTo(imageRef.current,
                { clipPath: 'inset(0% 100% 0% 0%)', opacity: 0.8 },
                {
                    clipPath: 'inset(0% 0% 0% 0%)',
                    opacity: 1,
                    duration: 1.6,
                    ease: 'power4.inOut',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 70%',
                    }
                }
            )

            // 3. Revelação em cascata dos textos editoriais
            const animateElements = textRef.current?.querySelectorAll('.reveal-item')
            if (animateElements) {
                gsap.fromTo(animateElements,
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        stagger: 0.15,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: textRef.current,
                            start: 'top 80%',
                        }
                    }
                )
            }

            // 4. Animação dos cards de conquistas
            const cards = statsRef.current?.querySelectorAll('.cred-card')
            if (cards) {
                gsap.fromTo(cards,
                    { y: 40, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.12,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: statsRef.current,
                            start: 'top 85%',
                        }
                    }
                )
            }
        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <section 
            ref={containerRef} 
            id="about" 
            className="bg-[#FAF8F5] py-32 md:py-48 px-6 md:px-12 border-t border-[#e6e2da] overflow-hidden relative font-sans text-[#111111]"
        >
            {/* Linhas decorativas sutis - Estilo Editorial Awwwards */}
            <div className="absolute top-0 left-1/4 w-[1px] h-full bg-[#e6e2da]/40 pointer-events-none hidden lg:block" />
            <div className="absolute top-0 left-3/4 w-[1px] h-full bg-[#e6e2da]/40 pointer-events-none hidden lg:block" />

            <div className="container mx-auto max-w-7xl relative z-10">
                <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">

                    {/* --- COLUNA ESQUERDA: FOTO (LARGURA 5/12) --- */}
                    <div ref={imageRef} className="lg:col-span-5 w-full sticky lg:top-32">
                        <div className="aspect-[3/4] relative rounded-[2.5rem] overflow-hidden border border-[#e6e2da] bg-[#F5F2EB] shadow-2xl group">
                            
                            {/* Overlay de gradiente luxuoso no topo da imagem */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10 pointer-events-none" />

                            <Image
                                src="/jessica.jpeg"
                                alt="Jéssica Natália - Personal Trainer & Pilates"
                                fill
                                className="about-photo object-cover transition-transform duration-700"
                                quality={100}
                                priority
                            />

                            {/* Badge flutuante Awwwards no canto */}
                            <div className="absolute bottom-6 left-6 z-20 bg-white/95 backdrop-blur-md px-6 py-4 rounded-2xl border border-[#e6e2da]/60 shadow-lg flex items-center gap-3">
                                <div className="w-2.5 h-2.5 rounded-full bg-[#bda07a] animate-ping" />
                                <span className="text-[9px] font-black tracking-widest text-[#111111] uppercase">CREF 0314135-G/DF</span>
                            </div>
                        </div>
                    </div>

                    {/* --- COLUNA DIREITA: CONTEÚDO EDITORIAL (LARGURA 7/12) --- */}
                    <div ref={textRef} className="lg:col-span-7 w-full flex flex-col justify-center pt-4 lg:pt-0">
                        
                        {/* Categoria / Badge */}
                        <div className="reveal-item mb-6 flex items-center gap-2">
                            <span className="text-[10px] font-black tracking-[0.4em] text-[#bda07a] uppercase">
                                HAUTE COUTURE FITNESS
                            </span>
                            <div className="h-[1px] w-8 bg-[#bda07a]/60"></div>
                        </div>

                        {/* Título Principal */}
                        <h2 className="reveal-item text-4xl md:text-6xl font-black uppercase tracking-tight leading-[0.9] text-[#111111] mb-8">
                            Jéssica Natália <br />
                            <span className="font-serif italic font-light text-[#bda07a] capitalize tracking-normal">
                                Personal & Pilates
                            </span>
                        </h2>

                        {/* Citação Inspiradora (Editorial) */}
                        <div className="reveal-item border-l-2 border-[#bda07a] pl-6 py-2 mb-10">
                            <p className="text-md md:text-xl font-light text-[#66635f] italic leading-relaxed">
                                "Graduada pela UCB, com trajetória esculpida em grandes redes premium como a Bodytech. Desenvolvo um treinamento que une a exatidão biomecânica e a fluidez do Pilates para redefinir o seu corpo e performance."
                            </p>
                        </div>

                        {/* Texto Biográfico */}
                        <div className="reveal-item text-[#66635f] font-light leading-relaxed text-sm md:text-base space-y-6 mb-12">
                            <p>
                                Jéssica Natália é especialista em treinos personalizados e instrutora certificada de Pilates. Com base teórica pela <strong className="text-[#111111] font-semibold">Universidade Católica de Brasília</strong> e experiência prática acumulada na rede de alta performance <strong className="text-[#111111] font-semibold">Bodytech</strong>, seu método foca no alinhamento perfeito de postura, potência e integridade articular.
                            </p>
                            <p>
                                Seus planejamentos englobam o ganho de força, resistência, mobilidade e condicionamento físico de elite. Também oferece suporte altamente seguro para <strong className="text-[#111111] font-semibold">gestantes e acompanhamento de pós-parto</strong>, respeitando integralmente as alterações fisiológicas e os objetivos estéticos de cada fase da mulher.
                            </p>
                            <p>
                                Atende de forma presencial exclusiva nas regiões da <strong className="text-[#111111] font-semibold">Asa Sul e Sudoeste (Brasília - DF)</strong>, além de guiar alunos em todo o Brasil e exterior por meio de sua renomada consultoria fitness online personalizada.
                            </p>
                        </div>

                        {/* Grid de Diferenciais e Qualificações */}
                        <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            
                            {/* Credencial 1 */}
                            <div className="cred-card group p-6 rounded-[2rem] bg-white border border-[#e6e2da] hover:border-[#bda07a] hover:shadow-[0_15px_30px_rgba(0,0,0,0.02)] transition-all duration-500 flex items-start gap-4">
                                <div className="bg-[#FAF8F5] text-[#bda07a] p-3.5 rounded-2xl group-hover:bg-[#111111] group-hover:text-white transition-colors duration-500">
                                    <GraduationCap size={22} />
                                </div>
                                <div>
                                    <h4 className="text-xs font-black uppercase text-[#111111] mb-1 tracking-wider">Formação UCB</h4>
                                    <p className="text-[11px] text-[#66635f] font-light leading-snug">
                                        Bacharel em Educação Física pela prestigiada Universidade Católica de Brasília.
                                    </p>
                                </div>
                            </div>

                            {/* Credencial 2 */}
                            <div className="cred-card group p-6 rounded-[2rem] bg-white border border-[#e6e2da] hover:border-[#bda07a] hover:shadow-[0_15px_30px_rgba(0,0,0,0.02)] transition-all duration-500 flex items-start gap-4">
                                <div className="bg-[#FAF8F5] text-[#bda07a] p-3.5 rounded-2xl group-hover:bg-[#111111] group-hover:text-white transition-colors duration-500">
                                    <Trophy size={22} />
                                </div>
                                <div>
                                    <h4 className="text-xs font-black uppercase text-[#111111] mb-1 tracking-wider">DNA Bodytech</h4>
                                    <p className="text-[11px] text-[#66635f] font-light leading-snug">
                                        Atuação de alto padrão na maior e mais qualificada rede de academias premium do país.
                                    </p>
                                </div>
                            </div>

                            {/* Credencial 3 */}
                            <div className="cred-card group p-6 rounded-[2rem] bg-white border border-[#e6e2da] hover:border-[#bda07a] hover:shadow-[0_15px_30px_rgba(0,0,0,0.02)] transition-all duration-500 flex items-start gap-4">
                                <div className="bg-[#FAF8F5] text-[#bda07a] p-3.5 rounded-2xl group-hover:bg-[#111111] group-hover:text-white transition-colors duration-500">
                                    <FlowerLotus size={22} />
                                </div>
                                <div>
                                    <h4 className="text-xs font-black uppercase text-[#111111] mb-1 tracking-wider">Método Pilates</h4>
                                    <p className="text-[11px] text-[#66635f] font-light leading-snug">
                                        Controle motor, reabilitação articular e fortalecimento profundo do core.
                                    </p>
                                </div>
                            </div>

                            {/* Credencial 4 */}
                            <div className="cred-card group p-6 rounded-[2rem] bg-white border border-[#e6e2da] hover:border-[#bda07a] hover:shadow-[0_15px_30px_rgba(0,0,0,0.02)] transition-all duration-500 flex items-start gap-4">
                                <div className="bg-[#FAF8F5] text-[#bda07a] p-3.5 rounded-2xl group-hover:bg-[#111111] group-hover:text-white transition-colors duration-500">
                                    <Sparkle size={22} />
                                </div>
                                <div>
                                    <h4 className="text-xs font-black uppercase text-[#111111] mb-1 tracking-wider">Gestantes & Materno</h4>
                                    <p className="text-[11px] text-[#66635f] font-light leading-snug">
                                        Protocolos seguros para uma gestação ativa e recuperação célere no pós-parto.
                                    </p>
                                </div>
                            </div>

                        </div>

                        {/* Local de Atendimento / Link de Parceria */}
                        <div className="reveal-item mt-10 p-5 rounded-2xl bg-[#F5F2EB]/60 border border-[#e6e2da] flex items-center gap-4 text-xs font-light text-[#66635f]">
                            <MapPin size={18} className="text-[#bda07a] shrink-0" weight="fill" />
                            <span>
                                Atendimento presencial exclusivo em condomínios e na Ascade (Asa Sul / Sudoeste), Brasília - DF.
                            </span>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    )
}