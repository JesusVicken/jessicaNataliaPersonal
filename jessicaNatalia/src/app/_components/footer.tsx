'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import {
  FacebookLogo,
  InstagramLogo,
  YoutubeLogo,
  WhatsappLogo,
  MapPin,
  Phone,
} from '@phosphor-icons/react'
import { Handshake } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import ascadeLogo from '../../../public/logo-ascade.png'
import wellhubLogo from '../../../public/wellhub-logo.png'

gsap.registerPlugin(ScrollTrigger)

const PARTNERS = [
  { name: 'Ascade', logo: ascadeLogo, url: 'https://ascade.com.br' },
  { name: 'Wellhub', logo: wellhubLogo, url: 'https://wellhub.com' },
]

export function Footer() {
  const partnersRef = useRef<(HTMLAnchorElement | null)[]>([])

  const whatsappNumber = '27996314135'
  const whatsappMessage =
    'Olá Jessica! Gostaria de mais informações sobre o seu acompanhamento de personal e consultoria.'
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`

  useEffect(() => {
    if (!partnersRef.current.length) return

    gsap.fromTo(
      partnersRef.current,
      {
        opacity: 0,
        y: 80,
        scale: 0.85,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: 'power4.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: partnersRef.current[0],
          start: 'top 85%',
        },
      }
    )
  }, [])

  return (
    <section className="bg-zinc-950 text-gray-300 border-t border-white/10 relative overflow-hidden flex flex-col">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-zinc-950 to-black opacity-50 pointer-events-none" />

      <div className="container mx-auto px-6 py-16 relative z-10">
        {/* PARCEIROS */}
        <div className="border-b border-white/10 pb-12 mb-12" data-aos="fade-up">
          <h4 className="text-2xl md:text-3xl font-bold mb-10 text-center flex items-center justify-center gap-3 text-white uppercase tracking-wide">
            <Handshake className="w-8 h-8 text-white/80" />
            Parceiros Oficiais
          </h4>

          <div className="flex flex-wrap justify-center gap-10">
            {PARTNERS.map((item, index) => (
              <a
                key={item.name}
                ref={(el) => {
                  partnersRef.current[index] = el
                }}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white p-8 rounded-3xl flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] will-change-transform"
              >
                <Image
                  src={item.logo}
                  alt={item.name}
                  width={240}
                  height={240}
                  quality={100}
                  className="object-contain w-[200px] h-[200px] md:w-[240px] md:h-[240px]"
                />
              </a>
            ))}
          </div>
        </div>

        {/* GRID INFO */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* SOBRE */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
            <h3 className="text-2xl font-black text-white uppercase tracking-wider">
              Jessica Natalia
            </h3>
            <p className="text-gray-400 leading-relaxed max-w-sm">
              Transformando vidas por meio do treinamento personalizado, periodização inteligente e consultoria fitness individualizada.
            </p>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-6 rounded-full transition-all hover:scale-105 shadow-lg shadow-green-900/20"
            >
              <WhatsappLogo size={24} weight="fill" />
              Fale Conosco
            </a>
          </div>

          {/* CONTATO */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
            <h3 className="text-xl font-bold text-white uppercase tracking-wider">
              Contato
            </h3>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-white/60" />
                <span>(27) 99631-4135</span>
              </li>
              <li className="flex items-start gap-3 max-w-xs">
                <MapPin size={24} className="text-white/60 mt-0.5 shrink-0" />
                <span>
                  Ascade – Associação dos Servidores da Câmara dos Deputados
                  <br />
                  <span className="text-xs text-gray-500 uppercase font-bold">
                    Brasília - DF
                  </span>
                </span>
              </li>
            </ul>
          </div>

          {/* REDES */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right space-y-4">
            <h3 className="text-xl font-bold text-white uppercase tracking-wider">
              Siga-nos
            </h3>

            <div className="flex gap-4">
              <SocialLink
                href="https://www.instagram.com/jessicanatalia.personal/"
                icon={InstagramLogo}
                baseColor="text-[#E4405F]"
                hoverColor="hover:bg-[#E4405F]"
                label="Instagram"
              />
              <SocialLink
                href={whatsappLink}
                icon={WhatsappLogo}
                baseColor="text-[#25D366]"
                hoverColor="hover:bg-[#25D366]"
                label="WhatsApp"
              />
            </div>
          </div>
        </div>
      </div>

      {/* MAPA LOCAL */}
      <div className="w-full h-[350px] md:h-[420px] border-t border-white/10">
        <iframe
          title="Localização de Atendimento"
          src="https://www.google.com/maps?q=-15.8186875,-47.8519375&z=17&output=embed"
          width="100%"
          height="100%"
          loading="lazy"
          style={{ border: 0 }}
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {/* COPYRIGHT */}
      <div className="bg-black py-6 text-center border-t border-white/5">
        <p className="text-xs text-gray-600">
          © {new Date().getFullYear()} Jessica Natalia Personal. Todos os direitos reservados.
        </p>
      </div>
    </section>
  )
}

function SocialLink({
  href,
  icon: Icon,
  baseColor,
  hoverColor,
  label,
}: {
  href: string
  icon: any
  baseColor: string
  hoverColor: string
  label: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`bg-zinc-900 p-3 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] ${baseColor} ${hoverColor} hover:text-white`}
    >
      <Icon size={24} weight="fill" />
    </a>
  )
}
