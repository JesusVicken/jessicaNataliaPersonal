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

import { setupSafariAutoplay } from '@/lib/safari-video'

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
    const videoRef = useRef<HTMLVideoElement>(null)
    const specVideoRefs = useRef<(HTMLVideoElement | null)[]>([])

    useEffect(() => {
        const playVideos = () => {
            if (videoRef.current) {
                setupSafariAutoplay(videoRef.current)
            }
            specVideoRefs.current.forEach((specVideo) => {
                if (specVideo) {
                    setupSafariAutoplay(specVideo)
                }
            })
        }

        playVideos()

        window.addEventListener('touchstart', playVideos, { once: true })
        window.addEventListener('click', playVideos, { once: true })

        return () => {
            window.removeEventListener('touchstart', playVideos)
            window.removeEventListener('click', playVideos)
        }
    }, [])

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
    const highlightedPrograms = [
        {
            title: "Metabolismo Feminino | Perimenopausa (35+)",
            desc: "Treinamento para mulheres que perceberam alterações hormonais, dificuldade para manter massa muscular, aumento da gordura abdominal, queda de energia e recuperação mais lenta. Um programa estruturado para preservar o metabolismo, aumentar a força e manter um corpo ativo durante a transição hormonal.",
            src: "/video9.mp4",
            icon: <FlowerLotus size={20} />,
            delay: "100",
            featured: true
        },
        {
            title: "Força na Menopausa (50+)",
            desc: "Treinamento voltado para mulheres na menopausa que desejam preservar massa muscular, proteger a saúde óssea, melhorar o equilíbrio, recuperar força, mobilidade e manter independência física ao longo dos anos.",
            src: "/video14.mp4",
            icon: <Star size={20} />,
            delay: "200",
            featured: true
        }
    ]

    const complementaryPrograms = [
        {
            title: "Gestação em movimento",
            desc: "MatPilates para gestantes. Cuide do seu corpo, se prepare para o parto e recuperação pós parto com MatPilates durante a gravidez. Exercícios seguros que ajudam a reduzir dores lombares, melhorar a postura, respiração e mindfullness.",
            src: "/video8.mp4",
            icon: <Baby size={20} />,
            delay: "100"
        },
        {
            title: "Reconexão pós-parto",
            desc: "MatPilates pós-parto. Cuide de você e se reconheça! Seu corpo fez algo extraordinário, agora merece cuidado e estratégia para recuperar força, estabilidade abdominal e confiança após a gestação, respeitando cada etapa da sua recuperação. Treinos leves, curtos e para você fazer onde estiver.",
            src: "/image36.jpeg",
            icon: <Users size={20} />,
            delay: "200"
        },
        {
            title: "Leveza a cada passada",
            desc: "MatPilates para corredoras sem dor. Treino seu corpo para acompanhar suas paixões. Programa focado em mobilidade, estabilidade e fortalecimento para corredoras que querem correr com prazer, sem sentirem dores nos joelhos, quadris, lombar ou tornozelos.",
            src: "/video13.mp4",
            icon: <Star size={20} />,
            delay: "300"
        },
        {
            title: "Cintura fina, pedal e core fortes",
            desc: "MatPilates para ciclistas sem dor. Treino seu corpo para acompanhar suas paixões. Quanto mais kms você pedala maior costuma ser a sobrecarga no seu corpo. Pedale com mais conforto combatendo dores cervicais, torácicas, lombares, articulares e desequilíbrios musculares causados pelas suas horas sobre a bicicleta.",
            src: "/video5.mp4",
            icon: <Bicycle size={20} />,
            delay: "400"
        },
        {
            title: "Consultoria de Treino",
            desc: "Acompanhamento individualizado e personalizado de treinamento de força, unindo ciência prática e biomecânica.",
            src: "/video1.mp4",
            icon: <Barbell size={20} />,
            delay: "500"
        },
        {
            title: "Massoterapia Corporal",
            desc: "Liberação miofascial, massagem desportiva, mobilidade, alongamento, flexibilidade e relaxamento.",
            src: "/aboutjess.jpeg",
            icon: <Sparkle size={20} />,
            delay: "600"
        }
    ]

    // Combined list for backward compatibility with carousel and bento grid
    const specialtiesList = [...highlightedPrograms, ...complementaryPrograms]

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

        // 6. Animação de escrita letra por letra baseada em scroll (Awwwards reveal) na Missão
        gsap.to(".mission-char", {
            opacity: 1,
            stagger: 0.012,
            scrollTrigger: {
                trigger: ".about-mission-container",
                start: "top 80%",
                end: "bottom 55%",
                scrub: 0.5,
            }
        })
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
                
                {/* --- SEÇÃO DE ESPECIALIDADES --- */}
                <div ref={specialtiesTriggerRef} id="programs" className="mb-24 md:mb-32 specialties-trigger">
                    {/* Header - Programas em Destaque */}
                    <div className="text-center mb-12 md:mb-16" data-aos="fade-up">
                        <span className="text-[10px] font-black tracking-[0.35em] text-[#1d7682] uppercase block mb-4">PROGRAMAS</span>
                        <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-[#111111]">Conheça minhas especialidades</h3>
                    </div>

                    {/* --- LAYOUT MOBILE: 2 CARDS EM DESTAQUE (COM ESTRELA) --- */}
                    <div className="flex flex-col gap-6 md:hidden mb-12">
                        {highlightedPrograms.map((item, idx) => (
                            <div 
                                key={`mob-highlight-${idx}`}
                                className="w-full rounded-3xl overflow-hidden min-h-[400px] relative border-2 border-[#1d7682]/40 bg-zinc-950 shadow-xl flex flex-col justify-end p-6 text-white"
                            >
                                {item.src.endsWith('.mp4') ? (
                                    <video
                                        ref={(el) => { if (el) { specVideoRefs.current[idx] = el; setupSafariAutoplay(el); } }}
                                        playsInline
                                        loop
                                        muted
                                        autoPlay
                                        className="absolute inset-0 w-full h-full object-cover z-0"
                                        preload="auto"
                                    >
                                        <source src={item.src} type="video/mp4" />
                                    </video>
                                ) : (
                                    <Image
                                        src={item.src}
                                        alt={item.title}
                                        fill
                                        className="object-cover z-0"
                                        sizes="100vw"
                                        loading="lazy"
                                    />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#060606]/95 via-[#060606]/60 to-transparent z-10 pointer-events-none" />
                                
                                {/* Badge de Destaque com Estrela */}
                                <div className="absolute top-5 left-5 z-30">
                                    <span className="inline-flex items-center gap-1.5 bg-[#1d7682] text-white px-3.5 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest shadow-lg">
                                        <Star size={12} weight="fill" /> Em destaque
                                    </span>
                                </div>

                                <div className="relative z-20 pointer-events-auto">
                                    <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-md text-[#1d7682] flex items-center justify-center mb-3 border border-white/10 shrink-0">
                                        {item.icon}
                                    </div>
                                    <h4 className="text-base font-black uppercase tracking-wider mb-2" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                                        {item.title}
                                    </h4>
                                    <p className="text-xs text-zinc-300 font-light leading-relaxed mb-4">
                                        {item.desc}
                                    </p>
                                    <a 
                                        href={getWhatsappLink(item.title)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 bg-[#25D366] text-white hover:bg-[#1EBE57] px-5 py-2.5 rounded-full text-[9px] font-bold uppercase tracking-widest transition-all duration-300 shadow-md"
                                    >
                                        Falar com a Jéssica <WhatsappLogo size={12} weight="fill" />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* --- LAYOUT DESKTOP: CARDS EM DESTAQUE (2 colunas) --- */}
                    <div className="hidden md:grid grid-cols-2 gap-6 mb-16">
                        {highlightedPrograms.map((item, idx) => (
                            <div key={`highlight-${idx}`} className="bento-card-revelation relative h-[420px] rounded-3xl overflow-hidden border-2 border-[#1d7682]/30 bg-white group shadow-md hover:shadow-xl transition-shadow duration-500">
                                {item.src.endsWith('.mp4') ? (
                                    <video
                                        ref={(el) => { if (el) { specVideoRefs.current[idx] = el; setupSafariAutoplay(el); } }}
                                        playsInline
                                        loop
                                        muted
                                        autoPlay
                                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out z-0"
                                        preload="auto"
                                    >
                                        <source src={item.src} type="video/mp4" />
                                    </video>
                                ) : (
                                    <Image
                                        src={item.src}
                                        alt={item.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out z-0"
                                        sizes="50vw"
                                        loading="lazy"
                                    />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#060606]/90 via-[#060606]/40 to-transparent z-10 opacity-80 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none" />
                                {/* Badge de Destaque */}
                                <div className="absolute top-6 left-6 z-30">
                                    <span className="inline-flex items-center gap-1.5 bg-[#1d7682] text-white px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest shadow-lg">
                                        <Star size={12} weight="fill" /> Em destaque
                                    </span>
                                </div>
                                <div className="absolute inset-0 p-8 flex flex-col justify-end z-20 text-white pointer-events-none">
                                    <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-md text-[#1d7682] flex items-center justify-center mb-4 border border-white/10 group-hover:bg-[#1d7682] group-hover:text-white transition-all duration-300 shrink-0">
                                        {item.icon}
                                    </div>
                                    <h4 className="text-lg font-black uppercase tracking-wider mb-2" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.4)' }}>
                                        {item.title}
                                    </h4>
                                    <div className="pointer-events-auto self-start max-h-0 group-hover:max-h-[200px] opacity-0 group-hover:opacity-100 overflow-hidden transition-all duration-500 ease-out">
                                        <p className="text-xs text-zinc-300 font-light leading-relaxed max-w-xl mb-4">
                                            {item.desc}
                                        </p>
                                        <a 
                                            href={getWhatsappLink(item.title)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 bg-[#25D366] text-white hover:bg-[#1EBE57] px-5 py-2.5 rounded-full text-[9px] font-bold uppercase tracking-widest transition-all duration-300 shadow-md"
                                        >
                                            Falar com a Jéssica <WhatsappLogo size={12} weight="fill" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* --- SUBTÍTULO: Ser mulher em cada fase --- */}
                    <div className="text-center mb-10 md:mb-12 mt-4 md:mt-8" data-aos="fade-up">
                        <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-[#111111]">
                            Ser mulher <span className="font-serif italic font-light text-[#1d7682] tracking-normal normal-case">em cada fase</span>
                        </h3>
                    </div>

                    {/* --- LAYOUT MOBILE: CARROUSSEL DOS DEMAIS PROGRAMAS COMPLEMENTARES --- */}
                    <div className="block md:hidden">
                        <div 
                            ref={carouselRef}
                            className="flex overflow-x-auto snap-x snap-mandatory gap-6 scrollbar-none px-2 pb-6 w-full scroll-smooth"
                        >
                            {complementaryPrograms.map((item, idx) => (
                                <div 
                                    key={`mob-comp-${idx}`}
                                    className="w-[80vw] shrink-0 snap-center rounded-3xl overflow-hidden aspect-[3/4] relative border border-zinc-200/80 bg-zinc-950 shadow-lg flex flex-col justify-end p-6 text-white"
                                >
                                    {item.src.endsWith('.mp4') ? (
                                        <video
                                            ref={(el) => { if (el) { specVideoRefs.current[idx + 2] = el; setupSafariAutoplay(el); } }}
                                            playsInline
                                            loop
                                            muted
                                            autoPlay
                                            className="absolute inset-0 w-full h-full object-cover z-0"
                                            preload="auto"
                                        >
                                            <source src={item.src} type="video/mp4" />
                                        </video>
                                    ) : (
                                        <Image
                                            src={item.src}
                                            alt={item.title}
                                            fill
                                            className={`object-cover z-0 ${item.src === '/image50.jpeg' ? 'object-right' : ''}`}
                                            sizes="80vw"
                                            loading="lazy"
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#060606]/95 via-[#060606]/55 to-transparent z-10 pointer-events-none" />
                                    <div className="relative z-20 pointer-events-auto">
                                        <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-md text-[#1d7682] flex items-center justify-center mb-3 border border-white/10 shrink-0">
                                            {item.icon}
                                        </div>
                                        <h4 className="text-sm font-bold uppercase tracking-wider mb-1" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>{item.title}</h4>
                                        <p className="text-[10px] text-zinc-300 font-light leading-relaxed mb-3">{item.desc}</p>
                                        <div className="mt-2">
                                            <a 
                                                href={getWhatsappLink(item.title)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 bg-[#25D366] text-white hover:bg-[#1EBE57] px-4 py-2 rounded-full text-[8px] font-bold uppercase tracking-widest transition-all duration-300 shadow-md"
                                            >
                                                Saber mais <WhatsappLogo size={10} weight="fill" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Controles de Navegação do Carrossel Mobile */}
                        <div className="flex justify-center items-center gap-6 mt-2 mb-8">
                            <button
                                onClick={() => scrollCarousel('left')}
                                className="w-10 h-10 rounded-full border border-[#e6e2da] bg-white/70 backdrop-blur-md text-[#111111] flex items-center justify-center active:bg-[#1d7682] active:text-white transition-all duration-300 shadow-sm"
                                aria-label="Card anterior"
                            >
                                <CaretLeft size={18} weight="bold" />
                            </button>
                            <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-zinc-400 select-none">
                                Deslize para ver mais
                            </span>
                            <button
                                onClick={() => scrollCarousel('right')}
                                className="w-10 h-10 rounded-full border border-[#e6e2da] bg-white/70 backdrop-blur-md text-[#111111] flex items-center justify-center active:bg-[#1d7682] active:text-white transition-all duration-300 shadow-sm"
                                aria-label="Próximo card"
                            >
                                <CaretRight size={18} weight="bold" />
                            </button>
                        </div>
                    </div>

                    {/* --- LAYOUT DESKTOP: GRID COMPLEMENTAR --- */}
                    <div className="hidden md:grid grid-cols-3 gap-6 auto-rows-[380px] items-stretch">
                        {complementaryPrograms.map((item, idx) => (
                            <div key={`comp-${idx}`} className="bento-card-revelation relative rounded-3xl overflow-hidden border border-[#e6e2da] bg-white group shadow-sm hover:shadow-lg transition-shadow duration-500">
                                {item.src.endsWith('.mp4') ? (
                                    <video
                                        ref={(el) => { if (el) { specVideoRefs.current[idx + 2] = el; setupSafariAutoplay(el); } }}
                                        playsInline
                                        loop
                                        muted
                                        autoPlay
                                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out z-0"
                                        preload="auto"
                                    >
                                        <source src={item.src} type="video/mp4" />
                                    </video>
                                ) : (
                                    <Image
                                        src={item.src}
                                        alt={item.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out z-0"
                                        sizes="33vw"
                                        loading="lazy"
                                    />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#060606]/90 via-[#060606]/40 to-transparent z-10 opacity-80 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none" />
                                <div className="absolute inset-0 p-8 flex flex-col justify-end z-20 text-white pointer-events-none">
                                    <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-md text-[#1d7682] flex items-center justify-center mb-4 border border-white/10 group-hover:bg-[#1d7682] group-hover:text-white transition-all duration-300 shrink-0">
                                        {item.icon}
                                    </div>
                                    <h4 className="text-lg font-black uppercase tracking-wider mb-2" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.4)' }}>
                                        {item.title}
                                    </h4>
                                    <div className="pointer-events-auto self-start max-h-0 group-hover:max-h-[160px] opacity-0 group-hover:opacity-100 overflow-hidden transition-all duration-500 ease-out">
                                        <p className="text-xs text-zinc-300 font-light leading-relaxed mb-4">
                                            {item.desc}
                                        </p>
                                        <a 
                                            href={getWhatsappLink(item.title)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 bg-[#25D366] text-white hover:bg-[#1EBE57] px-5 py-2.5 rounded-full text-[9px] font-bold uppercase tracking-widest transition-all duration-300 shadow-md"
                                        >
                                            Falar com a Jéssica <WhatsappLogo size={12} weight="fill" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- SEÇÃO PRINCIPAL: FOTO + BIO --- */}
                <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start mb-24 md:mb-32">
                    
                    {/* Lado Esquerdo: Imagem Profissional */}
                    <div ref={imageRef} className="lg:col-span-5 w-full sticky lg:top-32">
                        <div className="aspect-[3/4] relative rounded-[2.5rem] overflow-hidden border border-[#e6e2da] bg-[#F5F2EB] shadow-2xl">
                            <video
                                ref={(el) => { videoRef.current = el; setupSafariAutoplay(el); }}
                                playsInline
                                loop
                                muted
                                autoPlay
                                className="about-photo w-full h-full object-cover transition-transform duration-700"
                                preload="auto"
                            >
                                <source src="/about-video.mp4" type="video/mp4" />
                            </video>
                            
                            {/* Card de autoridade sobreposto */}
                            <div className="absolute bottom-6 left-6 z-20 bg-white/95 backdrop-blur-md px-6 py-4 rounded-2xl border border-[#e6e2da]/60 shadow-lg flex items-center gap-3">
                                <div className="w-2.5 h-2.5 rounded-full bg-[#1d7682] animate-ping" />
                                <span className="text-[9px] font-black tracking-widest text-[#111111] uppercase">CREF 0314135-G/DF</span>
                            </div>
                        </div>
                    </div>

                    {/* Lado Direito: Conteúdo Editorial */}
                    <div ref={textRef} className="lg:col-span-7 w-full flex flex-col justify-center">
                        
                        {/* Pequeno Título com sugestão de impacto */}
                        <div className="reveal-item mb-4">
                            <span className="text-[10px] font-black tracking-[0.35em] text-[#1d7682] uppercase block mb-2">
                                CONHEÇA JÉSSICA NATÁLIA
                            </span>
                            <span className="text-xs font-serif italic text-[#66635f] block">
                                Força • Movimento • Qualidade de Vida
                            </span>
                        </div>

                        {/* Título Principal */}
                        <h2 className="reveal-item text-xl md:text-3xl font-black uppercase tracking-tight leading-tight text-[#111111] mb-8 max-w-2xl">
                            Especialista em musculação e Pilates para mulheres.
                        </h2>

                        {/* Parágrafos de Texto */}
                        <div className="reveal-item text-[#66635f] font-light leading-relaxed text-sm md:text-base space-y-6 mb-12">
                            <p>
                                Pós-graduada em Treinamento para Grupos Especiais, acredito que o movimento transforma muito mais do que o corpo. Ele devolve força, autonomia, confiança e qualidade de vida.
                            </p>
                            <p>
                                Ao longo da minha trajetória, encontrei um propósito que vai além do treino: ajudar mulheres a compreenderem as mudanças do próprio corpo e redescobrirem sua força em cada fase da vida, especialmente durante a perimenopausa e a menopausa.
                            </p>
                            <p>
                                Minha metodologia une ciência, experiência e acolhimento para desenvolver programas de treinamento seguros, eficientes e adaptáveis à rotina de cada mulher, promovendo saúde, independência e bem-estar de forma duradoura.
                            </p>
                        </div>

                        {/* Grid Moderno de Cards / Ícones */}
                        <div className="reveal-item grid grid-cols-1 sm:grid-cols-2 gap-4">
                            
                            <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-[#e6e2da] hover:border-[#1d7682] transition-all">
                                <Barbell size={20} className="text-[#1d7682]" weight="fill" />
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold text-[#111111]">Personal Trainer</span>
                                    <span className="text-[10px] text-zinc-400">Consultoria Online e Presencial</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-[#e6e2da] hover:border-[#1d7682] transition-all">
                                <GraduationCap size={20} className="text-[#1d7682]" weight="fill" />
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold text-[#111111]">Treinamento Funcional</span>
                                    <span className="text-[10px] text-zinc-400">Instrutora Core 360º</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-[#e6e2da] hover:border-[#1d7682] transition-all">
                                <FlowerLotus size={20} className="text-[#1d7682]" weight="fill" />
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold text-[#111111]">Pilates Completo</span>
                                    <span className="text-[10px] text-zinc-400">Mat Pilates & Aparelhos (Clássico/Contemporâneo)</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-[#e6e2da] hover:border-[#1d7682] transition-all">
                                <Compass size={20} className="text-[#1d7682]" weight="fill" />
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold text-[#111111]">Condutora ICMBio</span>
                                    <span className="text-[10px] text-zinc-400">Ecoturismo na Chapada dos Veadeiros</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-[#e6e2da] hover:border-[#1d7682] transition-all">
                                <Users size={20} className="text-[#1d7682]" weight="fill" />
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold text-[#111111]">Grandes Redes</span>
                                    <span className="text-[10px] text-zinc-400">Personal e Professora Bodytech & SmartFit</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-[#e6e2da] hover:border-[#1d7682] transition-all">
                                <Star size={20} className="text-[#1d7682]" weight="fill" />
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold text-[#111111]">+15 Anos de Experiência</span>
                                    <span className="text-[10px] text-zinc-400">Prescrevendo saúde e performance</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-[#e6e2da] hover:border-[#1d7682] transition-all">
                                <Mountains size={20} className="text-[#1d7682]" weight="fill" />
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold text-[#111111]">Esportes Outdoor</span>
                                    <span className="text-[10px] text-zinc-400">Ex-atleta de esportes de aventura</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-[#e6e2da] hover:border-[#1d7682] transition-all">
                                <Sparkle size={20} className="text-[#1d7682]" weight="fill" />
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold text-[#111111]">+1.000 Vidas</span>
                                    <span className="text-[10px] text-zinc-400">Transformadas pelo movimento</span>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>

                {/* --- FAIXA DESTACADA: MISSÃO --- */}
                <div 
                    className="about-mission-container mb-24 md:mb-32 bg-[#F5F2EB] p-8 md:p-12 rounded-[2.5rem] border border-[#e6e2da] flex flex-col md:flex-row gap-8 items-start md:items-center justify-between"
                >
                    <div className="md:w-1/3">
                        <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-[#111111]">Minha missão</h3>
                    </div>
                    <div className="md:w-2/3 border-t md:border-t-0 md:border-l border-[#e6e2da] pt-6 md:pt-0 md:pl-10">
                        <p className="text-sm md:text-base text-[#66635f] leading-relaxed font-light select-none">
                            {"Ajudar mulheres a construírem um corpo forte para viverem com mais liberdade. Porque acredito que força é muito mais do que um atributo físico. Ela representa autonomia, saúde, confiança e qualidade de vida em todas as fases da mulher.".split("").map((char, idx) => (
                                <span key={`mission-char-${idx}`} className="mission-char opacity-15">
                                    {char}
                                </span>
                            ))}
                        </p>
                    </div>
                </div>

                {/* --- CONEXÃO DOS CONTADORES ANIMADOS --- */}
                <div ref={statsRef} className="py-16 px-6 bg-white border border-[#e6e2da] rounded-[2.5rem] grid grid-cols-1 md:grid-cols-3 gap-12 text-center items-center shadow-sm">
                    <div>
                        <span className="about-counter block text-4xl md:text-5xl font-black text-[#111111] mb-2" data-target="10" data-suffix="+">0+</span>
                        <span className="text-[9px] uppercase font-bold tracking-widest text-[#1d7682] block mb-1">Anos de experiência</span>
                        <span className="text-[9px] text-zinc-400 font-light block">Atuação profissional consistente</span>
                    </div>
                    <div>
                        <span className="about-counter block text-4xl md:text-5xl font-black text-[#111111] mb-2" data-target="1000" data-suffix="+">0+</span>
                        <span className="text-[9px] uppercase font-bold tracking-widest text-[#1d7682] block mb-1">Vidas transformadas</span>
                        <span className="text-[9px] text-zinc-400 font-light block">Resultados reais mensuráveis</span>
                    </div>
                    <div>
                        <span className="about-counter block text-4xl md:text-5xl font-black text-[#111111] mb-2" data-target="100" data-suffix="%">0%</span>
                        <span className="text-[9px] uppercase font-bold tracking-widest text-[#1d7682] block mb-1">Atendimento Individualizado</span>
                        <span className="text-[9px] text-zinc-400 font-light block">Online, presencial e para todo o Brasil</span>
                    </div>
                </div>

                {/* --- BOTÃO DE CHAMADA FINAL (CTA) --- */}
                <div className="mt-20 flex justify-center" data-aos="fade-up">
                    <a
                        href="#programs"
                        onClick={scrollToPrograms}
                        className="group inline-flex items-center gap-3 bg-[#111111] text-white px-12 py-6 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#1d7682] transition-all duration-300 shadow-[0_15px_40px_rgba(0,0,0,0.15)] hover:scale-105"
                    >
                        Quero encontrar meu programa
                        <ArrowRight size={16} />
                    </a>
                </div>

            </div>
        </section>
    )
}