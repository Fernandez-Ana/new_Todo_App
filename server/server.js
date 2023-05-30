// npm i express zum installieren
// npm i cors installieren

import express from 'express';
import cors from 'cors'


import { todos, addTodo, updateTodo, deleteTodo } from './model/TodoModel.js'

const app = express()
app.use(cors())

// es wird als default Port eingesetzt, falls der gesetzte Port nicht funktioniert hat
const PORT = process.env.Port || 3001;
app.use(express.json())


app.get('/todos', (req, res) => {
    res.send(todos)
})

app.post('/todos', async (req, res) => {
    // was man in den body schreibt muss in todo gespeichert werden
    const todo = req.body
    // mit addTodo function wird das dann gespeichert 
    const newTodo = await addTodo(todo)
    res.send(newTodo)
})

app.put('/todos/:id', async (req, res) => {
    //damit finden wir die id
    const { id } = req.params;
    // nehmen das aus dem body
    const todo = req.body;
    const updatedTodo = await updateTodo(id, todo)
    res.send(updatedTodo)
})

app.delete('/todos/:id', (req, res) => {
    const { id } = req.params
    deleteTodo(id)
    res.send('deleted')
})



app.listen(PORT, () => console.log(`Server ist am Laufen mit Port ${PORT}`))