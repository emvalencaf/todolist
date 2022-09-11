import { taskController } from "../controller/task.controller.js"

class TaskView{
    constructor(containerEl, formsElList){
        this.containerEl = containerEl
        this.formsElList = formsElList
    }
    //Event Listeners
    onSubmit(cb){
        [...this.formsElList].forEach(form => {

            const formType = form.getAttribute('data-form')

            if(formType === "search") return form.querySelector("input").addEventListener('keydown', cb[formType])

            form.addEventListener('submit', cb[formType])

        })
    }

    onClick(){
        document.querySelector("#btn-toggleTheme").addEventListener("click", e => {

            const body = document.body

            if(body.classList.contains('lightmode')){

                body.classList.replace('lightmode', 'darkmode')
                e.currentTarget.querySelector("i").classList.replace('fa-moon', 'fa-sun')

            } else{

                body.classList.replace('darkmode','lightmode')
                e.currentTarget.querySelector("i").classList.replace('fa-sun', 'fa-moon')

            }
        })
    }

    onClickEdit(btn){

        const handle = {
            completed: e =>{
                taskController.toggleComplete(btn.parentElement.dataset.taskId)
            },
            edit: e =>{

                const currentTodo = btn.parentElement.parentElement
                const currentInput = currentTodo.querySelector("input")

                if(!currentInput.disabled){

                    if(!currentInput.value) throw new Error("you cannot save a empty todo")

                    taskController.editTask(currentTodo.dataset.taskId, currentInput.value)
                    
                }

                currentInput.disabled = !currentInput.disabled

            }

        }

        btn.addEventListener('click', handle[btn.getAttribute('data-btn')])
    }

    //Add new Tasks
    renderTasks(dataTasks){
        this.containerEl.innerHTML = ''

        dataTasks.forEach(task =>{

            const div = document.createElement('div')
            div.classList.add('todo')
            div.dataset.taskId = task.id
            console.log(div.dataset.taskId)
            div.innerHTML = `
            <button class="btn" data-btn ="completed">
                <abbr title="clique para marcar a tarefa como concluída ou não concluída"><i class="fa-regular ${task.completed? 'fa-circle-check': 'fa-circle'}"></i></abbr>
            </button>
            <li>
                <input type="text" value="${task.title}" class="input" disabled>
            </li>
            <div>
                <button class="btn" data-btn="edit">
                    <abbr title="clique para editar/salvar tarefa">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </abbr>
                </button>
                <button class="btn" data-btn="delete">
                    <abbr title="clique para deletar tarefa">
                        <i class="fa-solid fa-trash"></i>
                    </abbr>
                </button>
            </div>
            `
            this.containerEl.appendChild(div)

            const btns = [...div.querySelectorAll('button')]

            btns.forEach(btn => this.onClickEdit(btn))

        })
    }

    completedTasks(taskId){

    }
}
/*

                    <div class="todo">
                        <button class="btn">
                            <abbr title="clique para marcar a tarefa como concluída ou não concluída"><i class="fa-regular fa-circle-check"></i></abbr>
                        </button>
                        <li>
                            <input type="text" value="Estudar HTML" class="input" disabled>
                        </li>
                        <div>
                            <button class="btn">
                                <abbr title="clique para editar/salvar tarefa">
                                    <i class="fa-solid fa-pen-to-square"></i>
                                </abbr>
                            </button>
                            <button class="btn">
                                <abbr title="clique para deletar tarefa">
                                    <i class="fa-solid fa-trash"></i>
                                </abbr>
                            </button>
                        </div>
                    </div>
*/

export const taskView = new TaskView(document.querySelector(".todo-list-container"), document.querySelectorAll("form"))

