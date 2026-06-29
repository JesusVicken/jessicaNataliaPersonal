// app/_components/whatsapp.tsx
'use client'

import Link from 'next/link'

export default function WhatsappFloatingButton() {
    const whatsappNumber = '27996314135'
    const whatsappMessage = 'Olá Jessica! Gostaria de saber mais sobre o seu acompanhamento de personal e consultoria.'
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`

    return (
        <Link
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Fale conosco no WhatsApp sobre o workshop"
            className="
                fixed bottom-6 right-6 z-50 
                bg-green-600 hover:bg-green-700 
                p-4 rounded-full shadow-lg 
                transition-all duration-300
                w-12 h-12 flex items-center justify-center
                md:w-14 md:h-14 md:bottom-8 md:right-8
                animate-fade-in
            "
        >
            <svg
                className="w-7 h-7 md:w-8 md:h-8 text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                fill="currentColor"
            >
                <path d="M16.001 2.667C8.639 2.667 2.667 8.639 2.667 16c0 2.825.792 5.471 2.165 7.74L2 30l6.432-2.214A13.23 13.23 0 0 0 16 29.334c7.362 0 13.334-5.972 13.334-13.334 0-7.362-5.972-13.333-13.333-13.333zm0 24c-2.116 0-4.08-.584-5.77-1.59l-.413-.247-3.815 1.312 1.28-3.705-.267-.423c-1.13-1.785-1.778-3.877-1.778-6.013 0-6.075 4.925-11 11-11s11 4.925 11 11-4.925 11-11 11zm6.287-8.534c-.345-.173-2.04-1.005-2.356-1.118-.315-.114-.545-.173-.774.174s-.887 1.118-1.088 1.347c-.2.229-.4.258-.745.086s-1.448-.534-2.757-1.702c-1.02-.91-1.71-2.034-1.91-2.379-.2-.344-.022-.53.151-.703.155-.154.345-.4.517-.6.173-.2.23-.344.345-.573.114-.229.057-.43-.029-.602-.087-.173-.774-1.86-1.06-2.547-.28-.673-.562-.58-.774-.59l-.659-.011c-.229 0-.602.086-.917.43s-1.2 1.17-1.2 2.853 1.228 3.305 1.4 3.534c.172.229 2.416 3.69 5.86 5.18.82.354 1.46.566 1.96.724.823.262 1.57.225 2.16.137.659-.098 2.04-.832 2.327-1.636.286-.803.286-1.49.2-1.636-.087-.145-.316-.229-.66-.401z" />
            </svg>
        </Link>
    )
}