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

router.post('/library', async(req, res) => {

    try {
        const result = await addBook(req);
        console.log("Data : ", result);
        res.send(result)
    } catch (error) {
        res.send(error)
    }
});


router.put('/update/:id', async(req, res) => {

    try {

        const { id } = req.params

        const docRef = doc(db, "book_library", id);

        const update = await setDoc(docRef, {

            title: req.body.title,
            bookName: req.body.bookName,
            datePublished: req.body.datePublished,
            lastUpdate: Date.now(),

        });

        // await updateDoc(update);

        // console.log(update_data.data())

        res.send({ status: "Success!" });
    } catch (error) {
        res.status(error)
    }
});

router.delete('/delete-sub-library/:id', async(req, res) => {

    try {
        const { id } = req.params;
        const docRef = doc(db, 'book_library', id)
        await deleteDoc(docRef)

        res.status(200).send({ message: `The ${id} is delete!` })
    } catch (error) {
        res.send(error)
    }
});


module.exports = router