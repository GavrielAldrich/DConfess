import React, { useState } from "react";
import Mail from "@material-ui/icons/Mail";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);

  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  async function submitNote(event) {
    props.onAdd(note)
    setNote({
      title: "",
      content: ""
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
