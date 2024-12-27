const {
    collection,
    getDocs,
    getDoc
} = require('firebase/firestore')

const { db } = require('../config/firebase_config.js');
const { messaging } = require('firebase-admin');


async function getAllBook() {
    // console.log("ini db", db);
    const book_data = await getDocs(collection(db, 'book_library'))

    let result_data = {
        statusCode: undefined,
        message: "",
        data: []
    }

    book_data.forEach((book) => {
        if (book.exists()) {

            result_data.statusCode = 200,
                result_data.data = book.data()
            result_data.message = "Successful!"

        } else {
            // docSnap.data() will be undefined in this case

            result_data.statusCode = 404,
                result_data.message = "No such document!"
        };

    });
    return result_data;
};

module.exports = {
    getAllBook,

}