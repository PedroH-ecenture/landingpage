import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./header";
import Footer from "./footer";
import App from "./App"; // agora o formulário está no App.jsx
import Institutional from "./institutional";
import Delete from "./deleteuser";

export default function Formulario() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <BrowserRouter>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/institutional" element={<Institutional />} />
        <Route path="/deleteuser" element={<Delete />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
