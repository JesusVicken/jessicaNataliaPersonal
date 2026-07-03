'use client'

import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export function CustomCursor() {
    const ringRef = useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // Desativa em celulares/touch para melhor UX móvel
        const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
        if (isTouch || window.innerWidth < 768) return

        setIsVisible(true)

        const onMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e
            
            // Move o anel de delay/inércia atrás do cursor padrão do sistema
            gsap.to(ringRef.current, {
                x: clientX - 16,
                y: clientY - 16,
                duration: 0.5,
                ease: 'power3.out'
            })
        }

        const onMouseEnterLink = () => {
            // Expande o anel dourado no hover de elementos clicáveis
            gsap.to(ringRef.current, {
                scale: 1.6,
                borderColor: '#bda07a',
                backgroundColor: 'rgba(189, 160, 122, 0.08)',
                duration: 0.3,
                ease: 'power2.out'
            })
        }

        const onMouseLeaveLink = () => {
            // Retorna ao tamanho e cor originais
            gsap.to(ringRef.current, {
                scale: 1,
                borderColor: 'rgba(189, 160, 122, 0.45)',
                backgroundColor: 'transparent',
                duration: 0.3,
                ease: 'power2.out'
            })
        }

        window.addEventListener('mousemove', onMouseMove)

        const updateListeners = () => {
            const interactiveElements = document.querySelectorAll('a, button, [role="button"], .group')
            interactiveElements.forEach((el) => {
                el.addEventListener('mouseenter', onMouseEnterLink)
                el.addEventListener('mouseleave', onMouseLeaveLink)
            })
        }

        updateListeners()

        const observer = new MutationObserver(updateListeners)
        observer.observe(document.body, { childList: true, subtree: true })

        return () => {
            window.removeEventListener('mousemove', onMouseMove)
            observer.disconnect()
            const interactiveElements = document.querySelectorAll('a, button, [role="button"], .group')
            interactiveElements.forEach((el) => {
                el.removeEventListener('mouseenter', onMouseEnterLink)
                el.removeEventListener('mouseleave', onMouseLeaveLink)
            })
        }
    }, [])

    if (!isVisible) return null

    return (
        <div 
            ref={ringRef} 
            className="fixed top-0 left-0 w-8 h-8 border border-[#bda07a]/45 rounded-full pointer-events-none z-[99999]"
        />
    )
}
