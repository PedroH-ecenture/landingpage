import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deletarUsuario } from "./apilaravel";
import Header from "./header";
import Footer from "./footer";

export default function Delete() {
  const navigate = useNavigate();

  // Estado para modo escuro
  const [darkMode, setDarkMode] = useState(false);

  // Atualiza classe dark no root do documento
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

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
      const numericValue = value.replace(/\D/g, "").slice(0, 11);
      setFormData({ ...formData, [name]: numericValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email é obrigatório.";
    } else if (!/\S+@\S+/.test(formData.email)) {
      newErrors.email = "Email inválido.";
    }

    if (!formData.cpf) newErrors.cpf = "CPF é obrigatório.";
    else if (formData.cpf.length !== 11) newErrors.cpf = "CPF deve ter 11 dígitos.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage("");

    if (!validate()) return;

    setLoading(true);

    try {
      const response = await deletarUsuario({
        email: formData.email,
        cpf: formData.cpf,
      });

      setSuccessMessage(response.message);
      setFormData({ email: "", cpf: "" });
    } catch (error) {
      setErrors({
        api: error.response?.data?.message || "Erro ao deletar usuário.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`flex flex-col min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-blue-200 text-black"}`}>
      {/* Passa darkMode e setDarkMode para Header */}
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="flex-grow flex items-center justify-center p-6">
        <form
          onSubmit={handleSubmit}
          className={`shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md transition-colors duration-300
            ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}
        >
          <h2 className="text-xl font-bold mb-6 text-center">
            Deletar Usuário
          </h2>

          <div className="mb-4">
            <label
              htmlFor="email"
              className={`block text-sm font-bold mb-2 ${darkMode ? "text-gray-300" : "text-black"}`}
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
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 disabled:bg-gray-100 disabled:text-gray-500
                ${darkMode
                  ? "border-gray-600 bg-gray-700 placeholder-gray-500 text-white focus:ring-blue-400"
                  : "border-blue-400 bg-white text-black"
                }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic mt-1">{errors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="cpf"
              className={`block text-sm font-bold mb-2 ${darkMode ? "text-gray-300" : "text-black"}`}
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
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 disabled:bg-gray-100 disabled:text-gray-500
                ${darkMode
                  ? "border-gray-600 bg-gray-700 placeholder-gray-500 text-white focus:ring-blue-400"
                  : "border-blue-400 bg-white text-black"
                }`}
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
            className={`w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition
              ${loading
                ? "opacity-50 cursor-not-allowed bg-red-600 text-white"
                : "bg-red-600 hover:bg-red-700 text-white"
              }`}
          >
            {loading ? "Deletando..." : "Deletar Usuário"}
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
