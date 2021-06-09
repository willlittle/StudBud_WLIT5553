import React,{useContext, useState} from 'react'
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CheckBox from '@material-ui/core/CheckBox';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import { makeStyles } from '@material-ui/core/styles';
import {StateManager} from './StateManager'
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection:'column',
      marginLeft:theme.spacing(2),
      marginRight:theme.spacing(2),
    },
    paper:{
        minHeight:'5vh',
        display:'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding:theme.spacing(1)
    
    },
    gridCont:{
        mar: theme.spacing(4),
        minHeight: '40vh',
        flexShrink:3
    },
    input:{
        padding:theme.spacing(4),
        display:'flex',
        alignItems:'center'
        
    },
    inputField:{
        padding:theme.spacing(1),
        display:'flex',
        alignItems:'center'
    },
    noTasksTitle:{
        padding:theme.spacing(2)
    }
  }));

const SubTasks = () => {
    const {tasks, state} = useContext(StateManager)
    const [taskList, setTasks] = tasks
    const [appState, setAppState] = state
    const classes = useStyles()


const addSubTask = (e, ) =>{
    if (subTaskTile == ''){
        alert('You must Add a task title')
        return
    }
    setSubTaskTitle('')
    const prevT = taskList.filter(t=>{
        if (t.key != appState.selectedTask.key){
            return t
        }
    })
    const newSubT = {
        key: Math.floor(Math.random()*10000),
        title:subTaskTile,
        col: 0,
        deleted:false
    }

    setTasks(pt =>(
        [{
            key: appState.selectedTask.key,
            title: appState.selectedTask.title,
            description: appState.selectedTask.description,
            subject: appState.selectedTask.subject,
            dueDate: appState.selectedTask.dueDate,
            priority: appState.selectedTask.priority,
            estTime: appState.selectedTask.estTime,
            type: appState.selectedTask.type,
            dateAdded: appState.selectedTask.dateAdded,
            subTasks: [ newSubT,...appState.selectedTask.subTasks],
            references: appState.selectedTask.references,
            completed: appState.selectedTask.completed
        },...prevT]
    ))
    setAppState((prevState)=>({
        home: false,
        subjects: prevState.subjects,
        taskTypes: prevState.taskTypes,
        selectedTask: {
            key: prevState.selectedTask.key,
            title: prevState.selectedTask.title,
            description: prevState.selectedTask.description,
            subject: prevState.selectedTask.subject,
            dueDate: prevState.selectedTask.dueDate,
            priority: prevState.selectedTask.priority,
            estTime: prevState.selectedTask.estTime,
            type: prevState.selectedTask.type,
            dateAdded: prevState.selectedTask.dateAdded,
            subTasks: [...prevState.selectedTask.subTasks, newSubT],
            references: prevState.selectedTask.references,
            completed: prevState.selectedTask.completed
        },
        filter:prevState.filter,
        priority:prevState.priority,
        }))
    }
    const delSubT = (key)=>{
        const prevT = taskList.filter(t=>{
            if (t.key != appState.selectedTask.key){
                return t
            }
        })
        const newSubT = appState.selectedTask.subTasks.filter(sT=>{
            if (sT.key != key){
                return sT
            }
        })

        setTasks(pt =>(
            [{
                key: appState.selectedTask.key,
                title: appState.selectedTask.title,
                description: appState.selectedTask.description,
                subject: appState.selectedTask.subject,
                dueDate: appState.selectedTask.dueDate,
                priority: appState.selectedTask.priority,
                estTime: appState.selectedTask.estTime,
                type: appState.selectedTask.type,
                dateAdded: appState.selectedTask.dateAdded,
                subTasks: newSubT,
                references: appState.selectedTask.references,
                completed: appState.selectedTask.completed
            },...prevT]
        ))
        setAppState((prevState)=>({
            home: false,
            subjects: prevState.subjects,
            taskTypes: prevState.taskTypes,
            selectedTask: {
                key: prevState.selectedTask.key,
                title: prevState.selectedTask.title,
                description: prevState.selectedTask.description,
                subject: prevState.selectedTask.subject,
                dueDate: prevState.selectedTask.dueDate,
                priority: prevState.selectedTask.priority,
                estTime: prevState.selectedTask.estTime,
                type: prevState.selectedTask.type,
                dateAdded: prevState.selectedTask.dateAdded,
                subTasks: newSubT,
                references: prevState.selectedTask.references,
                completed: prevState.selectedTask.completed
            },
            
            filter:prevState.filter,
            priority:prevState.priority,
            }))
    }
    
    const [subTaskTile, setSubTaskTitle] = useState('')




    
    return (
        <Box className={classes.root}>
            <Box  >
                <Grid container spacing={3} className={classes.input}>
                    <Grid item xs={12} md={5} lg={5} >
                        <Paper className={classes.inputField}> 
                            <Input 
                                fullWidth={true}
                                fullHeight={true}
                                placeholder='Enter Subtask Title'
                                value={subTaskTile}
                                onChange={e =>(
                                    setSubTaskTitle(e.target.value, 'add')
                                )}>
                            </Input>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6} >
                        <Button 
                        position='fixed' 
                        color='secondary' 
                        variant ='outlined'
                        size='large'
                        startIcon={<PlaylistAddIcon/>}
                        onClick={(e)=>(
                            addSubTask()
                        )}>Add</Button>
                    </Grid>
                </Grid>
            </Box>
            <Box className={classes.display}   >
                {appState.selectedTask.subTasks.length > 0?
                    <Grid container spacing={2} maxWidth='lg' overflow="auto">
                        {appState.selectedTask.subTasks.map((sT)=>(
                            <Grid item xs={12}  lg={12}>
                                    <Paper className={classes.paper}>
                                        <Box 
                                            display='flex' 
                                            alignItems='center'>
                                            <Typography>
                                                {sT.title}
                                            </Typography>
                                        </Box>
                                    <Button
                                        onClick={e=>(
                                            delSubT(sT.key)
                                        )}> del
                                    </Button>
                                    </Paper>
                            </Grid>
                            ))}
                    </Grid>:
                <Typography variant='h4' colour='textSecondary' className={classes.noTasksTitle}>Add Subtasks...</Typography>
                }
            </Box>
            
            
        
        </Box>
    )
}

export default SubTasks
