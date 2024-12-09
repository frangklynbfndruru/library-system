require("dotenv").config()



const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const myRoutes = require('./config/routes.js')
const port = process.env.PORT

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(myRoutes)

app.get('/', (req, res) => {
    res.send('<h1>Express & Firestore</h1>')
})

app.listen(port, () => {
    console.log(`server listening on ${port} ..`)
})