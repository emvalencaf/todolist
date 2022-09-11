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
        const newTask = new TaskModel(title, this.#_tasks.length)
        console.log(newTask)
        this.#_tasks.push(newTask)
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

    editTask(id, value){
        const taskIndex = this.searchTaskById(id)
        const currentTask = this.#_tasks[taskIndex]

        currentTask.title = value

        currentTask.updatedAt = Date.now()
    }
}

export const taskService = new TaskService()