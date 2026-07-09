'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function VideoBanner() {
    const containerRef = useRef<HTMLDivElement>(null)
    const videoRef = useRef<HTMLVideoElement>(null)
    const textRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const video = videoRef.current
        if (!video) return

        video.muted = true
        video.defaultMuted = true
        video.play().catch((err) => console.log("Autoplay video banner failed:", err))

        const playVideo = () => {
            if (video.paused) {
                video.play().catch((err) => console.log("Play failed:", err))
            }
        }
        window.addEventListener('touchstart', playVideo, { once: true })
        window.addEventListener('click', playVideo, { once: true })

        // 1. Efeito Curtain (Sticky Reveal): Fixa a seção enquanto a de baixo a encobre
        ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            pin: true,
            pinSpacing: false
        })

        // 2. Parallax de Zoom e Movimento no vídeo
        gsap.fromTo(video,
            { scale: 1.15, yPercent: -8 },
            {
                scale: 1.02,
                yPercent: 8,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            }
        )

        // 3. Parallax sutil no texto
        gsap.fromTo(textRef.current,
            { y: 30 },
            {
                y: -30,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            }
        )

        return () => {
            window.removeEventListener('touchstart', playVideo)
            window.removeEventListener('click', playVideo)
        }
    }, [])

    return (
        <section 
            ref={containerRef}
            className="relative h-[70vh] w-full overflow-hidden bg-[#0A0A0A] flex items-center justify-center border-t border-[#e6e2da] z-20"
        >
            {/* Background Video */}
            <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
            >
                <source src="/video12.mp4" type="video/mp4" />
            </video>

            {/* Overlays mais claros para dar máxima visibilidade ao vídeo */}
            <div className="absolute inset-0 bg-black/15 z-10 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20 z-10 pointer-events-none" />

            {/* Content com drop-shadow forte para legibilidade em fundo claro */}
            <div 
                ref={textRef}
                className="relative z-20 text-center px-6 max-w-4xl flex flex-col items-center justify-center text-white select-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.65)]"
            >
                <span className="text-[10px] font-black tracking-[0.45em] text-[#1d7682] uppercase mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
                    MOVIMENTO SEM LIMITES
                </span>
                <h2 className="text-3xl sm:text-5xl md:text-6xl font-extralight tracking-tight leading-none text-white max-w-3xl">
                    Seu corpo foi feito para <br />
                    <span className="font-serif italic font-light text-[#1d7682] tracking-normal">se mover livremente</span>
                </h2>
            </div>
        </section>
    )
}
