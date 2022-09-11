import { taskService } from "../service/task.service.js"
import { taskView } from "../view/task.view.js"

class TaskController{
    constructor(view, service){
        this.view = view
        this.service = service

        this.onSubmit()
        this.onClick()
    }

    onSubmit(){

        const cb = {
            register: this.addTask.bind(this),
            search: this.searchByTaskName.bind(this)
        }

        this.view.onSubmit(cb)
    }

    onClick(){
        this.view.onClick()
    }

    addTask(evt){
        evt.preventDefault()
        const input = evt.currentTarget.querySelector("input")

        if(!input.value) throw new Error("you must fill the title's field")

        this.service.addTask(input.value)
        this.view.renderTasks(this.service.tasks)

        evt.currentTarget.reset()

    }

    toggleComplete(id){
        this.service.toggleComplete(id)
        this.view.renderTasks(this.service.tasks)
    }

    editTask(id, value){
        this.service.editTask(id, value)
        this.view.renderTasks(this.service.tasks)
    }

    deleteTask(id){
        this.service.deleteTask(id)
        this.view.renderTasks(this.service.tasks)
    }

    searchByTaskName(evt){

        console.log(evt.currentTarget)
        const tasks = this.service.searchByTaskName(evt.currentTarget.value)

        if(!tasks || tasks.length === 0) return

        this.view.renderTasks(tasks)

    }
}

export const taskController = new TaskController(taskView, taskService)