// app/_components/whatsapp-wrapper.tsx
'use client'

import { ReactNode, useEffect, useState } from 'react'
import WhatsappFloatingButton from './whatsapp'

export default function WhatsappWrapper({ children }: { children: ReactNode }) {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            // Mostra o botão apenas quando o wrapper estiver na viewport
            const wrapperElement = document.getElementById('whatsapp-wrapper')
            if (wrapperElement) {
                const rect = wrapperElement.getBoundingClientRect()
                setIsVisible(rect.top <= window.innerHeight && rect.bottom >= 0)
            }
        }

        window.addEventListener('scroll', handleScroll)
        handleScroll() // Verifica na montagem inicial

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div id="whatsapp-wrapper">
            {children}
            {isVisible && <WhatsappFloatingButton />}
        </div>
    )
}