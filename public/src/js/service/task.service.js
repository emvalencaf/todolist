import { createFetch } from "../createFetch.js"
import { TaskModel } from "../model/task.model.js"


class TaskService{
    #_tasks

    constructor(){
        this.#_tasks = []
    }

    get tasks(){
        return this.#_tasks
    }

    addTask(title){
        /*
        const newTask = new TaskModel(title, this.#_tasks.length)
        console.log(newTask)
        this.#_tasks.push(newTask)*/

        createFetch("POST", `${urlTasks}`, JSON.stringify(new TaskModel(title)))
            .then( () => this.getTasks(userId))

    }

    async getTasks(){

        const fn = (arrTask) => {
            this.tasks = arrTask.map(task => {
                const {title, completed, completedAt, createdAt, updatedAt, _id, userId} = task

                return new TaskModel(title, _id, completed, completedAt, createdAt,updatedAt, userId)

            })
        }

        return await createFetch('GET', `${urlTasks}`)
            .then(response => fn(response))

    }

    searchTaskById(id){
        return this.#_tasks.findIndex(task => task.id === id)
    }

    toggleComplete(id){
        const taskIndex = this.searchTaskById(id)
        const currentTask = this.#_tasks[taskIndex]
        console.log(currentTask)
        currentTask.completed = !currentTask.completed

        if(currentTask.completed) {
            currentTask.completedAt = Date.now()
            currentTask.updatedAt = Date.now()
        }
    }

    searchByTaskName(taskName){
        
        if(this.#_tasks.length === 0) return

        return this.#_tasks.filter(task => {
            if(task.title.indexOf(taskName) > - 1) return task
        })
    }

    editTask(id, value){
        const taskIndex = this.searchTaskById(id)
        const currentTask = this.#_tasks[taskIndex]

        currentTask.title = value

        currentTask.updatedAt = Date.now()
    }

    deleteTask(id){
        const taskIndex = this.searchTaskById(id)

        this.#_tasks.splice(taskIndex, 1)

        console.log(this.#_tasks)

    }
}

export const taskService = new TaskService()