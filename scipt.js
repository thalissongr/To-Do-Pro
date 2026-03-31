let tarefas = []
const lista = document.getElementById('lista')
const stats = document.getElementById('stats')
const input = document.getElementById('tarefainput')
const dadosSalvos = localStorage.getItem("tarefas")

    if(dadosSalvos){
        tarefas = JSON.parse(dadosSalvos)
        atualizarUI()
    }

input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        adicionarTarefa();
    }
});

class Tarefa{
    constructor(nome){
        this.id = Date.now()
        this.nome = nome
        this.concluido = false
    }
}


function adicionarTarefa(){
    
    const Valor = input.value.trim()
    if(Valor == "") return;
    
    const tarefa = new Tarefa( Valor )
    tarefas.push(tarefa)
    
   salvarDados()
   atualizarUI()
   
    input.value = ""
}
function renderizarTarefas(){
    lista.innerHTML = ""

    tarefas.forEach((tarefa) => {
    const span = document.createElement('span')
    span.textContent = tarefa.nome

    const btnConcluir = document.createElement('button')
        btnConcluir.textContent = "✔"
    btnConcluir.onclick = () => {
        concluirTarefa(tarefa.id)
    }

    const btnExcluir = document.createElement('button');
         btnExcluir.textContent = "🗑";
    btnExcluir.onclick = () => {
        removerTarefa(tarefa.id);
    };

    li.appendChild(btnConcluir);
    li.appendChild(btnExcluir);


    lista.appendChild(span)


        if (tarefa.concluido) {
            li.classList.add("concluida")
        }
});
}

function contador(){
    let Total = tarefas.length
    let concluidasArray = tarefas.filter(item => item.concluido);
    let pendentesArray = tarefas.filter(item => !item.concluido);

    let Cld = concluidasArray.length;
    let Pd = pendentesArray.length;


    stats.innerHTML = ""
    const contar = document.createElement('p')
    contar.textContent = `Total: ${Total} | Concluidas: ${Cld} | Pendentes: ${Pd}`

    stats.appendChild(contar)

}

    function concluirTarefa(id) {
        const tarefa = tarefas.find(t => t.id === id)

        if (tarefa) {
            tarefa.concluido = !tarefa.concluido
        }
        
        salvarDados()
        atualizarUI()
     
    }


function removerTarefa(id) {

    tarefas = tarefas.filter(tarefa => tarefa.id !== id);

    salvarDados()
    atualizarUI()
    
}

function atualizarUI(){
    renderizarTarefas()
    contador()
}
function salvarDados(){
    localStorage.setItem("tarefas", JSON.stringify(tarefas))
}