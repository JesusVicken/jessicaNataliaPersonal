'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import {
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
  WhatsappLogo,
  MapPin,
  Phone,
  Envelope
} from '@phosphor-icons/react'
import { Handshake } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PARTNERS = [
  { name: 'Ascade', url: 'https://ascade.com.br' },
  { name: 'Wellhub', url: 'https://wellhub.com' },
]

export function Footer() {
  const partnersRef = useRef<(HTMLAnchorElement | null)[]>([])

  const whatsappNumber = '5561996844400'
  const whatsappMessage =
    'Olá Jéssica! Gostaria de mais informações sobre o seu acompanhamento de personal trainer e consultoria.'
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`

  useEffect(() => {
    if (!partnersRef.current.length) return

    gsap.fromTo(
      partnersRef.current,
      {
        opacity: 0,
        y: 60,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: partnersRef.current[0],
          start: 'top 85%',
        },
      }
    )
  }, [])

  return (
    <section className="bg-[#FAF8F5] text-[#66635f] border-t border-[#e6e2da] relative overflow-hidden flex flex-col font-sans">
      
      <div className="container mx-auto px-6 py-20 relative z-10 max-w-7xl">
        {/* PARCEIROS */}
        <div className="border-b border-[#e6e2da] pb-16 mb-16" data-aos="fade-up">
          <h4 className="text-xl md:text-2xl font-black mb-10 text-center flex items-center justify-center gap-3 text-[#111111] uppercase tracking-wider">
            <Handshake className="w-6 h-6 text-[#bda07a]" />
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
                className="group bg-white px-10 py-6 rounded-2xl border border-[#e6e2da] flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-sm"
              >
                <span className="text-[#111111] font-black uppercase tracking-[0.2em] text-xs md:text-sm group-hover:text-[#bda07a] transition-colors duration-300">
                  {item.name}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* GRID INFO */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-12">
          {/* SOBRE */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
            <h3 className="text-lg font-black text-[#111111] uppercase tracking-[0.2em]">
              Jéssica Natália
            </h3>
            <p className="text-xs font-light leading-relaxed max-w-xs">
              Treinamento personalizado e consultoria online baseados em evidência científica, anatomia e biomecânica aplicada.
            </p>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#111111] hover:bg-[#bda07a] text-white font-bold py-3 px-6 rounded-full transition-all hover:scale-105 shadow-sm text-xs uppercase tracking-wider"
            >
              <WhatsappLogo size={18} weight="fill" />
              Fale Conosco
            </a>
          </div>

          {/* CONTATO */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
            <h3 className="text-xs font-bold text-[#111111] uppercase tracking-widest">
              Contatos & Locais
            </h3>
            <ul className="space-y-4 text-xs font-light">
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-[#bda07a]" />
                <a href="tel:+5561996844400" className="hover:text-[#bda07a] transition-colors">(61) 99684-4400</a>
              </li>
              <li className="flex items-center gap-3">
                <Envelope size={16} className="text-[#bda07a]" />
                <a href="mailto:jessnatalia.rs@gmail.com" className="hover:text-[#bda07a] transition-colors">jessnatalia.rs@gmail.com</a>
              </li>
              <li className="flex items-start gap-3 max-w-xs">
                <MapPin size={18} className="text-[#bda07a] mt-0.5 shrink-0" />
                <span>
                  Ascade – Associação dos Servidores da Câmara dos Deputados
                  <br />
                  <span className="text-[10px] text-zinc-400 uppercase font-bold tracking-widest">
                    Brasília - DF
                  </span>
                </span>
              </li>
            </ul>
          </div>

          {/* REDES */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right space-y-4">
            <h3 className="text-xs font-bold text-[#111111] uppercase tracking-widest">
              Redes Sociais
            </h3>

            <div className="flex gap-4">
              <SocialLink
                href="https://www.instagram.com/jessicanataliiapersonal/"
                icon={InstagramLogo}
                label="Instagram"
              />
              <SocialLink
                href="https://www.linkedin.com/in/jéssica-natália-749423235/"
                icon={LinkedinLogo}
                label="LinkedIn"
              />
              <SocialLink
                href="https://www.facebook.com/jessnatrs/"
                icon={FacebookLogo}
                label="Facebook"
              />
            </div>
          </div>
        </div>
      </div>

      {/* MAPA LOCAL */}
      <div className="w-full h-[350px] md:h-[400px] border-t border-[#e6e2da]">
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
      <div className="bg-[#111111] py-6 text-center border-t border-[#e6e2da] text-zinc-500 text-[10px] tracking-wider uppercase">
        <p>
          © {new Date().getFullYear()} Jéssica Natália. Todos os direitos reservados.
        </p>
      </div>
    </section>
  )
}

function SocialLink({
  href,
  icon: Icon,
  label,
}: {
  href: string
  icon: any
  label: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="bg-[#F5F2EB] p-3 rounded-full border border-[#e6e2da] text-[#66635f] hover:bg-[#111111] hover:text-white transition-all duration-300 hover:-translate-y-1 will-change-transform"
    >
      <Icon size={18} />
    </a>
  )
}
