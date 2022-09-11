const mongoose = require('mongoose')

const Task = require('../models/task.model')

exports.get = (id) => {

    if(id) return Task.findById(id)

    return Task.find({})

}

exports.post = (data) =>{

    const newData = {...data}

    return Task.create(newData)

}

exports.put = (data, id) =>{

    return Task.findOneAndUpdate({_id: id}, data, {new: true})

}


exports.patch = (data, id) => {

    const {title, completed, completedAt, userId} = data

    const updatedAt = Date.now()

    const taskUpdated = { title, completed, completedAt, userId, updatedAt}

    for(let prop in taskUpdated){

        if(typeof taskUpdated[prop] === "undefined") delete taskUpdated[prop]

    }


    return Task.findOneAndUpdate({_id: id}, taskUpdated, {new: true})
}

exports.delete = (id) => {

    return Task.findOneAndRemove({_id: id})

}