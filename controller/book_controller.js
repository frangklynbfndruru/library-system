const {

    addDoc,
    collection,
    getDocs,
    getDoc,
    doc
} = require('firebase/firestore')

const { db } = require('../config/firebase_config.js');

const { v4: uuidv4 } = require("uuid")
const { messaging } = require('firebase-admin');

let result_data = {
    statusCode: undefined,
    message: "",
    data: []
}

async function getAllBook() {

    const book_data = await getDocs(collection(db, 'book_library'))

    if (book_data) {

        result_data.statusCode = 200
        result_data.message = "Successful!"
        result_data.data = book_data.docs.map(doc => doc.data());

    } else {

        result_data.statusCode = 404
        result_data.message = "No such document!"

    };
    return result_data;
};

async function getBookById(req, res) {

    const { id } = req.params;

    const data = doc(db, 'book_library', id);

    console.log(`This is the data from "${id}"`)
    const book_data = await getDoc(data);

    if (book_data.exists()) {

        result_data.statusCode = 200
        result_data.data = book_data.data()
        result_data.message = `Successful to get data ${id}!`

    } else {

        result_data.statusCode = 404
        result_data.message = "No such document!"
    }

    return result_data;

}

async function addBook(req, res) {
    const book_id = uuidv4()

    console.log(book_id)
    const docData = {

        title: req.body.title,
        bookName: req.body.bookName,
        datePublished: req.body.datePublished,
        lastUpdate: Date.now(),

    }
    console.log("ini line 77")
    const docRef = await addDoc(collection(db, "book_library"), docData);
    console.log("ini line 79")


    if (docRef) {
        result_data.statusCode = 200
        result_data.data = docRef.data()
        console.log("ini line 85");
        console.log(result_data.data);
        result_data.message = `Successful to add "${book_id}"!`
    } else {
        result_data.statusCode = 404
        result_data.message = "Add book failed!"

    }
    return result_data.data[{
        book_id,
        title: title,
        bookName: bookName,
        datePublished: datePublished,

    }];
}

module.exports = {
    getAllBook,
    getBookById,
    addBook,

}