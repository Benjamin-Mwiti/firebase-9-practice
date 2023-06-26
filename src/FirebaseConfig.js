import { initializeApp } from 'firebase/app';
import {
    collection,
    getDocs,
    getFirestore,
    addDoc,
    doc,
    deleteDoc,
    onSnapshot,
    query,
    where
} from 'firebase/firestore';
import { useEffect } from 'react';

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

    // queries
    const q = query(colRef, where("author", "==", "patrick rothfuss"))

    // get collection data
    /* getDocs(colRef)
        .then(snapshot => {
            const books = [];
            snapshot.docs.forEach(doc => {
                books.push({...doc.data(), id: doc.id })
            })
            console.log(books)
        })
        .catch(err => {
            console.log(err.message)
        }) */

    // real time data collection
    /* onSnapshot(colRef, snapshot => {
        const books = [];
        snapshot.docs.forEach(doc => {
            books.push({...doc.data(), id: doc.id })
        })
        console.log(books)
    }) */

    onSnapshot(q, snapshot => {
        const books = [];
        snapshot.docs.forEach(doc => {
            books.push({...doc.data(), id: doc.id })
        })
        console.log(books)
    })

    // adding documents
    useEffect(() => {
        const addBookForm = document.querySelector('.add')
        addBookForm.addEventListener('submit', e => {
            e.preventDefault()
            addDoc(colRef, {
                    title: addBookForm.title.value,
                    author: addBookForm.title.value
                })
                .then(() => {
                    addBookForm.reset();
                })
        })
    }, [])

    // deleting documents
    useEffect(() => {
        const deleteBookForm = document.querySelector('.delete')
        deleteBookForm.addEventListener('submit', e => {
            e.preventDefault()
            const docRef = doc(db, 'books', deleteBookForm.id.value);
            deleteDoc(docRef)
                .then(() => {
                    deleteBookForm.reset()
                })
        })
    }, [])

    return null
}

export default FirebaseConfig;