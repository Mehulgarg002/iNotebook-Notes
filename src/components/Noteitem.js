import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const Noteitem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note,updateNote } = props;
    return (
        <div className="col-md-3">
            <div className="card my-3" >
                <div className="card-body ">
                    <div className=" align-items-center d-flex bd-highlight ">
                        <h5 className="card-title me-auto  bd-highlight">{note.title}</h5>
                        <i className='far fa-trash-alt  bd-highlight' onClick={() => { deleteNote(note._id) }} />
                        <i className='far fa-edit  p-2 bd-highlight' onClick={() => { updateNote(note) }} />
                    </div>
                    <p className="card-text">{note.description} </p>
                </div>
            </div>
        </div>

    )
}

export default Noteitem

