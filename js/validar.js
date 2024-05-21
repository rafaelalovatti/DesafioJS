var nomeUsuario = document.querySelector("#inputName");
var nomeAjuda = document.querySelector("#inputNameHelp");
var anoNascimento = document.querySelector("#inputYear");
var anoAjuda = document.querySelector("#inputYearHelp");
var emailUsuario = document.querySelector("#inputEmail");
var emailAjuda = document.querySelector("#inputEmailHelp");
var senhaUsuario = document.querySelector("#inputPassword");
var senhaAjuda = document.querySelector("#inputPasswordHelp");
var medidorForcaSenha = document.querySelector("#passStrengthMeter");

nomeUsuario.addEventListener("focusout", checarNome);
anoNascimento.addEventListener("focusout", checarAno);
emailUsuario.addEventListener("focusout", checarEmail);
senhaUsuario.addEventListener("input", checarSenha);

function checarNome() {
  const padraoNome = /^[A-Za-z]+\s+[A-Za-z\s]*$/;
  const nomeValido = padraoNome.test(nomeUsuario.value.trim());

  if (!nomeValido) {
    nomeAjuda.textContent =
      "Nome inválido. Deve conter somente letras e espaços, e ter no mínimo 6 caracteres.";
    nomeAjuda.style.color = "red";
  } else {
    nomeAjuda.textContent = "";
  }
  return nomeValido;
}

function checarAno() {
  const padraoAno = /^(19[0-9]{2}|20[0-1][0-9]|202[0-4])$/;
  const anoValido = padraoAno.test(anoNascimento.value.trim());

  if (!anoValido) {
    anoAjuda.textContent = "Ano inválido. Por favor, insira um ano entre 1900 e 2024.";
    anoAjuda.style.color = "red";
  } else {
    anoAjuda.textContent = "";
  }
  return anoValido;
}

function checarEmail() {
  const padraoEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.(com|br|net|org)$/;
  const emailValido = padraoEmail.test(emailUsuario.value.trim());

  if (!emailValido) {
    emailAjuda.textContent = "Formato de email inválido.";
    emailAjuda.style.color = "red";
  } else {
    emailAjuda.textContent = "";
  }
  return emailValido;
}

function checarSenha() {
  const padraoSenha = /^(?=.[!@#$%^&(),.?":{}|<>])(?=.\d)(?=.[a-zA-Z]).{6,20}$/;
  const valorSenha = senhaUsuario.value;
  let senhaValida = padraoSenha.test(valorSenha);

  if (!senhaValida) {
    senhaAjuda.textContent =
      "Senha inválida. Por favor, utilize de 6 a 20 caracteres, números, letras e, ao menos, um caractere especial.";
    senhaAjuda.style.color = "red";
    medidorForcaSenha.value = 0;
    return false;
  }

  const partesNomeUsuario = nomeUsuario.value
    .trim()
    .split(" ")
    .slice(0, 2)
    .map((parteNome) => parteNome.toLowerCase());
  const anoVal = anoNascimento.value.trim();

  if (
    partesNomeUsuario.length > 0 &&
    partesNomeUsuario[0] !== "" &&
    (partesNomeUsuario.some((parte) =>
      valorSenha.toLowerCase().includes(parte)
    ) ||
      (anoVal && valorSenha.includes(anoVal)))
  ) {
    senhaAjuda.textContent = "A senha não pode conter nome ou ano de nascimento!";
    senhaAjuda.style.color = "red";
    medidorForcaSenha.value = 0;
    return false;
  }

  const nivelForca = calcularForcaSenha(valorSenha);
  if (nivelForca === "fraca") {
    senhaAjuda.textContent = "Senha fraca";
    senhaAjuda.style.color = "red";
    medidorForcaSenha.value = 10;
    senhaValida = true;
  } else if (nivelForca === "moderada") {
    senhaAjuda.textContent = "Senha moderada";
    senhaAjuda.style.color = "orange";
    medidorForcaSenha.value = 20;
    senhaValida = true;
  } else if (nivelForca === "forte") {
    senhaAjuda.textContent = "Senha forte";
    senhaAjuda.style.color = "green";
    medidorForcaSenha.value = 30;
    senhaValida = true;
  }

  return senhaValida;
}

function calcularForcaSenha(senha) {
  const contemCharEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(senha);
  const contemNumero = /\d/.test(senha);
  const contemMaiuscula = /[A-Z]/.test(senha);

  if (contemCharEspecial && contemNumero && contemMaiuscula) {
    const quantidadeCharEspeciais = (
      senha.match(/[!@#$%^&*(),.?":{}|<>]/g) || []
    ).length;
    const quantidadeNumeros = (senha.match(/\d/g) || []).length;
    const quantidadeMaiusculas = (senha.match(/[A-Z]/g) || []).length;

    if (
      senha.length > 12 &&
      quantidadeCharEspeciais > 1 &&
      quantidadeNumeros > 1 &&
      quantidadeMaiusculas > 1
    ) {
      return "forte";
    } else if (senha.length >= 8) {
      return "moderada";
    } else {
      return "fraca";
    }
  } else {
    return "fraca";
  }
}

document
  .querySelector("#singleForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const nomeValido = checarNome();
    const anoValido = checarAno();
    const emailValido = checarEmail();
    const senhaValida = checarSenha();

    const resultadoDiv = document.getElementById("inputResult");

    if (nomeValido && anoValido && emailValido && senhaValida) {
      resultadoDiv.textContent = "Parabéns! Seus dados foram cadastrados!";
      resultadoDiv.style.color = "green";
    } else {
      resultadoDiv.textContent =
        "Dados inválidos! Cadastro não realizado.";
      resultadoDiv.style.color = "red";
    }
  });
