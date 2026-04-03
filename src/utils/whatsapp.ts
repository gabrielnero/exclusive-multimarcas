const WHATSAPP_NUMBER = "5554996083808";

export function getWhatsAppLink(message?: string): string {
  const text = message || "Olá! Vim pelo site e gostaria de mais informações sobre os veículos da Exclusive Multimarcas.";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function getVehicleWhatsAppLink(marca: string, modelo: string, ano: number, id: string): string {
  const message = `Olá! Vi o *${marca} ${modelo} ${ano}* no site da Exclusive Multimarcas e gostaria de mais informações. Podem me atender?`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
