function validaForm(event) {
    event.preventDefault();
    let isValid = true;

    // Validação do nome
    const nome = document.getElementById("nome").value.trim();
    if (nome === "") {
        setFieldError("nome", "O nome completo é obrigatório.");
    } else if (nome.length < 5) {
        setFieldError("nome", "Nome muito curto");
    } else {
        setFieldError("nome", "");
    }

    // Validação da data de nascimento
    const dataNascimento = new Date(document.getElementById("data_nascimento").value);
    const hoje = new Date();
    const idade = hoje.getFullYear() - dataNascimento.getFullYear();
    if (isNaN(dataNascimento)) {
        setFieldError("data_nascimento", "Data de nascimento em formato inválido");
    } else if (idade < 16) {
        setFieldError("data_nascimento", "Você deve ter pelo menos 16 anos.");
    } else if (idade > 120) {
        setFieldError("data_nascimento", "Data de nascimento inválida");
    } else {
        setFieldError("data_nascimento", "");
    }

    // Validação CPF
    const cpf = document.getElementById("cpf").value;
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    if (!cpfRegex.test(cpf)) {
        setFieldError("cpf", "CPF inválido. Formato esperado: 123.456.789-00");
        isValid = false;
    } else if (!validarCPF(cpf)) {
        console.log(validarCPF(cpf));
        console.log(cpf);
        setFieldError("cpf", "CPF inválido. Revise o número digitado");
        isValid = false;
    } else {
        setFieldError("cpf", "");
    }

    //Validação Email
    const email = document.getElementById("email").value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        setFieldError("email", "E-mail inválido");
    } else {
        setFieldError("email", "");
    }

    //Validação Telefone
    const telefone = document.getElementById("telefone").value;
    const telRegex = /^\(\d{2}\) \d \d{4}-\d{4}$/;
    if (!telRegex.test(telefone)) {
        setFieldError("telefone", "Telefone inválido. Formato esperado: (99) 9 9999-9999");
    } else {
        setFieldError("telefone", "");
    }

    //Validação CEP
    const cep = document.getElementById("cep").value;
    const cepRegex = /^\d{5}-\d{3}$/;
    if (!cepRegex.test(cep)) {
        setFieldError("cep", "CEP inválido. Formato esperado: 99999-999");
    } else {
        setFieldError("cep", "");
    }

    // Validação arquivos
    const identidade = document.getElementById("file-identidade");
    const comprovante = document.getElementById("file-comprovante");
    const msgDocumentosFaltantes = [];

    if(identidade.files.length == 0){
        msgDocumentosFaltantes.push("Submeta um arquivo contendo identidade\n");
        isValid = false;
    }
    if(comprovante.files.length == 0){
        msgDocumentosFaltantes.push("Submeta um arquivo contendo comprovante\n");
        isValid = false;
    }
    

    //Validação trilha selecionada
    const trilhas = document.querySelectorAll('input[name="trilha"]');
    const trilhaSelecionada = document.querySelector('input[name="trilha"]:checked');

    if (!trilhaSelecionada) {
        msgDocumentosFaltantes.push("Você deve selecionar uma trilha\n");
        isValid = false;
    }

    function setFieldError(campoId, mensagem) {
        const campo = document.getElementById(campoId);
        if (mensagem) {
            campo.setCustomValidity(mensagem);
            isValid = false;
        } else {
            campo.setCustomValidity("");
        }
    }
    console.log(isValid);
    if (isValid && document.querySelector("form").checkValidity()) {
        alert("Formulário enviado com sucesso!");
        window.location.href = "login.html";
    } else {
        document.querySelector("form").reportValidity();
        if(msgDocumentosFaltantes.length>0){
            alert("Corrija os seguintes problemas:\n\n- " + msgDocumentosFaltantes.join("- "));
        }
    }
}

function validarCPF(cpf) {
    // Remove pontos e traço
    cpf = cpf.replace(/[^\d]+/g, '');

    // Verifica se tem 11 dígitos ou se é uma sequência inválida (ex: 00000000000)
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return false;
    }

    // Valida primeiro dígito
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;

    // Valida segundo dígito
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(10))) return false;
    console.log("CPF validado")

    return true;
}



//Gerencia máscara de cpf para manter cpf formatado
document.getElementById("cpf").addEventListener("input", function () {
    let value = this.value.replace(/\D/g, "");

    value = value.replace(/^(\d{3})(\d)/, "$1.$2");
    value = value.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
    value = value.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
    if (value.length > 14) { value = value.slice(0, -1); }
    this.value = value;
});

//Gerencia máscara de telefone
document.getElementById("telefone").addEventListener("input", function () {
    let value = this.value.replace(/\D/g, "");

    value = value.slice(0, 11);

    if (value.length >= 1) {
        value = value.replace(/^(\d{0,2})/, "($1");
    }
    if (value.length >= 3) {
        value = value.replace(/^\((\d{2})(\d)/, "($1) $2");
    }
    if (value.length >= 4) {
        value = value.replace(/^\((\d{2})\) (\d)(\d{0,4})/, "($1) $2 $3");
    }
    if (value.length >= 9) {
        value = value.replace(/^\((\d{2})\) (\d) (\d{4})(\d{0,4})/, "($1) $2 $3-$4");
    }

    this.value = value;
});


//gerencia mascara para cep
document.getElementById("cep").addEventListener("input", function () {
    let value = this.value.replace(/\D/g, "");

    value = value.slice(0, 8);

    if (value.length > 5) {
        value = value.replace(/^(\d{5})(\d)/, "$1-$2");
    }

    this.value = value;
});


function salvarDados() {
    const dados = {
        nome: document.getElementById("nome").value,
        data_nascimento: document.getElementById("data_nascimento").value,
        cpf: document.getElementById("cpf").value,
        sexo: document.getElementById("sexo").value,
        email: document.getElementById("email").value,
        telefone: document.getElementById("telefone").value,
        id_usuario: document.getElementById("id_usuario").value,
        senha: document.getElementById("senha").value,
        cep: document.getElementById("cep").value,
        rua: document.getElementById("Rua").value,
        numero: document.getElementById("numero").value,
        cidade: document.getElementById("cidade").value,
        estado: document.getElementById("estado").value,
        trilha: document.querySelector('input[name="trilha"]:checked')?.value || ""
    };

    localStorage.setItem("formInscricao", JSON.stringify(dados));
    alert("Dados salvos com sucesso!");
}

function carregarDados() {
    const dados = JSON.parse(localStorage.getItem("formInscricao"));
    if (!dados) return;

    document.getElementById("nome").value = dados.nome || "";
    document.getElementById("data_nascimento").value = dados.data_nascimento || "";
    document.getElementById("cpf").value = dados.cpf || "";
    document.getElementById("sexo").value = dados.sexo || "";
    document.getElementById("email").value = dados.email || "";
    document.getElementById("telefone").value = dados.telefone || "";
    document.getElementById("id_usuario").value = dados.id_usuario || "";
    document.getElementById("senha").value = dados.senha || "";
    document.getElementById("cep").value = dados.cep || "";
    document.getElementById("Rua").value = dados.rua || "";
    document.getElementById("numero").value = dados.numero || "";
    document.getElementById("cidade").value = dados.cidade || "";
    document.getElementById("estado").value = dados.estado || "";

    if (dados.trilha) {
        const radio = document.querySelector(`input[name="trilha"][value="${dados.trilha}"]`);
        if (radio) radio.checked = true;
    }
}

window.addEventListener("load", carregarDados);


