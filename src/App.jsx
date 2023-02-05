import 'bootstrap/dist/css/bootstrap.min.css';
import { useMemo } from 'react';
import { Container } from 'react-bootstrap';
import { Routes, Route, Navigate } from 'react-router-dom';
import NewNote from './componens/NewNote';
import useLocalStorage from './useLocalStorage';
import { v4 as uuidv4 } from 'uuid';
import NoteList from './componens/NoteList';
import NoteLayout from './componens/NoteLayout';
import Note from './componens/Note';
import EditNote from './componens/EditNote';

function App() {

  const [notes, setNotes] = useLocalStorage("NOTES", []);
  const [tags, setTags] = useLocalStorage("TAGS", []);

  const notesWithTags = useMemo(() => {
    return notes.map(note => {
      return { ...note, tags: tags.filter(tag => note.tagIds.includes(tag.id)) }
    })
  }, [notes, tags]);


  const onCreateNote = ({tags,...data}) => {
    setNotes(prevNotes => {
       return [...prevNotes,{...data,id:uuidv4(),tagIds:tags.map((tag)=>tag.id)}]
    });
  }

  const onUpdateNote = (id,{tags,...data}) => {
    setNotes(prevNotes => {
      return prevNotes.map(note => {
        if (note.id === id) {
          return { ...note, ...data, tagIds: tags.map(tag => tag.id) }
        } else {
          return note
        }
      })
    })
  }

  const onDeleteNote = (id) => {
    setNotes(() => {
      return notes.filter((note) => note.id !== id);
    })
  }

  const addTag = (tag) => {
    setTags((prev) => [...prev, tag]);
  }


  return (
    <Container className='my-4'>
      <Routes>
        <Route path='/' element={<NoteList availableTags={tags} setAvailableTags={setTags} notes={notesWithTags} />} />
        <Route path='/new' element={<NewNote onSubmit={onCreateNote} onAddTag={addTag} availableTags={tags} notes={notes} />} />
        <Route path='/:id' element={<NoteLayout notes={notesWithTags} />}>
          <Route index element={<Note onDelete={onDeleteNote} />} />
          <Route path='edit' element={<EditNote onSubmit={onUpdateNote} onAddTag={addTag} availableTags={tags} notes={notes} />}/>
        </Route>
        <Route path='*' element={<Navigate to=".." />} />
      </Routes>
    </Container>
  )
}

export default App
