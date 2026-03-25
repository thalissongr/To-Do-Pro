let tarefas = []
class Tarefa{
    constructor(nome){
        this.nome = nome
        this.concluido = false
    }
}

function adicionarTarefa(){
    const Tarefa1 = new Tarefa( document.getElementById('tarefainput') )
    tarefas.push = Tarefa1
    
}
console.log(tarefas);

