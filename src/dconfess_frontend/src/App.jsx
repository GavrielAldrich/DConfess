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
      checkAndResetData();
      const initialNotes = await dconfess_backend.readNotes();
      setNotes(initialNotes);
    }
    fetchInitialNotes();
  }, []);

  function addNote(newNote) {
    setNotes(prevNotes => {
      dconfess_backend.createNote(newNote.title, newNote.content,newNote.date);
      return [...prevNotes, newNote];
    });
  };

  // Function to reset data if the current date is different from the next date
  async function checkAndResetData() {
  const lastResetDate = localStorage.getItem('lastResetDate');
  const currentDate = new Date().toISOString().slice(0, 10); // Get current date in yyyy-mm-dd format

  // Calculate next date
  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + 1);
  const nextDateString = nextDate.toISOString().slice(0, 10); // Get next date in yyyy-mm-dd format

  // If last reset date is not set or it's different from current date, reset data
  if (!lastResetDate || lastResetDate !== currentDate) {
    await dconfess_backend.resetAllNote();
    localStorage.setItem('lastResetDate', currentDate); // Update last reset date
    }

  // If current date is equal to the next date, set timeout for next check
  if (currentDate === nextDateString) {
    setTimeout(checkAndResetData, 12 * 60 * 60 * 1000); // 12 hours in milliseconds
    }
  }

  // === DELETE FUNCTION ===
  // function deleteNote(id) {
  //   dconfess_backend.deleteNote(id);
  //   setNotes(prevNotes => {
  //     return prevNotes.filter((noteItem, index) => {
  //       return index !== id;
  //     });
  //   });
  // };

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
            date={noteItem.date}
            title={noteItem.title}
            content={noteItem.content}
            // onDelete={deleteNote}
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
