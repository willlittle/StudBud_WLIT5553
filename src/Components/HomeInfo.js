//This is a datascience heavy component, indicative of the level of detail I found certain use cases desired.
// as I continue to develope this concept and more data is added to each task, this concept will be developed further


import { Grid, Paper, Typography, Box, IconButton, Container } from '@material-ui/core'
import React,{useState, useContext, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import TimerIcon from '@material-ui/icons/Timer';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import {StateManager} from './StateManager'
import FunctionsIcon from '@material-ui/icons/Functions';
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';
import DateRangeIcon from '@material-ui/icons/DateRange';
const useStyles = makeStyles((theme) => ({
  subheading: {
    padding: theme.spacing(1),
    marginLeft: theme.spacing(1),
    color:'rgb(200,200,200)'
  },
  root:{
    background: 'linear-gradient(45deg, #303540 30%, #202830  90%)', 
    padding:theme.spacing(1)
  },
  infoPanel:{
    display:'flex',
    alignItems:'center',
    justifyContent:'space-between',
    margin:theme.spacing(1),
  },
  iconTitle:{
    display:'flex',
    justifyContent:'space-between',
    width:'30%',
    alignItems:'center'
  },
  title:{
    display:'flex',
    justifyContent:'space-between',
    paddingLeft:theme.spacing(1),
    width:'70%',
    alignItems:'center'
  },
  icon:{
      marginLeft: theme.spacing(2)
  },
 
  grid:{
      padding:theme.spacing(1)
  },
  iconLabel:{
    justifyContent:'center',
      display:'flex',
      alignItems:'center',
      marginBottom:theme.spacing(0.5)

  },
    stats:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        paddingTop:theme.spacing(2)
  },
  statsIcon:{
      marginRight:theme.spacing(1)
  }

  
}))
const HomeInfo = () => {
    const classes = useStyles()
    const {tasks, state} = useContext(StateManager)
    const [taskList, setTasks] = tasks
    const [appState, setAppState] = state
    const [longest, setLongest] = useState('')
    const [next, setNext] = useState('')
    const [withinMonth, setWithinMonth] = useState('')
    const [total, setTotal] = useState('')

    useEffect(() => {
    const estTime = taskList.slice().sort((a, b) => b.estTime - a.estTime)
    const dueDate = taskList.slice().sort((a, b) => b.dueDate - a.dueDate)
    const currentDate = new Date()
    const withinMonths = taskList.filter(t => {
        if (t.dueDate.getMonth() == currentDate.getMonth() & t.dueDate.getUTCDate() >= currentDate.getUTCDate()){
            return t
        }
    })
    // ^taken from https://stackoverflow.com/questions/11392186/how-to-check-a-date-is-within-current-week-or-current-month-or-next-month-in-jav
    
    setTotal(taskList.length)
    setWithinMonth(withinMonths.length)
    setLongest(estTime[0])
    setNext(dueDate[dueDate.length-1])
}, [taskList])

    const navFromHighLight = (task) =>{
        setAppState(prevState =>({
          subjects: prevState.subjects,
          taskTypes: prevState.taskTypes,
          selectedTask:task,
          priority:prevState.priority,
          filter:prevState.filter,
          home: false
        }))
    }

    return (
        <Paper className={classes.root}>
 
                <Typography variant = 'h4' className={classes.subheading}>Quick Look</Typography>
                <Paper className={classes.infoPanel}>
                    <Box className={classes.iconTitle}>
                        <NavigateNextIcon className={classes.icon}/>
                        <Typography variant='subtitle2'>Due Next:</Typography>
                    </Box>
                    <Box className={classes.title}>
                        <Typography variant='subtitle2' overflow='hidden'>{next.subject}: <b>{next.title}</b> </Typography>
                        <IconButton onClick={e => navFromHighLight(longest)}> 
                        <OpenInNewIcon fontSize='small'/>
                        </IconButton>
                    </Box>
                </Paper>
                <Paper className={classes.infoPanel}>
                    <Box className={classes.iconTitle}>
                        <TimerIcon className={classes.icon}/>
                        <Typography variant='subtitle2'>Longest:</Typography>
                    </Box>
                    <Box className={classes.title}>
                        <Typography variant='subtitle2'>{longest.subject}: <b>{longest.title}</b> </Typography>
                        <IconButton onClick={e => navFromHighLight(longest)}> 
                        <OpenInNewIcon fontSize='small'/>
                        </IconButton>
                    </Box>
                </Paper>

                <Grid container className={classes.grid} spacing={1}>
                    <Grid  item xs={4} md={4} lg={4} className={classes.stats}>
                        <Container className={classes.iconLabel}>
                            <FunctionsIcon fontSize='large' className={classes.statsIcon}/>
                            <Typography variant='h4' fontWeight="fontWeightLight">{total}</Typography>
                        </Container>
                        <Typography  variant='subtitle2'>Total</Typography>
                    </Grid>
                    <Grid  item xs={4} md={4} lg={4} className={classes.stats}>
                        <Container className={classes.iconLabel}>
                            <DateRangeIcon fontSize='large' className={classes.statsIcon}/>
                            <Typography variant='h4' fontWeight="fontWeightLight">{withinMonth}</Typography>
                        </Container>
                        <Typography  variant='subtitle2'>This Month</Typography>
                    </Grid>
                    <Grid  item xs={4} md={4} lg={4} className={classes.stats}>
                        <Container className={classes.iconLabel}>
                            <NotificationImportantIcon fontSize='large' className={classes.statsIcon}/>
                            <Typography variant='h4' fontWeight="fontWeightLight">2</Typography>
                        </Container>
                        <Typography  variant='subtitle2'>Priority</Typography>
                    </Grid>
                </Grid>
            </Paper>
    )
}

export default HomeInfo
