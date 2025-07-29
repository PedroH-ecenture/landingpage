import axios from "axios";

// Criando uma instância do Axios apontando para o backend Laravel
const laravelApi = axios.create({
  baseURL: "http://localhost:8000/api", // URL do backend Laravel
  headers: {
    "Content-Type": "application/json",
  },
});

// Criar novo usuário
export const criarUsuario = async (dados) => {
  const response = await laravelApi.post("/users", dados);
  return response.data;
};

// Listar todos os usuários
export const listarUsuarios = async () => {
  const response = await laravelApi.get("/users");
  return response.data;
};

// Buscar um usuário específico por ID
export const buscarUsuario = async (id) => {
  const response = await laravelApi.get(`/users/${id}`);
  return response.data;
};

// Atualizar usuário
export const atualizarUsuario = async (id, dados) => {
  const response = await laravelApi.put(`/users/${id}`, dados);
  return response.data;
};

// Deletar usuário
export const deletarUsuario = async (id) => {
  await laravelApi.delete(`/users/${id}`);
};
