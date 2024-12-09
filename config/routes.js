const {
    getFirestore,
    setDoc,
    addDoc,
    collection,

} = require('firebase/firestore')
const { fire } = require('./firebase_config.js')
const router = require('express').Router()
    // const fire = require('./firebase_config')
const bodyParser = require('body-parser')
let db = getFirestore();
router.use(bodyParser.json())

router.post('/data', (req, res) => {

    const docRef = addDoc(collection(db, "book_store"), {
        // title: this.setTitle || null,
        // postText: this.setPostText || null,
        bookName: req.bookName || 'not null',
        bookSeries: req.bookSeries || 'not null',
        category: req.category || 'not null',
        date: new Date()
    }).then(() => {

        alert("Add Book Success!!")

        const docRef = doc(db, "book_store", book.uid)
        setDoc(docRef)
            .then(() => {
                window.location.href = '/'
            }).catch((err) => {
                console.error("Error Writting Document!", err);

            })
    }).catch((err) => {
        //  const errorCode = err.code;
        const errorMessage = err.message;
        alert(errorMessage)
    })
    res.send({
        bookName: req.bookName,
        bookSeries: req.bookSeries,
        category: req.category,
        date: new Date()
    })
})

module.exports = router