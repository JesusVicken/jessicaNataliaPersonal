'use client'

import { useEffect, useRef } from 'react'
import { Check, Clock, MapPin, CalendarBlank, Anchor } from '@phosphor-icons/react'
import Image from 'next/image'
import gsap from 'gsap'
import AOS from 'aos'
import 'aos/dist/aos.css'

export function Tours() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    AOS.init({ duration: 1000, once: true })

    const ctx = gsap.context(() => {
      gsap.from(".tours-reveal", {
        y: 40,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out"
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-black py-24 px-4 md:px-6 border-t border-white/10">
      <div className="container mx-auto max-w-7xl">

        {/* --- CABEÇALHO --- */}
        <div className="text-center mb-16 md:mb-20 tours-reveal">
          <span className="text-[10px] font-black text-white bg-white/10 px-4 py-1.5 rounded-full uppercase tracking-[0.25em] mb-4 inline-block border border-white/10">
            Acompanhamento
          </span>
          <h2 className="text-4xl md:text-8xl font-black text-white uppercase leading-none mb-6 tracking-tighter">
            Nossos <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-700">Programas</span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto font-light italic px-4">
            "Escolha o formato ideal para acelerar os seus resultados com orientação profissional."
          </p>
        </div>

        {/* --- GRID DE CARDS --- */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10">

          {/* CARD 01: CONSULTORIA ONLINE */}
          <div
            className="group relative rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border border-white/10 bg-zinc-900 flex flex-col transition-all duration-500 hover:border-white/40"
            data-aos="fade-up"
          >
            {/* Imagem de Fundo */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/gym_bg.jpg"
                alt="Consultoria Online"
                fill
                className="object-cover brightness-[0.2] group-hover:brightness-[0.4] group-hover:scale-105 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent" />
            </div>

            {/* Conteúdo */}
            <div className="relative z-10 flex flex-col p-6 md:p-12">
              <div className="flex justify-between items-start mb-12 md:mb-20">
                <div className="flex flex-col gap-2">
                  <div className="bg-white text-black text-[10px] font-black px-3 py-1 uppercase tracking-widest self-start rounded-sm">
                    Consultoria Online
                  </div>
                  <div className="bg-white text-black text-[10px] font-black px-3 py-1 uppercase tracking-widest self-start rounded-sm">
                    Via Aplicativo
                  </div>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                  <CalendarBlank size={20} className="text-white" />
                </div>
              </div>

              <div>
                <h3 className="text-5xl md:text-7xl font-black text-white uppercase leading-[0.8] mb-6 tracking-tighter">
                  Consultoria <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-600">Online</span>
                </h3>

                <div className="flex flex-wrap gap-2 md:gap-3 mb-8">
                  <span className="flex items-center gap-2 bg-white/5 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold uppercase border border-white/10 text-white">
                    <Clock size={14} weight="fill" /> Treino no Seu Tempo
                  </span>
                  <span className="flex items-center gap-2 bg-white/5 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold uppercase border border-white/10 text-white">
                    <Clock size={14} weight="fill" /> Suporte 6 Dias na Semana
                  </span>
                </div>

                {/* Lista de Tópicos */}
                <div className="bg-black/60 backdrop-blur-xl p-6 rounded-3xl border border-white/10 group-hover:border-white/30 transition-all">
                  <h4 className="text-zinc-500 font-black uppercase mb-4 tracking-[0.2em] text-[10px] border-b border-white/10 pb-2">O que está incluso:</h4>
                  <ul className="space-y-4 md:space-y-3">
                    {[
                      "Ficha de treino dinâmica personalizada via aplicativo",
                      "Vídeos demonstrativos de execução de todos os exercícios",
                      "Suporte direto pelo WhatsApp para tirar dúvidas",
                      "Feedback técnico de execução por meio de vídeos enviados",
                      "Planejamento de carga e sobrecarga progressiva",
                      "Planilha de controle e metas de treinamento",
                      "Ajustes periódicos na rotina de treino conforme evolução",
                      "Foco em hipertrofia, emagrecimento ou condicionamento"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-zinc-300 group-hover:text-white transition-colors leading-snug">
                        <Check size={16} className="text-white mt-0.5 shrink-0" weight="bold" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* CARD 02: PERSONAL PRESENCIAL */}
          <div
            className="group relative rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border border-white/10 bg-zinc-900 flex flex-col transition-all duration-500 hover:border-white/40"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="absolute inset-0 z-0">
              <Image
                src="/gym_bg.jpg"
                alt="Personal Presencial"
                fill
                className="object-cover brightness-[0.2] group-hover:brightness-[0.4] group-hover:scale-105 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent" />
            </div>

            <div className="relative z-10 flex flex-col p-6 md:p-12">
              <div className="flex justify-between items-start mb-12 md:mb-20">
                <div className="bg-white text-black text-[10px] font-black px-4 py-2 uppercase tracking-widest rounded-sm">
                  Personal Presencial
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                  <Anchor size={20} weight="fill" className="text-white" />
                </div>
              </div>

              <div>
                <h3 className="text-5xl md:text-7xl font-black text-white uppercase leading-[0.8] mb-6 tracking-tighter">
                  Aulas <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-600 font-black">Individuais</span>
                </h3>

                <div className="flex items-center gap-3 mb-8">
                  <span className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase border border-white/20 text-white">
                    <Clock size={14} weight="fill" /> Acompanhamento VIP Presencial
                  </span>
                </div>

                {/* Lista de Tópicos */}
                <div className="bg-black/60 backdrop-blur-xl p-6 rounded-3xl border border-white/10 group-hover:border-white/30 transition-all">
                  <h4 className="text-zinc-500 font-black uppercase mb-4 tracking-[0.2em] text-[10px] border-b border-white/10 pb-2">O que está incluso:</h4>
                  <ul className="space-y-4 md:space-y-3">
                    {[
                      "Supervisão presencial 100% dedicada durante todo o treino",
                      "Correção biomecânica e postural precisa em tempo real",
                      "Ajuste imediato de carga e técnicas de falha com segurança",
                      "Prevenção ativa de lesões em exercícios complexos",
                      "Otimização de cada série para máxima ativação muscular",
                      "Foco em reabilitação postural, fortalecimento e hipertrofia",
                      "Horários flexíveis pré-agendados semanalmente",
                      "Motivação e energia para treinar no seu limite máximo"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-zinc-300 group-hover:text-white transition-colors leading-snug">
                        <Check size={16} className="text-white mt-0.5 shrink-0" weight="bold" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* --- LOCALIZAÇÃO RODAPÉ --- */}
        <div className="mt-16 flex flex-col items-center tours-reveal">
          <div className="flex items-center gap-3 bg-zinc-900 border border-white/10 px-8 py-4 rounded-full">
            <MapPin size={20} className="text-white" weight="fill" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white text-center">
              Atendimento em Brasília - DF & Online
            </span>
          </div>
        </div>

      </div>
    </section>
  )
}