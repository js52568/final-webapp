import React from "react";

function InputField(props) {

    return (
        <div className="form-group">
            <label for={props.name}>{props.label}</label>
            <input type={props.type} className="form-control" name={props.name} onChange={props.onChange} value={props.value} size={props.size ? props.size : "20"}/>
        </div>

    );

}

export default InputField;