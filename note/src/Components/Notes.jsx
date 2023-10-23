import React, { useEffect, useState } from 'react';
import CreateNote from './CreateNote';
import './notes.css';
import { v4 as uuid } from 'uuid';
import Note from './Note';

const Notes = () => {
  const [title, setTitle] = useState(''); 
  const [inputText, setInputText] = useState('');
  const [notes, setNotes] = useState([]);
  const [editToggle, setEditToggle] = useState(null);

  const editHandler = (id, title, text) => {
    setEditToggle(id);
    setTitle(title);
    setInputText(text);
  };

  const saveHandler = () => {
    if (editToggle) {
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === editToggle ? { ...note, title, text: inputText } : note
        )
      );
    } else {
      setNotes((prevNotes) => [
        ...prevNotes,
        {
          id: uuid(),
          title, 
          text: inputText,
        },
      ]);
    }

    setTitle(''); 
    setInputText('');
    setEditToggle(null);
  };

  const deleteHandler = (id) => {
    const newNotes = notes.filter((n) => n.id !== id);
    setNotes(newNotes);
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('Notes'));
    if (data) {
      setNotes(data);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('Notes', JSON.stringify(notes));
  }, [notes]);

  return (
    <div className='notes'>
      {notes.map((note) =>
        editToggle === note.id ? (
          <CreateNote
            title={title}
            setTitle={setTitle}
            inputText={inputText}
            setInputText={setInputText}
            saveHandler={saveHandler}
          />
        ) : (
          <Note
            key={note.id}
            id={note.id}
            title={note.title}
            text={note.text}
            editHandler={editHandler}
            deleteHandler={deleteHandler}
          />
        )
      )}
      {editToggle === null ? (
        <CreateNote
          title={title}
          setTitle={setTitle}
          inputText={inputText}
          setInputText={setInputText}
          saveHandler={saveHandler}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Notes;
