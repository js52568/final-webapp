import React from "react";
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import {useNavigate} from "react-router-dom";

function EventComponent(props){
    let navigate = useNavigate();
    function onClick() {
        navigate("/events/" + props.id)
    }

    return (
        <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={onClick}>
          Details
        </Button>
      </CardActions>
    </Card>
    )
    /* return (
        <div>
        <Link to={"/events/" + props.id}><h1>{props.name}</h1></Link>
        <p>{props.id}</p></div>
          
    ) */

}

export default EventComponent;