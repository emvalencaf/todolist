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
            search: this.searchTask.bind(this)
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
    }

    searchTask(){
        console.log("search task")
    }
}

export const taskController = new TaskController(taskView, taskService)