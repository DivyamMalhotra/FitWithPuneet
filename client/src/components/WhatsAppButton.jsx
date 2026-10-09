import { WA_LINK } from "../config.js";

export default function WhatsAppButton() {
  return (
    <a
      href={WA_LINK}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with FitWithPuneet on WhatsApp"
      className="fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg active:scale-95"
    >
      <svg viewBox="0 0 24 24" className="h-7 w-7 fill-white">
        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.200a8.200 8.200 0 0 1-4.200-1.200l-.3-.2-3 .8.8-2.900-.2-.3A8.200 8.200 0 1 1 12 20.200zm4.500-6.100c-.2-.1-1.500-.7-1.700-.8-.2-.1-.4-.1-.6.100l-.8 1c-.1.200-.3.200-.5.100-1.500-.7-2.400-1.300-3.400-2.900-.3-.4.300-.4.800-1.400.1-.2 0-.3 0-.5l-.8-1.800c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.100-.7.300-.7.700-1 1.500-.9 2.400.2 1.100.8 2.100 1.600 2.900 1.400 1.500 3 2.500 5 3 .6.200 1.200.2 1.700.1.500-.1 1.500-.6 1.700-1.200.2-.6.200-1.100.1-1.200-.1-.1-.3-.2-.5-.3z" />
      </svg>
    </a>
  );
}
