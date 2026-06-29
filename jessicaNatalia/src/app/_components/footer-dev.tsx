"use client";

import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

export default function FooterDev() {
    return (
        <footer className="w-full bg-black text-white py-2 mt-auto">
            <div className="container mx-auto px-4">
                <Separator className="mb-2 bg-white/20" />
                <motion.div
                    className="flex items-center justify-center gap-1 text-sm text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="text-white/70">Desenvolvido por</span>
                    <a
                        href="https://instagram.com/v1ccken"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 hover:opacity-90 transition-transform hover:scale-105"
                    >
                        <span className="font-semibold">@v1ccken</span>
                        <InstagramIcon />
                    </a>
                </motion.div>
            </div>
        </footer>
    );
}

function InstagramIcon() {
    return (
        <svg
            className="w-4 h-4 transition-transform hover:scale-110"
            viewBox="0 0 24 24"
        >
            <defs>
                <linearGradient id="instaGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#feda75" />
                    <stop offset="40%" stopColor="#fa7e1e" />
                    <stop offset="80%" stopColor="#d62976" />
                    <stop offset="100%" stopColor="#962fbf" />
                </linearGradient>
            </defs>
            <path
                fill="white"
                d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm4.5-.75a1 1 0 100 2 1 1 0 000-2z"
            />
        </svg>
    );
}
