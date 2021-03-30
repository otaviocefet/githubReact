import { useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Loading } from "components";
import { FaPlusCircle, FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { apiGenero } from "api/data";
import { IGenero } from "interfaces/Genero.interface";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import { Button } from "styles";
import * as S from "./styles";

const Genero = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [generos, setGeneros] = useState<IGenero[]>([]);
  const history = useHistory();

  const fetchData = async () => {
    const response = await apiGenero.index();
    setGeneros(response.data);
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
            await apiGenero.delete(id);
            toast.success("Genero removido!");
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
          <Button bgColor="success" onClick={() => history.push("/genero/0")}>
            <FaPlusCircle /> &nbsp; Adicionar
          </Button>
          <S.Table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Editar</th>
                <th>Remover</th>
              </tr>
            </thead>
            <tbody>
              {generos &&
                generos.map((item) => (
                  <tr key={item.id}>
                    <td>{item.tipo}</td>
                    <td>
                      <Button
                        bgColor="primary"
                        onClick={() => history.push(`genero/${item.id}`)}
                      >
                        <FaPencilAlt />
                      </Button>
                    </td>
                    <td>
                      <Button
                        bgColor="danger"
                        onClick={() => handleDelete(item.id)}
                      >
                        <FaTrashAlt />
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
export default Genero;