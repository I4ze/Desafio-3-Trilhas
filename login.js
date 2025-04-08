function validaForm(event) {
    event.preventDefault();

    if (document.querySelector("form").checkValidity()) {
        alert("login feito com sucesso!");
    } else {
        return;
    }
}

function carregarDados() {
    const dados = JSON.parse(localStorage.getItem("formInscricao"));
    if (!dados) return;

    document.getElementById("id_usuario").value = dados.id_usuario || "";
    document.getElementById("senha").value = dados.senha || "";
}

window.addEventListener("load", carregarDados);


