import { useState } from "react";
import { Note } from "../Pages/Notes";

type noterProps = {
  noteData: Note;
};

const Noter = ({ noteData }: noterProps) => {
  const [noteState, setNoteState] = useState<Note | null>(noteData);

  const handleUpdate = async () => {
    if (!noteState) return; // Ellenőrizzük, hogy van-e noteState

    const completed = !noteState.completed;
    try {
     /* const response = await fetch(
        `https://cloud.appwrite.io/v1/databases/6767d5f40008d4ddfd54/collections/6767d607003a41b15517/documents`,
        {
          headers: {
            "X-Appwrite-Project": "6767d4ce000b5450b827",
          },
        }
      );
      const data = await response.json();

      const document = data.documents.find((doc: Note) => doc.body === noteState.body);

      if (!document) {
        throw new Error("Document not found");
      }*/

      const updateResponse = await fetch(
        `https://cloud.appwrite.io/v1/databases/6767d5f40008d4ddfd54/collections/6767d607003a41b15517/documents/${noteState.$id}`,
        {
          method: "PATCH",
          headers: {
            "X-Appwrite-Project": "6767d4ce000b5450b827",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              completed,
            },
          }),
        }
      );

      if (!updateResponse.ok) {
        throw new Error("Failed to update note");
      }

      setNoteState({ ...noteState, completed });
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const handleDelete = async () => {
    if (!noteState) return; // Ellenőrizzük, hogy van-e noteState

    try {
      const deleteResponse = await fetch(
        `https://cloud.appwrite.io/v1/databases/6767d5f40008d4ddfd54/collections/6767d607003a41b15517/documents/${noteState.$id}`,
        {
          method: "DELETE",
          headers: {
            "X-Appwrite-Project": "6767d4ce000b5450b827",
          },
        }
      );

      if (!deleteResponse.ok) {
        throw new Error("Failed to delete note");
      }

      console.log("Note deleted successfully");
      setNoteState(null); // Az állapotot null-ra állítjuk
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  if (!noteState) {
    return <div>Note deleted</div>; // Ha a noteState null, akkor csak a törlés üzenetet jelenítjük meg
  }

  return (
    <div className="note-wrapper">
      <span className="note-body" onClick={handleUpdate}>
        {noteState.completed ? <s>{noteState.body}</s> : <>{noteState.body}</>}
      </span>
      <button className="delete" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default Noter;