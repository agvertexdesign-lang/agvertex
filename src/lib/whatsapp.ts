export const WHATSAPP_NUMBER = "12896831234";

export function sendToWhatsApp(messageText: string) {
  const encodedText = encodeURIComponent(messageText);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`;
  
  // Open WhatsApp chat in new window / tab
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
}
