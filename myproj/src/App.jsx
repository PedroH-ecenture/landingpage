import { useState } from 'react'
import './App.css'

// Funções de validação e máscaras
function validarCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, '')
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false

  let soma = 0
  for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i)
  let resto = (soma * 10) % 11
  if (resto === 10 || resto === 11) resto = 0
  if (resto !== parseInt(cpf.charAt(9))) return false

  soma = 0
  for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i)
  resto = (soma * 10) % 11
  if (resto === 10 || resto === 11) resto = 0

  return resto === parseInt(cpf.charAt(10))
}

function aplicarMascaraTelefone(telefone) {
  telefone = telefone.replace(/\D/g, '')
  if (telefone.length > 11) telefone = telefone.slice(0, 11)
  if (telefone.length > 6) {
    return telefone.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3')
  } else if (telefone.length > 2) {
    return telefone.replace(/(\d{2})(\d{0,5})/, '($1) $2')
  } else {
    return telefone.replace(/(\d*)/, '($1')
  }
}

function aplicarMascaraCPF(cpf) {
  cpf = cpf.replace(/\D/g, '')
  if (cpf.length > 11) cpf = cpf.slice(0, 11)
  if (cpf.length > 9) {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4')
  } else if (cpf.length > 6) {
    return cpf.replace(/(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3')
  } else if (cpf.length > 3) {
    return cpf.replace(/(\d{3})(\d{0,3})/, '$1.$2')
  } else {
    return cpf
  }
}

function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.(com|com\.br)$/
  return regex.test(email)
}

export default function App() {
  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [email, setEmail] = useState('')
  const [cpf, setCpf] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validarCPF(cpf)) {
      alert('CPF inválido!')
      return
    }

    if (!validarEmail(email)) {
      alert('E-mail inválido!')
      return
    }

    alert(`Registro realizado:\nNome: ${nome}\nTelefone: ${telefone}\nEmail: ${email}\nCPF: ${cpf}`)
  }

  return (
    <div className="container">
      <h2>Registro de Usuário</h2>
      <form onSubmit={handleSubmit}>
        <label>Nome:</label>
        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />

        <label>Telefone:</label>
        <input
          type="text"
          value={telefone}
          onChange={(e) => setTelefone(aplicarMascaraTelefone(e.target.value))}
          required
        />

        <label>Email:</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label>CPF:</label>
        <input
          type="text"
          value={cpf}
          onChange={(e) => setCpf(aplicarMascaraCPF(e.target.value))}
          required
        />

        <button type="submit">Registrar</button>
      </form>
    </div>
  )
}
