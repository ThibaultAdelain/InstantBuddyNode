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

// Cookies

// secure: true means only https request is sent
// HTTPonly: true means the cookie is not accessible using the Js code in the browser (avoid cross-scripting attack)
// sameSite: 'lax' means the cookie is only accessible through your website
// app.get('/setCookie', (req, res) => {
//     res.cookie(`MyCookieToken`,`encypted cookie`, {
//         secure: true,
//         httpOnly: true,
//         sameSite: 'lax'
//     })
//     res.send('Cookies have been saved successfully')
// })
// app.get('/getCookie', (req, res) => {
//     console.log(colors.bgMagenta(req.cookies))
//     res.send(req.cookies)
// })
// app.get('/deleteCookie', (req, res) => {
//     console.log(colors.bgGreen(req.cookies))
//     res.clearCookie("MyCookieToken")
//     res.send('cookie has been deleted successfully !')
// })

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))
