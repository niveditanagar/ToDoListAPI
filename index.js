const express = require('express')
const fs = require('fs')
const app = express()
const todos = require('./todos.json')

// Middleware to parse JSON bodies
app.use(express.json())

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})

app.get('/todos', (req, res) => {
    res.status(200).json(todos)
})

app.post('/todos', (req, res) => {
    const newTodo = {
        id: todos.todos.length +1,
        text: req.body.text,
        completed: false
    }
    todos.todos.push(newTodo)

    // Writes the todos to the JSON file
    fs.writeFileSync('./todos.json', JSON.stringify(todos, null, 2))

    res.status(201).json(newTodo)
})

app.delete('/todos/:id', (req, res) => {
    res.status(204).send()
}) 
