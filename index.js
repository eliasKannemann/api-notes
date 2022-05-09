const express = require('express')
const app = express()
const logger = require('./loggerMiddleware')

app.use(express.json())

app.use(logger)

// const http = require('http')

let notes = [
  {
    id: 1,
    content: 'Me tengo que inscribir a miduved en youteb y twicht',
    date: '2019-05-30T19:20:14.098Z',
    important: true
  },
  {
    id: 2,
    content: 'TEgno que estudiar las clases del Fullstack Bootcamp',
    date: '2019-05-30T19:20:14.091Z',
    important: false
  },
  {
    id: 3,
    content: 'Repasar los retos de JS de midudev',
    date: '2019-05-30T19:20:14.298Z',
    important: true
  }
]
// const app = http.createServer((req, res) => {
// res.writeHead(200, {'content-Type':'text/plain'})
// res.end('Hola cacho')
// })

app.get('/', (req, res) => {
  res.send('<h1>HEllo Word</h1>')
})

app.get('/api/notes', (req, res) => {
  res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
  const id = +req.params.id
  console.log({ id })
  const note = notes.find(note => note.id === id)

  if (note) {
    res.json(note)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/notes/:id', (req, res) => {
  const id = +req.params.id
  notes = notes.filter(note => note.id !== id)
  res.status(204).end()
})

app.post('/api/notes', (req, res) => {
  const note = req.body

  if (!note || !note.content) {
    return res.status(400).json(
      { error: 'note content is missing' }
    )
  }

  const ids = notes.map(note => note.id)
  const maxId = Math.max(...ids)

  const newNote = {
    id: maxId + 1,
    content: note.content,
    important: typeof note.important !== 'undefined' ? note.important : false,
    data: new Date().toISOString()
  }

  notes = [...notes, newNote]
  console.log(note)
  res.status(201).json(newNote)
})

app.use((req, res) => {
  res.status(404).json({
    error: 'not found'
  })
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
