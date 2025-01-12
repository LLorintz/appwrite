import React, { useEffect, useState } from 'react'
import Noter from '../components/Noter';

import NoteForm from '../components/NoteForm'

export type Note ={
    
    body:string,
    completed:boolean,
    $id: string;
}

const Notes = () => {
    const [notes, setNotes] = useState<Note[]>([]);
  
    const init = async () => {
      try {
        const response = await fetch(
          `https://cloud.appwrite.io/v1/databases/6767d5f40008d4ddfd54/collections/6767d607003a41b15517/documents`,
          {
            headers: {
              'X-Appwrite-Project': '6767d4ce000b5450b827',
            },
          }
        );
        const data = await response.json();
        setNotes(data.documents);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };
  
    useEffect(() => {
      init();
    }, []);
  
    return (
      <>
      <div>
        <div>
          <h1>My Todo List</h1>
        </div>
        <NoteForm setNotes={(newNotes) => setNotes(newNotes)} />
        {notes.map((note) => (
          <>
          <Noter key={note.$id} noteData={note}></Noter>
          </>
        ))}
      </div>
      </>
    );
  };
  
  export default Notes;