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

        const scrollDistance = device === 'mobile' ? 400 : 800
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

            // Zoom suave cinemático no canvas conforme o scroll (Awwwards motion)
            tl.to(canvas, {
                scale: isMob ? 1.08 : 1.05,
                ease: "none",
                duration: 1
            }, 0)
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
                <div className="flex flex-col items-center gap-4 text-center">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border border-[#e6e2da] bg-white flex items-center justify-center shadow-md mb-2 animate-pulse">
                        <img 
                            src="/logo.jpeg" 
                            alt="Jéssica Natália Logo" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <span className="text-sm md:text-base font-black tracking-[0.3em] text-[#111111] uppercase">JÉSSICA NATÁLIA</span>
                    <span className="text-[9px] tracking-[0.4em] text-zinc-400 uppercase font-bold">PERSONAL TRAINER</span>
                    <div className="w-36 h-[2px] bg-zinc-200 rounded-full overflow-hidden relative mt-2">
                        <div 
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#1d7682] to-[#62c370] transition-all duration-300"
                            style={{ width: `${loadingProgress}%` }}
                        ></div>
                    </div>
                    <span className="text-[10px] tracking-widest text-[#1d7682] font-mono font-bold">{loadingProgress}%</span>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-[#FAF8F5] text-[#111111] font-sans antialiased min-h-screen selection:bg-[#1d7682] selection:text-white">
            
            {/* --- FIXED HEADER (MINIMALIST & LUXURY) --- */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-[#FAF8F5]/80 backdrop-blur-md border-b border-[#e6e2da] py-4 px-6 md:px-12 flex justify-between items-center">
                <a 
                    href="#hero" 
                    onClick={(e) => handleNavClick(e, 'hero')}
                    className="flex items-center gap-3 cursor-pointer group"
                >
                    <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#e6e2da] bg-white flex items-center justify-center">
                        <img 
                            src="/logo.jpeg" 
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
                        
                        {/* TEXTO ÚNICO */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6">
                            <span className="text-[10px] md:text-xs font-black tracking-[0.4em] text-[#1d7682] uppercase mb-4">Movimento e propósito</span>
                            <h1 
                                className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[0.95] text-white mb-4 max-w-4xl"
                                style={{ textShadow: '0 2px 15px rgba(0, 0, 0, 0.4)' }}
                            >
                                Fortaleço seu corpo. <br />
                                <span className="font-serif italic font-light text-[#1d7682] tracking-normal normal-case">Cure suas dores e melhore seu físico.</span>
                            </h1>
                            <p 
                                className="text-xs sm:text-sm md:text-base lg:text-lg text-zinc-300 font-light max-w-2xl leading-relaxed"
                                style={{ textShadow: '0 1px 8px rgba(0, 0, 0, 0.3)' }}
                            >
                                Seu corpo precisa estar preparado para a vida que você escolheu viver.
                            </p>
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