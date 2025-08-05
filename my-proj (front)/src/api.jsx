import axios from "axios";

export const searchCPF = async (cpf) => {
  const cpfLimpo = cpf.replace(/\D/g, "");
  if (cpfLimpo.length !== 11) {
    throw new Error("CPF inválido");
  }
};

export const buscarCEP = async (cep) => {
  const cepLimpo = cep.replace(/\D/g, "");
  if (cepLimpo.length !== 8) {
    throw new Error("CEP inválido");
  }

  const response = await axios.get(`https://viacep.com.br/ws/${cepLimpo}/json/`);
  if (response.data.erro) {
    throw new Error("CEP não encontrado");
  }

  return response.data;
};
