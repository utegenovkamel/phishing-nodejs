require('dotenv').config()
const express = require('express')
const fileUpload = require('express-fileupload')
const sequelize = require('./db')
const router = require('./routes')

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(fileUpload())
app.use('/api', router)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`App started on port ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}

start()
