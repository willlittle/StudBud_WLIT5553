//base level rendering called by App.js. useContext's 'state provider' called here.
//Other baseline formatting such as theme, back drop and theme also declared here

import TaskList from './TaskList'
import {StateManager} from './StateManager'
import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';
import HomeInfo from './HomeInfo'
import React,{useState, useContext, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({


  grid: {
    display:'flex',
    alignItems:'top'
  },
  info:{
    marginTop:60
  }

}))
const Home = () => {
    const classes= useStyles()
    const {tasks, state} = useContext(StateManager)
    const [taskList, setTasks] = tasks
    const [appState, setAppState] = state
    return (
        <Container maxWidth='lg' >
            <Grid container className={classes.grid} spacing={2}>
                <Grid  item xs={12} md={5} lg={5} className={classes.info}>
                <HomeInfo/>
                </Grid>
                <Grid item xs={12} md={7} lg={7} >
                <TaskList/>
                </Grid>
            </Grid>
        </Container>
    )
}


export default Home
