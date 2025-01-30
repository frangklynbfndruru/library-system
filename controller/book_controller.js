const {

    addDoc,
    collection,
    getDocs,
    getDoc,
    doc,
    count,
    deleteField,
    deleteDoc,
    setDoc
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
    const dataE = collection(db, "book_library")
    
    if (docData) {
        console.log("Ini data", docData)
        const docRef = await addDoc(dataE, docData)

        // console.log("ini docref", docRef)
        
        result_data.statusCode = 200,
        result_data.data = docRef.data(),
        result_data.message = `Successful to add "${book_id}"!`
    } else {
        result_data.statusCode = 404
        result_data.message = "Add book failed!"

    }
  
//    return result_data
}




async function updateBook(id, data_update) {
    const data = await getDoc(doc(db,'book_library',id))
    

    if (data.data()) {
        if (data_update) {
            return result_data.statusCode =  400,
                   result_data.message = `Please fill the fields!`
             
        }else {
            await setDoc(doc(db,'book_library', id), data_update)
            result_data.statusCode = 200

            result_data.message = "Update date success!"
        }
    } else {
        result_data.statusCode = 404
        result_data.message = "No such document!"
    }
    return result_data
}

async function deleteBook(id){
    
    const data = await getDoc(doc(db,'book_library',id))

    if (data.data()) {
        await deleteDoc(doc(db, 'book_library', id))
        result_data.statusCode = 200
        result_data.message = "Delete success!"
    }else  {
        result_data.statusCode = 404
        result_data.message = "No such document!"
    }

    return result_data
}

module.exports = {
    getAllBook,
    getBookById,
    addBook,
    updateBook,
    deleteBook,
}