export class TaskModel{
    
    #_userID
    #_createdAt
    #_updatedAt
    #_completedAt

    constructor(title, id, completed, userID){
        this.id = id.toString()
        this.title = title
        this.completed = completed || false
        this.#_userID = userID
        this.#_createdAt = Date.now()
        this.#_updatedAt = null
        this.#_completedAt = null
    }

    get updatedAt(){
        return this.#_updatedAt
    }

    get completedAt(){
        return this.#_completedAt
    }

    set completedAt(date){
        return this.#_completedAt = date
    }

    set updatedAt(date){
        return this.#_updatedAt = date
    }
}