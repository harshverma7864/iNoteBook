import React from 'react'
import { useContext ,useEffect, useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import noteContext from "../context/notes/NoteContext"
import { AddNote } from './AddNote'
import { Noteitem } from './Noteitem'

export const Notes = (props) => {
    const context = useContext(noteContext)
    let history = useHistory();
    const {notes, getNotes, editNote  } = context;

    useEffect(() => {
        if(localStorage.getItem('token')==null){
            history.push("/login");
        } else {
            console.log(localStorage.getItem('token'))
            getNotes()
        }
        // eslint-disable-next-line
    }, [])

    const ref = useRef(null)
    const refClose = useRef(null)

    const [note, setNote] = useState({id: "" ,etitle: "", edescription: "" , etag: ""})
  


    const updateNote = (note)=>{
        ref.current.click();
        setNote({id:note._id ,etitle: note.title, edescription: note.description , etag: note.tag})
        // props.showAlert("updated successfullt","success");
    }

    const handleClick = (e)=>{
        console.log("Updating the note...", note)
        editNote(note.id, note.etitle , note.edescription , note.etag)
        refClose.current.click();
        props.showAlert("Deleted Successfully ", "success") ;

        // e.preventDefault(); 
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }

    

    return (
        <>
            <AddNote showAlert={props.showAlert}/>

            {/* //Modal */}
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} minLength={2} required/>
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length<5 || note.edescription.length<5 || note.etag.length<2 } onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className=" row my-3">
            <h1 className="my-3 ">Your Notes</h1>
            <div className="container">
            {notes.lenght===0 && 'No Notes To Display, Please Add Some'}
            </div>
            {
                notes.map((note)=>{
                   
                    return <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note}/>
                })
            }
            </div>
        </>
    )
}
