let tarefas = []
const lista = document.getElementById('lista')
const stats = document.getElementById('stats')
const input = document.getElementById('tarefainput')
const dadosSalvos = localStorage.getItem("tarefas")

 
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault()
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
function criarElementoTarefa(tarefa) {
    const li = document.createElement('li')

    const span = document.createElement('span')
    span.textContent = tarefa.nome

    const btnConcluir = document.createElement('button')
    btnConcluir.textContent = "✔"
    btnConcluir.onclick = () => concluirTarefa(tarefa.id)

    const btnExcluir = document.createElement('button')
    btnExcluir.textContent = "🗑"
    btnExcluir.onclick = () => removerTarefa(tarefa.id)

    if (tarefa.concluido) {
        li.classList.add("concluida")
    }

    li.append(span, btnConcluir, btnExcluir)

    return li
}
function renderizarTarefas(){
    lista.innerHTML = ""
    
    
    tarefas.forEach(tarefa => {
        lista.appendChild(criarElementoTarefa(tarefa))
    })

}
function criarStats(total, concluidas, pendentes) {
    const p = document.createElement('p')
    p.textContent =
        `Total: ${total} | Concluídas: ${concluidas} | Pendentes: ${pendentes}`

    return p
}

function contador(){
stats.innerHTML = ""

    const total = tarefas.length
    const concluidas = tarefas.filter(t => t.concluido).length
    const pendentes = total - concluidas

    stats.appendChild(
        criarStats(total, concluidas, pendentes)
    )

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
 
     if(dadosSalvos){
        tarefas = JSON.parse(dadosSalvos)
        
    }
atualizarUI()