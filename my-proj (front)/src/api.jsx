import axios from "axios";

export const buscarCEP = async (cep, setFormData, setShowAddressFields) => {
  const cepLimpo = cep.replace(/\D/g, "");
  if (cepLimpo.length !== 8) {
    alert("CEP inválido");
    return;
  }

  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cepLimpo}/json/`);
    if (response.data.erro) {
      alert("CEP não encontrado");
      return;
    }

    setFormData(prev => ({
      ...prev,
      logradouro: response.data.logradouro || "",
      complemento: response.data.complemento || "",
      unidade: response.data.unidade || "",
      bairro: response.data.bairro || "",
      localidade: response.data.localidade || "",
      uf: response.data.uf || "",
      estado: "", // não vem da API, precisa mapear
      regiao: "", // idem
      ibge: response.data.ibge || "",
      gia: response.data.gia || "",
      ddd: response.data.ddd || "",
      siafi: response.data.siafi || "",
    }));

    setShowAddressFields(true);
  } catch (error) {
    alert("Erro ao buscar CEP");
  }
};
