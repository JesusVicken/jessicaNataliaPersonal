'use client'

import React, { useLayoutEffect, useRef, useEffect } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
    Barbell, 
    FlowerLotus, 
    GraduationCap, 
    Star, 
    Users, 
    Mountains, 
    Compass, 
    Baby, 
    Bicycle, 
    ArrowRight,
    Sparkle
} from '@phosphor-icons/react'

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
                { scale: 1.12 },
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
                    duration: 1.4,
                    ease: 'power4.inOut',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 75%',
                    }
                }
            )

            // 3. Revelação em cascata dos textos editoriais
            const animateElements = textRef.current?.querySelectorAll('.reveal-item')
            if (animateElements) {
                gsap.fromTo(animateElements,
                    { y: 40, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.12,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: textRef.current,
                            start: 'top 80%',
                        }
                    }
                )
            }

            // 4. Animação dos contadores numéricos na seção de destaques
            const counters = statsRef.current?.querySelectorAll('.about-counter')
            if (counters) {
                counters.forEach((counter) => {
                    const targetVal = parseInt(counter.getAttribute('data-target') || '0', 10)
                    const suffix = counter.getAttribute('data-suffix') || ''
                    const obj = { value: 0 }

                    gsap.to(obj, {
                        value: targetVal,
                        duration: 2,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: counter,
                            start: 'top 90%',
                            toggleActions: 'play none none none',
                        },
                        onUpdate: () => {
                            counter.textContent = Math.round(obj.value) + suffix
                        }
                    })
                })
            }
        }, containerRef)

        return () => ctx.revert()
    }, [])

    // Função de scroll suave até a seção de programas
    const scrollToPrograms = (e: React.MouseEvent) => {
        e.preventDefault()
        const target = document.getElementById('programs')
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <section 
            ref={containerRef} 
            id="about" 
            className="bg-[#FAF8F5] py-24 md:py-36 px-6 md:px-12 border-t border-[#e6e2da] overflow-hidden relative font-sans text-[#111111]"
        >
            {/* Linhas decorativas de fundo para estética Awwwards */}
            <div className="absolute top-0 left-1/4 w-[1px] h-full bg-[#e6e2da]/40 pointer-events-none hidden lg:block" />
            <div className="absolute top-0 left-3/4 w-[1px] h-full bg-[#e6e2da]/40 pointer-events-none hidden lg:block" />

            <div className="container mx-auto max-w-7xl relative z-10">
                
                {/* --- SEÇÃO PRINCIPAL: FOTO + BIO --- */}
                <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start mb-24 md:mb-32">
                    
                    {/* Lado Esquerdo: Imagem Profissional */}
                    <div ref={imageRef} className="lg:col-span-5 w-full sticky lg:top-32">
                        <div className="aspect-[3/4] relative rounded-[2.5rem] overflow-hidden border border-[#e6e2da] bg-[#F5F2EB] shadow-2xl">
                            <Image
                                src="/jessica.jpeg"
                                alt="Jéssica Natália"
                                fill
                                className="about-photo object-cover transition-transform duration-700"
                                quality={100}
                                priority
                            />
                            
                            {/* Card de autoridade sobreposto */}
                            <div className="absolute bottom-6 left-6 z-20 bg-white/95 backdrop-blur-md px-6 py-4 rounded-2xl border border-[#e6e2da]/60 shadow-lg flex items-center gap-3">
                                <div className="w-2.5 h-2.5 rounded-full bg-[#bda07a] animate-ping" />
                                <span className="text-[9px] font-black tracking-widest text-[#111111] uppercase">CREF 0314135-G/DF</span>
                            </div>
                        </div>
                    </div>

                    {/* Lado Direito: Conteúdo Editorial */}
                    <div ref={textRef} className="lg:col-span-7 w-full flex flex-col justify-center">
                        
                        {/* Pequeno Título com sugestão de impacto */}
                        <div className="reveal-item mb-4">
                            <span className="text-[10px] font-black tracking-[0.35em] text-[#bda07a] uppercase block mb-2">
                                CONHEÇA A JÉSSICA
                            </span>
                            <span className="text-xs font-serif italic text-[#66635f] block">
                                Especialista em MatPilates para Mulheres, Corredores e Ciclistas.
                            </span>
                        </div>

                        {/* Título Principal */}
                        <h2 className="reveal-item text-xl md:text-3xl font-black uppercase tracking-tight leading-tight text-[#111111] mb-8 max-w-2xl">
                            Mais de 10 anos ajudando mulheres, corredoras e ciclistas a conquistarem um corpo mais forte, saudável e preparado para viver e praticar esportes com qualidade de vida.
                        </h2>

                        {/* Parágrafos de Texto */}
                        <div className="reveal-item text-[#66635f] font-light leading-relaxed text-sm md:text-base space-y-6 mb-12">
                            <p>
                                Especialista em treinamento feminino e MatPilates, Jéssica Natália une sua experiência como Personal Trainer, Instrutora de MatPilates e Pós-graduada em Treinamento para Grupos Especiais para desenvolver programas voltados à saúde, performance e prevenção de lesões.
                            </p>
                            <p>
                                Sua metodologia atende mulheres em diferentes fases da vida — da gestação à menopausa — além de corredores e ciclistas que desejam melhorar o desempenho, reduzir dores e manter a prática esportiva por muitos anos.
                            </p>
                            <p>
                                Ao longo da carreira, já ajudou mais de 1.000 pessoas a conquistarem mais força, mobilidade, confiança e qualidade de vida.
                            </p>
                        </div>

                        {/* Grid Moderno de Cards / Ícones */}
                        <div className="reveal-item grid grid-cols-1 sm:grid-cols-2 gap-4">
                            
                            <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-[#e6e2da] hover:border-[#bda07a] transition-all">
                                <Barbell size={20} className="text-[#bda07a]" weight="fill" />
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold text-[#111111]">Personal Trainer</span>
                                    <span className="text-[10px] text-zinc-400">Consultoria Online e Presencial</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-[#e6e2da] hover:border-[#bda07a] transition-all">
                                <FlowerLotus size={20} className="text-[#bda07a]" weight="fill" />
                                <span className="text-xs font-bold text-[#111111]">Instrutora de MatPilates</span>
                            </div>

                            <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-[#e6e2da] hover:border-[#bda07a] transition-all">
                                <GraduationCap size={20} className="text-[#bda07a]" weight="fill" />
                                <span className="text-xs font-bold text-[#111111]">Pós-graduada em Grupos Especiais</span>
                            </div>

                            <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-[#e6e2da] hover:border-[#bda07a] transition-all">
                                <Sparkle size={20} className="text-[#bda07a]" weight="fill" />
                                <span className="text-xs font-bold text-[#111111]">Professora da Rede Bodytech</span>
                            </div>

                            <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-[#e6e2da] hover:border-[#bda07a] transition-all">
                                <Mountains size={20} className="text-[#bda07a]" weight="fill" />
                                <span className="text-xs font-bold text-[#111111]">Ex-atleta de esportes outdoor</span>
                            </div>

                            <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-[#e6e2da] hover:border-[#bda07a] transition-all">
                                <Compass size={20} className="text-[#bda07a]" weight="fill" />
                                <span className="text-xs font-bold text-[#111111]">Guia da Chapada dos Veadeiros</span>
                            </div>

                            <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-[#e6e2da] hover:border-[#bda07a] transition-all">
                                <Star size={20} className="text-[#bda07a]" weight="fill" />
                                <span className="text-xs font-bold text-[#111111]">Mais de 10 anos de experiência</span>
                            </div>

                            <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-[#e6e2da] hover:border-[#bda07a] transition-all">
                                <Users size={20} className="text-[#bda07a]" weight="fill" />
                                <span className="text-xs font-bold text-[#111111]">Mais de 1.000 vidas transformadas</span>
                            </div>

                        </div>

                    </div>

                </div>

                {/* --- FAIXA DESTACADA: MISSÃO --- */}
                <div className="mb-24 md:mb-32 bg-[#F5F2EB] p-8 md:p-12 rounded-[2.5rem] border border-[#e6e2da] flex flex-col md:flex-row gap-8 items-start md:items-center justify-between" data-aos="fade-up">
                    <div className="md:w-1/3">
                        <span className="text-[10px] font-black tracking-[0.35em] text-[#bda07a] uppercase block mb-2">DIRETRIZ</span>
                        <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-[#111111]">Minha missão</h3>
                    </div>
                    <div className="md:w-2/3 border-t md:border-t-0 md:border-l border-[#e6e2da] pt-6 md:pt-0 md:pl-10">
                        <p className="text-sm md:text-base text-[#66635f] leading-relaxed font-light">
                            <strong className="text-[#111111] font-semibold block mb-2 text-md">Acredito que o movimento transforma vidas.</strong>
                            Meu objetivo é ajudar mulheres, corredoras e ciclistas a desenvolverem um corpo forte, funcional e resiliente através do MatPilates e do treinamento físico, permitindo que pratiquem suas atividades com mais segurança, confiança e qualidade de vida.
                        </p>
                    </div>
                </div>

                {/* --- SEÇÃO DE ESPECIALIDADES --- */}
                <div className="mb-24 md:mb-32">
                    {/* Header */}
                    <div className="text-center mb-16" data-aos="fade-up">
                        <span className="text-[10px] font-black tracking-[0.35em] text-[#bda07a] uppercase block mb-4">MÉTODOS DE AÇÃO</span>
                        <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-[#111111]">Especialidades</h3>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        
                        <div className="group bg-white p-8 rounded-3xl border border-[#e6e2da] hover:border-[#bda07a] hover:shadow-sm transition-all duration-300 flex flex-col justify-between" data-aos="fade-up" data-aos-delay="100">
                            <div>
                                <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] text-[#bda07a] flex items-center justify-center mb-6 group-hover:bg-[#111111] group-hover:text-white transition-colors duration-300">
                                    <FlowerLotus size={20} />
                                </div>
                                <h4 className="text-sm font-bold uppercase tracking-wide text-[#111111] mb-2">Climatério & Menopausa</h4>
                                <p className="text-xs text-[#66635f] font-light leading-relaxed">
                                    MatPilates adaptado para mulheres na perimenopausa e menopausa, focando em ganho de densidade óssea e flexibilidade muscular.
                                </p>
                            </div>
                        </div>

                        <div className="group bg-white p-8 rounded-3xl border border-[#e6e2da] hover:border-[#bda07a] hover:shadow-sm transition-all duration-300 flex flex-col justify-between" data-aos="fade-up" data-aos-delay="200">
                            <div>
                                <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] text-[#bda07a] flex items-center justify-center mb-6 group-hover:bg-[#111111] group-hover:text-white transition-colors duration-300">
                                    <Baby size={20} />
                                </div>
                                <h4 className="text-sm font-bold uppercase tracking-wide text-[#111111] mb-2">MatPilates Gestantes</h4>
                                <p className="text-xs text-[#66635f] font-light leading-relaxed">
                                    Fortalecimento de assoalho pélvico e estabilização de core para uma gestação ativa, saudável e sem desconforto lombar.
                                </p>
                            </div>
                        </div>

                        <div className="group bg-white p-8 rounded-3xl border border-[#e6e2da] hover:border-[#bda07a] hover:shadow-sm transition-all duration-300 flex flex-col justify-between" data-aos="fade-up" data-aos-delay="300">
                            <div>
                                <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] text-[#bda07a] flex items-center justify-center mb-6 group-hover:bg-[#111111] group-hover:text-white transition-colors duration-300">
                                    <Users size={20} />
                                </div>
                                <h4 className="text-sm font-bold uppercase tracking-wide text-[#111111] mb-2">Recuperação Pós-Parto</h4>
                                <p className="text-xs text-[#66635f] font-light leading-relaxed">
                                    Recuperação biomecânica progressiva pós-parto, com foco em reabilitação de diástase abdominal e fortalecimento postural global.
                                </p>
                            </div>
                        </div>

                        <div className="group bg-white p-8 rounded-3xl border border-[#e6e2da] hover:border-[#bda07a] hover:shadow-sm transition-all duration-300 flex flex-col justify-between" data-aos="fade-up" data-aos-delay="400">
                            <div>
                                <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] text-[#bda07a] flex items-center justify-center mb-6 group-hover:bg-[#111111] group-hover:text-white transition-colors duration-300">
                                    <Star size={20} />
                                </div>
                                <h4 className="text-sm font-bold uppercase tracking-wide text-[#111111] mb-2">MatPilates Corredores</h4>
                                <p className="text-xs text-[#66635f] font-light leading-relaxed">
                                    Foco em estabilização pélvica, aumento de amplitude articular e equilíbrio muscular para prevenção de lesões na corrida.
                                </p>
                            </div>
                        </div>

                        <div className="group bg-white p-8 rounded-3xl border border-[#e6e2da] hover:border-[#bda07a] hover:shadow-sm transition-all duration-300 flex flex-col justify-between" data-aos="fade-up" data-aos-delay="500">
                            <div>
                                <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] text-[#bda07a] flex items-center justify-center mb-6 group-hover:bg-[#111111] group-hover:text-white transition-colors duration-300">
                                    <Bicycle size={20} />
                                </div>
                                <h4 className="text-sm font-bold uppercase tracking-wide text-[#111111] mb-2">MatPilates Ciclistas</h4>
                                <p className="text-xs text-[#66635f] font-light leading-relaxed">
                                    Compensação e fortalecimento da cadeia posterior para ciclistas de estrada e mountain bike, reduzindo fadiga e dores nas costas.
                                </p>
                            </div>
                        </div>

                        <div className="group bg-white p-8 rounded-3xl border border-[#e6e2da] hover:border-[#bda07a] hover:shadow-sm transition-all duration-300 flex flex-col justify-between" data-aos="fade-up" data-aos-delay="600">
                            <div>
                                <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] text-[#bda07a] flex items-center justify-center mb-6 group-hover:bg-[#111111] group-hover:text-white transition-colors duration-300">
                                    <Barbell size={20} />
                                </div>
                                <h4 className="text-sm font-bold uppercase tracking-wide text-[#111111] mb-2">Consultoria de Treino</h4>
                                <p className="text-xs text-[#66635f] font-light leading-relaxed">
                                    Acompanhamento individualizado e personalizado de treinamento de força, unindo ciência prática e biomecânica.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

                {/* --- CONEXÃO DOS CONTADORES ANIMADOS --- */}
                <div ref={statsRef} className="py-16 px-6 bg-white border border-[#e6e2da] rounded-[2.5rem] grid grid-cols-1 md:grid-cols-3 gap-12 text-center items-center shadow-sm">
                    <div>
                        <span className="about-counter block text-4xl md:text-5xl font-black text-[#111111] mb-2" data-target="10" data-suffix="+">0+</span>
                        <span className="text-[9px] uppercase font-bold tracking-widest text-[#bda07a] block mb-1">Anos de experiência</span>
                        <span className="text-[9px] text-zinc-400 font-light block">Atuação profissional consistente</span>
                    </div>
                    <div>
                        <span className="about-counter block text-4xl md:text-5xl font-black text-[#111111] mb-2" data-target="1000" data-suffix="+">0+</span>
                        <span className="text-[9px] uppercase font-bold tracking-widest text-[#bda07a] block mb-1">Vidas transformadas</span>
                        <span className="text-[9px] text-zinc-400 font-light block">Resultados reais mensuráveis</span>
                    </div>
                    <div>
                        <span className="about-counter block text-4xl md:text-5xl font-black text-[#111111] mb-2" data-target="100" data-suffix="%">0%</span>
                        <span className="text-[9px] uppercase font-bold tracking-widest text-[#bda07a] block mb-1">Atendimento Individualizado</span>
                        <span className="text-[9px] text-zinc-400 font-light block">Online, presencial e para todo o Brasil</span>
                    </div>
                </div>

                {/* --- BOTÃO DE CHAMADA FINAL (CTA) --- */}
                <div className="mt-20 flex justify-center" data-aos="fade-up">
                    <a
                        href="#programs"
                        onClick={scrollToPrograms}
                        className="group inline-flex items-center gap-3 bg-[#111111] text-white px-12 py-6 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#bda07a] transition-all duration-300 shadow-[0_15px_40px_rgba(0,0,0,0.15)] hover:scale-105"
                    >
                        Quero treinar com a Jéssica
                        <ArrowRight size={16} />
                    </a>
                </div>

            </div>
        </section>
    )
}