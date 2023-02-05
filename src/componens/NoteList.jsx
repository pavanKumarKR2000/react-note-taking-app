import { useMemo, useState } from 'react';
import { Row, Col, Button, Stack, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Select from 'react-select'
import EditTagsModal from './EditTagsModal';
import NoteCard from './NoteCard';

const NoteList = ({ availableTags, notes ,setAvailableTags}) => {
    
    const [show, setShow] = useState(false);

    const [selectedTags, setSelectedtags] = useState([]);  
    const [title, setTitle] = useState("");

    const handleChange = (tags) => {

        setSelectedtags(tags.map((tag) => {
          return { label: tag.label, id: tag.value };
        }));
    
      }

  const filteredNotes = useMemo(() => {
    return notes.filter(note => {
      return (
        (title === "" ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every(tag =>
            note.tags.some(noteTag => noteTag.id === tag.id)
          ))
      )
    })
  }, [title, selectedTags, notes]);


  const updateTag = (id, label)=>{
    setAvailableTags(prevTags => {
      return prevTags.map(tag => {
        if (tag.id === id) {
          return { ...tag, label }
        } else {
          return tag
        }
      })
    })
  }

  const deleteTag = (id) => {
    setAvailableTags(() => {
      return availableTags.filter((tag) => tag.id !== id);
    })
  }

  return (
      <>
          <Row className='align-items-center '>
              <Col><h1>NOTES</h1></Col>
              <Col xs="auto">
                  <Stack direction='horizontal' gap={2}>
                      <Link to="/new"><Button variant='primary'>Create Note</Button></Link>
                      <Button variant='outline-secondary' onClick={()=>setShow(true)}>Edit Tags</Button>
                  </Stack>
              </Col>
          </Row>
          <Form>
              <Row className='my-4'>
                  <Col>
                      <Form.Group controlId='title'>
                          <Form.Label>Filter By Title</Form.Label>   
                          <Form.Control value={title} onChange={(e)=>setTitle(e.target.value)} /> 
                      </Form.Group>
                  </Col>
                  <Col>
                  <Form.Group controlId='tag'>
                          <Form.Label>Filter By Tags</Form.Label>   
                          <Select
                            isMulti
                            value={selectedTags.map((tag) => {return { label: tag.label, value: tag.id }})}
                            onChange={handleChange}
                            options={availableTags.map((tag) => { return { label: tag.label, value: tag.id }; })} />
                 </Form.Group>
                  </Col>
             </Row>
          </Form>    
          <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
              {
                  filteredNotes.map((note) => {
                      return (
                          <Col key={note.id}><NoteCard id={note.id} title={note.title} tags={note.tags} /></Col>
                      )
                  })
               }
          </Row>     
      <EditTagsModal availableTags={availableTags} show={show} setShow={setShow} onDeleteTag={deleteTag} onUpdateTag={updateTag} />
      </>
  )
}

export default NoteList;
