'use client'

import { WhatsappLogo, CheckCircle } from '@phosphor-icons/react'

export default function CheckVaa() {
    return (
        <section className="bg-zinc-950 py-24 px-6 text-center border-t border-white/5 font-sans">
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter">
                    Escolha Seu Plano
                </h2>
                <p className="text-gray-400 text-lg mb-12 italic font-light">
                    "Invista na sua saúde, estética e performance com acompanhamento profissional personalizado."
                </p>

                {/* GRID DE INVESTIMENTO */}
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">

                    {/* CARD 01 - CONSULTORIA ONLINE */}
                    <div className="bg-black border border-white/10 p-8 md:p-10 relative overflow-hidden flex flex-col justify-between group hover:border-white/30 transition-all duration-500 shadow-2xl rounded-2xl">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

                        <div>
                            <div className="flex justify-between items-start mb-6">
                                <span className="text-gray-500 text-[10px] uppercase tracking-[0.3em] font-black">Plano Mensal</span>
                                <span className="bg-white text-black text-[10px] font-black px-2 py-0.5 uppercase">Online</span>
                            </div>

                            <h3 className="text-white text-3xl font-black uppercase mb-2 tracking-tight text-left">Consultoria</h3>
                            <div className="text-left mb-8">
                                <div className="text-4xl font-black text-white tracking-tighter">R$ 150 <span className="text-sm text-zinc-500 font-normal">/ mês</span></div>
                            </div>

                            {/* DETALHES */}
                            <div className="space-y-6 mb-10 text-left border-t border-white/10 py-6">
                                <div>
                                    <h4 className="text-white text-xs font-black uppercase mb-3 tracking-widest opacity-50">Principais Recursos</h4>
                                    <ul className="space-y-2">
                                        {["Treino personalizado no App", "Suporte tira-dúvidas via WhatsApp", "Feedback técnico por vídeo", "Planejamento dinâmico de cargas"].map((item) => (
                                            <li key={item} className="flex items-center gap-3 text-gray-400 text-sm">
                                                <CheckCircle size={16} className="text-white shrink-0" weight="fill" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <a
                            href="https://wa.me/5527996314135?text=Olá%20Jessica!%20Gostaria%20de%20me%20inscrever%20no%20plano%20de%20Consultoria%20Online%20(R$150/mês)."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full bg-white text-black hover:bg-zinc-200 font-black py-4 px-6 transition-all flex items-center justify-center gap-3 uppercase text-sm tracking-widest rounded-xl"
                        >
                            <WhatsappLogo size={24} weight="fill" />
                            Contratar Consultoria
                        </a>
                    </div>

                    {/* CARD 02 - PERSONAL PRESENCIAL */}
                    <div className="bg-black border border-white/20 p-8 md:p-10 relative overflow-hidden flex flex-col justify-between group hover:border-white/40 shadow-[0_0_50px_rgba(255,255,255,0.03)] transition-all duration-500 rounded-2xl">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-white shadow-[0_0_20px_rgba(255,255,255,0.4)]"></div>

                        <div>
                            <div className="flex justify-between items-start mb-6">
                                <span className="text-gray-500 text-[10px] uppercase tracking-[0.3em] font-black">Planos Customizados</span>
                                <span className="bg-[#25D366] text-white text-[10px] font-black px-2 py-0.5 uppercase">Presencial</span>
                            </div>

                            <h3 className="text-white text-3xl font-black uppercase mb-2 tracking-tight text-left">Personal VIP</h3>
                            <div className="text-left mb-8">
                                <div className="text-4xl font-black text-white tracking-tighter">Sob Consulta</div>
                            </div>

                            {/* DETALHES */}
                            <div className="space-y-6 mb-10 text-left border-t border-white/10 py-6">
                                <div>
                                    <h4 className="text-white text-xs font-black uppercase mb-3 tracking-widest opacity-50">Principais Recursos</h4>
                                    <ul className="space-y-4">
                                        <li className="flex items-start gap-3 text-gray-300 text-sm leading-tight">
                                            <CheckCircle size={18} className="text-[#25D366] shrink-0 mt-0.5" weight="fill" />
                                            <span>Acompanhamento VIP 1-on-1 presencial</span>
                                        </li>
                                        <li className="flex items-start gap-3 text-gray-300 text-sm leading-tight">
                                            <CheckCircle size={18} className="text-[#25D366] shrink-0 mt-0.5" weight="fill" />
                                            <span>Correção biomecânica em tempo real</span>
                                        </li>
                                        <li className="flex items-start gap-3 text-gray-300 text-sm leading-tight">
                                            <CheckCircle size={18} className="text-[#25D366] shrink-0 mt-0.5" weight="fill" />
                                            <span>Máximo rendimento e motivação</span>
                                        </li>
                                    </ul>
                                </div>
                                <p className="text-gray-500 text-xs italic leading-relaxed">
                                    Disponibilidade e valores variam de acordo com o número de sessões semanais e localização.
                                </p>
                            </div>
                        </div>

                        <a
                            href="https://wa.me/5527996314135?text=Olá%20Jessica!%20Gostaria%20de%20saber%20valores%20e%20disponibilidade%20para%20o%20acompanhamento%20de%20Personal%20Trainer%20Presencial."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full bg-[#25D366] text-white hover:bg-[#1eb957] font-black py-4 px-6 transition-all flex items-center justify-center gap-3 uppercase text-sm tracking-widest shadow-[0_10px_30px_rgba(37,211,102,0.2)] rounded-xl"
                        >
                            <WhatsappLogo size={24} weight="fill" />
                            Consultar Disponibilidade
                        </a>
                    </div>

                </div>

                <div className="mt-16 flex flex-col items-center gap-4">
                    <p className="text-[10px] text-gray-600 uppercase tracking-[0.4em] font-bold">
                        Vagas limitadas • Brasília/DF • Jessica Natalia Personal
                    </p>
                </div>
            </div>
        </section>
    )
}