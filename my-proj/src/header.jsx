import { Link, useLocation } from "react-router-dom";

export default function Header({ darkMode, setDarkMode }) {
  const location = useLocation();

  // Esconder botão Institutional na página /institutional
  const isInstitutionalPage = location.pathname === "/institutional";

  return (
    <header className="bg-blue-600 text-white p-4 relative">
      <h1 className="text-xl font-bold">Formulário</h1>

      <button
        type="button"
        onClick={() => setDarkMode(!darkMode)}
        className={`absolute top-2.5 right-4 px-4 py-2 rounded-lg transition 
          ${darkMode ? "bg-white text-black hover:bg-gray-200" : "bg-black text-white hover:bg-gray-800"}`}
      >
        {darkMode ? "Modo Claro" : "Modo Escuro"}
      </button>

      {!isInstitutionalPage && (
        <nav className={`absolute top-2.5 right-40 px-4 py-2 rounded-lg transition 
          ${darkMode ? "bg-white text-black hover:bg-gray-200" : "bg-black text-white hover:bg-gray-800"}`}>
          <Link
          to="/institutional"
          className={`hover:underline ${
            location.pathname === "/institutional" ? "font-bold underline" : ""
          }`}
        >
          Institucional
        </Link>
        </nav>
        
      )}

      <button
        type="button"
        className={`absolute top-2.5 right-76 px-4 py-2 rounded-lg transition 
            bg-black text-white hover:bg-gray-800`}
      >
        <Link
          to="/"
          className={`hover:underline ${
            location.pathname === "/" ? "" : ""
          }`}
        >
          Home
        </Link>
      
      </button>
    </header>
  );
}
