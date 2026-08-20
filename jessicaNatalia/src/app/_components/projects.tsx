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
    const [displayProgress, setDisplayProgress] = useState(0)
    const [imagesLoaded, setImagesLoaded] = useState(false)
    const [showLoader, setShowLoader] = useState(true)
    const [isExiting, setIsExiting] = useState(false)

    // Smooth visual progress interpolation guaranteeing minimum ~3.5s display time
    useEffect(() => {
        if (!showLoader) return

        const interval = setInterval(() => {
            setDisplayProgress(prev => {
                if (imagesLoaded) {
                    if (prev >= 100) {
                        clearInterval(interval)
                        return 100
                    }
                    return Math.min(100, prev + 2.5)
                }

                // If images are still downloading, advance smoothly up to 92%
                const target = Math.min(92, Math.max(loadingProgress, prev))
                if (prev < target) {
                    return Math.min(target, prev + 1.1)
                }
                return prev
            })
        }, 40)

        return () => clearInterval(interval)
    }, [imagesLoaded, loadingProgress, showLoader])

    // Trigger smooth exit transition when display progress reaches 100%
    useEffect(() => {
        if (displayProgress >= 100 && imagesLoaded && device && !isExiting) {
            setIsExiting(true)
            const timer = setTimeout(() => {
                setShowLoader(false)
            }, 800)
            return () => clearTimeout(timer)
        }
    }, [displayProgress, imagesLoaded, device, isExiting])

    const getStatusText = (progress: number) => {
        if (progress < 25) return "Iniciando experiência..."
        if (progress < 55) return "Carregando biomecânica & movimento..."
        if (progress < 85) return "Preparando alta performance..."
        if (progress < 100) return "Finalizando detalhes..."
        return "Pronto!"
    }

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault()
        const target = document.getElementById(id)
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' })
        }
    }

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
        const numFrames = device === 'mobile' ? 120 : 119
        const folder = device === 'mobile' ? 'sequence_mobile2' : 'sequence_desktop'
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

        const numFrames = device === 'mobile' ? 120 : 119

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

        // Restaura a distância e inércia do scroll da versão fluida (450px mobile / 800px desktop)
        const scrollDistance = device === 'mobile' ? 450 : 800
        const isMob = device === 'mobile'

        // Cria o GSAP Context para agrupar todas as animações e limpar corretamente no unmount
        const gsapCtx = gsap.context(() => {
            // Timeline de animação ultra fluida com inércia cinemática com base no scroll
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    start: "top top",
                    end: `+=${scrollDistance}`,
                    scrub: 1, // Rolagem ultra fluida com inércia de 1s (mesma fluidez da versão original)
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

            // Zoom suave cinemático no canvas conforme o scroll
            tl.to(canvas, {
                scale: isMob ? 1.08 : 1.05,
                ease: "none",
                duration: 1
            }, 0)

            // Transição fluida do Texto 1 -> Texto 2
            tl.to('.hero-text-1', {
                opacity: 0,
                y: -30,
                ease: 'power2.inOut',
                duration: 0.35
            }, 0.15)

            tl.fromTo('.hero-text-2', 
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    ease: 'power2.inOut',
                    duration: 0.35
                }, 0.45)
        }, container)

        return () => {
            window.removeEventListener('resize', handleResize)
            gsapCtx.revert() // Reverte o DOM limpo e remove todos os pin-spacers e timelines
        }
    }, [imagesLoaded, device])

    return (
        <div className="bg-[#FAF8F5] text-[#111111] font-sans antialiased min-h-screen selection:bg-[#1d7682] selection:text-white">
            
            {/* --- AWWWARDS ULTRA-CLEAN CINEMATIC VIDEO LOADER OVERLAY --- */}
            {showLoader && (
                <div 
                    className={`fixed inset-0 z-[100] bg-black flex flex-col justify-between p-6 md:p-12 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] select-none overflow-hidden ${
                        isExiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
                    }`}
                >
                    {/* Fullscreen Cinematic Background Video (video2.mp4) */}
                    <video 
                        autoPlay 
                        loop 
                        muted 
                        playsInline 
                        aria-hidden="true"
                        className="absolute inset-0 w-full h-full object-cover filter brightness-[0.75] contrast-[1.05] scale-105"
                    >
                        <source src="/video2.mp4" type="video/mp4" />
                    </video>

                    {/* Minimal Dark Gradient Overlay for text contrast */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/40 to-black/80 backdrop-blur-[2px]"></div>

                    {/* TOP BAR (Awwwards Style Metadata Header) */}
                    <div className="relative z-10 w-full flex justify-between items-start text-white/80 font-mono text-[10px] md:text-xs tracking-[0.25em] uppercase">
                        <div className="flex items-center gap-2.5">
                            <span className="w-2 h-2 rounded-full bg-[#62c370] animate-pulse"></span>
                            <span>Jéssica Natália &copy; 2026</span>
                        </div>
                        <div className="hidden sm:block text-right text-zinc-300">
                            [ PERSONAL TRAINER & CONSULTORIA ]
                        </div>
                    </div>

                    {/* CENTER CONTENT: Pristine Clean Logo & Kinetic Counter */}
                    <div className="relative z-10 flex flex-col items-center justify-center my-auto gap-6 text-center">
                        
                        {/* Clean Borderless Circular Logo with Ambient Aura */}
                        <div className="relative group">
                            <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-[#1d7682]/40 to-[#62c370]/40 blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-700"></div>
                            <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border border-white/30 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
                                <img 
                                    src="/novalogo.jpeg" 
                                    alt="Jéssica Natália Logo" 
                                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                />
                            </div>
                        </div>

                        {/* Brand Title */}
                        <div className="flex flex-col items-center gap-1.5 mt-1">
                            <h1 className="text-xl md:text-3xl font-black tracking-[0.35em] text-white uppercase leading-none drop-shadow-lg">
                                Jéssica Natália
                            </h1>
                            <p className="text-[10px] md:text-xs tracking-[0.4em] text-[#2ba3b4] font-bold uppercase">
                                Personal Trainer & Pilates
                            </p>
                        </div>

                        {/* Kinetic Percentage Counter (Awwwards Style Signature) */}
                        <div className="mt-2 flex items-baseline justify-center font-mono font-extralight text-6xl md:text-8xl text-white tracking-tighter drop-shadow-2xl">
                            <span>{Math.round(displayProgress).toString().padStart(2, '0')}</span>
                            <span className="text-2xl md:text-4xl text-[#2ba3b4] font-normal ml-1">%</span>
                        </div>
                    </div>

                    {/* BOTTOM BAR: Status Text & Full-Width Minimal Progress Track */}
                    <div className="relative z-10 w-full flex flex-col gap-3">
                        <div className="flex justify-between items-end text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] text-zinc-300">
                            <span className="text-zinc-300">
                                {getStatusText(displayProgress)}
                            </span>
                            <span className="text-[#2ba3b4] font-bold">
                                [ {displayProgress >= 100 ? 'READY' : 'LOADING'} ]
                            </span>
                        </div>

                        {/* Ultra-Sleek Minimal Progress Line */}
                        <div className="w-full bg-white/15 h-[2px] rounded-full overflow-hidden relative backdrop-blur-sm">
                            <div 
                                className="h-full bg-gradient-to-r from-[#1d7682] via-[#2ba3b4] to-[#62c370] transition-all duration-300 ease-out shadow-[0_0_12px_#2ba3b4]"
                                style={{ width: `${displayProgress}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            )}
            
            {/* --- FIXED HEADER (MINIMALIST & LUXURY) --- */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-[#FAF8F5]/80 backdrop-blur-md border-b border-[#e6e2da] py-4 px-6 md:px-12 flex justify-between items-center">
                <a 
                    href="#hero" 
                    onClick={(e) => handleNavClick(e, 'hero')}
                    className="flex items-center gap-3 cursor-pointer group"
                >
                    <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#e6e2da] bg-white flex items-center justify-center">
                        <img 
                            src="/novalogo.jpeg" 
                            alt="Jéssica Natália Logo" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-black tracking-[0.25em] text-[#111111] uppercase group-hover:text-[#1d7682] transition-colors">Jéssica Natália</span>
                        <span className="text-[7px] tracking-[0.3em] text-[#1d7682] uppercase font-bold">Personal Trainer</span>
                    </div>
                </a>
                
                {/* Navigation links */}
                <nav className="hidden md:flex gap-8 text-[10px] font-bold uppercase tracking-widest text-[#66635f]">
                    <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="hover:text-[#111111] transition-colors">Sobre</a>
                    <a href="#programs" onClick={(e) => handleNavClick(e, 'programs')} className="hover:text-[#111111] transition-colors">Programas</a>
                    <a href="#results" onClick={(e) => handleNavClick(e, 'results')} className="hover:text-[#111111] transition-colors">Resultados</a>
                    <a href="#cta" onClick={(e) => handleNavClick(e, 'cta')} className="hover:text-[#111111] transition-colors">Contato</a>
                </nav>

                {/* Social media quick links */}
                <div className="flex items-center gap-4 text-[#66635f]">
                    <a href="https://www.instagram.com/jessicanataliapersonal" target="_blank" rel="noopener noreferrer" className="hover:text-[#1d7682] transition-colors" aria-label="Instagram">
                        <InstagramLogo size={18} />
                    </a>
                    <a href="https://www.linkedin.com/in/jéssica-natália-749423235/" target="_blank" rel="noopener noreferrer" className="hover:text-[#1d7682] transition-colors" aria-label="LinkedIn">
                        <LinkedinLogo size={18} />
                    </a>
                    <a href="https://www.facebook.com/jessnatrs/" target="_blank" rel="noopener noreferrer" className="hover:text-[#1d7682] transition-colors" aria-label="Facebook">
                        <FacebookLogo size={18} />
                    </a>
                    <a href="https://wa.me/5561996844400?text=Olá%20Jéssica!%20Acessei%20seu%20site%20e%20gostaria%20de%20saber%20mais%20sobre%20seu%20acompanhamento%20personalizado." target="_blank" rel="noopener noreferrer" className="bg-[#111111] text-white p-2 rounded-full hover:bg-[#1d7682] transition-colors" aria-label="WhatsApp">
                        <WhatsappLogo size={14} weight="fill" />
                    </a>
                </div>
            </header>

            {/* --- HERO SECTION (PINNED CANVAS SEQUENCE) --- */}
            <section
                ref={containerRef}
                id="hero"
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

                    {/* TEXT OVERLAYS */}
                    <div className="relative w-full max-w-5xl flex-1 flex items-center justify-center pointer-events-auto">
                        {/* TEXTO 1 - Visível inicialmente */}
                        <div className="hero-text-1 absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6">
                            <span className="text-[10px] md:text-xs font-black tracking-[0.4em] text-[#1d7682] uppercase mb-4">Treinamento Feminino Baseado em Evidências</span>
                            <h1 
                                className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[0.95] text-white mb-4 max-w-4xl"
                                style={{ textShadow: '0 2px 15px rgba(0, 0, 0, 0.4)' }}
                            >
                                Seu corpo mudou <br />depois dos 35?
                            </h1>
                            <p 
                                className="text-xs sm:text-sm md:text-base lg:text-lg text-zinc-300 font-light max-w-2xl leading-relaxed font-serif italic"
                                style={{ textShadow: '0 1px 8px rgba(0, 0, 0, 0.3)' }}
                            >
                                Seu treino também precisa mudar.
                            </p>
                        </div>

                        {/* TEXTO 2 - Aparece com scroll */}
                        <div className="hero-text-2 absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 opacity-0">
                            <span className="text-[10px] md:text-xs font-black tracking-[0.4em] text-[#1d7682] uppercase mb-4">Treine para sua nova fase</span>
                            <h1 
                                className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[0.95] text-white mb-4 max-w-4xl"
                                style={{ textShadow: '0 2px 15px rgba(0, 0, 0, 0.4)' }}
                            >
                                Preserve e recupere <br />
                                <span className="font-serif italic font-light text-[#1d7682] tracking-normal normal-case">força e massa muscular.</span>
                            </h1>
                            <p 
                                className="text-xs sm:text-sm md:text-base lg:text-lg text-zinc-300 font-light max-w-2xl leading-relaxed mb-6"
                                style={{ textShadow: '0 1px 8px rgba(0, 0, 0, 0.3)' }}
                            >
                                Acelere seu metabolismo, melhore a sua disposição e saúde.
                            </p>
                            <a
                                href="#programs"
                                onClick={(e) => handleNavClick(e, 'programs')}
                                className="inline-flex items-center gap-3 bg-[#1d7682] hover:bg-white hover:text-[#111111] text-white px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-lg pointer-events-auto hover:scale-105"
                            >
                                Quero encontrar meu programa
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