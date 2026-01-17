const express = require('express')
const app = express()
const todos = require('./todos.json')


app.listen(3000, () => {
    console.log('Server is running on port 3000')
})

app.get('/todos', (req, res) => {
    res.status(200).json(todos)
})

app.post('/todos', (req, res) => {
    const newTodo = {
        id: 5,
        text: 'take a nap',
        completed: false
    }

    todos.todos.push(newTodo)

    res.status(201).json(newTodo)
})

app.delete('/todos/:id', (req, res) => {
    res.status(204).send()
}) 
