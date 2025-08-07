import { useState, useEffect } from "react";
import Header from "./header";
import Footer from "./footer";

export default function Institutional() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div className={`flex flex-col min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="flex-grow flex flex-col items-center justify-center p-6">
        <h1 className="text-3xl font-bold mb-4 text-center">{/* título */}
          Página Institucional
        </h1>
        <p className={`${darkMode ? "text-gray-300" : "text-gray-700"} text-center max-w-3xl`}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Vivamus lacinia odio vitae vestibulum vestibulum.
        </p>
      </main>
      <Footer />
    </div>
  );
}
