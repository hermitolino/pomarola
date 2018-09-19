const express = require('express')
const bodyParser = require('body-parser')

// Create a express app
const app = express();

// Create mongoose
const dbConfig = require('./configs/database.config')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log('Seccessfully connected to the database')
}).catch(err => {
    console.log('Could not connect to the database. Exiting now', err)
    process.exit();
})

// Parse requests of content-type application/x-wwwfrom-urlencoded
app.use(bodyParser.urlencoded({extended: true}))

// parse requests of content-type application/json
app.use(bodyParser.json())

// Routes
app.get('/', (req, res) => {
    res.json({'message': 'Hello there'})
})

require('./routes/note.route')(app)

app.listen(3000, () => {
    console.log('Server is listening on port 3000')
})

