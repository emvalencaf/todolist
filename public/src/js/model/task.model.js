export class TaskModel{
    
    #_userId
    #_createdAt
    #_updatedAt
    #_completedAt

    constructor(title, id, completed, completedAt, createdAt,updatedAt, userId){
        this.#_id = id.toString()
        this.title = title
        this.completed = completed || false
        this.userId = userId
        this.#_createdAt = createdAt|| Date.now()
        this.#_updatedAt = updatedAt|| null 
        this.#_completedAt = completedAt || null
        this.#_userId = userId
    }

    get id(){
        return this.#_id
    }

    get updatedAt(){
        return this.#_updatedAt
    }

    get completedAt(){
        return this.#_completedAt
    }

    get userId(){
        return this.#_userId
    }

    set completedAt(date){
        return this.#_completedAt = date
    }

    set updatedAt(date){
        return this.#_updatedAt = date
    }
}