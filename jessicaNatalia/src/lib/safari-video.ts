'use client'

/**
 * Força a reprodução automática em vídeo para o navegador Safari (iOS e macOS).
 * O Safari bloqueia vídeos se o atributo `muted` não for ativado diretamente no elemento DOM,
 * ou se faltarem as propriedades `playsinline` e `webkit-playsinline`.
 */
export function setupSafariAutoplay(video: HTMLVideoElement | null) {
    if (!video) return

    // 1. Força propriedades de mudo nativas na DOM
    video.muted = true
    video.defaultMuted = true
    video.setAttribute('muted', '')
    video.setAttribute('playsinline', '')
    video.setAttribute('webkit-playsinline', '')
    video.setAttribute('autoplay', '')

    const playVideo = () => {
        if (!video) return
        video.muted = true
        const promise = video.play()
        if (promise !== undefined) {
            promise.catch(() => {
                // Tenta novamente caso o Safari retenha a primeira tentativa
            })
        }
    }

    // Tenta dar play imediatamente
    playVideo()

    // 2. Tenta nos eventos de carregamento do vídeo do Safari
    if (video.readyState >= 2) {
        playVideo()
    } else {
        video.addEventListener('loadedmetadata', playVideo, { once: true })
        video.addEventListener('canplay', playVideo, { once: true })
        video.addEventListener('canplaythrough', playVideo, { once: true })
    }

    // 3. Gatilhos de interação e rolagem como fallback para o iOS Low Power Mode
    const handleInteraction = () => {
        if (video && video.paused) {
            playVideo()
        }
    }

    const events = ['touchstart', 'touchend', 'click', 'scroll', 'pointerdown']
    events.forEach(evt => {
        window.addEventListener(evt, handleInteraction, { passive: true, once: true })
    })
}
