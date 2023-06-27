import './App.css';
// import FirebaseConfig from './FirebaseConfig';
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
    where,
    orderBy,
    serverTimestamp
} from 'firebase/firestore';
import { useEffect, useState } from 'react';

function App() {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [id, setId] = useState("")
  const [books, setBooks] = useState([]);

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
  // const q = query(colRef, where("author", "==", "patrick rothfuss"), orderBy('title', 'desc'))
  const q = query(colRef, orderBy('createdAt'))

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
  onSnapshot(q, snapshot => {
    console.log(snapshot)
    console.log(snapshot.size)
  })

  // real time data collection
  onSnapshot(q, snapshot => {
      // const books = [];
      snapshot.docs.forEach(doc => {
          // books.push({...doc.data(), id: doc.id })
          console.log(doc.data())
          setBooks([...books, {...doc.data(), id: doc.id }])
      })
      console.log(books)
  })

  // real time data collection using queries
  /* onSnapshot(q, snapshot => {
      const books = [];
      snapshot.docs.forEach(doc => {
          books.push({...doc.data(), id: doc.id })
      })
      console.log(books)
  }) */

  // adding documents
  const addInputDoc = e => {
    e.preventDefault()
    addDoc(colRef, {
      title,
      author,
      createAt: serverTimestamp()
    })
      .then(() => {
        setTitle("");
        setAuthor("");
      })
  };

  const deleteInputDoc = e => {
    e.preventDefault()
    const docRef = doc(db, 'books', id);
    deleteDoc(docRef)
      .then(() => {
          setId("");
      })
  }

  useEffect(() => {
      const addBookForm = document.querySelector('.add')
          /* addSubmission = e => {
              e.preventDefault()
              addDoc(colRef, {
                      title,
                      author,
                      createAt: serverTimestamp()
                  })
                  .then(() => {
                      setTitle("");
                      setAuthor("");
                  })
          } */
          /* addBookForm.addEventListener('submit', e => {
              e.preventDefault()
              addDoc(colRef, {
                      title: addBookForm.title.value,
                      author: addBookForm.title.value,
                      createAt: serverTimestamp()
                  })
                  .then(() => {
                      addBookForm.reset();
                  })
          }) */
  }, [])

  // deleting documents
  /* useEffect(() => {
      const deleteBookForm = document.querySelector('.delete')
      deleteBookForm.addEventListener('submit', e => {
          e.preventDefault()
          const docRef = doc(db, 'books', deleteBookForm.id.value);
          deleteDoc(docRef)
              .then(() => {
                  deleteBookForm.reset()
              })
      })
  }, []) */

  return (
    <div className="App">
      <h1>Getting started with Firebase 9</h1>
      <form className="add" onSubmit={addInputDoc}>
        <label htmlFor="title">Title:</label>
        <input type="text" name="title" value={title} onChange={ e => setTitle(e.target.value)} required />
        <label htmlFor="author">Author:</label>
        <input type="text" name="author" value={author} onChange={ e => setAuthor(e.target.value)} required />
        <button type='submit'>add a new book</button>
      </form>
      <form className="delete" onSubmit={deleteInputDoc}>
        <label htmlFor="id">Document id:</label>
        <input type="text" name="id" value={id} onChange={ e => setId(e.target.value)} required />
        <button type='submit'>delete a book</button>
      </form>
      {/* <FirebaseConfig /> */}
    </div>
  );
}

export default App;
