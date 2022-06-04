import React, {useState, useEffect} from "react";
import InputField from "./InputField";
import {useNavigate} from "react-router-dom";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

function AddParticipants(props) {
  
    const [nick,setNick] = useState();


    function onChange(value) {
      setNick(value);  
    }

    function onClick() {
      props.onClick(nick);
    }
    

    function isValid () {
      return !(nick == null) && props.isValid(nick);
    }

    function cancelAdd() {
      props.cancelAdd();
    }

    return (
    <div>
    <Autocomplete
    onChange={(event, value) => onChange(value)}
    disablePortal
    id="combo-box-demo"
    options={props.users || ""}
    sx={{ width: 300 }}
    renderInput={(params) => <TextField {...params} label="Add participants" />}
  />
  <Fab onClick={onClick} disabled={!isValid()} color="primary" aria-label="add"><AddIcon /></Fab> 
  <button className="btn btn-light btn-lg" onClick={cancelAdd}>Finish</button>
  </div>
  )

}

export default AddParticipants;