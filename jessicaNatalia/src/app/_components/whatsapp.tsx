'use client'

import { useEffect, useState } from 'react'
import { WhatsappLogo } from '@phosphor-icons/react'

export default function WhatsappFloatingButton() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll() // Verifica na montagem inicial

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const whatsappNumber = '5561996844400'
    const whatsappMessage = 'Olá Jessica! Acessei seu site e gostaria de saber mais sobre o seu acompanhamento de personal trainer e consultoria.'
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`

    return (
        <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Falar com a Jéssica no WhatsApp"
            className={`
                fixed bottom-6 right-6 z-50 
                flex items-center gap-2 bg-[#25D366] text-white 
                p-3.5 md:p-4 rounded-full shadow-[0_8px_30px_rgba(37,211,102,0.4)]
                hover:shadow-[0_8px_30px_rgba(37,211,102,0.6)]
                transition-all duration-500 ease-out group
                hover:scale-105 active:scale-95
                ${isVisible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'}
            `}
        >
            <WhatsappLogo size={24} weight="fill" className="w-6 h-6 md:w-7 md:h-7 shrink-0" />
            <span className="max-w-0 overflow-hidden group-hover:max-w-[150px] transition-all duration-500 ease-out text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">
                Falar com a Jéssica
            </span>
        </a>
    )
}