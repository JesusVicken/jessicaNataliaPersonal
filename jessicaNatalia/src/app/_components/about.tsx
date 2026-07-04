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
    Sparkle,
    CaretLeft,
    CaretRight,
    WhatsappLogo
} from '@phosphor-icons/react'

gsap.registerPlugin(ScrollTrigger)

// Hook useGSAP Isomórfico customizado para compatibilidade SSR do Next.js
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

function useGSAP(callback: gsap.ContextFunc, dependencies: any[] = []) {
    useIsomorphicLayoutEffect(() => {
        const ctx = gsap.context(callback);
        return () => ctx.revert();
    }, dependencies);
}

export function About() {
    const containerRef = useRef<HTMLDivElement>(null)
    const imageRef = useRef<HTMLDivElement>(null)
    const textRef = useRef<HTMLDivElement>(null)
    const statsRef = useRef<HTMLDivElement>(null)
    const specialtiesTriggerRef = useRef<HTMLDivElement>(null)
    const carouselRef = useRef<HTMLDivElement>(null)

    const scrollCarousel = (direction: 'left' | 'right') => {
        const container = carouselRef.current
        if (!container) return
        
        // Define o deslocamento com base em 80% da largura visível + espaçamento do grid gap
        const scrollAmount = container.clientWidth * 0.8 + 24
        
        container.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth'
        })
    }

    const getWhatsappLink = (programTitle: string) => {
        return `https://wa.me/5561996844400?text=Olá%20Jéssica!%20Gostaria%20de%20saber%20mais%20sobre%20o%20programa%20${encodeURIComponent(programTitle)}.`
    }

    // Agrupador de especialidades para reuso estrutural nos layouts
    const specialtiesList = [
        {
            title: "Metabolismo ativo 40+",
            desc: "Musculação e pilates para Perimenopausa e Menopausa. Quando seu metabolismo está mudando, seu treino também precisa mudar. Treinos desenvolvidos para mulheres que desejam preservar massa muscular, acelerar o metabolismo, reduzir dores articulares e atravessar a menopausa com mais energia, disposição, confiança e amor-próprio.",
            src: "/image49.png",
            icon: <FlowerLotus size={20} />,
            delay: "100"
        },
        {
            title: "Gestação em movimento",
            desc: "MatPilates para gestantes. Cuide do seu corpo, se prepare para o parto e recuperação pós parto com MatPilates durante a gravidez. Exercícios seguros que ajudam a reduzir dores lombares, melhorar a postura, respiração e mindfullness.",
            src: "/image44.jpeg",
            icon: <Baby size={20} />,
            delay: "200"
        },
        {
            title: "Reconexão pós-parto",
            desc: "MatPilates pós-parto. Cuide de você e se reconheça! Seu corpo fez algo extraordinário, agora merece cuidado e estratégia para recuperar força, estabilidade abdominal e confiança após a gestação, respeitando cada etapa da sua recuperação. Treinos leves, curtos e para você fazer onde estiver.",
            src: "/image36.jpeg",
            icon: <Users size={20} />,
            delay: "300"
        },
        {
            title: "Leveza a cada passada",
            desc: "MatPilates para corredoras sem dor. Treino seu corpo para acompanhar suas paixões. Programa focado em mobilidade, estabilidade e fortalecimento para corredoras que querem correr com prazer, sem sentirem dores nos joelhos, quadris, lombar ou tornozelos.",
            src: "/image38.jpeg",
            icon: <Star size={20} />,
            delay: "400"
        },
        {
            title: "Cintura fina, pedal e core fortes",
            desc: "MatPilates para ciclistas sem dor. Treino seu corpo para acompanhar suas paixões. Quanto mais kms você pedala maior costuma ser a sobrecarga no seu corpo. Pedale com mais conforto combatendo dores cervicais, torácicas, lombares, articulares e desequilíbrios musculares causados pelas suas horas sobre a bicicleta.",
            src: "/image50.jpeg",
            icon: <Bicycle size={20} />,
            delay: "500"
        },
        {
            title: "Consultoria de Treino",
            desc: "Acompanhamento individualizado e personalizado de treinamento de força, unindo ciência prática e biomecânica.",
            src: "/image5.jpeg",
            icon: <Barbell size={20} />,
            delay: "600"
        }
    ]

    useGSAP(() => {
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

        // 4. Animação Stagger Bento Grid com revelação clip-path cinematográfica
        const bentoCards = containerRef.current?.querySelectorAll('.bento-card-revelation')
        if (bentoCards && bentoCards.length > 0) {
            gsap.fromTo(bentoCards,
                { 
                    clipPath: 'inset(100% 0% 0% 0%)', 
                    y: 80, 
                    opacity: 0 
                },
                {
                    clipPath: 'inset(0% 0% 0% 0%)',
                    y: 0,
                    opacity: 1,
                    duration: 1.6,
                    stagger: 0.15,
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: specialtiesTriggerRef.current,
                        start: 'top 85%',
                    }
                }
            )
        }

        // 5. Animação dos contadores numéricos na seção de destaques
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
                        trigger: statsRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none none',
                    },
                    onUpdate: () => {
                        counter.textContent = Math.round(obj.value) + suffix
                    }
                })
            })
        }
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
                                src="/image8.jpeg"
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
                <div ref={specialtiesTriggerRef} className="mb-24 md:mb-32 specialties-trigger">
                    {/* Header */}
                    <div className="text-center mb-16" data-aos="fade-up">
                        <span className="text-[10px] font-black tracking-[0.35em] text-[#bda07a] uppercase block mb-4">CONHEÇA OS MEUS</span>
                        <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-[#111111]">Programas</h3>
                    </div>

                    {/* --- LAYOUT MOBILE: CARROUSSEL HORIZONTAL --- */}
                    <div 
                        ref={carouselRef}
                        className="flex md:hidden overflow-x-auto snap-x snap-mandatory gap-6 scrollbar-none px-2 pb-8 w-full scroll-smooth"
                    >
                        {specialtiesList.map((item, idx) => (
                            <div 
                                key={`mob-spec-${idx}`}
                                className="w-[80vw] shrink-0 snap-center rounded-3xl overflow-hidden aspect-[3/4] relative border border-zinc-200/80 bg-zinc-950 shadow-lg"
                            >
                                <Image
                                    src={idx === 5 ? "/image10.jpeg" : item.src}
                                    alt={item.title}
                                    fill
                                    className="object-cover"
                                    sizes="80vw"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#060606]/95 via-[#060606]/55 to-transparent z-10 pointer-events-none" />
                                <div className="absolute inset-0 p-6 flex flex-col justify-end z-20 text-white pointer-events-none">
                                    <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-md text-[#bda07a] flex items-center justify-center mb-3 border border-white/10 shrink-0">
                                        {item.icon}
                                    </div>
                                    <h4 className="text-sm font-bold uppercase tracking-wider mb-1" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>{item.title}</h4>
                                    <p className="text-[10px] text-zinc-300 font-light leading-relaxed mb-3">{item.desc}</p>
                                    <div className="pointer-events-auto mt-2">
                                        <a 
                                            href={getWhatsappLink(item.title)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 bg-[#25D366] text-white hover:bg-[#1EBE57] hover:scale-105 px-4 py-2 rounded-full text-[8px] font-bold uppercase tracking-widest transition-all duration-300 shadow-md"
                                        >
                                            Saber mais <WhatsappLogo size={10} weight="fill" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Controles de Navegação do Carrossel Mobile (UX Aprimorada) */}
                    <div className="flex md:hidden justify-center items-center gap-6 mt-2 mb-8">
                        <button
                            onClick={() => scrollCarousel('left')}
                            className="w-10 h-10 rounded-full border border-[#e6e2da] bg-white/70 backdrop-blur-md text-[#111111] flex items-center justify-center active:bg-[#bda07a] active:text-white transition-all duration-300 shadow-sm"
                            aria-label="Card anterior"
                        >
                            <CaretLeft size={18} weight="bold" />
                        </button>
                        <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-zinc-400 select-none">
                            Deslize ou clique
                        </span>
                        <button
                            onClick={() => scrollCarousel('right')}
                            className="w-10 h-10 rounded-full border border-[#e6e2da] bg-white/70 backdrop-blur-md text-[#111111] flex items-center justify-center active:bg-[#bda07a] active:text-white transition-all duration-300 shadow-sm"
                            aria-label="Próximo card"
                        >
                            <CaretRight size={18} weight="bold" />
                        </button>
                    </div>

                    {/* --- LAYOUT DESKTOP: BENTO GRID ASSIMÉTRICO (AWWWARDS) --- */}
                    <div className="hidden md:grid grid-cols-3 gap-6 auto-rows-[320px] items-stretch">
                        
                        {/* CARD 1: Climatério & Menopausa (Largo - spans 2 cols, row 1) */}
                        <div className="bento-card-revelation col-span-2 row-span-1 relative rounded-3xl overflow-hidden border border-[#e6e2da] bg-white group shadow-sm hover:shadow-lg transition-shadow duration-500">
                            <Image
                                src={specialtiesList[0].src}
                                alt={specialtiesList[0].title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out z-0"
                                sizes="66vw"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#060606]/90 via-[#060606]/40 to-transparent z-10 opacity-80 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none" />
                            <div className="absolute inset-0 p-8 flex flex-col justify-end z-20 text-white pointer-events-none">
                                <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-md text-[#bda07a] flex items-center justify-center mb-4 border border-white/10 group-hover:bg-[#bda07a] group-hover:text-white transition-all duration-300 shrink-0">
                                    {specialtiesList[0].icon}
                                </div>
                                <h4 className="text-lg font-black uppercase tracking-wider mb-2" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.4)' }}>
                                    {specialtiesList[0].title}
                                </h4>
                                <p className="text-xs text-zinc-300 font-light leading-relaxed max-w-xl">
                                    {specialtiesList[0].desc}
                                </p>
                                <div className="pointer-events-auto self-start max-h-0 group-hover:max-h-14 opacity-0 group-hover:opacity-100 overflow-hidden transition-all duration-500 ease-out">
                                    <a 
                                        href={getWhatsappLink(specialtiesList[0].title)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 bg-[#25D366] text-white hover:bg-[#1EBE57] px-5 py-2.5 rounded-full text-[9px] font-bold uppercase tracking-widest transition-all duration-300 shadow-md mt-3"
                                    >
                                        Falar com a Jéssica <WhatsappLogo size={12} weight="fill" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* CARD 2: MatPilates Gestantes (Alto - spans 1 col, row 1 & 2) */}
                        <div className="bento-card-revelation col-span-1 row-span-2 relative rounded-3xl overflow-hidden border border-[#e6e2da] bg-white group shadow-sm hover:shadow-lg transition-shadow duration-500">
                            <Image
                                src={specialtiesList[1].src}
                                alt={specialtiesList[1].title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out z-0"
                                sizes="33vw"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#060606]/90 via-[#060606]/40 to-transparent z-10 opacity-80 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none" />
                            <div className="absolute inset-0 p-8 flex flex-col justify-end z-20 text-white pointer-events-none">
                                <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-md text-[#bda07a] flex items-center justify-center mb-4 border border-white/10 group-hover:bg-[#bda07a] group-hover:text-white transition-all duration-300 shrink-0">
                                    {specialtiesList[1].icon}
                                </div>
                                <h4 className="text-lg font-black uppercase tracking-wider mb-2" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.4)' }}>
                                    {specialtiesList[1].title}
                                </h4>
                                <p className="text-xs text-zinc-300 font-light leading-relaxed">
                                    {specialtiesList[1].desc}
                                </p>
                                <div className="pointer-events-auto self-start max-h-0 group-hover:max-h-14 opacity-0 group-hover:opacity-100 overflow-hidden transition-all duration-500 ease-out">
                                    <a 
                                        href={getWhatsappLink(specialtiesList[1].title)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 bg-[#25D366] text-white hover:bg-[#1EBE57] px-5 py-2.5 rounded-full text-[9px] font-bold uppercase tracking-widest transition-all duration-300 shadow-md mt-3"
                                    >
                                        Falar com a Jéssica <WhatsappLogo size={12} weight="fill" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* CARD 3: Recuperação Pós-Parto (Normal - spans 1 col, row 2) */}
                        <div className="bento-card-revelation col-span-1 row-span-1 relative rounded-3xl overflow-hidden border border-[#e6e2da] bg-white group shadow-sm hover:shadow-lg transition-shadow duration-500">
                            <Image
                                src={specialtiesList[2].src}
                                alt={specialtiesList[2].title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out z-0"
                                sizes="33vw"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#060606]/90 via-[#060606]/40 to-transparent z-10 opacity-80 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none" />
                            <div className="absolute inset-0 p-8 flex flex-col justify-end z-20 text-white pointer-events-none">
                                <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-md text-[#bda07a] flex items-center justify-center mb-4 border border-white/10 group-hover:bg-[#bda07a] group-hover:text-white transition-all duration-300 shrink-0">
                                    {specialtiesList[2].icon}
                                </div>
                                <h4 className="text-lg font-black uppercase tracking-wider mb-2" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.4)' }}>
                                    {specialtiesList[2].title}
                                </h4>
                                <p className="text-xs text-zinc-300 font-light leading-relaxed">
                                    {specialtiesList[2].desc}
                                </p>
                                <div className="pointer-events-auto self-start max-h-0 group-hover:max-h-14 opacity-0 group-hover:opacity-100 overflow-hidden transition-all duration-500 ease-out">
                                    <a 
                                        href={getWhatsappLink(specialtiesList[2].title)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 bg-[#25D366] text-white hover:bg-[#1EBE57] px-5 py-2.5 rounded-full text-[9px] font-bold uppercase tracking-widest transition-all duration-300 shadow-md mt-3"
                                    >
                                        Falar com a Jéssica <WhatsappLogo size={12} weight="fill" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* CARD 4: MatPilates Corredores (Normal - spans 1 col, row 2) */}
                        <div className="bento-card-revelation col-span-1 row-span-1 relative rounded-3xl overflow-hidden border border-[#e6e2da] bg-white group shadow-sm hover:shadow-lg transition-shadow duration-500">
                            <Image
                                src={specialtiesList[3].src}
                                alt={specialtiesList[3].title}
                                fill
                                className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out z-0"
                                sizes="33vw"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#060606]/90 via-[#060606]/40 to-transparent z-10 opacity-80 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none" />
                            <div className="absolute inset-0 p-8 flex flex-col justify-end z-20 text-white pointer-events-none">
                                <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-md text-[#bda07a] flex items-center justify-center mb-4 border border-white/10 group-hover:bg-[#bda07a] group-hover:text-white transition-all duration-300 shrink-0">
                                    {specialtiesList[3].icon}
                                </div>
                                <h4 className="text-lg font-black uppercase tracking-wider mb-2" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.4)' }}>
                                    {specialtiesList[3].title}
                                </h4>
                                <p className="text-xs text-zinc-300 font-light leading-relaxed">
                                    {specialtiesList[3].desc}
                                </p>
                                <div className="pointer-events-auto self-start max-h-0 group-hover:max-h-14 opacity-0 group-hover:opacity-100 overflow-hidden transition-all duration-500 ease-out">
                                    <a 
                                        href={getWhatsappLink(specialtiesList[3].title)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 bg-[#25D366] text-white hover:bg-[#1EBE57] px-5 py-2.5 rounded-full text-[9px] font-bold uppercase tracking-widest transition-all duration-300 shadow-md mt-3"
                                    >
                                        Falar com a Jéssica <WhatsappLogo size={12} weight="fill" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* CARD 5: MatPilates Ciclistas (Normal - spans 1 col, row 3) */}
                        <div className="bento-card-revelation col-span-1 row-span-1 relative rounded-3xl overflow-hidden border border-[#e6e2da] bg-white group shadow-sm hover:shadow-lg transition-shadow duration-500">
                            <Image
                                src={specialtiesList[4].src}
                                alt={specialtiesList[4].title}
                                fill
                                className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out z-0"
                                sizes="33vw"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#060606]/90 via-[#060606]/40 to-transparent z-10 opacity-80 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none" />
                            <div className="absolute inset-0 p-8 flex flex-col justify-end z-20 text-white pointer-events-none">
                                <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-md text-[#bda07a] flex items-center justify-center mb-4 border border-white/10 group-hover:bg-[#bda07a] group-hover:text-white transition-all duration-300 shrink-0">
                                    {specialtiesList[4].icon}
                                </div>
                                <h4 className="text-lg font-black uppercase tracking-wider mb-2" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.4)' }}>
                                    {specialtiesList[4].title}
                                </h4>
                                <p className="text-xs text-zinc-300 font-light leading-relaxed">
                                    {specialtiesList[4].desc}
                                </p>
                                <div className="pointer-events-auto self-start max-h-0 group-hover:max-h-14 opacity-0 group-hover:opacity-100 overflow-hidden transition-all duration-500 ease-out">
                                    <a 
                                        href={getWhatsappLink(specialtiesList[4].title)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 bg-[#25D366] text-white hover:bg-[#1EBE57] px-5 py-2.5 rounded-full text-[9px] font-bold uppercase tracking-widest transition-all duration-300 shadow-md mt-3"
                                    >
                                        Falar com a Jéssica <WhatsappLogo size={12} weight="fill" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* CARD 6: Consultoria de Treino (Largo - spans 2 cols, row 3) */}
                        <div className="bento-card-revelation col-span-2 row-span-1 relative rounded-3xl overflow-hidden border border-[#e6e2da] bg-white group shadow-sm hover:shadow-lg transition-shadow duration-500">
                            <Image
                                src={specialtiesList[5].src}
                                alt={specialtiesList[5].title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out z-0"
                                sizes="66vw"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#060606]/90 via-[#060606]/40 to-transparent z-10 opacity-80 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none" />
                            <div className="absolute inset-0 p-8 flex flex-col justify-end z-20 text-white pointer-events-none">
                                <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-md text-[#bda07a] flex items-center justify-center mb-4 border border-white/10 group-hover:bg-[#bda07a] group-hover:text-white transition-all duration-300 shrink-0">
                                    {specialtiesList[5].icon}
                                </div>
                                <h4 className="text-lg font-black uppercase tracking-wider mb-2" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.4)' }}>
                                    {specialtiesList[5].title}
                                </h4>
                                <p className="text-xs text-zinc-300 font-light leading-relaxed max-w-xl">
                                    {specialtiesList[5].desc}
                                </p>
                                <div className="pointer-events-auto self-start max-h-0 group-hover:max-h-14 opacity-0 group-hover:opacity-100 overflow-hidden transition-all duration-500 ease-out">
                                    <a 
                                        href={getWhatsappLink(specialtiesList[5].title)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 bg-[#25D366] text-white hover:bg-[#1EBE57] px-5 py-2.5 rounded-full text-[9px] font-bold uppercase tracking-widest transition-all duration-300 shadow-md mt-3"
                                    >
                                        Falar com a Jéssica <WhatsappLogo size={12} weight="fill" />
                                    </a>
                                </div>
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