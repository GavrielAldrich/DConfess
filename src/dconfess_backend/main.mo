import Debug "mo:base/Debug";
import Buffer "mo:base/Buffer";

actor DConfess {

  public type Note = {
    title: Text;
    content: Text;
  };

  var notes = Buffer.Buffer<Note>(0);

  public func createNote(titleText: Text, contentText: Text){
    let newNote: Note = {
      title = titleText;
      content = contentText;
    };
    notes.add(newNote);
  };

    public query func readNotes(): async [Note] {
      return Buffer.toArray(notes);
  };

    public func deleteNote(noteId: Nat){
      let removedData = notes.remove(noteId);
      Debug.print(debug_show("Removed items:",removedData));
    };
};

