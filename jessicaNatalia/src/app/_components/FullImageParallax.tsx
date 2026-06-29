// app/_components/FullImageParallax.tsx
"use client"

import { Parallax } from "react-scroll-parallax"
import Image from "next/image"

export function FullImageParallax() {
    return (
        // 1. O contêiner (a "janela"). Sua altura (h-screen) define por quanto
        // tempo o efeito ficará visível na tela enquanto você rola.
        <section className="relative h-screen w-full overflow-hidden">
            <Parallax
                // 2. A propriedade 'speed' é a chave aqui. Um valor negativo faz
                // a imagem se mover mais devagar que a página. speed={-40}
                // significa que a imagem se move 40% mais devagar, criando o efeito.
                speed={-40}
                className="absolute inset-0"
            >
                {/* 3. O contêiner da imagem é INTENCIONALMENTE mais alto que a seção.
            Isso dá à imagem 'espaço' para se mover para cima e para baixo.
            h-[150vh] significa que é 50% mais alta que a janela.
        */}
                <div className="relative h-[150vh] w-full">
                    <Image
                        src="/canoa2.jpg" // Use a imagem que preferir
                        alt="Remadores aproveitando o dia no lago"
                        fill
                        quality={100}
                        className="object-cover"
                    />
                    {/* Opcional: Overlay para escurecer a imagem e dar contraste ao texto */}
                    <div className="absolute inset-0 bg-black/30" />
                </div>
            </Parallax>

            {/* O texto fica em um contêiner separado para não ser afetado pelo parallax */}
            <div className="relative z-10 flex h-full items-center justify-center">
                <h2
                    className="text-white text-4xl md:text-6xl font-bold text-center"
                    data-aos="zoom-in"
                >
                    Conexão e Natureza
                </h2>
            </div>
        </section>
    )
}