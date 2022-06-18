import React from "react";
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import {useNavigate} from "react-router-dom";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';

function EventComponent(props){
    let navigate = useNavigate();
    function onClick() {
        navigate("/events/" + props.id)
    }

    return (
      <div>
        <Card sx={{ maxWidth: 345}}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
            <hr/>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.numOfPart + "/" + props.maxParticipants}
            <PersonIcon/>
            <br/>
            {props.sport}
            <br/>
            <LocationOnIcon/>
            {props.locationAddress}
            {props.my === true && 
            <div>
            <hr/>
            {props.mine ? <p className="text-uppercase mb-0 greenText">Hosting</p> : <p className="text-uppercase mb-0 redText">Participating</p>}
            </div>
            }
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={onClick}>
          Details
        </Button>
      </CardActions>
    </Card>
    <br/>
    </div>
    )
    /* return (
        <div>
        <Link to={"/events/" + props.id}><h1>{props.name}</h1></Link>
        <p>{props.id}</p></div>
          
    ) */

}

export default EventComponent;