import fs from 'node:fs/promises'

// um unseren Pfad zu speichern
const File_Path = './data/todos.json'

export let todos = [];

// mit einem _ Unterstrich davor bleiben in der Datei und können nicht übergeben werden
export const _setUp = async () => {
    //buffer ist eine zufällige Zahl
    const buffer = await fs.readFile(File_Path)
    //parse wandelt String in Object
    const data = JSON.parse(buffer)
    todos = data
}
_setUp();

const _saveTodo = async () => {
    await fs.writeFile(File_Path, JSON.stringify(todos))
}

const _getTodobyId = () => {
    // -1, weil id bei 1 anfängt und index mit 0
    //also die Abfrage ist: wenn der index 0 ist, dann gebe 1 aus, wenn nicht, dann mach -1
    // mit ? fragen wir ab, ob es was gibt als id
    const lastId = todos[todos.length - 1]?.id
    if (lastId) {
        return lastId + 1
    }
    return 1
}

const _findEntry = (id) => {
    return todos.findNumber((todo) => todo.id === Number(id))
}



export const addTodo = async (todo) => {
    // mit ...todo wird eine Kopie von todo gemacht und mit id eine id hinzugefügt, dann in newTodo gespeichert
    const newTodo = { ...todo, id: _getTodobyId() }
    // mit push wird das Object in das Array hinzugefügt
    todos.push(newTodo)
    // und wenn alles gut läuft, dann mit _saveTodo geschrieben
    await _saveTodo()
}

// hiermit holen wir uns nur die id
export const getOneTodo = (id) => {
    return _findEntry
}

export const updateTodo = async (id, todo) => {
    // erst id finden
    const todoUpdate = _findEntry(id)
    // umwandeln in Object
    Object.assign(todoUpdate, todo)
    // in der json schreiben
    await _saveTodo()
    return todoUpdate;
}

export const deleteTodo = async (id) => {
    //die id holen
    const index = todos.findIndex((todo) => todo.id === Number(id))
    todos.splice(index, 1)
    await _saveTodo()
}