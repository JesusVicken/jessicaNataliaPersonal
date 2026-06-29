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
    <section ref={sectionRef} className="bg-[#FAF8F5] py-24 px-4 md:px-6 border-t border-[#e6e2da]">
      <div className="container mx-auto max-w-7xl">

        {/* --- CABEÇALHO --- */}
        <div className="text-center mb-16 md:mb-20 tours-reveal">
          <span className="text-[10px] font-black text-[#111111] bg-[#F5F2EB] px-4 py-1.5 rounded-full uppercase tracking-[0.25em] mb-4 inline-block border border-[#e6e2da]">
            ACOMPANHAMENTO DETALHADO
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-[#111111] uppercase leading-none mb-6 tracking-tighter">
            Formatos de <span className="font-serif italic font-light text-[#bda07a] capitalize">Treino</span>
          </h2>
          <p className="text-[#66635f] text-base md:text-lg max-w-xl mx-auto font-light px-4 leading-relaxed">
            Escolha o formato ideal para acelerar os seus resultados com orientação profissional direcionada.
          </p>
        </div>

        {/* --- GRID DE CARDS --- */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10">

          {/* CARD 01: CONSULTORIA ONLINE */}
          <div
            className="group relative rounded-[2.5rem] overflow-hidden border border-[#e6e2da] bg-[#F5F2EB] flex flex-col transition-all duration-500 hover:shadow-md"
            data-aos="fade-up"
          >
            {/* Conteúdo */}
            <div className="relative z-10 flex flex-col p-8 md:p-12 justify-between flex-1">
              <div>
                <div className="flex justify-between items-start mb-12 md:mb-20">
                  <div className="flex flex-col gap-2">
                    <div className="bg-[#111111] text-white text-[9px] font-black px-3 py-1 uppercase tracking-widest self-start rounded-sm">
                      Consultoria Online
                    </div>
                    <div className="bg-[#bda07a] text-white text-[9px] font-black px-3 py-1 uppercase tracking-widest self-start rounded-sm">
                      Via Aplicativo
                    </div>
                  </div>
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#e6e2da] flex items-center justify-center bg-white shadow-sm">
                    <CalendarBlank size={20} className="text-[#111111]" />
                  </div>
                </div>

                <h3 className="text-4xl md:text-6xl font-black text-[#111111] uppercase leading-[0.8] mb-6 tracking-tighter">
                  Treine onde <br />
                  <span className="font-serif italic font-light text-[#bda07a] capitalize">quiser</span>
                </h3>

                <div className="flex flex-wrap gap-2 md:gap-3 mb-8">
                  <span className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full text-[9px] font-bold uppercase border border-[#e6e2da] text-[#111111]">
                    <Clock size={14} weight="fill" className="text-[#bda07a]" /> Treino no Seu Tempo
                  </span>
                  <span className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full text-[9px] font-bold uppercase border border-[#e6e2da] text-[#111111]">
                    <Clock size={14} weight="fill" className="text-[#bda07a]" /> Suporte Direto
                  </span>
                </div>

                {/* Lista de Tópicos */}
                <div className="bg-white p-6 rounded-3xl border border-[#e6e2da] transition-all">
                  <h4 className="text-zinc-400 font-black uppercase mb-4 tracking-[0.2em] text-[9px] border-b border-[#e6e2da] pb-2">O que está incluso:</h4>
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
                      <li key={i} className="flex items-start gap-3 text-xs md:text-sm text-[#66635f] hover:text-[#111111] transition-colors leading-snug">
                        <Check size={16} className="text-[#bda07a] mt-0.5 shrink-0" weight="bold" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="mt-8">
                <a
                  href="https://wa.me/5561996844400?text=Olá%20Jéssica!%20Gostaria%20de%20saber%20mais%20sobre%20a%20sua%20Consultoria%20Online."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#111111] hover:bg-[#bda07a] text-white font-bold py-4 px-6 transition-all flex items-center justify-center gap-3 uppercase text-xs tracking-widest rounded-xl shadow-sm"
                >
                  Contratar Consultoria
                </a>
              </div>
            </div>
          </div>

          {/* CARD 02: PERSONAL PRESENCIAL */}
          <div
            className="group relative rounded-[2.5rem] overflow-hidden border border-[#e6e2da] bg-[#F5F2EB] flex flex-col transition-all duration-500 hover:shadow-md"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="relative z-10 flex flex-col p-8 md:p-12 justify-between flex-1">
              <div>
                <div className="flex justify-between items-start mb-12 md:mb-20">
                  <div className="flex flex-col gap-2">
                    <div className="bg-[#111111] text-white text-[9px] font-black px-4 py-2 tracking-widest uppercase rounded-sm">
                      Aulas Individuais
                    </div>
                    <div className="bg-[#bda07a] text-white text-[9px] font-black px-4 py-2 tracking-widest uppercase rounded-sm">
                      Presencial VIP (DF)
                    </div>
                  </div>
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#e6e2da] flex items-center justify-center bg-white shadow-sm">
                    <Anchor size={20} weight="fill" className="text-[#111111]" />
                  </div>
                </div>

                <h3 className="text-4xl md:text-6xl font-black text-[#111111] uppercase leading-[0.8] mb-6 tracking-tighter">
                  Presencial <br />
                  <span className="font-serif italic font-light text-[#bda07a] capitalize">VIP</span>
                </h3>

                <div className="flex items-center gap-3 mb-8">
                  <span className="flex items-center gap-2 bg-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase border border-[#e6e2da] text-[#111111]">
                    <Clock size={14} weight="fill" className="text-[#bda07a]" /> Acompanhamento Individualizado
                  </span>
                </div>

                {/* Lista de Tópicos */}
                <div className="bg-white p-6 rounded-3xl border border-[#e6e2da] transition-all">
                  <h4 className="text-zinc-400 font-black uppercase mb-4 tracking-[0.2em] text-[9px] border-b border-[#e6e2da] pb-2">O que está incluso:</h4>
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
                      <li key={i} className="flex items-start gap-3 text-xs md:text-sm text-[#66635f] hover:text-[#111111] transition-colors leading-snug">
                        <Check size={16} className="text-[#bda07a] mt-0.5 shrink-0" weight="bold" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="mt-8">
                <a
                  href="https://wa.me/5561996844400?text=Olá%20Jéssica!%20Gostaria%20de%20saber%20valores%20e%20disponibilidade%20para%20as%20Aulas%20VIP%20Presenciais%20em%20Brasília."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#111111] hover:bg-[#bda07a] text-white font-bold py-4 px-6 transition-all flex items-center justify-center gap-3 uppercase text-xs tracking-widest rounded-xl shadow-sm"
                >
                  Consultar Disponibilidade
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* --- LOCALIZAÇÃO RODAPÉ --- */}
        <div className="mt-16 flex flex-col items-center tours-reveal">
          <div className="flex items-center gap-3 bg-[#F5F2EB] border border-[#e6e2da] px-8 py-4 rounded-full">
            <MapPin size={20} className="text-[#111111]" weight="fill" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#111111] text-center">
              Atendimento presencial na Bodytech Lago Sul (Brasília - DF) & Online
            </span>
          </div>
        </div>

      </div>
    </section>
  )
}