'use client'

import { useState } from 'react'
import { 
    GraduationCap, 
    FlowerLotus, 
    Barbell, 
    Sparkle, 
    CalendarBlank, 
    BookmarkSimple
} from '@phosphor-icons/react'

interface Certification {
    title: string
    institution: string
    period: string
    category: 'specialization' | 'pilates' | 'training' | 'health' | 'other'
}

const CERTIFICATIONS: Certification[] = [
    {
        title: "Método PHF — Periodização Hormonal Feminina",
        institution: "Instituto Adapta & Faculdade Focus (Profa. Dra. Bianca Ramallo)",
        period: "Junho / 2026",
        category: "specialization",
    },
    {
        title: "Treinamento, Metabolismo e Fisiologia Hormonal Feminina",
        institution: "UNIGUAÇU",
        period: "Abril / 2021",
        category: "specialization",
    },
    {
        title: "Pós-graduação em Personal Trainer",
        institution: "Inades",
        period: "Março/2021 - Fevereiro/22",
        category: "specialization",
    },
    {
        title: "Formação Completa em Pilates",
        institution: "Grupo Virtus",
        period: "Fevereiro / 2024",
        category: "pilates",
    },
    {
        title: "Bases do Pilates Clássico",
        institution: "Rede BodyTech",
        period: "Outubro / 2023",
        category: "pilates",
    },
    {
        title: "Pilates Solo",
        institution: "UCB (Congresso Internacional)",
        period: "Maio / 2015",
        category: "pilates",
    },
    {
        title: "Certificação Treinador Core360 4.0",
        institution: "Core 360",
        period: "Março / 2023",
        category: "training",
    },
    {
        title: "Bases Científicas de Treinamento de Hipertrofia e Emagrecimento",
        institution: "Paulo Gentil",
        period: "Agosto / 2018",
        category: "training",
    },
    {
        title: "Kettlebells Training Systems",
        institution: "MR1 Training e Performance",
        period: "Setembro / 2018",
        category: "training",
    },
    {
        title: "Fita de Suspensão Training Systems",
        institution: "MR1 Training e Performance",
        period: "Setembro / 2018",
        category: "training",
    },
    {
        title: "ITS - Intervaled Training Systems",
        institution: "MR1 Training e Performance",
        period: "Setembro / 2018",
        category: "training",
    },
    {
        title: "Massoterapeuta Desportiva e Relaxante",
        institution: "Massoterapia Brasiliense - Cura com as mãos",
        period: "Março / 2021",
        category: "health",
    },
    {
        title: "Congresso Nutrição Brasil",
        institution: "Science Play",
        period: "Agosto / 2024",
        category: "health",
    },
    {
        title: "Atividade Física Adaptada",
        institution: "UCB (Congresso Internacional)",
        period: "Abril / 2014",
        category: "health",
    },
    {
        title: "Hidroginástica para Grupos Especiais",
        institution: "UCB (Congresso Internacional)",
        period: "Abril / 2014",
        category: "health",
    },
    {
        title: "Clínica de Musculação",
        institution: "Goiânia Capital Fitness",
        period: "Abril / 2016",
        category: "training",
    },
    {
        title: "Cycling Indoor",
        institution: "Goiânia Capital Fitness",
        period: "Abril / 2016",
        category: "training",
    },
    {
        title: "Flexibilidade, Alongamento e Relaxamento",
        institution: "Brasília Capital Fitness",
        period: "Agosto / 2008",
        category: "health",
    },
    {
        title: "Trabalhando com Recreação na Escola",
        institution: "Brasília Capital Fitness",
        period: "Agosto / 2008",
        category: "other",
    },
    {
        title: "Cursos de Formação de Ginástica de Academia",
        institution: "Cia. do Corpo",
        period: "Junho/2008 - Julho/2008",
        category: "training",
    }
]

const CATEGORIES = [
    { id: 'all', label: 'Todos' },
    { id: 'specialization', label: 'Especializações & Hormônios', icon: <GraduationCap size={14} /> },
    { id: 'pilates', label: 'Pilates', icon: <FlowerLotus size={14} /> },
    { id: 'training', label: 'Treinamento & Força', icon: <Barbell size={14} /> },
    { id: 'health', label: 'Massoterapia & Saúde', icon: <Sparkle size={14} /> },
]

export function CertificationsSection() {
    const [activeTab, setActiveTab] = useState<string>('all')

    const filteredCertifications = activeTab === 'all'
        ? CERTIFICATIONS
        : CERTIFICATIONS.filter(c => c.category === activeTab)

    const getIcon = (category: string) => {
        switch (category) {
            case 'specialization':
                return <GraduationCap size={20} className="text-[#1d7682]" weight="fill" />
            case 'pilates':
                return <FlowerLotus size={20} className="text-[#1d7682]" weight="fill" />
            case 'training':
                return <Barbell size={20} className="text-[#1d7682]" weight="fill" />
            case 'health':
                return <Sparkle size={20} className="text-[#1d7682]" weight="fill" />
            default:
                return <BookmarkSimple size={20} className="text-[#1d7682]" weight="fill" />
        }
    }

    const getCategoryBadge = (category: string) => {
        switch (category) {
            case 'specialization':
                return 'bg-[#1d7682]/10 text-[#1d7682]'
            case 'pilates':
                return 'bg-emerald-50 text-emerald-700 border border-emerald-100'
            case 'training':
                return 'bg-blue-50 text-blue-700 border border-blue-100'
            case 'health':
                return 'bg-purple-50 text-purple-700 border border-purple-100'
            default:
                return 'bg-zinc-100 text-zinc-600'
        }
    }

    const getCategoryLabel = (category: string) => {
        switch (category) {
            case 'specialization': return 'Pós & Fisiologia'
            case 'pilates': return 'Pilates'
            case 'training': return 'Treino de Força'
            case 'health': return 'Saúde & Recovery'
            default: return 'Outros'
        }
    }

    return (
        <section 
            id="certifications" 
            className="bg-[#FAF8F5] py-24 md:py-36 px-6 md:px-12 border-t border-[#e6e2da] overflow-hidden relative font-sans text-[#111111]"
        >
            {/* Linhas decorativas estéticas */}
            <div className="absolute top-0 left-1/4 w-[1px] h-full bg-[#e6e2da]/40 pointer-events-none hidden lg:block" />
            <div className="absolute top-0 left-3/4 w-[1px] h-full bg-[#e6e2da]/40 pointer-events-none hidden lg:block" />

            <div className="container mx-auto max-w-7xl relative z-10">
                {/* Header */}
                <div className="text-center mb-16" data-aos="fade-up">
                    <span className="text-[10px] font-black tracking-[0.35em] text-[#1d7682] uppercase block mb-4">
                        AUTORIDADE & CIÊNCIA
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-[#111111] leading-none mb-6">
                        Formação & <span className="font-serif italic font-light text-[#1d7682]">Educação Continuada</span>
                    </h2>
                    <p className="text-xs sm:text-sm md:text-base text-zinc-500 font-light max-w-2xl mx-auto leading-relaxed">
                        Uma trajetória de aperfeiçoamento contínuo nas melhores instituições para prescrever treinos com precisão científica, segurança e foco no público feminino.
                    </p>
                </div>

                {/* Filtros por Categoria */}
                <div 
                    className="flex flex-wrap justify-center gap-2 mb-12 max-w-4xl mx-auto" 
                    data-aos="fade-up"
                >
                    {CATEGORIES.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${
                                activeTab === tab.id
                                    ? 'bg-[#111111] text-white shadow-md'
                                    : 'bg-white text-zinc-600 border border-[#e6e2da] hover:border-[#1d7682] hover:text-[#1d7682]'
                            }`}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Grid de Certificações */}
                <div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    data-aos="fade-up"
                >
                    {filteredCertifications.map((cert, index) => (
                        <div
                            key={`cert-${index}`}
                            className="bg-white p-6 rounded-[2rem] border border-[#e6e2da] hover:border-[#1d7682] hover:shadow-xl transition-all duration-500 flex flex-col justify-between group hover:-translate-y-1 will-change-transform"
                        >
                            <div>
                                {/* Top info: badge & icon */}
                                <div className="flex justify-between items-start mb-6">
                                    <span className={`text-[8px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${getCategoryBadge(cert.category)}`}>
                                        {getCategoryLabel(cert.category)}
                                    </span>
                                    <div className="w-8 h-8 rounded-full bg-zinc-50 flex items-center justify-center group-hover:bg-[#1d7682]/10 transition-colors duration-300">
                                        {getIcon(cert.category)}
                                    </div>
                                </div>

                                {/* Title & Institution */}
                                <h3 className="text-sm font-bold text-[#111111] leading-snug tracking-tight mb-2 group-hover:text-[#1d7682] transition-colors duration-300 font-sans">
                                    {cert.title}
                                </h3>
                                <p className="text-xs text-zinc-500 font-light leading-relaxed mb-6">
                                    {cert.institution}
                                </p>
                            </div>

                            {/* Bottom: Date */}
                            <div className="flex items-center gap-2 pt-4 border-t border-zinc-100 text-[10px] text-zinc-400 font-mono">
                                <CalendarBlank size={12} />
                                <span>{cert.period}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
