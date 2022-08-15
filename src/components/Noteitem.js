import React from "react";
import { useContext } from 'react'
import noteContext from "../context/notes/NoteContext"

export const Noteitem = (props) => {
  const { note , updateNote } = props;
  const context = useContext(noteContext);
  const {deleteNote} = context;
  
  var isoString = note.date;
  // console.log(isoString)
  var utc= (new Date(isoString)).toUTCString()

  var datet = (new Date(utc).getDate() + "-" + (new Date(utc).getMonth() + 1) + "-" + new Date(utc).getFullYear() + " - " + new Date(utc).getHours()+ " : " + new Date(utc).getMinutes());

  return (
    <>
      <div className="col-md-3">
        <div className="card my-3">
          <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">
              {note.description}
            </p>
            <p className="card-text text-muted">{note.tag}</p>
            
          </div>
          <div className="d-flex card-footer justify-content-between">{datet}
            <div className="d-flex flex-row-reverse align-items-center">
              <i className="far fa-trash-alt mx-2" onClick={()=>{deleteNote(note._id); props.showAlert("Deleted Successfully ", "success")}}></i>

              <i className="far fa-edit mx-2" onClick={()=>{updateNote(note); }}></i>
            </div>
          
          </div>
        </div>
      </div>
    </>
  );
};
