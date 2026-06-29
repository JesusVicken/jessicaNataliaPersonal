'use client'

import { useEffect, useRef } from 'react'
import { Star, WhatsappLogo } from '@phosphor-icons/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function CheckVaa() {
    const statsContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const counters = statsContainerRef.current?.querySelectorAll('.stat-counter-number')
        if (!counters) return

        const ctx = gsap.context(() => {
            counters.forEach((counter) => {
                const targetVal = parseInt(counter.getAttribute('data-target') || '0', 10)
                const suffix = counter.getAttribute('data-suffix') || ''
                const obj = { value: 0 }

                gsap.to(obj, {
                    value: targetVal,
                    duration: 2.5,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: counter,
                        start: 'top 85%',
                        toggleActions: 'play none none none',
                    },
                    onUpdate: () => {
                        counter.textContent = Math.round(obj.value) + suffix
                    }
                })
            })
        }, statsContainerRef)

        return () => ctx.revert()
    }, [])

    return (
        <div className="bg-[#FAF8F5] font-sans antialiased text-[#111111]">
            
            {/* --- TESTIMONIALS SECTION --- */}
            <section id="results" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
                {/* Cabeçalho */}
                <div className="text-center mb-20" data-aos="fade-up">
                    <span className="text-[10px] font-black tracking-[0.3em] text-[#bda07a] uppercase mb-4 inline-block">DEPOIMENTOS</span>
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-[#111111] leading-none">
                        Vidas <span className="font-serif italic font-light text-[#bda07a]">Transformadas</span>
                    </h2>
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    
                    {/* TESTIMONIAL 1 */}
                    <div className="bg-[#F5F2EB] p-8 rounded-[2rem] flex flex-col justify-between" data-aos="fade-up" data-aos-delay="100">
                        <div>
                            <div className="flex gap-1 text-[#bda07a] mb-6">
                                {[...Array(5)].map((_, i) => <Star key={i} size={16} weight="fill" />)}
                            </div>
                            <p className="text-[#66635f] font-light leading-relaxed italic text-sm md:text-base mb-6">
                                "O acompanhamento presencial da Jessica mudou minha postura e minha relação com a musculação. Os treinos são muito dinâmicos e adaptados para a minha escoliose. Sem dor há meses!"
                            </p>
                        </div>
                        <div>
                            <span className="font-bold text-[#111111] block text-sm">Ana Clara R.</span>
                            <span className="text-xs text-zinc-400">31 anos • Servidora Pública</span>
                        </div>
                    </div>

                    {/* TESTIMONIAL 2 */}
                    <div className="bg-[#F5F2EB] p-8 rounded-[2rem] flex flex-col justify-between" data-aos="fade-up" data-aos-delay="200">
                        <div>
                            <div className="flex gap-1 text-[#bda07a] mb-6">
                                {[...Array(5)].map((_, i) => <Star key={i} size={16} weight="fill" />)}
                            </div>
                            <p className="text-[#66635f] font-light leading-relaxed italic text-sm md:text-base mb-6">
                                "Com a consultoria online da Jessica consegui emagrecer 8kg de forma saudável e consistente. A planilha de treinos no app é super fácil de acompanhar e o suporte dela no Whats é impecável."
                            </p>
                        </div>
                        <div>
                            <span className="font-bold text-[#111111] block text-sm">Marina Silva</span>
                            <span className="text-xs text-zinc-400">27 anos • Advogada</span>
                        </div>
                    </div>

                    {/* TESTIMONIAL 3 */}
                    <div className="bg-[#F5F2EB] p-8 rounded-[2rem] flex flex-col justify-between" data-aos="fade-up" data-aos-delay="300">
                        <div>
                            <div className="flex gap-1 text-[#bda07a] mb-6">
                                {[...Array(5)].map((_, i) => <Star key={i} size={16} weight="fill" />)}
                            </div>
                            <p className="text-[#66635f] font-light leading-relaxed italic text-sm md:text-base mb-6">
                                "A atenção aos detalhes biomecânicos nas aulas presenciais fez toda a diferença. Como atleta amador de corrida, ganhei estabilidade e força que impactaram diretamente no meu pace."
                            </p>
                        </div>
                        <div>
                            <span className="font-bold text-[#111111] block text-sm">Carlos Eduardo G.</span>
                            <span className="text-xs text-zinc-400">42 anos • Empresário</span>
                        </div>
                    </div>

                </div>
            </section>

            {/* --- BEFORE / AFTER GALLERY (CASE STUDIES) --- */}
            <section className="py-32 bg-[#F5F2EB] px-6 md:px-12 border-t border-[#e6e2da]">
                <div className="max-w-7xl mx-auto">
                    
                    {/* Cabeçalho */}
                    <div className="text-center mb-20" data-aos="fade-up">
                        <span className="text-[10px] font-black tracking-[0.3em] text-[#bda07a] uppercase mb-4 inline-block">ESTUDOS DE CASO</span>
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-[#111111] leading-none">
                            Evolução & <span className="font-serif italic font-light text-[#bda07a]">Resultados</span>
                        </h2>
                    </div>

                    {/* Grid de Casos */}
                    <div className="grid md:grid-cols-3 gap-8">
                        
                        {/* CASE 1 */}
                        <div className="bg-white p-8 rounded-[2rem] border border-[#e6e2da] shadow-sm flex flex-col justify-between" data-aos="fade-up" data-aos-delay="100">
                            <div>
                                <span className="bg-[#111111] text-white text-[9px] font-bold px-3 py-1 uppercase rounded-full inline-block mb-6">Emagrecimento</span>
                                <h3 className="text-xl font-bold uppercase text-[#111111] mb-2">Mariana G.</h3>
                                <p className="text-[11px] font-mono text-[#bda07a] uppercase tracking-widest mb-6">Redução de 12 kg em 6 meses</p>
                                <p className="text-xs md:text-sm text-[#66635f] font-light leading-relaxed mb-6">
                                    Foco principal em recomposição corporal e ganho de força. Reduziu o percentual de gordura de 32% para 21% com manutenção de massa muscular ativa.
                                </p>
                            </div>
                            <div className="border-t border-[#e6e2da] pt-6 flex justify-between text-center mt-4">
                                <div>
                                    <span className="block text-xl font-black text-[#111111]">-12kg</span>
                                    <span className="text-[9px] uppercase tracking-wider text-[#bda07a] font-bold">Peso Total</span>
                                </div>
                                <div>
                                    <span className="block text-xl font-black text-[#111111]">-11%</span>
                                    <span className="text-[9px] uppercase tracking-wider text-[#bda07a] font-bold">Gordura</span>
                                </div>
                                <div>
                                    <span className="block text-xl font-black text-[#111111]">+1.5kg</span>
                                    <span className="text-[9px] uppercase tracking-wider text-[#bda07a] font-bold">Músculo</span>
                                </div>
                            </div>
                        </div>

                        {/* CASE 2 */}
                        <div className="bg-white p-8 rounded-[2rem] border border-[#e6e2da] shadow-sm flex flex-col justify-between" data-aos="fade-up" data-aos-delay="200">
                            <div>
                                <span className="bg-[#111111] text-white text-[9px] font-bold px-3 py-1 uppercase rounded-full inline-block mb-6">Hipertrofia</span>
                                <h3 className="text-xl font-bold uppercase text-[#111111] mb-2">Rodrigo A.</h3>
                                <p className="text-[11px] font-mono text-[#bda07a] uppercase tracking-widest mb-6">Ganho de 6 kg de massa magra</p>
                                <p className="text-xs md:text-sm text-[#66635f] font-light leading-relaxed mb-6">
                                    Foco em desenvolvimento de força máxima e simetria muscular de membros superiores. Aumento expressivo de cargas no agachamento e levantamento terra.
                                </p>
                            </div>
                            <div className="border-t border-[#e6e2da] pt-6 flex justify-between text-center mt-4">
                                <div>
                                    <span className="block text-xl font-black text-[#111111]">+6kg</span>
                                    <span className="text-[9px] uppercase tracking-wider text-[#bda07a] font-bold">Massa Magra</span>
                                </div>
                                <div>
                                    <span className="block text-xl font-black text-[#111111]">+35kg</span>
                                    <span className="text-[9px] uppercase tracking-wider text-[#bda07a] font-bold">Carga Agach.</span>
                                </div>
                                <div>
                                    <span className="block text-xl font-black text-[#111111]">-2%</span>
                                    <span className="text-[9px] uppercase tracking-wider text-[#bda07a] font-bold">Gordura</span>
                                </div>
                            </div>
                        </div>

                        {/* CASE 3 */}
                        <div className="bg-white p-8 rounded-[2rem] border border-[#e6e2da] shadow-sm flex flex-col justify-between" data-aos="fade-up" data-aos-delay="300">
                            <div>
                                <span className="bg-[#111111] text-white text-[9px] font-bold px-3 py-1 uppercase rounded-full inline-block mb-6">Definição</span>
                                <h3 className="text-xl font-bold uppercase text-[#111111] mb-2">Beatriz L.</h3>
                                <p className="text-[11px] font-mono text-[#bda07a] uppercase tracking-widest mb-6">Definição Abdominal & Postura</p>
                                <p className="text-xs md:text-sm text-[#66635f] font-light leading-relaxed mb-6">
                                    Alinhamento postural, fortalecimento lombar e tonificação geral de core. Eliminação de dores posturais causadas por longas jornadas sentada.
                                </p>
                            </div>
                            <div className="border-t border-[#e6e2da] pt-6 flex justify-between text-center mt-4">
                                <div>
                                    <span className="block text-xl font-black text-[#111111]">100%</span>
                                    <span className="text-[9px] uppercase tracking-wider text-[#bda07a] font-bold">Livre de Dor</span>
                                </div>
                                <div>
                                    <span className="block text-xl font-black text-[#111111]">-6cm</span>
                                    <span className="text-[9px] uppercase tracking-wider text-[#bda07a] font-bold">Cintura</span>
                                </div>
                                <div>
                                    <span className="block text-xl font-black text-[#111111]">+10%</span>
                                    <span className="text-[9px] uppercase tracking-wider text-[#bda07a] font-bold">Mobilidade</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* --- NUMBERS / STATS SECTION --- */}
            <section className="py-24 max-w-7xl mx-auto px-6 border-b border-[#e6e2da]">
                <div ref={statsContainerRef} className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                    <div data-aos="zoom-in" data-aos-delay="100">
                        <span className="stat-counter-number block text-4xl md:text-5xl font-black text-[#111111] mb-2" data-target="5" data-suffix="+">0+</span>
                        <span className="text-[9px] uppercase font-bold tracking-widest text-[#bda07a]">Anos de Experiência</span>
                    </div>
                    <div data-aos="zoom-in" data-aos-delay="200">
                        <span className="stat-counter-number block text-4xl md:text-5xl font-black text-[#111111] mb-2" data-target="150" data-suffix="+">0+</span>
                        <span className="text-[9px] uppercase font-bold tracking-widest text-[#bda07a]">Alunos Atendidos</span>
                    </div>
                    <div data-aos="zoom-in" data-aos-delay="300">
                        <span className="stat-counter-number block text-4xl md:text-5xl font-black text-[#111111] mb-2" data-target="98" data-suffix="%">0%</span>
                        <span className="text-[9px] uppercase font-bold tracking-widest text-[#bda07a]">Taxa de Fidelidade</span>
                    </div>
                    <div data-aos="zoom-in" data-aos-delay="400">
                        <span className="stat-counter-number block text-4xl md:text-5xl font-black text-[#111111] mb-2" data-target="100" data-suffix="%">0%</span>
                        <span className="text-[9px] uppercase font-bold tracking-widest text-[#bda07a]">Foco Científico</span>
                    </div>
                </div>
            </section>

            {/* --- FINAL CTA BANNER (READY TO START) --- */}
            <section id="cta" className="py-36 bg-[#111111] text-white text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/20 via-zinc-950 to-[#111111] pointer-events-none" />
                
                <div className="relative z-10 container mx-auto px-6 max-w-4xl" data-aos="fade-up">
                    <span className="text-[10px] font-black tracking-[0.4em] text-[#bda07a] uppercase mb-6 inline-block">FAÇA PARTE DO TIME</span>
                    <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tight leading-none mb-8">
                        Pronto para <br />
                        <span className="font-serif italic font-light text-[#bda07a] capitalize tracking-normal">começar?</span>
                    </h2>
                    <p className="text-[#a1a1a6] font-light text-sm md:text-base leading-relaxed max-w-md mx-auto mb-12">
                        Dê o primeiro passo para a sua transformação física. Clique no botão abaixo para conversar via WhatsApp e estruturar seu planejamento.
                    </p>
                    
                    <a
                        href="https://wa.me/5561996844400?text=Olá%20Jéssica!%20Acessei%20seu%20site%20e%20gostaria%20de%20agendar%20uma%20avaliação%20para%20começar%20os%20treinos."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-3 bg-[#bda07a] text-black px-12 py-6 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:scale-105 transition-all duration-300 shadow-xl"
                    >
                        <WhatsappLogo size={20} weight="fill" />
                        Agendar Minha Sessão
                    </a>
                </div>
            </section>

        </div>
    )
}