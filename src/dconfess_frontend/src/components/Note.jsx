import React from "react";

function Note(props) {

  // == DELETE HANDLE ==
  // function handleClick() {
  //   props.onDelete(props.id);
  // }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <p className="note-date" align="right">{props.date}</p>
    </div>
  );
}

export default Note;
