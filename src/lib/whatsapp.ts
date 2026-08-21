export const WHATSAPP_NUMBER = "12896831234";

export function sendToWhatsApp(message: string | string[]) {
  const text = Array.isArray(message) ? message.join("\n") : message;
  const encodedText = encodeURIComponent(text);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`;
  
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
}
