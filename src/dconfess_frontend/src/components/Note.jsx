import React from "react";

function Note(props) {
  // function handleClick() {
  //   props.onDelete(props.id);
  // }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      {/* <p className="date"></p> */}
    </div>
  );
}

export default Note;
