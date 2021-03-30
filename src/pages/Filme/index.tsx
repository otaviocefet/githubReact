import { useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Loading } from "components";
import { FaPlusCircle, FaPencilAlt } from "react-icons/fa";
import { apiFilme } from "api/data";
import { IFilme } from "interfaces/Filme.interface";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import { Button } from "styles";
import * as S from "./style";

const Filme = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [filmes, setFilmes] = useState<IFilme[]>([]);
  const history = useHistory();

  const fetchData = async () => {
    const response = await apiFilme.index();
    setFilmes(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      toast.error(error);
    }
  }, []);

  const handleDelete = useCallback(async (id: number) => {
    confirmAlert({
      title: "Atenção",
      message: "Tem certeza que deseja apagar o item selecionado?",
      buttons: [
        {
          label: "SIM",
          onClick: async () => {
            await apiFilme.delete(id);
            toast.success("Filme removido!");
            fetchData();
          },
        },
        {
          label: "NÃO",
          onClick: () => console.log("não"),
        },
      ],
    });
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Button bgColor="success" onClick={() => history.push("/aluno/0")}>
            <FaPlusCircle /> &nbsp; Adicionar
          </Button>
          <S.Table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Gênero</th>
                <th>Descrição</th>
                <th>Editar</th>
                <th>Remover</th>
              </tr>
            </thead>
            <tbody>
              {filmes &&
                filmes.map((item) => (
                  <tr key={item.id}>
                    <td>{item.nome}</td>
                    <td>{item.descricao}</td>
                    <td>
                      <Button
                        bgColor="primary"
                        onClick={() => history.push(`filme/${item.id}`)}
                      >
                        <FaPencilAlt />
                      </Button>
                    </td>
                    <td>
                      <Button
                        bgColor="danger"
                        onClick={() => handleDelete(item.id)}
                      >
                        <FaPencilAlt />
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </S.Table>
        </>
      )}
    </>
  );
};
export default Filme;