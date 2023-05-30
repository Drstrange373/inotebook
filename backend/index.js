const connectToMongo = require('./db')
var cors = require('cors')
const express = require('express')
connectToMongo()

var app = express()

app.use(cors())
const port = 5000

app.use(express.json())

// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

// Create a user using: POST "/api/auth/"
app.get('/',(req, res)=>{
    res.send("hi")
})

app.listen(port, ()=>
    console.log(`INoteBook backend is listening at http://localhost:${port}`)
)


