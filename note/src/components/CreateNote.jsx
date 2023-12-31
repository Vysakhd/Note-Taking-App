import React from 'react';

const CreateNote = ({ title, setTitle, inputText, setInputText, saveHandler }) => {
  return (
    <div className='note'>
      <input className='titles'
        type='text'
        placeholder='Title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        cols={10}
        rows={5}
        placeholder='Type...'
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      ></textarea>
      <div className='note_footer'>
        <button className='note_save' onClick={saveHandler}>Save</button>
      </div>
    </div>
  );
};

export default CreateNote;


