import api from "api";
import { IFilme } from "../../../interfaces/Filme.interface"

class FilmeData {
  index() {
    return api.get<IFilme[]>('filmes');
  }
  show(id: number) {
    return api.get<IFilme>(`filmes/${id}`);
  }
  store(data: IFilme) {
    return api.post<IFilme>(`filmes`, data);
  }
  update(id: number, data: IFilme) {
    return api.put<IFilme>(`filmes/${id}`, data);
  }
  delete(id: number) {
    return api.delete<IFilme>(`filmes/${id}`);
  }
}

export default new FilmeData();