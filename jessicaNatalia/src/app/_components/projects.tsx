'use client'

import { useEffect, useRef, useState } from 'react'
import {
    WhatsappLogo,
    MapPin,
    CaretDoubleDown,
    Star,
    ArrowRight,
    InstagramLogo,
    LinkedinLogo,
    FacebookLogo,
    Envelope,
    Phone
} from '@phosphor-icons/react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AOS from 'aos'
import 'aos/dist/aos.css'

gsap.registerPlugin(ScrollTrigger)

export default function Projects() {
    const containerRef = useRef<HTMLElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const imagesRef = useRef<HTMLImageElement[]>([])
    
    const [loadingProgress, setLoadingProgress] = useState(0)
    const [imagesLoaded, setImagesLoaded] = useState(false)

    const numFrames = 119
    const currentFrame = (index: number) => `/sequence/${(index + 1).toString().padStart(4, '0')}.webp`

    // Desenho cover proporcional no desktop e fit-width no mobile para evitar cortes no abdominal
    const drawImageProp = (ctx: CanvasRenderingContext2D, img: HTMLImageElement) => {
        const canvas = ctx.canvas
        const wr = canvas.width / img.width
        const hr = canvas.height / img.height
        
        const isMobile = canvas.width < 768
        // No mobile, ajustamos a largura da foto horizontal à largura do celular (contain)
        // para que a cabeça e as pernas de quem faz o abdominal apareçam inteiras.
        // No desktop, usamos cover (Math.max) para uma experiência imersiva de tela cheia.
        const ratio = isMobile ? (canvas.width / img.width) : Math.max(wr, hr)
        
        const x = (canvas.width - img.width * ratio) / 2
        const y = (canvas.height - img.height * ratio) / 2
        
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, 0, img.width, img.height, x, y, img.width * ratio, img.height * ratio)
    }

    // 1. Preload das imagens
    useEffect(() => {
        let loadedCount = 0
        const tempImages: HTMLImageElement[] = []

        for (let i = 0; i < numFrames; i++) {
            const img = new globalThis.Image()
            img.src = currentFrame(i)
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
    }, [])

    // 2. Setup GSAP ScrollTrigger & Canvas render loop
    useEffect(() => {
        if (!imagesLoaded) return

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

        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        // Primeiro frame imediato
        if (imagesRef.current[0]) {
            drawImageProp(ctx, imagesRef.current[0])
        }

        // Evento de resize responsivo
        const handleResize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
            const index = Math.round(frameObj.frame)
            if (imagesRef.current[index]) {
                drawImageProp(ctx, imagesRef.current[index])
            }
        }
        window.addEventListener('resize', handleResize)

        const frameObj = { frame: 0 }

        // Timeline de animação com base no scroll
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: "top top",
                end: "+=3800",
                scrub: 0.5,
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

        // Animações de texto sincronizadas por frames
        // Grupo 1: Fades out e blurs out (Fim da primeira fase nos frames 1-30)
        tl.to(".hero-group-1", {
            opacity: 0,
            y: -30,
            filter: "blur(10px)",
            pointerEvents: "none",
            duration: 0.12,
            ease: "power1.inOut"
        }, 0.22)

        // Grupo 2: Aparece e desaparece (Frames 40-80)
        tl.fromTo(".hero-group-2",
            { opacity: 0, y: 30, filter: "blur(10px)", pointerEvents: "none" },
            { opacity: 1, y: 0, filter: "blur(0px)", pointerEvents: "auto", duration: 0.12, ease: "power1.inOut" },
            0.34
        )
        tl.to(".hero-group-2", {
            opacity: 0,
            y: -30,
            filter: "blur(10px)",
            pointerEvents: "none",
            duration: 0.12,
            ease: "power1.inOut"
        }, 0.66)

        // Grupo 3: Sobe suavemente (Frames 90-119)
        tl.fromTo(".hero-group-3",
            { opacity: 0, y: 60, pointerEvents: "none" },
            { opacity: 1, y: 0, pointerEvents: "auto", duration: 0.15, ease: "power2.out" },
            0.78
        )

        return () => {
            window.removeEventListener('resize', handleResize)
            ScrollTrigger.getAll().forEach(trigger => trigger.kill())
        }
    }, [imagesLoaded])

    if (!imagesLoaded) {
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
                    <a href="https://wa.me/5527996314135" target="_blank" rel="noopener noreferrer" className="bg-[#111111] text-white p-2 rounded-full hover:bg-[#bda07a] transition-colors" aria-label="WhatsApp">
                        <WhatsappLogo size={14} weight="fill" />
                    </a>
                </div>
            </header>

            {/* --- HERO SECTION (PINNED CANVAS SEQUENCE) --- */}
            <section
                ref={containerRef}
                className="relative h-screen w-full overflow-hidden bg-[#FAF8F5]"
            >
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full object-cover z-10"
                />
                
                {/* Visual luminoso e limpo com gradientes suaves */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5]/50 via-transparent to-[#FAF8F5]/80 z-20 pointer-events-none" />

                <div className="absolute inset-0 z-30 flex flex-col items-center justify-between py-24 px-4 pointer-events-none">
                    
                    {/* Placeholder superior */}
                    <div></div>

                    {/* TEXT OVERLAYS SYNCHRONIZED WITH FRAMES */}
                    <div className="relative w-full max-w-5xl h-96 flex items-center justify-center pointer-events-auto">
                        
                        {/* GRUPO 1: Frames 1-30 */}
                        <div className="hero-group-1 absolute inset-0 flex flex-col items-center justify-center text-center">
                            <span className="text-[10px] md:text-xs font-black tracking-[0.4em] text-[#bda07a] uppercase mb-4">EXCLUSIVIDADE & ESTÉTICA</span>
                            <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tight leading-[0.9] text-[#111111] mb-6 max-w-4xl">
                                Transforme seu corpo. <br />
                                <span className="font-serif italic font-light text-[#bda07a] capitalize tracking-normal">Eleve sua vida.</span>
                            </h1>
                            <p className="text-sm md:text-lg text-[#66635f] font-light max-w-2xl leading-relaxed">
                                Treinamento personalizado de alta performance estruturado para construir força, confiança e resultados estéticos consistentes.
                            </p>
                        </div>

                        {/* GRUPO 2: Frames 40-80 */}
                        <div className="hero-group-2 absolute inset-0 flex flex-col items-center justify-center text-center opacity-0 pointer-events-none">
                            <span className="text-[10px] md:text-xs font-black tracking-[0.4em] text-[#bda07a] uppercase mb-4">BIOMECÂNICA APLICADA</span>
                            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-[0.9] text-[#111111] max-w-3xl">
                                Técnica, Precisão <br />
                                <span className="font-serif italic font-light text-[#bda07a] capitalize tracking-normal">& Alta Performance.</span>
                            </h2>
                            <p className="text-sm md:text-base text-[#66635f] font-light max-w-lg leading-relaxed mt-6">
                                Cada movimento é calculado para máxima ativação e desenvolvimento muscular seguro, livre de dores ou lesões.
                            </p>
                        </div>

                        {/* GRUPO 3: Frames 90-119 */}
                        <div className="hero-group-3 absolute inset-0 flex flex-col items-center justify-center text-center opacity-0 pointer-events-none">
                            <span className="text-[10px] md:text-xs font-black tracking-[0.4em] text-[#bda07a] uppercase mb-4">COMECE A SUA EVOLUÇÃO</span>
                            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-[0.9] text-[#111111] mb-8 max-w-3xl">
                                Pronta para o <br />
                                <span className="font-serif italic font-light text-[#bda07a] capitalize tracking-normal">próximo nível?</span>
                            </h2>
                            
                            <a
                                href="#cta"
                                className="group inline-flex items-center gap-3 bg-[#111111] text-white px-10 py-5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#bda07a] transition-all duration-300 shadow-[0_15px_40px_rgba(0,0,0,0.15)] hover:scale-105"
                            >
                                Agendar Minha Primeira Sessão
                                <ArrowRight size={16} />
                            </a>
                        </div>
                    </div>

                    {/* INDICADOR INICIAL */}
                    <div className="flex flex-col items-center opacity-40">
                        <span className="text-[8px] uppercase tracking-[0.3em] text-[#111111] mb-2 font-bold">Role para iniciar</span>
                        <CaretDoubleDown size={16} className="animate-bounce" />
                    </div>
                </div>
            </section>

            {/* --- ABOUT SECTION (SOBRE) --- */}
            <section id="about" className="py-48 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#e6e2da]">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    
                    {/* Lifestyle Large Photo */}
                    <div className="relative aspect-[3/4] w-full rounded-[2.5rem] overflow-hidden shadow-sm border border-[#e6e2da]" data-aos="fade-right">
                        <Image
                            src="/jessica.jpg"
                            alt="Jéssica Natália Lifestyle Coaching"
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-1000"
                            quality={100}
                        />
                    </div>
                    
                    {/* Editorial Content Column */}
                    <div className="flex flex-col justify-center" data-aos="fade-left">
                        <span className="text-[10px] font-black tracking-[0.3em] text-[#bda07a] uppercase mb-4">A TREINADORA</span>
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-[#111111] mb-8 leading-tight">
                            Ciência, técnica e <br />
                            <span className="font-serif italic font-light text-[#bda07a]">comprometimento</span> absoluto.
                        </h2>
                        
                        {/* Espaço reservado para o texto final do cliente */}
                        <div className="space-y-6 text-[#66635f] font-light leading-relaxed text-sm md:text-base">
                            <p>
                                [Insira aqui sua história profissional: fale sobre a sua paixão pela área da saúde, sua trajetória no fitness e como você desenvolveu o seu método focado em precisão biomecânica.]
                            </p>
                            <p>
                                [Insira aqui sua missão: detalhe como você ajuda homens e mulheres a atingirem metas de definição, ganho de força e recomposição corporal de forma otimizada.]
                            </p>
                        </div>

                        {/* Credenciais e Formações */}
                        <div className="mt-10 border-t border-[#e6e2da] pt-8 grid grid-cols-2 gap-8">
                            <div>
                                <span className="text-[10px] font-bold text-[#111111] uppercase tracking-widest block mb-2">Formação</span>
                                <span className="text-xs text-[#66635f] font-light block">[Educação Física - Bacharelado]</span>
                                <span className="text-xs text-[#66635f] font-light block">[Especialista em Fisiologia & Cinesiologia]</span>
                            </div>
                            <div>
                                <span className="text-[10px] font-bold text-[#111111] uppercase tracking-widest block mb-2">Registro Profissional</span>
                                <span className="text-xs text-[#bda07a] font-mono tracking-widest uppercase">CREF 0314135-G/DF</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- PROGRAMS SECTION (PROGRAMAS - MODERN CARDS) --- */}
            <section id="programs" className="py-48 bg-[#F5F2EB] px-6 md:px-12">
                <div className="max-w-7xl mx-auto">
                    
                    {/* Header */}
                    <div className="text-center mb-24" data-aos="fade-up">
                        <span className="text-[10px] font-black tracking-[0.3em] text-[#bda07a] uppercase mb-4 inline-block">MÉTODOS DE ACOMPANHAMENTO</span>
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-[#111111] leading-none">
                            Programas de <span className="font-serif italic font-light text-[#bda07a]">Evolução</span>
                        </h2>
                    </div>

                    {/* Grid of Modern Cards */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        
                        {/* CARD 1: Emagrecimento */}
                        <div className="bg-white p-8 rounded-[2.2rem] border border-[#e6e2da] shadow-[0_15px_40px_-20px_rgba(0,0,0,0.04)] hover:scale-[1.03] transition-all duration-500 hover:shadow-md flex flex-col justify-between" data-aos="fade-up" data-aos-delay="100">
                            <div>
                                <span className="text-[8px] font-mono text-[#bda07a] uppercase tracking-widest block mb-4">MÓDULO 01</span>
                                <h3 className="text-lg font-bold uppercase text-[#111111] mb-3">Emagrecimento</h3>
                                <p className="text-xs text-[#66635f] font-light leading-relaxed mb-6">
                                    Planejamento voltado para a queima calórica eficiente através de treinos tensionais e metabólicos, acelerando a queima de gordura e mantendo a massa magra.
                                </p>
                            </div>
                            <span className="text-[10px] font-black text-[#111111] flex items-center gap-2 mt-4">Consultar Detalhes <ArrowRight size={12} /></span>
                        </div>

                        {/* CARD 2: Treinamento de Força */}
                        <div className="bg-white p-8 rounded-[2.2rem] border border-[#e6e2da] shadow-[0_15px_40px_-20px_rgba(0,0,0,0.04)] hover:scale-[1.03] transition-all duration-500 hover:shadow-md flex flex-col justify-between" data-aos="fade-up" data-aos-delay="200">
                            <div>
                                <span className="text-[8px] font-mono text-[#bda07a] uppercase tracking-widest block mb-4">MÓDULO 02</span>
                                <h3 className="text-lg font-bold uppercase text-[#111111] mb-3">Treinamento de Força</h3>
                                <p className="text-xs text-[#66635f] font-light leading-relaxed mb-6">
                                    Ênfase na progressão de cargas lógica e ativação muscular profunda (hipertrofia). Ajuste biomecânico dos exercícios básicos e isolados.
                                </p>
                            </div>
                            <span className="text-[10px] font-black text-[#111111] flex items-center gap-2 mt-4">Consultar Detalhes <ArrowRight size={12} /></span>
                        </div>

                        {/* CARD 3: Fitness Feminino */}
                        <div className="bg-white p-8 rounded-[2.2rem] border border-[#e6e2da] shadow-[0_15px_40px_-20px_rgba(0,0,0,0.04)] hover:scale-[1.03] transition-all duration-500 hover:shadow-md flex flex-col justify-between" data-aos="fade-up" data-aos-delay="300">
                            <div>
                                <span className="text-[8px] font-mono text-[#bda07a] uppercase tracking-widest block mb-4">MÓDULO 03</span>
                                <h3 className="text-lg font-bold uppercase text-[#111111] mb-3">Fitness Feminino</h3>
                                <p className="text-xs text-[#66635f] font-light leading-relaxed mb-6">
                                    Acompanhamento especializado na anatomia e fisiologia hormonal feminina. Foco em membros inferiores (glúteos e pernas) e fortalecimento global.
                                </p>
                            </div>
                            <span className="text-[10px] font-black text-[#111111] flex items-center gap-2 mt-4">Consultar Detalhes <ArrowRight size={12} /></span>
                        </div>

                        {/* CARD 4: Consultoria Online */}
                        <div className="bg-white p-8 rounded-[2.2rem] border border-[#e6e2da] shadow-[0_15px_40px_-20px_rgba(0,0,0,0.04)] hover:scale-[1.03] transition-all duration-500 hover:shadow-md flex flex-col justify-between" data-aos="fade-up" data-aos-delay="400">
                            <div>
                                <span className="text-[8px] font-mono text-[#bda07a] uppercase tracking-widest block mb-4">MÓDULO 04</span>
                                <h3 className="text-lg font-bold uppercase text-[#111111] mb-3">Consultoria Online</h3>
                                <p className="text-xs text-[#66635f] font-light leading-relaxed mb-6">
                                    Planejamento totalmente digital via aplicativo. Análise semanal de execuções em vídeo, planilha de treinos dinâmicos e suporte direto com a Jéssica.
                                </p>
                            </div>
                            <span className="text-[10px] font-black text-[#111111] flex items-center gap-2 mt-4">Consultar Detalhes <ArrowRight size={12} /></span>
                        </div>

                    </div>
                </div>
            </section>

            {/* --- RESULTS SECTION (GALERIA ANTES/DEPOIS E DEPOIMENTOS) --- */}
            <section id="results" className="py-48 px-6 md:px-12 max-w-7xl mx-auto">
                
                {/* Header */}
                <div className="text-center mb-24" data-aos="fade-up">
                    <span className="text-[10px] font-black tracking-[0.3em] text-[#bda07a] uppercase mb-4 inline-block">TRANSFORMAÇÕES REAIS</span>
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-[#111111] leading-none">
                        Resultados & <span className="font-serif italic font-light text-[#bda07a]">Evolução</span>
                    </h2>
                </div>

                {/* Transformations and reviews grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    
                    {/* CARD RESULTADO 1 */}
                    <div className="bg-[#F5F2EB] p-8 rounded-[2.2rem] flex flex-col justify-between" data-aos="fade-up" data-aos-delay="100">
                        <div>
                            <div className="flex gap-1 text-[#bda07a] mb-6">
                                {[...Array(5)].map((_, i) => <Star key={i} size={14} weight="fill" />)}
                            </div>
                            <p className="text-xs md:text-sm text-[#66635f] font-light leading-relaxed mb-6 italic">
                                "Mudou completamente a minha consciência corporal. O foco na biomecânica me salvou das dores lombares!"
                            </p>
                            
                            {/* Estatística de Transformação */}
                            <div className="bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-[#e6e2da] mb-6 text-center">
                                <span className="block text-xl font-black text-[#111111]">-12kg</span>
                                <span className="text-[8px] uppercase tracking-wider text-[#bda07a] font-bold">Emagrecimento em 6 Meses</span>
                            </div>
                        </div>
                        <div>
                            <span className="font-bold text-[#111111] block text-xs">Mariana G.</span>
                            <span className="text-[10px] text-zinc-400">Consultoria Online</span>
                        </div>
                    </div>

                    {/* CARD RESULTADO 2 */}
                    <div className="bg-[#F5F2EB] p-8 rounded-[2.2rem] flex flex-col justify-between" data-aos="fade-up" data-aos-delay="200">
                        <div>
                            <div className="flex gap-1 text-[#bda07a] mb-6">
                                {[...Array(5)].map((_, i) => <Star key={i} size={14} weight="fill" />)}
                            </div>
                            <p className="text-xs md:text-sm text-[#66635f] font-light leading-relaxed mb-6 italic">
                                "Ganhei força e massa magra de forma consistente. O suporte diário faz toda a diferença para manter a consistência."
                            </p>
                            
                            {/* Estatística de Transformação */}
                            <div className="bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-[#e6e2da] mb-6 text-center">
                                <span className="block text-xl font-black text-[#111111]">+6kg</span>
                                <span className="text-[8px] uppercase tracking-wider text-[#bda07a] font-bold">Massa Magra & Hipertrofia</span>
                            </div>
                        </div>
                        <div>
                            <span className="font-bold text-[#111111] block text-xs">Rodrigo A.</span>
                            <span className="text-[10px] text-zinc-400">Personal Presencial (DF)</span>
                        </div>
                    </div>

                    {/* CARD RESULTADO 3 */}
                    <div className="bg-[#F5F2EB] p-8 rounded-[2.2rem] flex flex-col justify-between" data-aos="fade-up" data-aos-delay="300">
                        <div>
                            <div className="flex gap-1 text-[#bda07a] mb-6">
                                {[...Array(5)].map((_, i) => <Star key={i} size={14} weight="fill" />)}
                            </div>
                            <p className="text-xs md:text-sm text-[#66635f] font-light leading-relaxed mb-6 italic">
                                "Sempre tive dificuldades com postura na musculação. A atenção aos detalhes nas aulas mudou tudo."
                            </p>
                            
                            {/* Estatística de Transformação */}
                            <div className="bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-[#e6e2da] mb-6 text-center">
                                <span className="block text-xl font-black text-[#111111]">100%</span>
                                <span className="text-[8px] uppercase tracking-wider text-[#bda07a] font-bold">Livre de dores articulares</span>
                            </div>
                        </div>
                        <div>
                            <span className="font-bold text-[#111111] block text-xs">Beatriz L.</span>
                            <span className="text-[10px] text-zinc-400">Personal Presencial (DF)</span>
                        </div>
                    </div>

                </div>
            </section>

            {/* --- METRICS / STATS --- */}
            <section className="py-24 max-w-7xl mx-auto px-6 border-b border-[#e6e2da]">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                    <div data-aos="zoom-in" data-aos-delay="100">
                        <span className="block text-4xl md:text-5xl font-black text-[#111111] mb-2">5+</span>
                        <span className="text-[9px] uppercase font-bold tracking-widest text-[#bda07a]">Anos de Experiência</span>
                    </div>
                    <div data-aos="zoom-in" data-aos-delay="200">
                        <span className="block text-4xl md:text-5xl font-black text-[#111111] mb-2">150+</span>
                        <span className="text-[9px] uppercase font-bold tracking-widest text-[#bda07a]">Alunos Atendidos</span>
                    </div>
                    <div data-aos="zoom-in" data-aos-delay="300">
                        <span className="block text-4xl md:text-5xl font-black text-[#111111] mb-2">98%</span>
                        <span className="text-[9px] uppercase font-bold tracking-widest text-[#bda07a]">Taxa de Fidelidade</span>
                    </div>
                    <div data-aos="zoom-in" data-aos-delay="400">
                        <span className="block text-4xl md:text-5xl font-black text-[#111111] mb-2">100%</span>
                        <span className="text-[9px] uppercase font-bold tracking-widest text-[#bda07a]">Foco Científico</span>
                    </div>
                </div>
            </section>

            {/* --- FINAL CTA BANNER (READY TO START) --- */}
            <section id="cta" className="py-36 bg-[#111111] text-white text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/20 via-zinc-950 to-[#111111] pointer-events-none" />
                
                <div className="relative z-10 container mx-auto px-6 max-w-4xl" data-aos="fade-up">
                    <span className="text-[10px] font-black tracking-[0.4em] text-[#bda07a] uppercase mb-6 inline-block">FAÇA PARTE DO TIME</span>
                    <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tight leading-none mb-8">
                        Pronto para <br />
                        <span className="font-serif italic font-light text-[#bda07a] capitalize tracking-normal">começar?</span>
                    </h2>
                    <p className="text-[#a1a1a6] font-light text-sm md:text-base leading-relaxed max-w-md mx-auto mb-12">
                        Dê o primeiro passo para a sua transformação física. Clique no botão abaixo para conversar via WhatsApp e estruturar seu planejamento.
                    </p>
                    
                    <a
                        href="https://wa.me/5527996314135?text=Olá%20Jéssica!%20Acessei%20seu%20site%20e%20gostaria%20de%20agendar%20uma%20avaliação%20para%20começar%20os%20treinos."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-3 bg-[#bda07a] text-black px-12 py-6 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:scale-105 transition-all duration-300 shadow-xl"
                    >
                        <WhatsappLogo size={20} weight="fill" />
                        Agendar Minha Sessão
                    </a>
                </div>
            </section>

            {/* --- FOOTER --- */}
            <footer className="py-20 bg-[#FAF8F5] border-t border-[#e6e2da] text-[#66635f]">
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-16 md:gap-8 items-start">
                    
                    {/* Brand */}
                    <div className="flex flex-col space-y-4">
                        <h3 className="text-lg font-black text-[#111111] tracking-[0.25em] uppercase">Jéssica Natália</h3>
                        <p className="text-xs font-light leading-relaxed max-w-xs">
                            Treinamento personalizado baseado em evidência científica, anatomia e biomecânica aplicada.
                        </p>
                    </div>

                    {/* Contatos */}
                    <div className="flex flex-col space-y-4 text-xs font-light">
                        <span className="font-bold text-[#111111] tracking-widest uppercase">Contatos & Locais</span>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-2">
                                <Phone size={14} />
                                <span>(27) 99631-4135</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Envelope size={14} />
                                <span>contato@jessicanatalia.com.br</span>
                            </li>
                            <li className="flex items-start gap-2 max-w-xs">
                                <MapPin size={14} className="mt-0.5" />
                                <span>Ascade – Associação dos Servidores da Câmara dos Deputados, Brasília - DF</span>
                            </li>
                        </ul>
                    </div>

                    {/* Redes */}
                    <div className="flex flex-col space-y-4 text-xs font-light items-start md:items-end">
                        <span className="font-bold text-[#111111] tracking-widest uppercase">Redes Sociais</span>
                        <div className="flex gap-4">
                            <a href="https://www.instagram.com/jessicanataliiapersonal/" target="_blank" rel="noopener noreferrer" className="bg-[#F5F2EB] p-3 rounded-full border border-[#e6e2da] hover:bg-[#111111] hover:text-white transition-colors duration-300" aria-label="Instagram">
                                <InstagramLogo size={18} />
                            </a>
                            <a href="https://www.linkedin.com/in/jéssica-natália-749423235/" target="_blank" rel="noopener noreferrer" className="bg-[#F5F2EB] p-3 rounded-full border border-[#e6e2da] hover:bg-[#111111] hover:text-white transition-colors duration-300" aria-label="LinkedIn">
                                <LinkedinLogo size={18} />
                            </a>
                            <a href="https://www.facebook.com/jessnatrs/" target="_blank" rel="noopener noreferrer" className="bg-[#F5F2EB] p-3 rounded-full border border-[#e6e2da] hover:bg-[#111111] hover:text-white transition-colors duration-300" aria-label="Facebook">
                                <FacebookLogo size={18} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-[#e6e2da] flex flex-col md:flex-row justify-between items-center text-[10px] tracking-wider text-zinc-400">
                    <p>© {new Date().getFullYear()} JÉSSICA NATÁLIA. TODOS OS DIREITOS RESERVADOS.</p>
                    <p className="mt-2 md:mt-0">DESENVOLVIDO POR <a href="https://instagram.com/v1ccken" target="_blank" rel="noopener noreferrer" className="hover:text-[#bda07a] font-bold">@V1CCKEN</a></p>
                </div>
            </footer>
        </div>
    )
}