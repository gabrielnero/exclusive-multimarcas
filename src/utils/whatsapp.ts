const WHATSAPP_NUMBER = "5554999999999";

export function getWhatsAppLink(message?: string): string {
  const text = message || "Olá! Tenho interesse em saber mais sobre os veículos da Exclusive Multimarcas.";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function getVehicleWhatsAppLink(marca: string, modelo: string, ano: number, id: string): string {
  const message = `Olá! Vi o *${marca} ${modelo} ${ano}* no site e gostaria de mais informações. Link: ${typeof window !== "undefined" ? window.location.origin : ""}/veiculo/${id}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
