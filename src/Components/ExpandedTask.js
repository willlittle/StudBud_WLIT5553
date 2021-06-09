import React,{useContext} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import {StateManager} from './StateManager'
import DateRangeIcon from '@material-ui/icons/DateRange';
import TimerIcon from '@material-ui/icons/Timer';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import ClassIcon from '@material-ui/icons/Class';
import SchoolIcon from '@material-ui/icons/School';
import ExpandedSwitcher from './ExpandedSwitcher'
const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(1),
        display: 'flex',
  },
  titles:{

    paddingLeft:theme.spacing(2),
    alignItems: 'center'
  },
  paper: {
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    background: 'linear-gradient(45deg, #303540 30%, #202830  90%)', 
  },
  content: {
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    background: 'linear-gradient(45deg, #303540 30%, #202830  90%)', 
  },
  titles: {
    background: 'linear-gradient(45deg, #303540 30%, #202830  90%)',
    display:'flex',
    height:100,
    padding:theme.spacing(2)
  },
  stats: {
    background: 'linear-gradient(45deg, #303540 30%, #202830  90%)',
    display:'flex',
    height:100,
    padding:theme.spacing(2)
  },
  stat:{
    display:'flex',
    width:'inherit',
    alignText:'center',
    padding:theme.spacing(0.5),
    alignItems:'center',
  }
}));

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const {tasks, state} = useContext(StateManager)
  const [taskList, setTasks] = tasks
  const [appState, setAppState] = state
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const taskEstTime = `~ ${Math.floor(appState.selectedTask.estTime/60)}:${appState.selectedTask.estTime-Math.floor(appState.selectedTask.estTime/60)*60}`



  return (
    <div className={classes.root}>
        <Container maxWidth="lg" maxHeight='lg'>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} lg={6}>
              <Paper className={classes.titles}>
                <Box >
                <Typography variant='h4'>{appState.selectedTask.title}</Typography>
                <Typography variant='h5' color='textSecondary'>{appState.selectedTask.description}</Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Paper className={classes.stats}>
                <Grid container spacing={1}>
                    <Grid item xs={4} md={4} lg={4} className={classes.stat}>
                      <Paper className={classes.stat}>
                        <DateRangeIcon fontSize='small' style={{marginRight: 10}} color='secondary'/>
                        <Typography variant='h7' color='textPrimary'>{appState.selectedTask.dueDate.toLocaleDateString()}</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={4} md={4} lg={4} className={classes.stat}>
                      <Paper className={classes.stat}>
                        <TimerIcon fontSize='small' style={{marginRight: 10}} color='secondary'/>
                        <Typography variant='h7' color='textPrimary'>{taskEstTime}</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={4} md={4} lg={4} className={classes.stat}>
                      <Paper className={classes.stat}>
                        <PriorityHighIcon fontSize='small' style={{marginRight: 10}} color='secondary'/>
                        <Typography variant='h7' color='textPrimary'>{appState.selectedTask.priority}</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={4} md={4} lg={4} className={classes.stat}>
                      <Paper className={classes.stat}>
                        <ClassIcon fontSize='small' style={{marginRight: 10}} color='secondary'/>
                        <Typography variant='h7' color='textPrimary'>{appState.selectedTask.type}</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={4} md={4} lg={4} className={classes.stat}>
                      <Paper className={classes.stat}>
                        <SchoolIcon fontSize='small' style={{marginRight: 10}} color='secondary'/>
                        <Typography variant='h7' color='textPrimary'>{appState.selectedTask.subject}</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={4} md={4} lg={4} className={classes.stat}>
                      <Paper className={classes.stat}>
                        <SchoolIcon fontSize='small' style={{marginRight: 10}} color='secondary'/>
                        <Typography variant='h7' color='textPrimary'>{appState.selectedTask.subject}</Typography>
                      </Paper>
                    </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.content}>
                <ExpandedSwitcher/>
              </Paper>
            </Grid>
          </Grid>
        </Container>
    </div>
  );
}