import React, {useState, useEffect} from "react";
import InputField from "./InputField";
import {useNavigate} from "react-router-dom";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

function AddParticipants(props) {               //rijesiti dodavanje ovoga, predati u event

    function onSubmit () {
                       
    }

    function onChange(value) {
        
    }

    function add () {}

    function isValid () {
        props.isValid();
    }

    function cancelAdd() {}

    return (
    <div>
    <form onSubmit={onSubmit}>
    <Autocomplete
    onChange={(event, value) => {onChange(value)}}
    disablePortal
    id="combo-box-demo"
    options={props.users || ""}
    sx={{ width: 300 }}
    renderInput={(params) => <TextField {...params} label="Add participants" />}
  />
  <Fab onClick={add} disabled={!isValid} color="primary" aria-label="add"><AddIcon /></Fab>
  </form> 
  <button className="btn btn-light btn-lg" onClick={cancelAdd}>Cancel</button>
  </div>
  )

}

export default AddParticipants;