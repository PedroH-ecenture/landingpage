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
  const response = await laravelApi.post("/usuarios", dados);
  return response.data;
};

// Listar todos os usuários
export const listarUsuarios = async () => {
  const response = await laravelApi.get("/usuarios");
  return response.data;
};

// Buscar um usuário específico por ID
export const buscarUsuario = async (id) => {
  const response = await laravelApi.get(`/usuarios/${id}`);
  return response.data;
};

// Atualizar usuário
export const atualizarUsuario = async (id, dados) => {
  const response = await laravelApi.put(`/usuarios/${id}`, dados);
  return response.data;
};



// Deletar usuário
// Precisa de um data, pois a exclusão está sendo feita por meio de cpf e email, e o método delete não envia um body direto com esses 2, enquanto com o ID sim
export const deletarUsuario = async ({ email, cpf }) => {
  const response = await laravelApi.delete('/usuarios', {
    data: { email, cpf },
  });
  return response.data;
};
/* 

Só desse jeito tava funcioanndo normal, estranho

await laravelApi.delete('/usuarios', {
  data: { email, cpf },
});

*/


