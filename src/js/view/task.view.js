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
}

export const taskView = new TaskView(document.querySelector(".todo-list-container"), document.querySelectorAll("form"))

