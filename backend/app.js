const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 8000

app = express()

// to read the req.body
app.use(express.json())
app.use(express.urlencoded({ extended:false }))

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello from index' })
})

app.use('/', require('./router/routes'))

app.listen(port, () => console.log(`Server started on port ${port}`))
