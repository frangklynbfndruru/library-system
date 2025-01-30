const {
    setDoc,
    addDoc,
    updateDoc,
    collection,
    getDoc,
    deleteDoc,
    query,
    doc,
    orderBy,
    getDocs,
} = require('firebase/firestore')

const { db } = require('./firebase_config.js')
const router = require('express').Router()

const bodyParser = require('body-parser')

const {
    getAllBook,
    getBookById,
    addBook,
    updateBook,
    deleteBook,
} = require('../controller/book_controller.js')



router.use(bodyParser.json());

router.get('/getAllBook', async(req, res) => {

    try {
        const result = await getAllBook();
        console.log(result)
        res.send(result);

    } catch (error) {
        res.send(error)
    }

});


router.get('/bookData/:id', async(req, res) => {

    try {
        const { id } = req.params;

        const result = await getBookById(req);

        console.log("Data : ", result);
        res.send(result)

    } catch (error) {
        res.send(error)
    }

})

router.post('/addBook', async(req, res) => {

    try {
        const result = await addBook(req);
        console.log("Data : ", result);
        res.send(result)
    } catch (error) {
        res.send(error)
    }
});


router.put('/update/:id', async(req, res) => {

    const data_update = {
        title: req.body.title,
        bookName: req.body.bookName,
        datePublished: req.body.datePublished,
        lastUpdate: Date.now(),
    }

    try {
        const { id } = req.params
        const result = await updateBook(id, data_update)

        res.send(result);
        
    } catch (error) {
        res.status(error)
    }
});

router.delete('/delete-sub-library/:id', async(req, res) => {

    try {
       const { id } = req.params;
       const result = await deleteBook(id)
       res.send(result)
    } catch (error) {
        res.send(error)
    }   
});

module.exports = router