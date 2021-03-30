import axios from "axios";

const api = axios.create({
  baseURL: "https://atividade2ano.herokuapp.com/"
})

export default api;