const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const logger = require('morgan')
const connectDB = require('./config/database')
const mainRoutes = require('./routes/main')
const postRoutes = require('./routes/posts')
const flash = require('express-flash')
const cors = require('cors')



app.use(cors())


app.use(logger('dev'))
require('dotenv').config({ path: './config/.env' })


require('./config/passport')


//connect to database
connectDB()

//using EJS for views
app.set('view engine', 'ejs')

app.use(express.static('public'))
//Body parsing 
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//sessions 

app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: process.env.DB_STRING })
    })
)

app.use(flash())

app.use(passport.initialize())
app.use(passport.session())

//setup ROutes 
app.use('/', mainRoutes)




//Server Running
app.listen(process.env.PORT || 5000, () => {
    console.log("Server is running, you better catch it!");
});