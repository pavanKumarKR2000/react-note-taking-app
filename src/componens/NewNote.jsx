import React from 'react'
import NoteForm from './NoteForm';

const NewNote = ({ onSubmit,onAddTag,availableTags}) => {
  return (
      <>
          <h1 className='mb-4'>NEW NOTE</h1>
         <NoteForm onSubmit={onSubmit} onAddTag={onAddTag} availableTags={availableTags} />
      </>
  )
}

export default NewNote;