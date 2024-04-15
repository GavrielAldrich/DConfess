import React, { useEffect, useState } from "react";
import { dconfess_backend } from "declarations/dconfess_backend";
import Header from "./components/Header";
import Note from "./components/Note";
import CreateArea from "./components/CreateArea";
import Footer from "./components/Footer";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(()=>{
    async function fetchInitialNotes(){
      const initialNotes = await dconfess_backend.readNotes();
      setNotes(initialNotes);
    }
    fetchInitialNotes();
  }, []);

  function addNote(newNote) {
    setNotes(prevNotes => {
      dconfess_backend.createNote(newNote.title, newNote.content);
      return [...prevNotes, newNote];
    });
  };

  function deleteNote(id) {
    dconfess_backend.deleteNote(id);
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  };

  return (
    <>
    <main>
      <Header />
      <CreateArea onAdd={
        addNote
        } />
        <div id="notes-container">
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
