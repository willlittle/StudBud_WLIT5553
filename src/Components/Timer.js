import React, { useEffect, useState } from "react";
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography } from "@material-ui/core";
import RemoveIcon from '@material-ui/icons/Remove';

const useStyles = makeStyles((theme) => ({
  root:{
    width:'100%'
  },

  
  centralUI:{
    display:'flex',
    justifyContent:'center',
    marginTop:theme.spacing(2),
    marginBottom:theme.spacing(-1)
  },
  button:{
    margin:theme.spacing(2)
  },
  start:{
    margin:theme.spacing(2),
    fontSize:'1.5rem'

  },
  readoutRoot:{
    display:'flex',
    flexDirection:'column',
    alignItems:'center'
  },
  readout:{
    margin:theme.spacing(3)
  }
}
))


export default function App() {
  const classes = useStyles();
  const [userTime, setUserTime] = useState(25)
  
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [timer, setTimer] = useState();
  const [readout, setReadout] = useState('')

  const start = () => {
    const timer = setInterval(() => {
      setSecondsElapsed((secondsElapsed) => secondsElapsed + 1);
    }, 1000);
    setTimer(timer);
  };

  const stop = () => {
    clearInterval(timer)
    setSecondsElapsed(0)
    clearInterval(timer)
    

  };
  const pause = () => {
    clearInterval(timer)
    setSecondsElapsed(prevSec => prevSec)
  };



  useEffect(() => {
    setSecondsElapsed(secondsElapsed)
    setReadout(`${Math.floor(secondsElapsed/60)}:${(secondsElapsed-Math.floor(secondsElapsed/60)*60).toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    })}`)
    // ^ taken from https://stackoverflow.com/questions/8043026/how-to-format-numbers-by-prepending-0-to-single-digit-numbers, formatting string to 2 digits
  }, [secondsElapsed]);
  

return (
    <Grid container spacing={3} className={classes.root}>
      <Grid item xs={12} md={12} lg={12} className={classes.readoutRoot}>
        <Typography variant='h1' className={classes.readout}>{readout}</Typography>
      </Grid>
      <Grid item xs={12} md={12} lg={12}  >
        <Container className={classes.centralUI}>
          <Button 
            className={classes.button}
            color='secondary'
            variant='outline'
            onClick={stop}>stop
          </Button>
          <Button 
            className={classes.start}
            variant='contained'
            color='primary'
            onClick={start}>start
          </Button>
          <Button 
            className={classes.button}
            color='secondary'
            variant='outline'
            onClick={pause}>pause
          </Button>
        </Container>
      </Grid>
    </Grid>
  );
}




// <Container className={classes.uiRow}> 
// <Container>
//   <Typography variant='h6'>Work:</Typography>
// </Container>
//   <Container className={classes.uiUI}>
//   <IconButton onClick={() => handleSessionLength('min')} >
//     <RemoveIcon/>
//     </IconButton>
//       <Typography variant='h4'>{`${Math.floor(secondsElapsed/60)}:${secondsElapsed-Math.floor(secondsElapsed/60)*60}`}</Typography>
//     <IconButton onClick={() => handleSessionLength('add')} >
//     <AddIcon/>
//     </IconButton>
//   </Container>
// </Container>

// <Container className={classes.uiRow}> 
// <Container>
//   <Typography variant='h6'>Rest:</Typography>
// </Container>          
// <Container className={classes.uiUI}>
//   <IconButton onClick={() => hand('min')} >
//     <RemoveIcon/>
//     </IconButton>
//       <Typography variant='h4'>{`${Math.floo/60)}:-Math.floo/60)*60}`}</Typography>
//     <IconButton onClick={() => hand('add')} >
//     <AddIcon/>
//     </IconButton>
//   </Container>
// </Container>

// <Container className={classes.uiRow}> 
// <Container>
//   <Typography variant='h6'>Intervals:</Typography>
// </Container>          <Container className={classes.uiUI}>
//     <IconButton onClick={() => hand('min')} >
//       <RemoveIcon/>
//     </IconButton>
//       <Typography variant='h4'>{intervals}</Typography>
//     <IconButton onClick={() => hand('add')} >
//       <AddIcon/>
//     </IconButton>
//   </Container>
// </Container>