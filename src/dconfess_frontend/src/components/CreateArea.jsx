import React, { useState } from "react";
import Mail from "@material-ui/icons/Mail";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";

function CreateArea(props) {
  // Get the current date
  var currentDate = new Date()
  // Extract year, month, and day
  var year = currentDate.getFullYear();
  var month = ('0' + (currentDate.getMonth() + 1)).slice(-2); // Adding 1 because January is 0
  var day = ('0' + currentDate.getDate()).slice(-2);
    
  // Format the date as yyyy-mm-dd
  var formattedDate = year + '-' + month + '-' + day;
  const [isExpanded, setExpanded] = useState(false);

  const [note, setNote] = useState({
    title: "",
    content: "",
    date: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value,
        date: formattedDate
      };
    });
  }

  async function submitNote(event) {
    props.onAdd(note)
    setNote({
      title: "",
      content: "",
    });
    event.preventDefault();
  }

  function expand() {
    setExpanded(true);
  }

  return (
    <div>
      <form className="create-note">
        {isExpanded && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        )}

        <textarea
          name="content"
          onClick={expand}
          onChange={handleChange}
          value={note.content}
          placeholder="Send Message Anonymously..."
          rows={isExpanded ? 3 : 1}
        />
        <button onClick={submitNote}>
          <Mail />
        </button>
        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}>
            <Mail />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
