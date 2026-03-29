let tarefas = []
const lista = document.getElementById('lista')
const stats = document.getElementById('stats')
const input = document.getElementById('tarefainput')

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
    
    const Valor = input.value
    if(Valor == "") return;
    
    const tarefa = new Tarefa( Valor )
    tarefas.push(tarefa)
    
   
    renderizarTarefas()
    contador()

    input.value = ""
}
function renderizarTarefas(){
    lista.innerHTML = ""

    tarefas.forEach((tarefa) => {
    const li = document.createElement('li')
    li.textContent = tarefa.nome

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


    lista.appendChild(li)


        if (tarefa.concluido) {
            li.style.textDecoration = "line-through";
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

    tarefas = tarefas.map(tarefa => {
        if (tarefa.id === id) {
            tarefa.concluido = !tarefa.concluido;
        }
        return tarefa;
    });

    renderizarTarefas();
    contador();
}

function removerTarefa(id) {

    tarefas = tarefas.filter(tarefa => tarefa.id !== id);

    renderizarTarefas();
    contador()
}
