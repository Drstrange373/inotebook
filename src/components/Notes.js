import React, { useContext, useEffect } from 'react'
import noteContext from '../context/notes/noteContext'
import NoteItem from './NoteItem'
import AddNote from './AddNote'

export default function Notes() {
    const context = useContext(noteContext)
    const { notes, getNotes} = context

    useEffect(()=>{
        getNotes()
    },[])
    
    return (
        <>
        <AddNote/>
        <div className="row my-3">
            <h2>Your Note</h2>
            {notes.map((note) => {
                console.log(note)
                return <NoteItem key={note._id} notes={note}/>
            })}
        </div>
            </>
    )
}
