export class TaskModel{
    
    #_userID
    #_createdAt
    #_updatedAt
    #_completedAt


    constructor(title, completed, userID){
        this.title = title
        this.completed = completed || false
        this.#_userID = userID
        this.#_createdAt = Date.now()
        this.#_updatedAt = null
        this.#_completedAt = null
    }

}