'use client'

import { useEffect, useRef, useState } from 'react'
import {
    WhatsappLogo,
    InstagramLogo,
    LinkedinLogo,
    FacebookLogo,
    ArrowRight,
    CaretDoubleDown
} from '@phosphor-icons/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AOS from 'aos'
import 'aos/dist/aos.css'

gsap.registerPlugin(ScrollTrigger)

export default function Projects() {
    const containerRef = useRef<HTMLElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const imagesRef = useRef<HTMLImageElement[]>([])
    
    const [device, setDevice] = useState<'mobile' | 'desktop' | null>(null)
    const [loadingProgress, setLoadingProgress] = useState(0)
    const [imagesLoaded, setImagesLoaded] = useState(false)

    // Desenho cover proporcional em qualquer tela para manter o preenchimento full-bleed
    const drawImageProp = (ctx: CanvasRenderingContext2D, img: HTMLImageElement) => {
        const canvas = ctx.canvas
        const wr = canvas.width / img.width
        const hr = canvas.height / img.height
        
        // Desenho dinâmico para cobrir toda a área do canvas de forma responsiva
        const ratio = Math.max(wr, hr)
        
        const x = (canvas.width - img.width * ratio) / 2
        const y = (canvas.height - img.height * ratio) / 2
        
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, 0, img.width, img.height, x, y, img.width * ratio, img.height * ratio)
    }

    // 1. Identificar o tipo de dispositivo (mobile vs desktop/tablet)
    useEffect(() => {
        const checkDevice = () => {
            const isMobileWidth = window.innerWidth < 768
            setDevice(isMobileWidth ? 'mobile' : 'desktop')
        }
        
        checkDevice()
        // Opcional: ouvir resize para mudar de modo se redimensionado no browser
        const handleResize = () => {
            const isMobileWidth = window.innerWidth < 768
            const currentMode = isMobileWidth ? 'mobile' : 'desktop'
            setDevice(prev => {
                if (prev !== null && prev !== currentMode) {
                    // Forçar recarga se houver transição de breakpoint
                    window.location.reload()
                }
                return currentMode
            })
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    // 2. Preload das imagens da sequência correspondente
    useEffect(() => {
        if (!device) return

        let loadedCount = 0
        const numFrames = device === 'mobile' ? 40 : 119
        const folder = device === 'mobile' ? 'sequence_mobile' : 'sequence_desktop'
        const tempImages: HTMLImageElement[] = []

        setImagesLoaded(false)
        setLoadingProgress(0)

        for (let i = 0; i < numFrames; i++) {
            const img = new globalThis.Image()
            img.src = `/${folder}/${(i + 1).toString().padStart(4, '0')}.webp`
            img.onload = () => {
                loadedCount++
                setLoadingProgress(Math.round((loadedCount / numFrames) * 100))
                if (loadedCount === numFrames) {
                    imagesRef.current = tempImages
                    setImagesLoaded(true)
                }
            }
            tempImages.push(img)
        }
    }, [device])

    // 3. Setup GSAP ScrollTrigger & Canvas render loop
    useEffect(() => {
        if (!imagesLoaded || !device) return

        AOS.init({
            duration: 1200,
            once: true,
            mirror: false
        })

        const canvas = canvasRef.current
        const container = containerRef.current
        if (!canvas || !container) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        canvas.width = canvas.clientWidth
        canvas.height = canvas.clientHeight

        const numFrames = device === 'mobile' ? 40 : 119

        // Primeiro frame imediato
        if (imagesRef.current[0]) {
            drawImageProp(ctx, imagesRef.current[0])
        }

        // Evento de resize responsivo
        const handleResize = () => {
            canvas.width = canvas.clientWidth
            canvas.height = canvas.clientHeight
            const index = Math.round(frameObj.frame)
            if (imagesRef.current[index]) {
                drawImageProp(ctx, imagesRef.current[index])
            }
        }
        window.addEventListener('resize', handleResize)

        const frameObj = { frame: 0 }

        const scrollDistance = device === 'mobile' ? 1200 : 2000
        const isMob = device === 'mobile'

        // Cria o GSAP Context para agrupar todas as animações e limpar corretamente no unmount
        const gsapCtx = gsap.context(() => {
            // Timeline de animação com base no scroll
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    start: "top top",
                    end: `+=${scrollDistance}`,
                    scrub: 1, // Rolagem fluida com inércia no mobile e desktop
                    pin: true,
                    anticipatePin: 1,
                }
            })

            // Animar sequência de frames
            tl.to(frameObj, {
                frame: numFrames - 1,
                snap: "frame",
                ease: "none",
                duration: 1,
                onUpdate: () => {
                    const index = Math.round(frameObj.frame)
                    if (imagesRef.current[index]) {
                        drawImageProp(ctx, imagesRef.current[index])
                    }
                }
            }, 0)

            // Grupo 1: Fades out (Fim da primeira fase)
            tl.to(".hero-group-1", {
                opacity: 0,
                y: -30,
                filter: "blur(10px)",
                pointerEvents: "none",
                duration: isMob ? 0.20 : 0.12,
                ease: "power1.inOut"
            }, isMob ? 0.15 : 0.22)

            // Grupo 2: Aparece e desaparece (Metodologia)
            tl.fromTo(".hero-group-2",
                { opacity: 0, y: 30, filter: "blur(10px)", pointerEvents: "none" },
                { opacity: 1, y: 0, filter: "blur(0px)", pointerEvents: "auto", duration: isMob ? 0.20 : 0.12, ease: "power1.inOut" },
                isMob ? 0.35 : 0.34
            )
            tl.to(".hero-group-2", {
                opacity: 0,
                y: -30,
                filter: "blur(10px)",
                pointerEvents: "none",
                duration: isMob ? 0.20 : 0.12,
                ease: "power1.inOut"
            }, isMob ? 0.65 : 0.66)

            // Grupo 3: Sobe e fixa no final
            tl.fromTo(".hero-group-3",
                { opacity: 0, y: 60, pointerEvents: "none" },
                { opacity: 1, y: 0, pointerEvents: "auto", duration: isMob ? 0.25 : 0.15, ease: "power2.out" },
                isMob ? 0.80 : 0.78
            )
        }, container)

        return () => {
            window.removeEventListener('resize', handleResize)
            gsapCtx.revert() // Reverte o DOM limpo e remove todos os pin-spacers e timelines
        }
    }, [imagesLoaded, device])

    // Exibir Loader enquanto detecta dispositivo ou carrega as imagens
    if (!device || !imagesLoaded) {
        return (
            <div className="fixed inset-0 z-50 bg-[#FAF8F5] flex flex-col items-center justify-center text-[#111111]">
                <div className="flex flex-col items-center gap-6">
                    <span className="text-xl md:text-2xl font-black tracking-[0.3em] text-[#111111]">JÉSSICA NATÁLIA</span>
                    <span className="text-[10px] tracking-[0.4em] text-zinc-400 uppercase font-semibold">PERSONAL TRAINER</span>
                    <div className="w-48 h-[2px] bg-zinc-200 rounded-full overflow-hidden relative">
                        <div 
                            className="absolute top-0 left-0 h-full bg-[#bda07a] transition-all duration-300"
                            style={{ width: `${loadingProgress}%` }}
                        ></div>
                    </div>
                    <span className="text-xs tracking-widest text-[#bda07a] font-mono">{loadingProgress}%</span>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-[#FAF8F5] text-[#111111] font-sans antialiased min-h-screen selection:bg-[#bda07a] selection:text-white">
            
            {/* --- FIXED HEADER (MINIMALIST & LUXURY) --- */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-[#FAF8F5]/80 backdrop-blur-md border-b border-[#e6e2da] py-4 px-6 md:px-12 flex justify-between items-center">
                <div className="flex flex-col">
                    <span className="text-sm font-black tracking-[0.25em] text-[#111111] uppercase">Jéssica Natália</span>
                    <span className="text-[7px] tracking-[0.3em] text-[#bda07a] uppercase font-bold">Personal Trainer</span>
                </div>
                
                {/* Navigation links */}
                <nav className="hidden md:flex gap-8 text-[10px] font-bold uppercase tracking-widest text-[#66635f]">
                    <a href="#about" className="hover:text-[#111111] transition-colors">Sobre</a>
                    <a href="#programs" className="hover:text-[#111111] transition-colors">Programas</a>
                    <a href="#results" className="hover:text-[#111111] transition-colors">Resultados</a>
                    <a href="#cta" className="hover:text-[#111111] transition-colors">Contato</a>
                </nav>

                {/* Social media quick links */}
                <div className="flex items-center gap-4 text-[#66635f]">
                    <a href="https://www.instagram.com/jessicanataliiapersonal/" target="_blank" rel="noopener noreferrer" className="hover:text-[#bda07a] transition-colors" aria-label="Instagram">
                        <InstagramLogo size={18} />
                    </a>
                    <a href="https://www.linkedin.com/in/jéssica-natália-749423235/" target="_blank" rel="noopener noreferrer" className="hover:text-[#bda07a] transition-colors" aria-label="LinkedIn">
                        <LinkedinLogo size={18} />
                    </a>
                    <a href="https://www.facebook.com/jessnatrs/" target="_blank" rel="noopener noreferrer" className="hover:text-[#bda07a] transition-colors" aria-label="Facebook">
                        <FacebookLogo size={18} />
                    </a>
                    <a href="https://wa.me/5561996844400?text=Olá%20Jéssica!%20Acessei%20seu%20site%20e%20gostaria%20de%20saber%20mais%20sobre%20seu%20acompanhamento%20personalizado." target="_blank" rel="noopener noreferrer" className="bg-[#111111] text-white p-2 rounded-full hover:bg-[#bda07a] transition-colors" aria-label="WhatsApp">
                        <WhatsappLogo size={14} weight="fill" />
                    </a>
                </div>
            </header>

            {/* --- HERO SECTION (PINNED CANVAS SEQUENCE) --- */}
            <section
                ref={containerRef}
                className="relative h-[100dvh] w-full overflow-hidden bg-[#0A0A0A]"
            >
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full object-cover z-10"
                />
                
                {/* Visual escurecido cinemático para dar alto contraste para o texto branco */}
                <div className="absolute inset-0 bg-black/35 z-20 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-black/70 z-20 pointer-events-none" />

                <div className="absolute inset-0 z-30 flex flex-col items-center justify-between py-20 px-6 pointer-events-none">
                    
                    {/* Placeholder superior */}
                    <div></div>

                    {/* TEXT OVERLAYS SYNCHRONIZED WITH FRAMES */}
                    <div className="relative w-full max-w-5xl flex-1 flex items-center justify-center pointer-events-auto">
                        
                        {/* GRUPO 1: Frames iniciais */}
                        <div className="hero-group-1 absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6">
                            <span className="text-[10px] md:text-xs font-black tracking-[0.4em] text-[#bda07a] uppercase mb-4">EXCLUSIVIDADE & ESTÉTICA</span>
                            <h1 
                                className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[0.95] text-white mb-4 max-w-4xl"
                                style={{ textShadow: '0 2px 15px rgba(0, 0, 0, 0.4)' }}
                            >
                                Transforme seu corpo. <br />
                                <span className="font-serif italic font-light text-[#bda07a] capitalize tracking-normal">Eleve sua vida.</span>
                            </h1>
                            <p 
                                className="text-xs sm:text-sm md:text-base lg:text-lg text-zinc-300 font-light max-w-2xl leading-relaxed"
                                style={{ textShadow: '0 1px 8px rgba(0, 0, 0, 0.3)' }}
                            >
                                Treinamento personalizado de alta performance estruturado para construir força, confiança e resultados estéticos consistentes.
                            </p>
                        </div>

                        {/* GRUPO 2: Frames intermediários */}
                        <div className="hero-group-2 absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 opacity-0 pointer-events-none">
                            <span className="text-[10px] md:text-xs font-black tracking-[0.4em] text-[#bda07a] uppercase mb-4">BIOMECÂNICA APLICADA</span>
                            <h2 
                                className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[0.95] text-white max-w-3xl"
                                style={{ textShadow: '0 2px 15px rgba(0, 0, 0, 0.4)' }}
                            >
                                Técnica, Precisão <br />
                                <span className="font-serif italic font-light text-[#bda07a] capitalize tracking-normal">& Alta Performance.</span>
                            </h2>
                            <p 
                                className="text-xs sm:text-sm md:text-base text-zinc-300 font-light max-w-lg leading-relaxed mt-4"
                                style={{ textShadow: '0 1px 8px rgba(0, 0, 0, 0.3)' }}
                            >
                                Cada movimento é calculado para máxima ativação e desenvolvimento muscular seguro, livre de dores ou lesões.
                            </p>
                        </div>

                        {/* GRUPO 3: Frames finais */}
                        <div className="hero-group-3 absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 opacity-0 pointer-events-none">
                            <span className="text-[10px] md:text-xs font-black tracking-[0.4em] text-[#bda07a] uppercase mb-4">COMECE A SUA EVOLUÇÃO</span>
                            <h2 
                                className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[0.95] text-white mb-6 max-w-3xl"
                                style={{ textShadow: '0 2px 15px rgba(0, 0, 0, 0.4)' }}
                            >
                                Pronta para o <br />
                                <span className="font-serif italic font-light text-[#bda07a] capitalize tracking-normal">próximo nível?</span>
                            </h2>
                            
                            <a
                                href="#cta"
                                className="group inline-flex items-center gap-2.5 bg-white text-[#111111] px-8 py-4 sm:px-10 sm:py-5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest hover:bg-[#bda07a] hover:text-white transition-all duration-300 shadow-[0_15px_40px_rgba(0,0,0,0.25)] hover:scale-105"
                            >
                                Agendar Minha Primeira Sessão
                                <ArrowRight size={16} />
                            </a>
                        </div>
                    </div>

                    {/* INDICADOR INICIAL */}
                    <div className="flex flex-col items-center text-white/60">
                        <span className="text-[8px] uppercase tracking-[0.3em] text-white mb-2 font-bold">Role para iniciar</span>
                        <CaretDoubleDown size={16} className="animate-bounce" />
                    </div>
                </div>
            </section>
        </div>
    )
}