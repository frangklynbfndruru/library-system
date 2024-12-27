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
const { v4: uuidv4 } = require("uuid")
const { getAllBook, } = require('../controller/book_controller.js')



router.use(bodyParser.json());

router.get('/getAllBook', async(req, res) => {
    // console.log("ini line 26")


    const result = await getAllBook();
    console.log(result)
        // res.status(result.statusCode).send(result.data);
    res.send(result);

});


router.get('/bookData/:id', async(req, res) => {

    try {
        const { id } = req.params;
        const data = doc(db, 'book_library', id);
        const book_data = await getDoc(data);

        console.log("ini line 55 book data", id)
        console.log(book_data.data())

        if (book_data.exists()) {

            console.log("Document data : ", book_data.data());
        } else {
            // docSnap.data() will be undefined in this case
            // console.log("No such document!");
            res.status(404).send({ message: "No such document!" })
        }

        res.send(book_data.data())

    } catch (error) {
        console.log("ini error /line 52", error)
        res.status(404).send(error)
    }


})

router.post('/library', async(req, res) => {
    const book_id = uuidv4()

    console.log(book_id)
    const docData = {

        title: req.body.title,
        bookName: req.body.bookName,
        datePublished: req.body.datePublished,
        lastUpdate: Date.now(),

    }
    console.log("ini line 62")
    const docRef = await addDoc(collection(db, "book_library"), docData);

    console.log(docData)

    res.send({ status: "Success!" })
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