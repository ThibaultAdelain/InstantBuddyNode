const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 8000
const {errorHandler} = require('./middleware/errorMiddleware')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const colors = require('colors')
const passport = require('passport')
const ngrok = require('ngrok');


// Passport config
require('./config/passport')(passport)

app = express()

// to read the req.body
app.use(express.json())
app.use(express.urlencoded({ extended:false }))

// Signed cookies will ensure that the cookie is authentic, not changed by the client
app.use(cookieParser('SECRET_KEY_COOKIES_:_12ZEFGHJUI'))

// Help to secure HTTP header
app.use(helmet())

// Passport middleware
app.use(passport.initialize())


app.use('/', require('./router/routes'))
app.use('/user/', require('./router/userRoutes'))
app.use('/auth/', require('./router/googleAuth'))


app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))

ngrok.connect({
    proto : 'http',
    addr : port,
}, (err, url) => {
    if (err) {
        console.error('Error while connecting Ngrok',err);
        return new Error('Ngrok Failed');
    }
});
