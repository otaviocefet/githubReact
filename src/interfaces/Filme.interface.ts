export interface IFilme {
    id: number;
    genero_id?: number;
    genero?: {
      id: number;
      nome: string;
    }
    user_id: number;
    nome: string;
    descricao: string;
  }