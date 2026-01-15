const express = require('express')
const fs = require('fs')
const app = express()
const todos = require('./todos.json')

// Middleware to parse JSON request bodies
app.use(express.json())

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})

app.get('/todos', (req, res) => {
    res.status(200).json(todos)
})

app.post('/todos', (req, res) => {
    const newTodo = {
        id: todos.todos.length + 1,
        title: req.body.title,
        completed: false
    }

    todos.todos.push(newTodo)

    // Write updated todos to the JSON file
    fs.writeFileSync('./todos.json', JSON.stringify(todos, null, 2))
    res.status(201).json(newTodo)
})

app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id) // Convert id from string to integer

    // Find the index of the todo that matcheds the id
    const index = todos.todos.findIndex(todo => todo.id === id)

    // Remove the todo from the array
    const deletedTodo = todos.todos.splice(index, 1)

    // Update todos to the JSON file
    fs.writeFileSync('./todos.json', JSON.stringify(todos, null, 2))
    
    res.status(204).json({ message: 'Todo deleted', deletedTodo: deletedTodo[0] })

})
