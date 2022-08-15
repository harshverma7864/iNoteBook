const connectToMongo = require('./db')
const express = require('express')
var cors = require('cors')
connectToMongo();

const app = express()
const port = 5000

app.use(cors())

//middleware for req.body;pp
app.use(express.json() )
                  
//Available ROUTES

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


// -----------------------------

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/v1/login', (req, res) => {
    res.send('Hello Login')
  })

app.get('/api/v1/signup', (req, res) => {
   res.send('Hello SignUp ')
})

// app.get('/vivek', (req, res) => {
//     res.send('Hello Vivek ')
//   })

app.listen(port, () => {
  console.log(`OnlineNotesSaver listening at http://localhost:${port}`)
})
