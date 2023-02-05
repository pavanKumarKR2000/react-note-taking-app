import React from 'react'
import { Navigate, Outlet, useOutletContext, useParams } from 'react-router-dom';

const NoteLayout = ({notes}) => {

  const { id } = useParams();
  const note = notes.find((note) => note.id === id);

  if (note === null) {
    return <Navigate to="/" replace/>;
  }

  return <Outlet context={note}/>
}

export default NoteLayout;

export const useNote = () => {
  return useOutletContext();
}

