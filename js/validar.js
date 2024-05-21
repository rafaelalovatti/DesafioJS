var nome = document.querySelector("#inputName");
var nomeHelp = document.querySelector("#inputNameHelp");
var ano = document.querySelector("#inputYear");
var anoHelp = document.querySelector("#inputYearHelp");
var email = document.querySelector("#inputEmail");
var emailHelp = document.querySelector("#inputEmailHelp");
var senha = document.querySelector("#inputPassword");
var senhaHelp = document.querySelector("#inputPasswordHelp");
var passStrengthMeter = document.querySelector("#passStrengthMeter");

nome.addEventListener("focusout", validarNome);
ano.addEventListener("focusout", validarAno);
email.addEventListener("focusout", validarEmail);
senha.addEventListener("input", validarSenha);

function validarNome() {
  const regexNome = /^[A-Za-z\s]{6,}$/;
  const nomeValido = regexNome.test(nome.value.trim());

  if (!nomeValido) {
    nomeHelp.textContent =
      "Nome inválido. Por favor, insira no mínimo 6 caracteres, somente letras e espaços, e ter, ao menos, um caractere especial. ";
    nomeHelp.style.color = "red";
  } else {
    nomeHelp.textContent = "";
  }
  return nomeValido;
}

function validarAno() {
  const regexAno = /^(19[0-9]{2}|20[0-1][0-9]|202[0-4])$/;
  const anoValido = regexAno.test(ano.value.trim());

  if (!anoValido) {
    anoHelp.textContent = "Ano inválido. Por favor, insira um ano entre 1900 e 2024.";
    anoHelp.style.color = "red";
  } else {
    anoHelp.textContent = "";
  }
  return anoValido;
}

function validarEmail() {
  const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.(com|br|net|org)$/;
  const emailValido = regexEmail.test(email.value.trim());

  if (!emailValido) {
    emailHelp.textContent = "Formato de email inválido.";
    emailHelp.style.color = "red";
  } else {
    emailHelp.textContent = "";
  }
  return emailValido;
}

function validarSenha() {
  const regexSenha =
    /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d)(?=.*[a-zA-Z]).{6,20}$/;
  const senhaValue = senha.value;
  let senhaValida = regexSenha.test(senhaValue);

  if (!senhaValida) {
    senhaHelp.textContent =
      "Senha inválida. A senha deve conter 6 a 20 caracteres, números, letras e, ao menos, um caractere especial.";
    senhaHelp.style.color = "red";
    passStrengthMeter.value = 0;
    return false;
  }

  // Verificar se a senha contém o nome ou ano de nascimento, se esses campos estiverem preenchidos
  const nomeusuario = nome.value
    .trim()
    .split(" ")
    .slice(0, 2)
    .map((nome) => nome.toLowerCase());
  const anoNascimento = ano.value.trim();

  if (
    nomeusuario.length > 0 &&
    nomeusuario[0] !== "" &&
    (nomeusuario.some((nomeParte) =>
      senhaValue.toLowerCase().includes(nomeParte)
    ) ||
      (anoNascimento && senhaValue.includes(anoNascimento)))
  ) {
    senhaHelp.textContent = "Senha não pode conter nome ou ano de nascimento!";
    senhaHelp.style.color = "red";
    passStrengthMeter.value = 0;
    return false;
  }

  const nivelSeguranca = calcularNivelSegurancaSenha(senhaValue);
  if (nivelSeguranca === "fraca") {
    senhaHelp.textContent = "Senha fraca";
    senhaHelp.style.color = "red";
    passStrengthMeter.value = 10;
    senhaValida = true;
  } else if (nivelSeguranca === "moderada") {
    senhaHelp.textContent = "Senha moderada";
    senhaHelp.style.color = "orange";
    passStrengthMeter.value = 20;
    senhaValida = true;
  } else if (nivelSeguranca === "forte") {
    senhaHelp.textContent = "Senha forte";
    senhaHelp.style.color = "green";
    passStrengthMeter.value = 30;
    senhaValida = true;
  }

  return senhaValida;
}

function calcularNivelSegurancaSenha(senha) {
  const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/g;
  const numberPattern = /\d/g;
  const upperCasePattern = /[A-Z]/g;

  const numSpecialChars = (senha.match(specialCharPattern) || []).length;
  const numNumbers = (senha.match(numberPattern) || []).length;
  const numUpperCase = (senha.match(upperCasePattern) || []).length;

  if (numSpecialChars > 0 && numNumbers > 0 && numUpperCase > 0) {
    if (
      senha.length > 12 &&
      numSpecialChars > 1 &&
      numNumbers > 1 &&
      numUpperCase > 1
    ) {
      return "forte";
    } else if (senha.length >= 8) {
      return "moderada";
    }
  }
  return "fraca";
}


document
  .querySelector("#singleForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const nomeValido = validarNome();
    const anoValido = validarAno();
    const emailValido = validarEmail();
    const senhaValida = validarSenha();

    const resultDiv = document.getElementById("inputResult");

    if (nomeValido && anoValido && emailValido && senhaValida) {
      resultDiv.textContent = "Parabéns! Seus dados foram cadastrados!";
      resultDiv.style.color = "green";
    } else {
      resultDiv.textContent = "Dados inválidos! Cadastro não realizado.";
      resultDiv.style.color = "red";
    }
  });
