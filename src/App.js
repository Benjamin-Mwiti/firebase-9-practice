import './App.css';
import FirebaseConfig from './FirebaseConfig';

function App() {
  return (
    <div className="App">
      <h1>Getting started with Firebase 9</h1>
      <form className="add">
        <label htmlFor="title">Title:</label>
        <input type="text" name="title" required />
        <label htmlFor="author">Author:</label>
        <input type="text" name="author" required />
        <button>add a new book</button>
      </form>
      <form className="delete">
        <label htmlFor="id">Document id:</label>
        <input type="text" name="id" required />
        <button>delete a book</button>
      </form>
      <FirebaseConfig />
    </div>
  );
}

export default App;
