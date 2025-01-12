import { Note } from "../Pages/Notes";

type NoteFormProps = {
    setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}

const NoteForm = ({ setNotes }: NoteFormProps) => {
    const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const noteBody = (form.elements.namedItem('body') as HTMLInputElement).value;
    
        if (!noteBody) return;
    
        try {
            // Új jegyzet hozzáadása az Appwrite API-hoz fetch használatával
            const response = await fetch(
                `https://cloud.appwrite.io/v1/databases/6767d5f40008d4ddfd54/collections/6767d607003a41b15517/documents`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Appwrite-Project': '6767d4ce000b5450b827', // Helyettesítsd a saját Project ID-dal
                        
                    },
                    body: JSON.stringify({
                        documentId: 'unique()', // Egyedi ID generálása
                        data: {
                            body: noteBody,
                            completed: false,
                        },
                    }),
                }
            );
    
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
    
            const newNote = await response.json();
    
            // React állapot frissítése
            setNotes((prevNotes) => [newNote, ...prevNotes]);
            form.reset();
        } catch (error) {
            console.error('Error adding note:', error);
        }
    };
  
    return (
      <form onSubmit={handleAdd} id="todo-form">
        <input
          name="body"
          type="text"
          placeholder="🤔 What's on the agenda?"
        />
        <button>submit</button>
      </form>
    );
  };
  
  export default NoteForm;
