import React from 'react'
import noteContext from '../context/notes/noteContext'
import { useContext } from 'react'
export default function NoteItem(props) {
    const context  = useContext(noteContext)
    const {deleteNote} = context
    const { notes } = props
    // console.log(notes.title)


    return (
        <div className='col-md-3'>
            <div className="card my-3" >
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{notes.title}</h5>
                        <i className='fa-solid fa-trash mx-3' onClick={()=>{deleteNote(notes._id)}}></i>
                        <i className="fa-solid fa-pen-to-square mx-3"></i>
                    </div>
                    <p className="card-text">{notes.description}</p>
                </div>
            </div>
        </div>
    )
}
