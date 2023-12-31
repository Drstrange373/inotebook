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
          'auth-token':localStorage.getItem('token')
        }
      })
      const json = await response.json()
      // console.log(json)
      setNotes(json)
      // notesInitial = json
    }
  

  // Add a note
  const addNote = async (title, description, tag) => {
    // console.log(title)
    // console.log(description)
    // console.log(tag)
    // API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'auth-token':localStorage.getItem('token')
      },
      body:JSON.stringify({title, description, tag})
    })
    const json = await response.json()

    // console.log('Adding a new note')
    const note = json
    setNotes(notes.concat(note))
  }

  // Delete a note
  const deleteNote = async (id) => {
    // API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method:'DELETE',
      headers:{
        'Content-Type':'application/json',
        'auth-token':localStorage.getItem('token')
      }
    })
    // const json = response.json()
    console.table(response)

    // console.log("Deleting the note with " + id)
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  // Edit a note
  const editNote = async (id, title, description ,tag) => {
    // API call
    const response =await fetch(`${host}/api/notes/updatenote/${id}`, {
      method:'PUT',
      headers:{
        'Content-Type':'application/json',
        'auth-token':localStorage.getItem('token')
      },
      body:JSON.stringify({title, description, tag})
    })
    console.log(`${host}/api/notes/updatenote/${id}`)
    const json = response.json()
    console.log(json)
    let newNotes = JSON.parse(JSON.stringify(notes))

    // Logic to edit in client 
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if(element._id === id){
        newNotes[index].title = title
        // console.log(newNotes[index].title)
        newNotes[index].description = description
        // console.log( newNotes[index].description )
        newNotes[index].tag = tag
        // console.log(newNotes[index].tag)
        break
      }
      
    }
    setNotes(newNotes)
  }


  return (
    <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )

}

export default NoteState