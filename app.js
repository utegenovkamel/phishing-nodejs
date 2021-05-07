const express = require('express')
const router = require('./routes')
const fileUpload = require('express-fileupload')

require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(fileUpload())
app.use('/api', router)

app.listen(PORT, () => console.log(`App started on port ${PORT}`))
