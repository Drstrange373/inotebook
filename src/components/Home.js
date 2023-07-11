import React from 'react'
// import noteContext from '../context/notes/noteContext'
import Notes from './Notes'


export default function Home(props) {
  const {showAlert} = props
  return (
    <>
        <Notes showAlert={showAlert}/>
    </>
  )
}
