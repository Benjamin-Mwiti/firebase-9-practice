import { initializeApp } from 'firebase/app';
import {
    collection,
    getDocs,
    getFirestore,
} from 'firebase/firestore';

function FirebaseConfig() {
    const firebaseConfig = {
        apiKey: "AIzaSyAAigiWLRh9kQQDeGq1sHCTmFb77AeR8xw",
        authDomain: "fir-9-dojo-a279b.firebaseapp.com",
        projectId: "fir-9-dojo-a279b",
        storageBucket: "fir-9-dojo-a279b.appspot.com",
        messagingSenderId: "593785994110",
        appId: "1:593785994110:web:ca77771d8dd147ef9dd12f"
    };

    // init firebase app
    initializeApp(firebaseConfig);

    // init services
    // const db = firebase.firestore() // old way
    const db = getFirestore();

    // collection ref
    // db.collection('books') // old way
    const colRef = collection(db, 'books');

    // get collection data
    getDocs(colRef)
        .then(snapshot => {
            const books = [];
            snapshot.docs.forEach(doc => {
                books.push({...doc.data(), id: doc.id })
            })
            console.log(books)
        })
        .catch(err => {
            console.log(err.message)
        })

    return null
}

export default FirebaseConfig;