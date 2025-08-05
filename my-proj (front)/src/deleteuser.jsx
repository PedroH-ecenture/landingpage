import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deletarUsuario } from "./apilaravel";
import axios from "axios";

export default function Delete() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", cpf: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  function formatCPF(cpf) {
    const nums = cpf.replace(/\D/g, "").slice(0, 11);
    if (nums.length <= 3) return nums;
    if (nums.length <= 6) return `${nums.slice(0, 3)}.${nums.slice(3)}`;
    if (nums.length <= 9) return `${nums.slice(0, 3)}.${nums.slice(3, 6)}.${nums.slice(6)}`;
    return `${nums.slice(0, 3)}.${nums.slice(3, 6)}.${nums.slice(6, 9)}-${nums.slice(9)}`;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "cpf") {
      // mantém só números no estado
      const numericValue = value.replace(/\D/g, "").slice(0, 11);
      setFormData({ ...formData, [name]: numericValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email é obrigatório.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email inválido.";

    if (!formData.cpf) newErrors.cpf = "CPF é obrigatório.";
    else if (formData.cpf.length !== 11) newErrors.cpf = "CPF deve ter 11 dígitos.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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

      await deletarUsuario(dadosParaEnviar);

      setSuccessMessage("Usuário deletado com sucesso!");
      setFormData({
        email: "",
        cpf: "",
      });
      setShowExtraFields(false);
      setShowAddressFields(false);
      navigate("/");
    } catch (error) {
      console.error("Erro completo:", error);
      setErrors({
        api: error.response?.data?.message || "Erro ao deletar usuário. Tente novamente.",
      });
    } finally {
      setLoad(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md"
      >
        <h2 className="text-xl font-bold mb-6 text-center text-gray-900 dark:text-white">
          Deletar Usuário
        </h2>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="exemplo@dominio.com"
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.email && (
            <p className="text-red-500 text-xs italic mt-1">{errors.email}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="cpf"
            className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
          >
            CPF
          </label>
          <input
            type="text"
            id="cpf"
            name="cpf"
            placeholder="000.000.000-00"
            maxLength={14}
            value={formatCPF(formData.cpf)}
            onChange={handleChange}
            disabled={loading}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.cpf && (
            <p className="text-red-500 text-xs italic mt-1">{errors.cpf}</p>
          )}
        </div>

        {errors.api && (
          <p className="text-red-600 text-center mb-4">{errors.api}</p>
        )}

        {successMessage && (
          <p className="text-green-600 text-center mb-4">{successMessage}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Deletando..." : "Deletar Usuário"}
        </button>
      </form>
    </div>
  );
}
