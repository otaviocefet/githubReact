import api from "api";
import { IGenero } from "interfaces/Genero.interface"

class GeneroData {
  index() {
    return api.get<IGenero[]>('alunos');
  }
  show(id: number) {
    return api.get<IGenero>(`alunos/${id}`);
  }
  store(data: IGenero) {
    return api.post<IGenero>(`alunos`, data);
  }
  update(id: number, data: IGenero) {
    return api.put<IGenero>(`alunos/${id}`, data);
  }
  delete(id: number) {
    return api.delete<IGenero>(`alunos/${id}`);
  }
}

export default new GeneroData();