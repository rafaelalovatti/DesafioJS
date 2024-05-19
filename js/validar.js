const nome = document.querySelector("#inputName");
const nomeHelp = document.querySelector("#inputNameHelp");
const ano = document.querySelector("#inputYear");
const anoHelp = document.querySelector("#inputYearHelp");
const email = document.querySelector("#inputEmail");
const emailHelp = document.querySelector("#inputEmailHelp");
const senha = document.querySelector("#inputPassword");
const senhaHelp = document.querySelector("#inputPasswordHelp");
const passStrengthMeter = document.querySelector("#passStrengthMeter");

nome.addEventListener("focusout", validarNome);
ano.addEventListener("focusout", validarAno);
email.addEventListener("focusout", validarEmail);
senha.addEventListener("input", validarSenha);

function validarNome() {
  const nomeValido = /^[A-Za-z\s]{6,}$/.test(nome.value.trim());

  nomeHelp.textContent = nomeValido
    ? ""
    : "Nome inválido. O nome deve conter pelo menos 6 caracteres, incluindo somente letras e espaços";
  nomeHelp.style.color = nomeValido ? "" : "red";
  return nomeValido;
}

function validarAno() {
  const anoValido = /^(19[0-9]{2}|20[0-1][0-9]|202[0-4])$/.test(
    ano.value.trim()
  );

  anoHelp.textContent = anoValido
    ? ""
    : "Ano inválido. O ano deve estar entre 1900 e 2024.";
  anoHelp.style.color = anoValido ? "" : "red";
  return anoValido;
}

function validarEmail() {
  const emailValido = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.(com|br|net|org)$/.test(
    email.value.trim()
  );

  emailHelp.textContent = emailValido ? "" : "Formato de email inválido.";
  emailHelp.style.color = emailValido ? "" : "red";
  return emailValido;
}

function validarSenha() {
  const senhaValue = senha.value.trim();
  const nomeUsuario = nome.value
    .trim()
    .split(" ")
    .slice(0, 2)
    .map((nome) => nome.toLowerCase());
  const anoNascimento = ano.value.trim();
  const nivelSeguranca = calcularNivelSegurancaSenha(senhaValue);

  if (!nivelSeguranca) {
    senhaHelp.textContent =
      "Senha inválida. A senha deve conter entre 6 e 20 caracteres, letras, números e pelo menos um caractere especial.";
    senhaHelp.style.color = "red";
    passStrengthMeter.value = 0;
    return false;
  }

  if (
    nomeUsuario.some((nomeParte) =>
      senhaValue.toLowerCase().includes(nomeParte)
    ) ||
    senhaValue.includes(anoNascimento)
  ) {
    senhaHelp.textContent =
      "A senha não pode conter o nome ou o ano de nascimento.";
    senhaHelp.style.color = "red";
    passStrengthMeter.value = 0;
    return false;
  }

  senhaHelp.textContent = `Senha ${nivelSeguranca}`;
  senhaHelp.style.color =
    nivelSeguranca === "fraca"
      ? "red"
      : nivelSeguranca === "moderada"
      ? "orange"
      : "green";
  passStrengthMeter.value =
    nivelSeguranca === "forte" ? 30 : nivelSeguranca === "moderada" ? 15 : 10;
  return true;
}

function calcularNivelSegurancaSenha(senha) {
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(senha);
  const hasNumber = /\d/.test(senha);
  const hasUpperCase = /[A-Z]/.test(senha);

  if (senha.length >= 6 && senha.length <= 8 && hasSpecialChar && hasNumber) {
    return "fraca";
  } else if (
    senha.length > 8 &&
    senha.length <= 12 &&
    hasSpecialChar &&
    hasNumber &&
    hasUpperCase
  ) {
    return "moderada";
  } else if (
    senha.length > 12 &&
    hasSpecialChar &&
    hasNumber &&
    hasUpperCase &&
    senha.match(/[!@#$%^&*(),.?":{}|<>]/g).length > 1 &&
    senha.match(/\d/g).length > 1 &&
    senha.match(/[A-Z]/g).length > 1
  ) {
    return "forte";
  }
  return null;
}

const form = document.querySelector("#singleForm");
const successMessage = document.querySelector("#successMessage");
const errorMessage = document.querySelector("#errorMessage");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const nomeValido = validarNome();
  const anoValido = validarAno();
  const emailValido = validarEmail();
  const senhaValida = validarSenha();

  if (nomeValido && anoValido && emailValido && senhaValida) {
    successMessage.style.display = "block";
    errorMessage.style.display = "none";
  } else {
    successMessage.style.display = "none";
    errorMessage.style.display = "block";
  }
});
