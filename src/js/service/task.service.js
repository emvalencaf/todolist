import { TaskModel } from "../model/task.model.js"


class TaskService{
    constructor(){

    }

    addTask(title){
        const newTask = new TaskModel(title)
        console.log(newTask)
    }
}

export const taskService = new TaskService()