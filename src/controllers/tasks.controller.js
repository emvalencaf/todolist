exports.get = async (req, res) => {
    try{

        let tasks = await repository.get()
        res.status(200).send(tasks)

    }catch(e){
        res.status(500).send({message: "Error 500", err: e})
    }
}

exports.post = async (req, res) => {
    const {title, userId} = req.body

    if(!title || !userId || isNaN(userId)) return res.status(400).send({message: "Error 400", err: "Request wasn't formed correctly"})

    const newTask = {
        title,
        completed: false,
        createdAt: Date.now(),
        completedAt: null,
        updatedAt: null,
        userId
    }


    try{

        const data = await repository.ppost(newTask)

        res.status(201).send(data)

    } catch(e){

        res.status(500).send({message: "Error 500", err: e})

    }
}

exports.getById = async (req, res) => {

    try{

        const data = await repository.get(req, params.id)


        if(!data) return res.status(404).end()

        res.status(200).send(data)

    } catch(e){
        
        res.status(500).send({message:'error 500', err: e})

    }

}

exports.put = async (req, res) => {
    
    const { title, completed, createdAt, completedAt, updatedAt, userId} = req.body

    const newTask = {
        title,
        completed,
        completedAt,
        createdAt,
        updatedAt,
        userId
    }

    const values = Object.values(newTask)

    if(values.some(v => v === undefined)) return res.status(400).send({message: "Error 400", err: "Request wasn't formed correctly"})


    try{

        const data = await repository.put(newTask, req.params.id)

        if(!data) return res.status(404).end()

        res.status(200).send(data)
        
    } catch (e){

        res.status(500).send({message: "Error 500", err: e})

    }
}

exports.patch = async (req, res) => {
    const { title, completed, completedAt, userId } = req.body

    try{

        const data = await repository.patch({
            title,
            completed,
            completedAt,
            userId
        }, req.params.id)


        if(!data) return res.status(404).end()

        res.status(200).send(data)

    } catch(e){

        res.status(500).send({message: "error", err:e})

    }

}

exports.delete = async (req, res) =>{

    try{

        const data = await repository.delete(req.params.id)

        
        if(!data) return res.status(404).end()

        res.status(200).send(data)

    } catch(e) {

        res.status(500).send({message:"Error 500", err: e})

    }

}