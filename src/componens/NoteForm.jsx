import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Form, Row, Stack } from 'react-bootstrap';
import CreatableSelect from 'react-select/creatable';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const NoteForm = ({onSubmit,onAddTag,availableTags,title="",markdown="",tags=[]}) => {
  
  const [selectedTags, setSelectedtags] = useState(tags);
  const titleRef = useRef(null);
  const markdownRef = useRef(null);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      title: titleRef.current.value,
      markdown: markdownRef.current.value,
      tags:selectedTags
    });
 
    navigate("..");

  }

  const handleChange = (tags) => {

    setSelectedtags(tags.map((tag) => {
      return { label: tag.label, id: tag.value };
    }));

  }

  const handleCreate = (label) => {
    const newTag = { id: uuidv4(), label };
    onAddTag(newTag);
    setSelectedtags((prev) => [...prev, newTag]);
  }

  


    return (
      <Form onSubmit={handleSubmit}>
            <Stack gap={4}>
            <Row>
            <Col>
                <Form.Group controlId='title'>
                    <Form.Label>Title</Form.Label>
                <Form.Control required ref={titleRef} defaultValue={title} />
                </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId='tag'>
                <Form.Label>Tag</Form.Label>
                <CreatableSelect
                  isMulti
                  value={selectedTags.map((tag) => {return { label: tag.label, value: tag.id }})}
                  onCreateOption={handleCreate}
                  onChange={handleChange}
                  options={availableTags.map((tag) => { return { label: tag.label, value: tag.id }; })} />
              </Form.Group>
            </Col>        
            </Row>
            <Row>
                <Col>
                 <Form.Group controlId='markdown'>
                    <Form.Label>Body</Form.Label>
                    <Form.Control required as="textarea" rows={10} ref={markdownRef} defaultValue={markdown} />
                  </Form.Group> 
                </Col>
            </Row>
            <Row>
            <Col>
              <Stack gap={2} direction="horizontal" className="justify-content-end">
                 <Button type="submit" variant='primary'>Save</Button>
                 <Link to=".."><Button type="button" variant='outline-secondary'>Cancel</Button></Link>  
              </Stack>
              </Col>
            </Row>    
            </Stack>    
      </Form>
  )
}

export default NoteForm;