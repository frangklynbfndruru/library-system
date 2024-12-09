constrouter = require('express').Router()
const fire = require('./firebase_config')
const bodyParser = require('body-parser')
const db = fire.firestore()
router.use(bodyParser.json())

router.post('/data', (req, res) => {
    db.settings({
        timestampsInSnapshots: true
    })
    db.collection('book-data').add({
        bookName: req.body.bookName,
        bookSeries: req.body.bookSeries,
        category: req.body.category,
        date: new Date()
    })
    res.send({
        bookName: req.body.bookName,
        bookSeries: req.body.bookSeries,
        category: req.body.category,
        date: new Date()
    })
})

module.exports = router