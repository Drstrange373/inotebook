import React, { useState } from 'react'
import NoteContext from './noteContext'



const NoteState = (props) => {
  const host = 'http://localhost:5000'
  const notesInitial = []

  const [notes, setNotes] = useState(notesInitial)

    // Add a note
    const getNotes = async () => {
      // API call
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method:'GET',
        headers:{
          'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ1OTJlNThlMDQ5ZWUxMWE0ZGRhYmUzIn0sImlhdCI6MTY4MzY0NTc0N30.XgF_bV8ECaGxwHqh7CQCjxCqb3dOiY-PjdosSRKfTK8'
        }
      })
      const json = await response.json()
      console.log(json)
      setNotes(json)
      notesInitial = json
    }
  

  // Add a note
  const addNote = async (title, description, tag) => {
    console.log(title)
    console.log(description)
    console.log(tag)
    // API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ1OTJlNThlMDQ5ZWUxMWE0ZGRhYmUzIn0sImlhdCI6MTY4MzY0NTc0N30.XgF_bV8ECaGxwHqh7CQCjxCqb3dOiY-PjdosSRKfTK8'
      },
      body:JSON.stringify({title, description, tag})
    })
    

    console.log('Adding a new note')
    const note = {
      "_id": "646791a138fd85bdfdfdd31",
      "user": "64592e58e049ee11a4ddabe3",
      "title": title,
      "tag": tag,
      "date": "2023-05-19T15:34:50.196Z",
      "__v": 0,
      "description": description
    };
    setNotes(notes.concat(note))
  }

  // Delete a note
  const deleteNote = (id) => {
    // TODO : API call
    console.log("Deleting the note with " + id)
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  // Edit a note
  const editNote = (id, title, description ,tag) => {
    // API call
    const response = fetch(`${host}/api/notes/updatenote/${id}`, {
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ1OTJlNThlMDQ5ZWUxMWE0ZGRhYmUzIn0sImlhdCI6MTY4MzY0NTc0N30.XgF_bV8ECaGxwHqh7CQCjxCqb3dOiY-PjdosSRKfTK8'
      },
      body:JSON.stringify({title, description, tag})
    })
    // const json = response.json()

    // Logic to edit in client 
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if(element._id === id){
        element.title = title
        element.description = description
        element.tag = tag
      }
      
    }
  }


  return (
    <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )

}

export default NoteState