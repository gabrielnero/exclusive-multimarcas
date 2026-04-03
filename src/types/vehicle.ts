export type VehiclePublic = {
  id: string;
  marca: string;
  modelo: string;
  versao: string;
  ano: number;
  preco: number;
  km: number;
  combustivel: string;
  cambio: string;
  cor: string;
  tipo: string;
  descricao: string;
  opcionais: string[];
  imagens: string[];
  destaque: boolean;
  oferta: boolean;
  vendido: boolean;
};
