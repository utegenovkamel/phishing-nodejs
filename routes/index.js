const fs = require('fs')
const path = require('path')
const csv = require('csv-parser')
const { Router } = require('express')
const router = new Router()

const parseCsv = (csvPath) => {
    const results = []

    fs.createReadStream(csvPath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            console.log(results)
        })
}

router.post('/targets', (req, res) => {
    let file
    let uploadedCsvPath

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.')
    }

    file = req.files.file
    uploadedCsvPath = path.resolve('static', file.name)

    file.mv(uploadedCsvPath, function (err) {
        if (err) return res.status(500).send(err)
        res.send('File uploaded!')
    })

    parseCsv(uploadedCsvPath)
})

module.exports = router
