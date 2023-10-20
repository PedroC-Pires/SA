const campoLogin = document.getElementById("login");
const campoSenha = document.getElementById("password");
const campoNovoLogin = document.getElementById("novoLogin");
const campoNovaSenha = document.getElementById("novaSenha");
const campoRepSenha = document.getElementById("repSenha");


function login(){
    let login = campoLogin.value;
    let senha = campoSenha.value;
    let mensagem = "Usuário ou senha incorretos!";
    let bancoDeDados = JSON.parse(localStorage.getItem("bancoDeDados"));
    if (bancoDeDados == null) {
        mensagem = "Nenhum usuário cadastrado até o momento.";
    } else {
        for (let usuario of bancoDeDados) {
            if (usuario.login == login && usuario.senha == senha) {
                mensagem = "Parabéns, você logou!";
                localStorage.setItem("logado", JSON.stringify(usuario));
                window.location.href = "./logged/home.html";
                break;
            }
        }

    }
    Swal.fire(mensagem);
}
function register(){

    if(campoNovaSenha.value.length < 8 && campoNovaSenha.value.length < 8){
        Swal.fire({
            icon: 'error',
            title: 'Ops...',
            text: 'Sua senha deve conter no mínimo 8 caracteres! Por favor tente novamente.',
          })
    }else{
        if (campoNovaSenha.value == campoRepSenha.value) {
            const usuario = {
                login: campoNovoLogin.value,
                senha: campoNovaSenha.value
            };
            let bancoDeDados = JSON.parse(localStorage.getItem("bancoDeDados"));
            if (bancoDeDados == null) {
                bancoDeDados = [];
            }
            bancoDeDados.push(usuario);
            localStorage.setItem("bancoDeDados", JSON.stringify(bancoDeDados));
            Swal.fire(
                'Good job!',
                'You clicked the button!',
                'success'
            )
             window.location.href = "index.html"
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Ops...',
                text: 'As senhas devem ser iguais, por favor tente novamente.',
              })
        }
    }
}