import NoteContext from "./noteContext";
import { useState } from "react"; 

const NoteState = (props) => {
  const [notes, setNotes] = useState([]);
  const fetchOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "auth-token": localStorage.getItem('token')
    }
  };

  // Get all Notes
  const getNotes = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/notes/fetchallnotes", fetchOptions);
      if (!response.ok) {
        throw new Error('Failed to fetch notes');
      }
      const json =  await response.json();
      setNotes(json);
    } catch (error) {
      console.error(error);
    }
  };

  // Add a Note
  const addNote = async (title, description, tag) => {
    try {
      const response = await fetch("http://localhost:5000/api/notes/addnote", {
        ...fetchOptions,
        method: 'POST',
        body: JSON.stringify({ title, description, tag })
      });
      if (!response.ok) {
        throw new Error('Failed to add note');
      }
      const note = await response.json();
      setNotes((prevNotes) => [...prevNotes, note]);
    } catch (error) {
      console.error(error);
    }
  };

  // Delete a Note
  const deleteNote = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/notes/deletenote/${id}`, {
        ...fetchOptions,
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to delete note');
      }
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    try {
      const response = await fetch(`http://localhost:5000/api/notes/updatenote/${id}`, {
        ...fetchOptions,
        method: 'PUT',
        body: JSON.stringify({ title, description, tag })
      });
      if (!response.ok) {
        throw new Error('Failed to edit note');
      }
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note._id === id ? { ...note, title, description, tag } : note
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
