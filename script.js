function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
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
}

function aplicarMascaraTelefone(telefone) {
    telefone = telefone.replace(/\D/g, '');
    if (telefone.length > 11) telefone = telefone.slice(0, 11);
    if (telefone.length > 6) {
        return telefone.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    } else if (telefone.length > 2) {
        return telefone.replace(/(\d{2})(\d{0,5})/, '($1) $2');
    } else {
        return telefone.replace(/(\d*)/, '($1');
    }
}

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.com$/;
    return regex.test(email);
}

// --- Máscara dinâmica do telefone ---
const telefoneInput = document.getElementById('telefone');
telefoneInput.addEventListener('input', function () {
    this.value = aplicarMascaraTelefone(this.value);
});

// --- Validação no envio ---
document.getElementById('form-registro').addEventListener('submit', function (e) {
    e.preventDefault();

    const cpf = document.getElementById('cpf').value;
    const telefone = document.getElementById('telefone').value;
    const email = document.getElementById('email').value;

    if (!validarCPF(cpf)) {
        alert('CPF inválido!');
        return;
    }

    if (!validarEmail(email)) {
        alert('E-mail inválido!');
        return;
    }

    alert(`Registro feito!\nCPF: ${cpf}\nTelefone: ${telefone}\nEmail: ${email}`);
});
