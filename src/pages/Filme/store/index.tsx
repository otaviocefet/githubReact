import { useEffect, useState, useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaHandPointLeft, FaSave } from "react-icons/fa";
import { toast } from "react-toastify";
import { apiFilme, apiGenero } from "api/data";
import { Loading } from "components";
import { Input, Button, Form, Link, Select, Textarea } from "styles";
import { IFilme } from "interfaces/Filme.interface";
import { IGenero } from "interfaces/Genero.interface";

const FilmeStore = () => {
  const [filme, setFilme] = useState<IFilme>({} as IFilme);
  const [genero, setGenero] = useState<IGenero[]>({} as IGenero[]);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const { handleSubmit, register, errors } = useForm();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchGenero = async () => {
      try {
        const response = await apiGenero.index();
        setGenero(response.data);
      } catch (error) {
        toast.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGenero();
    if (Number(id) > 0) {
      const fetchData = async (id: number) => {
        try {
          const response = await apiFilme.show(id);
          setFilme(response.data);
        } catch (error) {
          toast.error(error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData(Number(id));
    } else {
      setIsLoading(false);
    }
  }, [id]);

  const handleChange = useCallback(
    async (e) => {
      setFilme({ ...filme, [e.target.name]: e.target.value });
    },
    [filme]
  );

  const onSubmit = useCallback(
    async (data) => {
      try {
        if (data.id > 0) {
          await apiFilme.update(data.id, data);
          toast.success("Filme Alterado com sucesso!");
        } else {
          await apiFilme.store(data);
          toast.success("Filme Cadastrado com sucesso!");
        }
        history.push("/filme");
      } catch (error) {
        toast.error(() =>
          error.response.data ? error.response.data.join("\n") : error.message
        );
      }
    },
    [history]
  );
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Link onClick={() => history.push("/filme")} bgColor="warning">
            <FaHandPointLeft /> &nbsp; Voltar
          </Link>
          <Form method="POST" onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" name="id" value={id || ""} ref={register} />
            <div>
              <label htmlFor="curso">Genero: </label>
              <Select
                name="genero_id"
                id="genero"
                value={filme.genero_id || ""}
                onChange={handleChange}
                ref={register({ required: true })}
                required
                error={errors.nome}
              >
                <option></option>
                {genero.length > 0 &&
                  genero.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.tipo}
                    </option>
                  ))}
              </Select>
            </div>
            <div>
              <label htmlFor="nome">Nome: </label>
              <Input
                type="text"
                name="nome"
                id="nome"
                value={filme.nome || ""}
                onChange={handleChange}
                ref={register({ required: true })}
                required
                error={errors.nome}
              />
            </div>
            <div>
              <label htmlFor="descricao">Descrição: </label>
              <Textarea
                name="descricao"
                id="descricao"
                value={filme.descricao || ""}
                onChange={handleChange}
                ref={register({ required: true })}
                required
                error={errors.descricao}
              />
            </div>
            <Button bgColor="success" type="submit">
              <FaSave /> &nbsp; Salvar
            </Button>
          </Form>
        </>
      )}
    </>
  );
};
export default FilmeStore;