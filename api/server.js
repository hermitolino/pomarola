// Init the app
const port = 8080
const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const app = express();

// Create mongoose
const dbConfig = require('./configs/database.config')
const mongoose = require('mongoose')
// const mongoStore =require('connect-mongo')(session)
mongoose.Promise = global.Promise
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log('Seccessfully connected to the database')
}).catch(err => {
    console.log('Could not connect to the database. Exiting now', err)
    process.exit();
})

// Setup sessions for tracking logins
app.use(session({
    secret: 'Pomarola na pasta',
    resave: true,
    saveUninitialized: false
}))

// Parse requests of content-type application/x-wwwfrom-urlencoded
app.use(bodyParser.urlencoded({extended: true}))

// parse requests of content-type application/json
app.use(bodyParser.json())

// Routes
app.get('/', (req, res) => {
    res.json({'message': 'Wellcome to Pomarola'})
})

// Account routes
require('./routes/accounts.route')(app)

// PomodoroType routes
require('./routes/pomodoro_types.route')(app)

// Pomodoro routes
require('./routes/pomodoros.route')(app)

app.listen(port, () => {
    console.log('Server is listening on port ' + port)
})

