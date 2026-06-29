'use client'

import { useEffect, useRef, useState } from 'react'
import {
    WhatsappLogo,
    MapPin,
    CaretDoubleDown,
    Star,
    ArrowRight,
    InstagramLogo,
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

    const drawImageProp = (ctx: CanvasRenderingContext2D, img: HTMLImageElement) => {
        const canvas = ctx.canvas
        const wr = canvas.width / img.width
        const hr = canvas.height / img.height
        const ratio = Math.max(wr, hr)
        
        const x = (canvas.width - img.width * ratio) / 2
        const y = (canvas.height - img.height * ratio) / 2
        
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, 0, img.width, img.height, x, y, img.width * ratio, img.height * ratio)
    }

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

    useEffect(() => {
        if (!imagesLoaded) return

        AOS.init({
            duration: 1000,
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

        if (imagesRef.current[0]) {
            imagesRef.current[0].onload = () => drawImageProp(ctx, imagesRef.current[0])
            drawImageProp(ctx, imagesRef.current[0])
        }

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

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: "top top",
                end: "+=3500",
                scrub: 0.5,
                pin: true,
                anticipatePin: 1,
            }
        })

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

        tl.to(".hero-title-group", {
            opacity: 0,
            y: -40,
            pointerEvents: "none",
            duration: 0.25,
            ease: "power1.inOut"
        }, 0.15)

        tl.fromTo(".hero-concept-group",
            { opacity: 0, y: 40, pointerEvents: "none" },
            { opacity: 1, y: 0, pointerEvents: "auto", duration: 0.25, ease: "power1.inOut" },
            0.35
        )
        tl.to(".hero-concept-group", {
            opacity: 0,
            y: -40,
            pointerEvents: "none",
            duration: 0.25,
            ease: "power1.inOut"
        }, 0.6)

        tl.fromTo(".hero-cta-group",
            { opacity: 0, y: 40, pointerEvents: "none" },
            { opacity: 1, y: 0, pointerEvents: "auto", duration: 0.25, ease: "power2.out" },
            0.75
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
        <div className="bg-[#FAF8F5] text-[#111111] font-sans antialiased min-h-screen">
            <section
                ref={containerRef}
                className="relative h-screen w-full overflow-hidden bg-[#FAF8F5]"
            >
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full object-cover z-10"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5]/80 via-[#FAF8F5]/30 to-[#FAF8F5]/90 z-20 pointer-events-none" />
                <div className="absolute inset-0 z-30 flex flex-col items-center justify-between py-12 px-4 pointer-events-none">
                    <div className="flex flex-col items-center pointer-events-auto">
                        <div className="mb-2 flex flex-col items-center">
                            <span className="text-lg md:text-xl font-black tracking-[0.3em] text-[#111111]">JÉSSICA NATÁLIA</span>
                            <span className="text-[8px] font-bold tracking-[0.4em] text-[#bda07a] uppercase mt-0.5">Personal Trainer & Coach</span>
                        </div>
                    </div>
                    <div className="relative w-full max-w-5xl h-96 flex items-center justify-center pointer-events-auto">
                        <div className="hero-title-group absolute inset-0 flex flex-col items-center justify-center text-center">
                            <span className="text-[10px] md:text-xs font-black tracking-[0.4em] text-[#bda07a] uppercase mb-4">MÉTODO EXCLUSIVO</span>
                            <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tight leading-[0.9] text-[#111111] mb-6 max-w-4xl">
                                Transforme seu corpo. <br />
                                <span className="font-serif italic font-light text-[#bda07a] capitalize tracking-normal">Eleve sua vida.</span>
                            </h1>
                            <p className="text-sm md:text-lg text-[#66635f] font-light max-w-2xl leading-relaxed mb-8">
                                Treinamento personalizado de alta performance desenhado para construir força, confiança e resultados estéticos duradouros.
                            </p>
                            <div className="flex gap-4">
                                <a href="#cta" className="bg-[#111111] text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#bda07a] transition-all duration-300">Iniciar Jornada</a>
                                <a href="#programs" className="border border-[#111111] text-[#111111] px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#111111] hover:text-white transition-all duration-300">Ver Programas</a>
                            </div>
                        </div>
                        <div className="hero-concept-group absolute inset-0 flex flex-col items-center justify-center text-center opacity-0 pointer-events-none">
                            <span className="text-[10px] md:text-xs font-black tracking-[0.4em] text-[#bda07a] uppercase mb-4">CIÊNCIA DO MOVIMENTO</span>
                            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-[0.9] text-[#111111] mb-6 max-w-3xl">
                                Técnica refinada. <br />
                                <span className="font-serif italic font-light text-[#bda07a] capitalize tracking-normal">Resultados rápidos.</span>
                            </h2>
                            <p className="text-sm md:text-lg text-[#66635f] font-light max-w-xl leading-relaxed">
                                Prescrição baseada em biomecânica aplicada. Analisamos o perfil de resistência de cada exercício para ativação muscular máxima, protegendo suas articulações.
                            </p>
                        </div>
                        <div className="hero-cta-group absolute inset-0 flex flex-col items-center justify-center text-center opacity-0 pointer-events-none">
                            <span className="text-[10px] md:text-xs font-black tracking-[0.4em] text-[#bda07a] uppercase mb-4">VAGAS LIMITADAS</span>
                            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-[0.9] text-[#111111] mb-6 max-w-3xl">
                                Pronto para a sua <br />
                                <span className="font-serif italic font-light text-[#bda07a] capitalize tracking-normal">melhor versão?</span>
                            </h2>
                            <p className="text-sm md:text-lg text-[#66635f] font-light max-w-xl leading-relaxed mb-8">
                                Seja presencial em Brasília (Ascade) ou por meio da nossa consultoria online em qualquer lugar do mundo.
                            </p>
                            <a href="#cta" className="group inline-flex items-center gap-3 bg-[#111111] text-white px-10 py-5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#bda07a] transition-all duration-300">
                                Agendar Sessão Experimental
                                <ArrowRight size={16} />
                            </a>
                        </div>
                    </div>
                    <div className="flex flex-col items-center opacity-40">
                        <span className="text-[8px] uppercase tracking-[0.3em] text-[#111111] mb-2 font-bold">Role para continuar</span>
                        <CaretDoubleDown size={16} className="animate-bounce" />
                    </div>
                </div>
            </section>
            <section id="about" className="py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#e6e2da]">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="relative aspect-[3/4] w-full rounded-3xl overflow-hidden shadow-xl" data-aos="fade-right">
                        <Image src="/jessica.jpg" alt="Jessica Natalia Personal Trainer" fill className="object-cover" quality={100} />
                    </div>
                    <div className="flex flex-col justify-center" data-aos="fade-left">
                        <span className="text-[10px] font-black tracking-[0.3em] text-[#bda07a] uppercase mb-4">A PERSONAL TRAINER</span>
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-[#111111] mb-8 leading-tight">
                            A união entre a <span className="font-serif italic font-light text-[#bda07a]">ciência</span> e a sua melhor versão.
                        </h2>
                        <p className="text-[#66635f] font-light leading-relaxed mb-6 text-sm md:text-base">
                            Como profissional de Educação Física e especialista em periodização de força, acredito que o treinamento personalizado de elite não se trata apenas de suar, mas sim de otimizar a mecânica do movimento.
                        </p>
                        <p className="text-[#66635f] font-light leading-relaxed mb-8 text-sm md:text-base">
                            Desenvolvo treinos focados na sua individualidade biológica, analisando sua mobilidade, anatomia e metas estéticas. Minha missão é guiar você por um caminho de evolução física constante, seguro e livre de lesões, utilizando ciência prática para moldar resultados estéticos consistentes.
                        </p>
                        <div className="border-l-2 border-[#bda07a] pl-6 py-2 italic font-serif text-[#66635f] text-base md:text-lg mb-8">
                            "O corpo ideal é aquele que tem força, energia e mobilidade para viver a vida que você realmente deseja."
                        </div>
                        <div>
                            <span className="font-black text-[#111111] block">Jessica Natalia</span>
                            <span className="text-xs text-[#bda07a] font-mono tracking-widest uppercase">CREF 0314135-G/DF</span>
                        </div>
                    </div>
                </div>
            </section>
            <section id="programs" className="py-32 bg-[#F5F2EB] px-6 md:px-12">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20" data-aos="fade-up">
                        <span className="text-[10px] font-black tracking-[0.3em] text-[#bda07a] uppercase mb-4 inline-block">NOSSOS PROGRAMAS</span>
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-[#111111] leading-none">
                            Programas de <span className="font-serif italic font-light text-[#bda07a]">Treinamento</span>
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white p-10 rounded-[2.5rem] border border-[#e6e2da] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between" data-aos="fade-up" data-aos-delay="100">
                            <div>
                                <span className="text-[9px] font-mono text-[#bda07a] uppercase tracking-widest block mb-4">PROGRAMA 01</span>
                                <h3 className="text-xl font-bold uppercase text-[#111111] mb-4">Emagrecimento & Definição</h3>
                                <p className="text-xs md:text-sm text-[#66635f] font-light leading-relaxed mb-6">Combinação inteligente de treinos de força e estímulos metabólicos de alta intensidade.</p>
                            </div>
                            <span className="text-xs font-black text-[#111111] flex items-center gap-2 mt-4">Saiba Mais <ArrowRight size={14} /></span>
                        </div>
                        <div className="bg-white p-10 rounded-[2.5rem] border border-[#e6e2da] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between" data-aos="fade-up" data-aos-delay="200">
                            <div>
                                <span className="text-[9px] font-mono text-[#bda07a] uppercase tracking-widest block mb-4">PROGRAMA 02</span>
                                <h3 className="text-xl font-bold uppercase text-[#111111] mb-4">Treino de Força & Hipertrofia</h3>
                                <p className="text-xs md:text-sm text-[#66635f] font-light leading-relaxed mb-6">Baseado em sobrecarga progressiva, periodização e seleção ideal de exercícios.</p>
                            </div>
                            <span className="text-xs font-black text-[#111111] flex items-center gap-2 mt-4">Saiba Mais <ArrowRight size={14} /></span>
                        </div>
                        <div className="bg-white p-10 rounded-[2.5rem] border border-[#e6e2da] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between" data-aos="fade-up" data-aos-delay="300">
                            <div>
                                <span className="text-[9px] font-mono text-[#bda07a] uppercase tracking-widest block mb-4">PROGRAMA 03</span>
                                <h3 className="text-xl font-bold uppercase text-[#111111] mb-4">Fitness Feminino Premium</h3>
                                <p className="text-xs md:text-sm text-[#66635f] font-light leading-relaxed mb-6">Treino adaptado às particularidades fisiológicas e hormonais femininas.</p>
                            </div>
                            <span className="text-xs font-black text-[#111111] flex items-center gap-2 mt-4">Saiba Mais <ArrowRight size={14} /></span>
                        </div>
                        <div className="bg-white p-10 rounded-[2.5rem] border border-[#e6e2da] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between" data-aos="fade-up" data-aos-delay="400">
                            <div>
                                <span className="text-[9px] font-mono text-[#bda07a] uppercase tracking-widest block mb-4">PROGRAMA 04</span>
                                <h3 className="text-xl font-bold uppercase text-[#111111] mb-4">Consultoria Online</h3>
                                <p className="text-xs md:text-sm text-[#66635f] font-light leading-relaxed mb-6">Planilhas dinâmicas personalizadas via aplicativo exclusivo. Suporte diário.</p>
                            </div>
                            <span className="text-xs font-black text-[#111111] flex items-center gap-2 mt-4">Saiba Mais <ArrowRight size={14} /></span>
                        </div>
                        <div className="bg-white p-10 rounded-[2.5rem] border border-[#e6e2da] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between" data-aos="fade-up" data-aos-delay="500">
                            <div>
                                <span className="text-[9px] font-mono text-[#bda07a] uppercase tracking-widest block mb-4">PROGRAMA 05</span>
                                <h3 className="text-xl font-bold uppercase text-[#111111] mb-4">Performance & Mobilidade</h3>
                                <p className="text-xs md:text-sm text-[#66635f] font-light leading-relaxed mb-6">Desenvolvimento de flexibilidade, estabilidade articular e potência.</p>
                            </div>
                            <span className="text-xs font-black text-[#111111] flex items-center gap-2 mt-4">Saiba Mais <ArrowRight size={14} /></span>
                        </div>
                        <div className="bg-[#FAF8F5] p-10 rounded-[2.5rem] border border-dashed border-[#bda07a] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between" data-aos="fade-up" data-aos-delay="600">
                            <div>
                                <span className="text-[9px] font-mono text-[#bda07a] uppercase tracking-widest block mb-4">PARCERIA</span>
                                <h3 className="text-xl font-bold uppercase text-[#111111] mb-4">Aceitamos Wellhub</h3>
                                <p className="text-xs md:text-sm text-[#66635f] font-light leading-relaxed mb-6">Utilize o seu benefício corporativo Wellhub para treinar presencialmente.</p>
                            </div>
                            <span className="text-xs font-black text-[#bda07a] flex items-center gap-2 mt-4">Consultar Planos <ArrowRight size={14} /></span>
                        </div>
                    </div>
                </div>
            </section>
            <section id="testimonials" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
                <div className="text-center mb-20" data-aos="fade-up">
                    <span className="text-[10px] font-black tracking-[0.3em] text-[#bda07a] uppercase mb-4 inline-block">DEPOIMENTOS</span>
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-[#111111] leading-none">
                        Vidas <span className="font-serif italic font-light text-[#bda07a]">Transformadas</span>
                    </h2>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-[#F5F2EB] p-8 rounded-[2rem] flex flex-col justify-between" data-aos="fade-up" data-aos-delay="100">
                        <div>
                            <div className="flex gap-1 text-[#bda07a] mb-6">
                                {[...Array(5)].map((_, i) => <Star key={i} size={16} weight="fill" />)}
                            </div>
                            <p className="text-[#66635f] font-light leading-relaxed italic text-sm md:text-base mb-6">"O acompanhamento presencial da Jessica mudou minha postura e minha relação com a musculação."</p>
                        </div>
                        <div>
                            <span className="font-bold text-[#111111] block text-sm">Ana Clara R.</span>
                        </div>
                    </div>
                    <div className="bg-[#F5F2EB] p-8 rounded-[2rem] flex flex-col justify-between" data-aos="fade-up" data-aos-delay="200">
                        <div>
                            <div className="flex gap-1 text-[#bda07a] mb-6">
                                {[...Array(5)].map((_, i) => <Star key={i} size={16} weight="fill" />)}
                            </div>
                            <p className="text-[#66635f] font-light leading-relaxed italic text-sm md:text-base mb-6">"Com a consultoria online da Jessica consegui emagrecer 8kg de forma saudável e consistente."</p>
                        </div>
                        <div>
                            <span className="font-bold text-[#111111] block text-sm">Marina Silva</span>
                        </div>
                    </div>
                    <div className="bg-[#F5F2EB] p-8 rounded-[2rem] flex flex-col justify-between" data-aos="fade-up" data-aos-delay="300">
                        <div>
                            <div className="flex gap-1 text-[#bda07a] mb-6">
                                {[...Array(5)].map((_, i) => <Star key={i} size={16} weight="fill" />)}
                            </div>
                            <p className="text-[#66635f] font-light leading-relaxed italic text-sm md:text-base mb-6">"A atenção aos detalhes biomecânicos nas aulas presenciais fez toda a diferença."</p>
                        </div>
                        <div>
                            <span className="font-bold text-[#111111] block text-sm">Carlos Eduardo G.</span>
                        </div>
                    </div>
                </div>
            </section>
            <section id="results" className="py-32 bg-[#F5F2EB] px-6 md:px-12">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20" data-aos="fade-up">
                        <span className="text-[10px] font-black tracking-[0.3em] text-[#bda07a] uppercase mb-4 inline-block">ESTUDOS DE CASO</span>
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-[#111111] leading-none">
                            Evolução & <span className="font-serif italic font-light text-[#bda07a]">Resultados</span>
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-[2rem] border border-[#e6e2da] shadow-sm flex flex-col justify-between" data-aos="fade-up" data-aos-delay="100">
                            <div>
                                <span className="bg-[#111111] text-white text-[9px] font-bold px-3 py-1 uppercase rounded-full inline-block mb-6">Emagrecimento</span>
                                <h3 className="text-xl font-bold uppercase text-[#111111] mb-2">Mariana G.</h3>
                                <p className="text-[11px] font-mono text-[#bda07a] uppercase tracking-widest mb-6">Redução de 12 kg em 6 meses</p>
                            </div>
                        </div>
                        <div className="bg-white p-8 rounded-[2rem] border border-[#e6e2da] shadow-sm flex flex-col justify-between" data-aos="fade-up" data-aos-delay="200">
                            <div>
                                <span className="bg-[#111111] text-white text-[9px] font-bold px-3 py-1 uppercase rounded-full inline-block mb-6">Hipertrofia</span>
                                <h3 className="text-xl font-bold uppercase text-[#111111] mb-2">Rodrigo A.</h3>
                                <p className="text-[11px] font-mono text-[#bda07a] uppercase tracking-widest mb-6">Ganho de 6 kg de massa magra</p>
                            </div>
                        </div>
                        <div className="bg-white p-8 rounded-[2rem] border border-[#e6e2da] shadow-sm flex flex-col justify-between" data-aos="fade-up" data-aos-delay="300">
                            <div>
                                <span className="bg-[#111111] text-white text-[9px] font-bold px-3 py-1 uppercase rounded-full inline-block mb-6">Definição</span>
                                <h3 className="text-xl font-bold uppercase text-[#111111] mb-2">Beatriz L.</h3>
                                <p className="text-[11px] font-mono text-[#bda07a] uppercase tracking-widest mb-6">Definição Abdominal & Postura</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-24 max-w-7xl mx-auto px-6 border-b border-[#e6e2da]">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                    <div data-aos="zoom-in" data-aos-delay="100">
                        <span className="block text-4xl md:text-6xl font-black text-[#111111] mb-2">5+</span>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-[#bda07a]">Anos de Experiência</span>
                    </div>
                    <div data-aos="zoom-in" data-aos-delay="200">
                        <span className="block text-4xl md:text-6xl font-black text-[#111111] mb-2">150+</span>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-[#bda07a]">Vidas Transformadas</span>
                    </div>
                    <div data-aos="zoom-in" data-aos-delay="300">
                        <span className="block text-4xl md:text-6xl font-black text-[#111111] mb-2">98%</span>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-[#bda07a]">Taxa de Fidelidade</span>
                    </div>
                    <div data-aos="zoom-in" data-aos-delay="400">
                        <span className="block text-4xl md:text-6xl font-black text-[#111111] mb-2">100%</span>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-[#bda07a]">Baseado em Ciência</span>
                    </div>
                </div>
            </section>
            <section id="cta" className="py-32 bg-[#111111] text-white text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/30 via-zinc-950 to-[#111111] pointer-events-none" />
                <div className="relative z-10 container mx-auto px-6 max-w-4xl" data-aos="fade-up">
                    <span className="text-[10px] font-black tracking-[0.4em] text-[#bda07a] uppercase mb-6 inline-block">PRONTO PARA COMEÇAR?</span>
                    <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tight leading-none mb-8">
                        Inicie sua <br />
                        <span className="font-serif italic font-light text-[#bda07a] capitalize tracking-normal">transformação hoje</span>
                    </h2>
                    <a href="https://wa.me/5527996314135?text=Olá%20Jessica!%20Gostaria%20de%20saber%20valores%20e%20disponibilidade%20para%20o%20acompanhamento%20de%20Personal%20Trainer%20Presencial." target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-3 bg-[#bda07a] text-black px-12 py-6 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-white hover:scale-105 transition-all duration-300 shadow-xl">
                        <WhatsappLogo size={24} weight="fill" />
                        Agendar Sessão Experimental
                    </a>
                </div>
            </section>
            <footer className="py-20 bg-[#FAF8F5] border-t border-[#e6e2da] text-[#66635f]">
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-16 md:gap-8 items-start">
                    <div className="flex flex-col space-y-4">
                        <h3 className="text-xl font-black text-[#111111] tracking-[0.25em]">JÉSSICA NATÁLIA</h3>
                        <p className="text-xs font-light leading-relaxed max-w-xs">Treinamento personalizado e consultoria online baseados em evidência científica e biomecânica aplicada.</p>
                    </div>
                    <div className="flex flex-col space-y-4 text-xs font-light">
                        <span className="font-bold text-[#111111] tracking-widest uppercase">Contatos</span>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-2"><Phone size={16} /><span>(27) 99631-4135</span></li>
                            <li className="flex items-center gap-2"><Envelope size={16} /><span>contato@jessicanatalia.com.br</span></li>
                            <li className="flex items-start gap-2 max-w-xs"><MapPin size={16} className="mt-0.5" /><span>Ascade – Associação dos Servidores da Câmara dos Deputados, Brasília - DF</span></li>
                        </ul>
                    </div>
                    <div className="flex flex-col space-y-4 text-xs font-light items-start md:items-end">
                        <span className="font-bold text-[#111111] tracking-widest uppercase">Siga-nos</span>
                        <div className="flex gap-4">
                            <a href="https://www.instagram.com/jessicanatalia.personal/" target="_blank" rel="noopener noreferrer" className="bg-[#F5F2EB] p-3 rounded-full border border-[#e6e2da] hover:bg-[#111111] hover:text-white transition-colors duration-300"><InstagramLogo size={20} /></a>
                            <a href="https://wa.me/5527996314135" target="_blank" rel="noopener noreferrer" className="bg-[#F5F2EB] p-3 rounded-full border border-[#e6e2da] hover:bg-[#111111] hover:text-white transition-colors duration-300"><WhatsappLogo size={20} /></a>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-[#e6e2da] flex flex-col md:flex-row justify-between items-center text-[10px] tracking-wider text-zinc-400">
                    <p>© {new Date().getFullYear()} JESSICA NATALIA. TODOS OS DIREITOS RESERVADOS.</p>
                    <p className="mt-2 md:mt-0">DESENVOLVIDO POR <a href="https://instagram.com/v1ccken" target="_blank" rel="noopener noreferrer" className="hover:text-[#bda07a] font-bold">@V1CCKEN</a></p>
                </div>
            </footer>
        </div>
    )
}