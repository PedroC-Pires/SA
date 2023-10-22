// Cria todas as variaveis para o funcionamento do aplicativo
const campoLogin = document.getElementById("login");
const campoSenha = document.getElementById("password");
const campoNovoLogin = document.getElementById("novoLogin");
const campoNovaSenha = document.getElementById("novaSenha");
const campoRepSenha = document.getElementById("repSenha");
let arrdb = JSON.parse(localStorage.getItem("bancoDeDados"))
let arrlogado = JSON.parse(localStorage.getItem("logado"))
let temp = []

//Exibe as anotações na página Ver Anotações
let verNota = JSON.parse(localStorage.getItem("bancoDeDados"))
for (var i = 0; i < arrdb.length; i++) {
    if (arrdb[i].login == arrlogado.login && arrdb[i].senha == arrlogado.senha) {
        tempVerNota = arrdb[i].notes
    }
}
tempVerNota = JSON.stringify(tempVerNota)
tempVerNota = tempVerNota.replace('["', "")
tempVerNota = tempVerNota.replace('"]', "")
tempVerNota = tempVerNota.replaceAll('","', "\n\n")
document.getElementById("listaAnotacoes").value = tempVerNota

//Cria a função Login()
function login(){
    let login = campoLogin.value; //Define a let login como igual ao valor do campo campologin
    let senha = campoSenha.value; //Define a let login como igual ao valor do campo password
    let mensagem = "Usuário ou senha incorretos!"; //Define a let mensagem como "Usuário ou senha incorretos!"
    let bancoDeDados = JSON.parse(localStorage.getItem("bancoDeDados")); //Define a let bancoDeDados igual ao bancoDeDados do localstorage
    if (bancoDeDados == null) {
        mensagem = "Nenhum usuário cadastrado até o momento."; //Se não tem nenhum item em bancoDeDados, define a let mensagem como "Nenhum usuário cadastrado até o momento."
    } else { //Se o banco de dados existe
        for (let usuario of bancoDeDados) { //para cada usuario em bancoDeDados
            if (usuario.login == login && usuario.senha == senha) { //verifica se o valor digitado no login e senha corresponde a um usuario existente em bancoDeDados
                mensagem = "Login realizado com sucesso!"; //Define a let mensagem como "Parabéns, você logou!"
                localStorage.setItem("logado", JSON.stringify(usuario)); //Salva a senha e o login do usuario logado no localstorage
                Swal.fire(mensagem).then(function() { //Utiliza da extensão sweetalert2 para exibir a mensagem ao usuário
                    window.location = "./logged/home.html"; //Dentro do sweetalert exibe um botão de "OK" que quando clicado redireciona o usuario para ./logged/home.html
                });
                break; //Quebra o loop for para não rodá-lo até o final, pois já encontrou o usuario desejado
            }
        }
    }
    
}
//Cria a função register()
function register(){
    if (campoNovaSenha.value == campoRepSenha.value) { //Verifica se as senhas digitadas são iguais
        if(campoNovaSenha.value.length < 8 && campoNovaSenha.value.length < 8){ //Verifica se as senhas digitadas são iguao ou maiores que 8
            Swal.fire({ 
                icon: 'error',
                title: 'Ops...',
                text: 'Sua senha deve conter no mínimo 8 caracteres! Por favor tente novamente.',
              }) //Se não forem exibe a mensagem 'Sua senha deve conter no mínimo 8 caracteres! Por favor tente novamente.'
        }else{   //Se forem iguas e maiores ou igual a 8
            const usuario = { //Define que o objeto 'usuario' contem o login e senha digitados, além de criar o item 'notes' que será utilizado para as anotações mais tarde
                login: campoNovoLogin.value,
                senha: campoNovaSenha.value,
                notes: []
            };
            let bancoDeDados = JSON.parse(localStorage.getItem("bancoDeDados")); //Define a let bancoDeDados igual ao item bancoDeDados no localstorage
            if (bancoDeDados == null) {
                bancoDeDados = []; //Se o banco de não existe, o define como uma array vazia
            }
            bancoDeDados.push(usuario); //Adiciona o objeto usuario na array bancoDeDados
            localStorage.setItem("bancoDeDados", JSON.stringify(bancoDeDados)); //Salva a array bancoDeDados no item bancoDeDados no localstorage
            Swal.fire(
                'Usuário registrado com sucesso!', //Exibe um sweetalert dizendo que o usuario foi registrado com sucesso
            ).then(function() {
                window.location = "index.html"; //Após clicar no botão 'OK' redireciona o usuario para a pagina de login
            });
        }
    } else {
        Swal.fire({ //Se as senhas forem diferentes, retorna isto ao usuario e pede para tentar novamente
            icon: 'error',
            title: 'Ops...',
            text: 'As senhas devem ser iguais, por favor tente novamente.',
        })
    }
}
//Cria a função novaNota
function novaNota(){
    let notaAtual = document.getElementById("campoAnotacao").value //Define a let notaAtual igual ao valor do campo 'campoAnotacao'
    arrdb = JSON.parse(localStorage.getItem("bancoDeDados")) //Define a let arrdb como igual a array dentro do item no localstorage chamado bancoDeDados
    arrlogado = JSON.parse(localStorage.getItem("logado")) //Define a let arrlogado como igual ao objeto dentro do item no chamado logado

    for (var i = 0; i < arrdb.length; i++) { //Verifica cada usuario em arrdb e salva o numero da verificação na variavel i
        if (arrdb[i].login == arrlogado.login && arrdb[i].senha == arrlogado.senha) { //Compara cada login e senha de arrdb[i] para encontrar o usuário logado em arrdb
            let tempobj = arrdb[i] //Define a let tempobj como o objeto [i] da array arrdb (Poderia ser feito com menos variaveis, optei por fazer assim para facilitar a organização do código separando cada coisa em uma variavel)
            let tempnote = tempobj.notes //Define a let tempnote como o atributo notes do objeto [i]
            tempnote.push(notaAtual) //Adiciona à let tempnote o valor da nota atual do usuário
            tempobj.notes = tempnote //Substitui o atributo notes do objeto tempobj pelo atributo com a notaAtual
            arrdb.splice(i,1) //Deleta o abjeto desatualizado da array arrdb para substituilo pelo tempobj mais tarde
            arrdb.push(tempobj) //Adiciona o abjeto tempobj na array arrdb
        }
        Swal.fire({ //Exibe uma mensagem de anotação salva para o usuario, a mensagem é fechada automáticamente em 1000 milisegundos
            position: 'center',
            icon: 'success',
            title: 'Anotação salva!',
            showConfirmButton: false,
            timer: 1000
          })
        localStorage.setItem("bancoDeDados", JSON.stringify(arrdb)) //Salva as anotações no localstorage
    }
}

function deslogar(){
    localStorage.removeItem("logado")
}

/*
    Curso:
        Técnico em Desenvolvimento de Sistemas - Escola SESI/CTAI Florianópolis,SC
    Projeto:
        SA - Situação de Aprendizado Escola SESI
    Objetivo:
        Desenvolver um sistema CRUD que permite o usuario fazer registro e login em sua conta, criar, editar e excluir anotações feitas pelo mesmo
    Grupo:
        Anna Karina Front-end/Desing
        Iara Maia   Front-end/Desing
        Pedro Pires Back-end
        Tyler       Front-end/Desing
    Turma:
        2B - 2023
    Versão do documento: 1.0
    Data e hora de conclusão do documento: 22/10/2023 - 00:17

    ps:
    Caso deseje utilizar este código para apresentá-lo para outras turmas, 
    por favor converse com pelo menos um dos integrantes do grupo, grato desde já - o cara do back-end.
*/