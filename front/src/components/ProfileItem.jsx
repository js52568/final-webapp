import React from "react";

function ProfileItem(props) {
    return (
    <div>
        <h2>{props.name}: {props.value}</h2>
    </div>)
}

export default ProfileItem;