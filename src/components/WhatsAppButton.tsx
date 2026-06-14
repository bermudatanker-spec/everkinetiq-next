import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/31629317622"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat met ons op WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_30px_rgba(37,211,102,0.45)] transition hover:bg-[#22c35e]"
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366] opacity-60" />
      <MessageCircle className="h-7 w-7" fill="currentColor" />
    </a>
  );
}
