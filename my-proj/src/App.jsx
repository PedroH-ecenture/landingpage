import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./header";
import Footer from "./footer";
import Banner from "./banner";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { buscarCEP } from "./api"; // importa a função do arquivo api.jsx

export default function Formulario() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    email: "",
    cpf: "39053344705",
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

    if (name === "telefone") {
      const numericValue = value.replace(/\D/g, "").slice(0, 11);
      setFormData({ ...formData, telefone: numericValue });
    } else if (name === "cpf") {
      const numericValue = value.replace(/\D/g, "").slice(0, 11);
      setFormData({ ...formData, cpf: numericValue });
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!/^\d{10,11}$/.test(formData.telefone)) {
      alert("O telefone deve ter apenas números e 10 ou 11 dígitos.");
      return;
    }

    if (!isValidCPF(formData.cpf)) {
      alert("CPF inválido.");
      return;
    }

    console.log("Dados enviados:", formData);
    alert("Formulário enviado com sucesso!");
  };

  if (currentPage === "banner") {
    return (
      <div className="flex flex-col min-h-screen">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <div
          className={`flex-1 ${darkMode ? "bg-gray-900 text-white" : "bg-blue-200 text-black"
            }`}
        >
          <button
            onClick={() => setCurrentPage("home")}
            className="m-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Voltar ao Formulário
          </button>
          <Banner />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      <div
        className={`relative flex flex-col items-center justify-center min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-blue-200 text-black"
          }`}
      >
        <form
          onSubmit={handleSubmit}
          className={`p-8 rounded-xl shadow-lg w-full max-w-md space-y-4 
            ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}
        >
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
            className="w-full px-3 py-2 border border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 dark:placeholder-gray-500"
          />

          {showExtraFields && (
            <div className="space-y-4">
              <input
                type="text"
                name="cep"
                placeholder="CEP"
                value={formData.cep}
                onChange={(e) => {
                handleChange(e);
                if (e.target.value.replace(/\D/g, "").length === 8) { 
                  buscarCEP(e.target.value, setFormData, setShowAddressFields);
                }
              }}
                className="w-full px-3 py-2 border border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

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
                      className="w-full px-3 py-2 border border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              value={formData.telefone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 dark:placeholder-gray-500"
            />
            <button
              type="button"
              onClick={() => setShowTelefone(!showTelefone)}
              className="absolute right-2 top-2 text-gray-600 hover:text-gray-800"
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
            className="w-full px-3 py-2 border border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 dark:placeholder-gray-500"
          />

          <input
            type="text"
            name="cpf"
            placeholder="CPF"
            value={formData.cpf}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 dark:placeholder-gray-500"
          />

          <button
            type="submit"
            className="w-full sm:w-auto bg-blue-400 text-black dark:bg-blue-800 dark:text-white py-2 px-6 rounded-lg hover:bg-blue-800 hover:text-white dark:hover:bg-blue-400 dark:hover:text-black transition duration-200 block mx-auto"
          >
            Enviar
          </button>
        </form>
        <button
          type="button"
          onClick={() => setCurrentPage("banner")}
          className="absolute top-2.5 right-4 px-4 py-2 rounded-lg transition bg-black text-white hover:bg-gray-800"
        >
          Ir ao banner
        </button>
      </div>
      <Footer />
    </div>
  );
}
