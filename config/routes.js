const {
    getFirestore,
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

const { fire } = require('./firebase_config.js')
const router = require('express').Router()

const bodyParser = require('body-parser')
const { v4: uuidv4 } = require("uuid")

let db = getFirestore(fire);

router.use(bodyParser.json());

router.get('/book_data', async(req, res) => {

    const book_data = await getDocs(collection(db, 'book_store'))

    book_data.forEach((book) => {
        if (book.exists()) {

            console.log(book.id, "=>", book.data());
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
        res.send(book.data())
    });



})
router.get('/book_data/:id', async(req, res) => {

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
            console.log("No such document!");
        }

        res.send(book_data.data())

    } catch (error) {
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

        await updateDoc(docRef, {

            title: req.body.title,
            bookName: req.body.bookName,
            datePublished: req.body.datePublished,
            lastUpdate: Date.now(),

        });

        // console.log(update_data.data())

        res.send({ status: "Success!" });
    } catch (error) {
        res.status(error)
    }
});

router.delete('delete-sub-library/:id', async(req, res) => {

    try {
        const { id } = req.params;
        const docRef = doc(db, 'book_library', id)
        await deleteDoc(docRef)

        res.status(200).send({ message: `The ${id} is deleted!` })
    } catch (error) {
        res.send(error)
    }
});


module.exports = router