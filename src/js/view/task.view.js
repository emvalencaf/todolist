class TaskView{
    constructor(containerEl, formsElList){
        this.containerEl = containerEl
        this.formsElList = formsElList
    }

    onSubmit(cb){
        [...this.formsElList].forEach(form => {

            const formType = form.getAttribute('data-form')

            if(formType === "search") return form.querySelector("input").addEventListener('keydown', cb[formType])

            form.addEventListener('submit', cb[formType])

        })
    }
}

export const taskView = new TaskView(document.querySelector(".todo-list-container"), document.querySelectorAll("form"))

