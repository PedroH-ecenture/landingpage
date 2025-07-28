import './App.css'

export default function Header({ darkMode, setDarkMode, setCurrentPage  })
{
      

  return (
    <header className="bg-blue-600 text-white p-4">
      <h1 className="text-xl font-bold">Formulário</h1>
      <div className={` ${darkMode ? "bg-gray-900 text-white" : "bg-blue-200 text-black"}`}>
        <button
        type="button"
        onClick={() => setDarkMode(!darkMode)}
        className={`absolute top-2.5 right-4 px-4 py-2 rounded-lg transition 
          ${darkMode ? "bg-white text-black hover:bg-gray-200" : "bg-black text-white hover:bg-gray-800"}`}>
        {darkMode ? "Modo Claro" : "Modo Escuro"}
         </button>

        
      </div>
    </header>
  );
}
