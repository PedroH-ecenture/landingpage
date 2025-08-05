import { useState, useEffect } from "react";
import "./App.css";

import Header from "./header";
import Footer from "./footer";
import "swiper/css";
import { buscarCEP } from "./api";
import { searchCPF } from "./api.jsx";
import { Routes, Route, useNavigate } from "react-router-dom";
import Institutional from "./institutional";
import Delete from "./deleteuser.jsx";
import { criarUsuario } from "./apilaravel.jsx";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);

  function formatarCEP(cep) {
    const apenasNumeros = cep.replace(/\D/g, "").slice(0, 8);
    if (apenasNumeros.length <= 5) return apenasNumeros;
    return apenasNumeros.slice(0, 5) + "-" + apenasNumeros.slice(5);
  }

  function formatTel(telefone) {
    const telNums = telefone.replace(/\D/g, "").slice(0, 11);

    if (telNums.length <= 2) return telNums;
    if (telNums.length <= 6) return `(${telNums.slice(0, 2)}) ${telNums.slice(2)}`;
    if (telNums.length <= 10)
      return `(${telNums.slice(0, 2)}) ${telNums.slice(2, 7)}-${telNums.slice(7)}`;
    return `(${telNums.slice(0, 2)}) ${telNums.slice(2, 7)}-${telNums.slice(7, 11)}`;
  }

  function formatCPF(cpf) {
    const nums = cpf.replace(/\D/g, "").slice(0, 11);

    if (nums.length <= 3) return nums;
    if (nums.length <= 6) return `${nums.slice(0, 3)}.${nums.slice(3)}`;
    if (nums.length <= 9) return `${nums.slice(0, 3)}.${nums.slice(3, 6)}.${nums.slice(6)}`;
    return `${nums.slice(0, 3)}.${nums.slice(3, 6)}.${nums.slice(6, 9)}-${nums.slice(9)}`;
  }

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    email: "",
    cpf: "",
    cep: "",
    logradouro: "",
    complemento: "",
    unidade: "",
    bairro: "",
    localidade: "",
    uf: "",
    estado: "",
    regiao: "",
    ibge: "",
    gia: "",
    ddd: "",
    siafi: "",
    numero: "",
  });

  const [showTelefone, setShowTelefone] = useState(true);
  const [showExtraFields, setShowExtraFields] = useState(false);
  const [showAddressFields, setShowAddressFields] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Mantenha o estado SEM máscara para telefone e cpf
    if (name === "telefone" || name === "cpf" || name === "cep") {
      const numericValue = value.replace(/\D/g, "");
      setFormData({ ...formData, [name]: numericValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const isValidCPF = (cpf) => {
    cpf = cpf.replace(/\D/g, "");
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    let soma = 0;
    for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;
    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(cpf.charAt(10));
  };

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrors({});
    setLoad(true);

    try {
      const dadosParaEnviar = {
        ...formData,
        // Esses já estão sem máscara porque o estado mantém limpo
        telefone: formData.telefone,
        cpf: formData.cpf,
      };

      console.log("Dados para enviar:", dadosParaEnviar);

      await criarUsuario(dadosParaEnviar);

      setSuccessMessage("Usuário criado com sucesso!");
      setFormData({
        nome: "",
        telefone: "",
        email: "",
        cpf: "",
        cep: "",
        logradouro: "",
        complemento: "",
        unidade: "",
        bairro: "",
        localidade: "",
        uf: "",
        estado: "",
        regiao: "",
        ibge: "",
        gia: "",
        ddd: "",
        siafi: "",
        numero: "",
      });
      setShowExtraFields(false);
      setShowAddressFields(false);
      navigate("/");
    } catch (error) {
      console.error("Erro completo:", error);
      setErrors({
        api: error.response?.data?.message || "Erro ao cadastrar usuário. Tente novamente.",
      });
    } finally {
      setLoad(false);
    }
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="flex flex-col min-h-screen">
            <Header darkMode={darkMode} setDarkMode={setDarkMode} />
            <div
              className={`relative flex flex-col items-center justify-center min-h-screen transition-colors duration-300 ${
                darkMode ? "bg-gray-900 text-white" : "bg-blue-200 text-black"
              }`}
            >
              <button
                type="button"
                onClick={() => navigate("/edituser")}
                className={`absolute top-10.5 right-4 px-4 py-2 rounded-lg transition 
                  ${
                    darkMode
                      ? "bg-white text-black hover:bg-gray-200"
                      : "bg-black text-white hover:bg-gray-800"
                  }`}
              >
                Editar usuários
              </button>

              <button
                type="button"
                onClick={() => navigate("/viewuser")}
                className={`absolute top-28.5 right-4 px-4 py-2 rounded-lg transition 
                  ${
                    darkMode
                      ? "bg-white text-black hover:bg-gray-200"
                      : "bg-black text-white hover:bg-gray-800"
                  }`}
              >
                Listar usuários
              </button>

              <button
  type="button"
  onClick={() => navigate("/deleteuser")}
  className={`absolute top-46.5 right-4 px-4 py-2 rounded-lg transition 
    ${darkMode ? "bg-white text-black hover:bg-gray-200" : "bg-black text-white hover:bg-gray-800"}`}
>
  Deletar usuários
</button>


              <form
                onSubmit={handleSubmit}
                className={`p-8 rounded-xl shadow-lg w-full max-w-md space-y-4 ${
                  darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
                }`}
              >
                <fieldset disabled={load} className="space-y-4">
                  <h2 className="text-2xl font-bold text-center">
                    Formulário de Cadastro
                  </h2>

                  <input
                    type="text"
                    name="nome"
                    placeholder="Nome"
                    value={formData.nome}
                    onChange={handleChange}
                    onFocus={() => setShowExtraFields(true)}
                    className="w-full px-3 py-2 border border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 dark:placeholder-gray-500 disabled:bg-gray-100 disabled:text-gray-500"
                  />

                  {showExtraFields && (
                    <div className="space-y-4">
                      <input
                        type="text"
                        name="cep"
                        placeholder="CEP"
                        value={formatarCEP(formData.cep)}
                        onChange={async (e) => {
                          handleChange(e);
                          const cepFormatado = formatarCEP(e.target.value);
                          setFormData((prev) => ({
                            ...prev,
                            cep: cepFormatado.replace(/\D/g, ""),
                          }));

                          try {
                            if (cepFormatado.replace(/\D/g, "").length === 8) {
                              const data = await buscarCEP(cepFormatado);
                              setFormData((prev) => ({
                                ...prev,
                                logradouro: data.logradouro || "",
                                complemento: data.complemento || "",
                                unidade: data.unidade || "",
                                bairro: data.bairro || "",
                                localidade: data.localidade || "",
                                uf: data.uf || "",
                                estado: "",
                                regiao: "",
                                ibge: data.ibge || "",
                                gia: data.gia || "",
                                ddd: data.ddd || "",
                                siafi: data.siafi || "",
                              }));
                              setShowAddressFields(true);
                            }
                            setErrors((prev) => ({ ...prev, cep: "" }));
                          } catch (error) {
                            setErrors((prev) => ({ ...prev, cep: error.message }));
                            setShowAddressFields(false);
                          }
                        }}
                        className="w-full px-3 py-2 border border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
                      />
                      {errors.cep && (
                        <p className="text-sm text-red-500 mt-1 ml-1">{errors.cep}</p>
                      )}

                      {showAddressFields && (
                        <div className="ml-4 space-y-2 bg-gray-50 p-3 rounded-lg">
                          {[
                            "logradouro",
                            "complemento",
                            "unidade",
                            "bairro",
                            "localidade",
                            "uf",
                            "estado",
                            "regiao",
                            "ibge",
                            "gia",
                            "ddd",
                            "siafi",
                          ].map((field) => (
                            <input
                              key={field}
                              type="text"
                              name={field}
                              placeholder={field}
                              value={formData[field]}
                              onChange={handleChange}
                              className="w-full px-3 py-2 border border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="relative">
                    <input
                      type={showTelefone ? "text" : "password"}
                      name="telefone"
                      placeholder="Telefone (somente números)"
                      maxLength={15}
                      value={formatTel(formData.telefone)}
                      onChange={(e) => {
                        const numericValue = e.target.value.replace(/\D/g, "").slice(0, 11);
                        setFormData({ ...formData, telefone: numericValue });
                      }}
                      className="w-full px-3 py-2 border border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 dark:placeholder-gray-500 disabled:bg-gray-100 disabled:text-gray-500"
                    />
                    {errors.telefone && (
                      <p className="text-sm text-red-500 mt-1 ml-1">{errors.telefone}</p>
                    )}
                    <button
                      type="button"
                      onClick={() => setShowTelefone(!showTelefone)}
                      className="absolute right-2 top-2 text-gray-600 hover:text-gray-800"
                      disabled={load}
                    >
                      {showTelefone ? "👁" : "🙈"}
                    </button>
                  </div>

                  <input
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 dark:placeholder-gray-500 disabled:bg-gray-100 disabled:text-gray-500"
                  />

                  <input
                    type="text"
                    name="cpf"
                    placeholder="CPF"
                    maxLength={14}
                    value={formatCPF(formData.cpf)}
                    onChange={(e) => {
                      const numericValue = e.target.value.replace(/\D/g, "").slice(0, 11);
                      setFormData({ ...formData, cpf: numericValue });
                    }}
                    className="w-full px-3 py-2 border border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 dark:placeholder-gray-500 disabled:bg-gray-100 disabled:text-gray-500"
                  />
                  {errors.cpf && (
                    <p className="text-sm text-red-500 mt-1 ml-1">{errors.cpf}</p>
                  )}
                </fieldset>

                {errors.api && (
                  <p className="text-sm text-red-500 text-center mt-2">{errors.api}</p>
                )}

                <button
                  type="submit"
                  disabled={load}
                  className={`w-full sm:w-auto py-2 px-6 rounded-lg transition duration-200 block mx-auto font-semibold
                  ${
                    load
                      ? "bg-blue-700 text-white cursor-wait animate-pulse"
                      : "bg-blue-400 text-black hover:bg-blue-800 hover:text-white dark:bg-blue-800 dark:hover:bg-blue-400 dark:text-white dark:hover:text-black"
                  }`}
                >
                  {load ? "Enviando..." : "Enviar"}
                </button>

                {successMessage && (
                  <p className="text-green-600 text-center mt-2">{successMessage}</p>
                )}
              </form>
            </div>
            <Footer />
          </div>
        }
      />
      <Route path="/institutional" element={<Institutional />} />
      <Route path="/deleteuser" element={<Delete />} />
    </Routes>
  );
}
