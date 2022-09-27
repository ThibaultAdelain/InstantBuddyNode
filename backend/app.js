const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 8000
const {errorHandler} = require('./middleware/errorMiddleware')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const colors = require('colors')

app = express()

// to read the req.body
app.use(express.json())
app.use(express.urlencoded({ extended:false }))

// Signed cookies will ensure that the cookie is authentic, not changed by the client
app.use(cookieParser('SECRET_KEY_COOKIES'))

// Help to secure HTTP header
app.use(helmet())

app.use('/', require('./router/routes'))
app.use('/user/', require('./router/userRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))
