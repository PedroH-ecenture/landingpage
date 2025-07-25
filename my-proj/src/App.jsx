import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'  

export default function Formulario() {
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    email: "",
    cpf: "39053344705", // CPF válido para teste
  });
  const [showTelefone, setShowTelefone] = useState(true);

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

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Formulário de Cadastro
        </h2>

        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={formData.nome}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="relative">
          <input
            type={showTelefone ? "text" : "password"}
            name="telefone"
            placeholder="Telefone (somente números)"
            value={formData.telefone}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
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
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          name="cpf"
          placeholder="CPF"
          value={formData.cpf}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full sm:w-auto bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-200 block mx-auto"
        >
          Enviar
        </button>
      </form>
    </div>
  );
} 

