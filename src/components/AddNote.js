import React, {useContext, useState} from 'react'
import noteContext from "../context/notes/NoteContext"


export const AddNote = (props) => {

    const context = useContext(noteContext)
    const {addNote} = context;

    const [note, setNote] = useState({title: "" , description: "" ,tag: ""})

    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description , note.tag);
        setNote({title: "" , description: "" ,tag: ""})
        props.showAlert("Added Successfully ", "success") 
    }

    //to get value in input tags
    const onChange =(e)=>{
        setNote({...note, [e.target.name] : e.target.value })
    }

    return (
        <>
            <div className="container">
            <h1 className="my-1">Add a Note</h1>
            <form>
                <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea className="form-control" id="description" name="description" rows="3" value={note.description} onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                <label htmlFor="tag" className="form-label">Tag</label>
                <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} minLength={5} required/>
                </div>
                <button type="submit" disabled={note.title.length<5 || note.description.length<5 || note.tag.length<2 } className="btn btn-outline-info" onClick={handleClick} >Submit</button>
            </form>
            </div>
        </>
    )
}
