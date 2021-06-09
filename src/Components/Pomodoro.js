//base concept taken fromhttps://javascript.plainenglish.io/create-a-pomodoro-timer-with-react-and-javascript-dead941b1fec
// heavily modified to allow users to define their own timing.

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
  uiUI:{
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
  },
  uiRow:{
    display:'flex',
    alignItems:'center',
    paddingTop:theme.spacing(2)
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
  },
  readoutStat:{
    width:'80%',
    display:'flex',
    justifyContent:'space-between',
    paddingLeft:theme.spacing(3),
    paddingRight:theme.spacing(3),
    padding:theme.spacing(1),
    margin:theme.spacing(1)
  }
}
))


export default function App() {
  const classes = useStyles();
  const [userTime, setUserTime] = useState(25)
  const [onTime, setOnTime] = useState(25*60)
  const [secondsLeft, setSecondsLeft] = useState(onTime);
  const [timer, setTimer] = useState();
  const [readout, setReadout] = useState()
  const [pauseTime, setPauseTime] = useState(5*60)
  const [intervals, setIntervals] = useState(4)
  const [currentInterval, setCurrentInterval] = useState(0)
  const [totalLeft, setTotalLeft] = useState((onTime+pauseTime)*intervals+1)
  const start = () => {
    const timer = setInterval(() => {
      setSecondsLeft((secondsLeft) => secondsLeft - 1);
    }, 1000);
    setTimer(timer);
  };

  const stop = () => {
    clearInterval(timer)
    setSecondsLeft(onTime)
    setTotalLeft((onTime+pauseTime)*intervals)
    setCurrentInterval(0)
  };
  const pause = () => {
    clearInterval(timer)
    setSecondsLeft(prevSec => prevSec)
  };

  const handleSessionLength = inp => {
    if (inp === 'min'){
      if (onTime > 5* 60){
      setOnTime(prevSecs => prevSecs-5*60)
    } else {
      alert('You can set timer to less than 5 minutes')
    }} 
    if (inp === 'add'){
      if (onTime < 55* 60){
        setOnTime(prevSecs => prevSecs+5*60)
      } else {
        alert('You can set timer to less than 15 minutes')
      }
    }
  }
  const handlePauseTime = inp => {
    if (inp === 'min'){
      if (pauseTime > 3* 60){
      setPauseTime(prevSecs => prevSecs-1*60)
    } else {
      console.log('You can set pause time to less than 3 minutes')
    }} 
    if (inp === 'add'){
      if (pauseTime < 10* 60){
        setPauseTime(prevSecs => prevSecs+1*60)
      } else {
        alert('You can set pause time to more than 10 minutes')
      }
    }
  }

  useEffect(() => {
    setSecondsLeft(onTime)
    setTotalLeft((onTime+pauseTime)*intervals+1)
  }, [onTime, pauseTime]);
  
  
  useEffect(() => {
    if (secondsLeft < 0) {
      setReadout(`${Math.floor(pauseTime/60)+Math.floor(secondsLeft/60)}:${(secondsLeft-Math.floor(secondsLeft/60)*60).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      })} break`)
      } else {
    setReadout(`${Math.floor(secondsLeft/60)}:${(secondsLeft-Math.floor(secondsLeft/60)*60).toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    })}`)
    }
    if (secondsLeft < -pauseTime){
      if (currentInterval < intervals - 1){
        setCurrentInterval(prev => prev+1)
        setSecondsLeft(onTime)
      } else {
        alert('Congratulations! Session complete')
        stop()
      }
    }
    setTotalLeft(prev=>prev-1)
  }, [secondsLeft,]);
  
return (
    <Grid container spacing={3} className={classes.root}>
      <Grid item xs={12} md={6} lg={6}  >

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

        <Container className={classes.uiRow}> 
        <Container>
          <Typography variant='h6'>Work:</Typography>
        </Container>
          <Container className={classes.uiUI}>
          <IconButton onClick={() => handleSessionLength('min')} >
            <RemoveIcon/>
            </IconButton>
              <Typography variant='h4'>{`${Math.floor(onTime/60)}:${onTime-Math.floor(onTime/60)*60}`}</Typography>
            <IconButton onClick={() => handleSessionLength('add')} >
            <AddIcon/>
            </IconButton>
          </Container>
        </Container>

        <Container className={classes.uiRow}> 
        <Container>
          <Typography variant='h6'>Rest:</Typography>
        </Container>          
        <Container className={classes.uiUI}>
          <IconButton onClick={() => handlePauseTime('min')} >
            <RemoveIcon/>
            </IconButton>
              <Typography variant='h4'>{`${Math.floor(pauseTime/60)}:${pauseTime-Math.floor(pauseTime/60)*60}`}</Typography>
            <IconButton onClick={() => handlePauseTime('add')} >
            <AddIcon/>
            </IconButton>
          </Container>
        </Container>

        <Container className={classes.uiRow}> 
        <Container>
          <Typography variant='h6'>Intervals:</Typography>
        </Container>          <Container className={classes.uiUI}>
            <IconButton onClick={() => handlePauseTime('min')} >
              <RemoveIcon/>
            </IconButton>
              <Typography variant='h4'>{intervals}</Typography>
            <IconButton onClick={() => handlePauseTime('add')} >
              <AddIcon/>
            </IconButton>
          </Container>
        </Container>

        </Grid>
        <Grid item xs={12} md={6} lg={6} className={classes.readoutRoot}>
          <Typography variant='h2' className={classes.readout}>{`${readout}`}</Typography>
          <Paper className={classes.readoutStat}>
            <Typography>Interval:</Typography>
            <Typography>{currentInterval+1}</Typography>
          </Paper>
          <Paper className={classes.readoutStat}>
            <Typography>Total Time Left:</Typography>
            <Typography>{`${Math.floor(totalLeft/60)}:${totalLeft - Math.floor(totalLeft/60)*60}`}</Typography>
          </Paper>
        </Grid>

    </Grid>
  );
}