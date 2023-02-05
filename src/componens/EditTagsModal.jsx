import React, { useState } from 'react'
import { Button, Col, Form, Modal, Row, Stack } from 'react-bootstrap';

const EditTagsModal = ({ availableTags ,show,setShow,onUpdateTag,onDeleteTag}) => {

    

    const handleClose = () => {
        setShow(!show);
     }


  return (
      <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
              <Modal.Title>EDIT TAGS</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Form>
                  <Stack gap={2}>
                      {
                          (availableTags.length>0)?(availableTags.map((tag) => {
                              return (<Row key={tag.id}>
                                  <Col>
                                      <Form.Control value={tag.label} onChange={(e)=>onUpdateTag(tag.id,e.target.value)} />
                                  </Col>
                                  <Col xs="auto">
                                      <Button variant='outline-danger' onClick={()=>onDeleteTag(tag.id)}>Delete</Button>
                                  </Col>
                              </Row>)  
                         })):<h5 className='text-center'>NO TAGS TO SHOW</h5>
                      }
                  </Stack>
              </Form>
          </Modal.Body>
      </Modal>
  )
}

export default EditTagsModal;