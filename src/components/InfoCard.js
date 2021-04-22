import React, { useContext} from 'react';
import { Card, CardContent, Typography,CardActionArea} from '@material-ui/core';
import {CovidDataContext} from '../context/CovidDataContext'

const casesTypeColors={
    "Active Cases":{
        backgroundColor: "#f09819",
        background: "linear-gradient(180deg,#edde5d,#f09819)",
    },
    "Recoveries":{
        backgroundColor: "#56ab2f",
        background: "linear-gradient(180deg, #a8e063, #56ab2f)",
    },
    "Deaths":{
        backgroundColor: "rgb(165 0 0)",
        background: "linear-gradient(180deg,#e68d6d,rgb(165 0 0))",   
    }
}

const InfoCard = ({title,today,total}) => {
    const {animateNumber,changeCard}=useContext(CovidDataContext)


    const cardChange=(e)=>{
        changeCard(title);
    }

    return (
        <Card className="info-card" style={casesTypeColors[title]}>
            <CardActionArea onClick={(e)=>cardChange(e)}>
                <CardContent>
                    <Typography className="info-card-title" color="textSecondary">{title}</Typography>
                    <Typography className="info-card-total">{animateNumber(total)}</Typography>
                    <Typography className="info-card-today" color="textSecondary">{animateNumber(today)} Current</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default React.memo(InfoCard);
