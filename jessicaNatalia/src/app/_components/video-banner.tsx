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

        // GSAP ScrollTrigger for Parallax and Fade out
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        })

        // Zoom and fade out video
        tl.fromTo(video,
            { yPercent: -10, scale: 1.1, opacity: 0.95 },
            { yPercent: 10, scale: 1, opacity: 0.1, ease: "none" }
        )

        // Text parallax
        tl.fromTo(textRef.current,
            { y: 50 },
            { y: -50, ease: "none" },
            0
        )

        return () => {
            window.removeEventListener('touchstart', playVideo)
            window.removeEventListener('click', playVideo)
        }
    }, [])

    return (
        <section 
            ref={containerRef}
            className="relative h-[65vh] w-full overflow-hidden bg-[#0A0A0A] flex items-center justify-center border-t border-[#e6e2da]"
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

            {/* Dark Overlays */}
            <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50 z-10 pointer-events-none" />

            {/* Content */}
            <div 
                ref={textRef}
                className="relative z-20 text-center px-6 max-w-4xl flex flex-col items-center justify-center text-white select-none"
            >
                <span className="text-[10px] font-black tracking-[0.45em] text-[#1d7682] uppercase mb-4">
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
