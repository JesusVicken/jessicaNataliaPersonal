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

import bodytechLogo from '../../../public/bodytech.png'
import smartfitLogo from '../../../public/smartfit.png'
import vertacoLogo from '../../../public/vertaco.jpg'
import agemaLogo from '../../../public/agema.png'
import kaleLogo from '../../../public/kale.jpg'
import icmbioLogo from '../../../public/icmbio.jpeg'

gsap.registerPlugin(ScrollTrigger)

const PARTNERS = [
  { name: 'Bodytech', logo: bodytechLogo, url: 'https://bodytech.com.br' },
  { name: 'SmartFit', logo: smartfitLogo, url: 'https://www.smartfit.com.br' },
  { name: 'Vertaco', logo: vertacoLogo, url: 'https://www.vertaco.com.br' },
  { name: 'Agema', logo: agemaLogo, url: '#' },
  { name: 'Kale', logo: kaleLogo, url: 'https://www.instagram.com/kaleespacosaude/' },
  { name: 'ICMBio', logo: icmbioLogo, url: 'https://www.gov.br/icmbio/pt-br' },
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
    <section id="cta" className="bg-[#FAF8F5] text-[#66635f] border-t border-[#e6e2da] relative overflow-hidden flex flex-col font-sans">
      
      <div className="container mx-auto px-6 py-20 relative z-10 max-w-7xl">
        {/* PARCEIROS */}
        <div className="border-b border-[#e6e2da] pb-16 mb-16" data-aos="fade-up">
          <h4 className="text-xl md:text-2xl font-black mb-10 text-center flex items-center justify-center gap-3 text-[#111111] uppercase tracking-wider">
            <Handshake className="w-6 h-6 text-[#1d7682]" />
            Parceiros Oficiais
          </h4>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 justify-center items-center max-w-5xl mx-auto">
            {PARTNERS.map((item, index) => (
              <a
                key={item.name}
                ref={(el) => {
                  partnersRef.current[index] = el
                }}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white p-6 rounded-[2rem] border border-[#e6e2da] flex items-center justify-center transition-all duration-500 hover:scale-[1.03] hover:shadow-md h-24 w-full"
              >
                {item.logo ? (
                  <Image
                    src={item.logo}
                    alt={item.name}
                    width={item.name === 'SmartFit' || item.name === 'ICMBio' ? 220 : 140}
                    height={item.name === 'SmartFit' || item.name === 'ICMBio' ? 60 : 40}
                    className={`object-contain transition-all duration-500 ease-out ${
                      item.name === 'SmartFit' 
                        ? 'max-h-20 scale-125' 
                        : item.name === 'ICMBio'
                        ? 'max-h-16 scale-125 md:max-h-20' 
                        : 'max-h-12 hover:scale-105'
                    }`}
                  />
                ) : (
                  <span className="text-[#111111] font-black uppercase tracking-[0.2em] text-[10px] md:text-xs group-hover:text-[#1d7682] transition-colors duration-300">
                    {item.name}
                  </span>
                )}
              </a>
            ))}
          </div>
        </div>

        {/* GRID INFO */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-12">
          {/* SOBRE */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#e6e2da] bg-white flex items-center justify-center">
                <img 
                  src="/logo.jpeg" 
                  alt="Jéssica Natália Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col text-left">
                <h3 className="text-base font-black text-[#111111] uppercase tracking-[0.2em] leading-tight">
                  Jéssica Natália
                </h3>
                <span className="text-[8px] text-[#1d7682] uppercase font-bold tracking-[0.25em]">Personal Trainer</span>
              </div>
            </div>
            <p className="text-xs font-light leading-relaxed max-w-xs">
              Há mais de 15 anos prescrevendo saúde. Treinamento personalizado e consultoria online baseados em evidência científica, anatomia e biomecânica aplicada.
            </p>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#111111] hover:bg-[#1d7682] text-white font-bold py-3 px-6 rounded-full transition-all hover:scale-105 shadow-sm text-xs uppercase tracking-wider"
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
                <Phone size={16} className="text-[#1d7682]" />
                <a href="tel:+5561996844400" className="hover:text-[#1d7682] transition-colors">(61) 99684-4400</a>
              </li>
              <li className="flex items-center gap-3">
                <Envelope size={16} className="text-[#1d7682]" />
                <a href="mailto:jessnatalia.rs@gmail.com" className="hover:text-[#1d7682] transition-colors">jessnatalia.rs@gmail.com</a>
              </li>
              <li className="flex flex-col gap-2 pt-2 border-t border-zinc-100 max-w-xs w-full">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#1d7682] text-left">Locais de Atendimento:</span>
                <div className="space-y-3 mt-1 text-left">
                  
                  {/* Bodytech */}
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-md overflow-hidden bg-white border border-[#e6e2da] flex items-center justify-center p-0.5 shrink-0">
                      <img src="/bodytech.png" alt="Bodytech Logo" className="w-full h-full object-contain" />
                    </div>
                    <span>Rede Bodytech (Lago Sul)</span>
                  </div>

                  {/* SmartFit */}
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-md overflow-hidden bg-white border border-[#e6e2da] flex items-center justify-center p-0.5 shrink-0">
                      <img src="/smartfit.png" alt="SmartFit Logo" className="w-full h-full object-contain" />
                    </div>
                    <span>Rede Smartfit</span>
                  </div>

                  {/* Kale */}
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-md overflow-hidden bg-white border border-[#e6e2da] flex items-center justify-center p-0.5 shrink-0">
                      <img src="/kale.jpg" alt="Kale Espaço Saúde Logo" className="w-full h-full object-contain" />
                    </div>
                    <span>Kale Espaço Saúde</span>
                  </div>

                  {/* Domiciliar */}
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-md overflow-hidden bg-white border border-[#e6e2da] flex items-center justify-center shrink-0">
                      <MapPin size={12} className="text-[#1d7682]" weight="fill" />
                    </div>
                    <span>Atendimento Domiciliar</span>
                  </div>

                </div>
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
                href="https://www.instagram.com/jessicanataliapersonal"
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

      {/* MAPA LOCAL & INFORMAÇÕES DE ATENDIMENTO */}
      <div className="border-t border-[#e6e2da] bg-white">
        <div className="container mx-auto max-w-7xl px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Informações modernas de atendimento */}
          <div className="space-y-6 text-left">
            <span className="text-[10px] font-black tracking-[0.35em] text-[#1d7682] uppercase block">
              COBERTURA & ATENDIMENTO
            </span>
            <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-[#111111] leading-tight">
              Onde Treinar <span className="font-serif italic font-light text-[#1d7682]">Comigo</span>
            </h3>
            <p className="text-xs text-zinc-500 font-light leading-relaxed max-w-md">
              Atendimento presencial personalizado nas principais regiões de Brasília. Planejamento estratégico de treino adequado à sua rotina e localização.
            </p>
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#1d7682] mt-1.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-[#111111] uppercase tracking-wider">Plano Piloto & Lago Sul</h4>
                  <p className="text-[10px] text-zinc-400 font-light mt-0.5">Atendimento presencial focado e otimizado no Plano Piloto e Lago Sul.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#1d7682] mt-1.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-[#111111] uppercase tracking-wider">Academias Parceiras</h4>
                  <p className="text-[10px] text-zinc-400 font-light mt-0.5">Musculação, Pilates e Recovery na Rede Bodytech, Rede SmartFit e Kale Espaço Saúde.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#1d7682] mt-1.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-[#111111] uppercase tracking-wider">Atendimento Domiciliar</h4>
                  <p className="text-[10px] text-zinc-400 font-light mt-0.5">Atendimento personalizado no conforto da academia do seu condomínio ou residência.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Mapa Quadrado */}
          <div className="flex justify-center w-full">
            <div className="w-full max-w-[400px] aspect-square rounded-[2.5rem] overflow-hidden border border-[#e6e2da] bg-[#FAF8F5] shadow-lg relative">
              <iframe
                title="Localização de Atendimento Plano Piloto"
                src="https://www.google.com/maps?q=-15.793889,-47.882778&z=15&output=embed"
                width="100%"
                height="100%"
                loading="lazy"
                style={{ border: 0 }}
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

        </div>
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
