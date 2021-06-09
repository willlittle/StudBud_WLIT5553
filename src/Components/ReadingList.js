import React, { useEffect, useState, useContext } from "react";
import TextField from '@material-ui/core/TextField';import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid'
import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import RefernceGroup from './RefernceGroup'
import {StateManager} from './StateManager'

const useStyles = makeStyles((theme) => ({
    inputBar:{
        display:'flex',
        alignItems:'center',
        marginLeft:theme.spacing(2)
    },
    root:{
        padding:theme.spacing(1),
        width:'100%',
    },
    addGroupTitle:{
        marginRight:theme.spacing(3)
    },
    addGroupInput:{
        marginRight:theme.spacing(3)
    },
    addGroupButton:{
        marginRight:theme.spacing(3)
    },


}))

const Reading = () => {
    const classes = useStyles()
    const {tasks, state} = useContext(StateManager)
    const [taskList, setTaskList] = tasks
    const [appState, setAppState] = state
    const [newLinkTitle, setNewLinkTitle] = useState()
    const [newLink, setNewLink] = useState()
    const [filtered, setFiltered] = useState(appState.selectedTask.references.sort( (a,b) =>  a.dateAdded - b.dateAdded))
    const [newGroupTitle, setNewGroupTitle] = useState('')


    const addGroup = () => {
        const key = Math.floor(Math.random()*10000)
        const tasks = taskList.filter(t => {
            if (t.key != appState.selectedTask.key){
                return t
            }
        })
        setTaskList(prevTasks => (
        [...tasks,{
            key: appState.selectedTask.key,
            title: appState.selectedTask.title,
            description: appState.selectedTask.description,
            subject: appState.selectedTask.subject,
            dueDate: appState.selectedTask.dueDate,
            priority: appState.selectedTask.priority,
            estTime: appState.selectedTask.estTime,
            type: appState.selectedTask.type,
            dateAdded: appState.selectedTask.dateAdded,
            subTasks: appState.selectedTask.subTasks,
            references: [...appState.selectedTask.references,{
                groupKey: key,
                groupTitle:newGroupTitle,
                links:[],
                dateAdded: Date.now()
            }],
            completed: appState.selectedTask.completed
        }]
        ))
        setAppState(prevState=>({
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
                subTasks: prevState.selectedTask.subTasks,
                references: [...prevState.selectedTask.references,{
                    groupKey: key,
                    groupTitle:newGroupTitle,
                    links:[],
                    dateAdded: Date.now()
                }],
                completed: prevState.selectedTask.completed
            },
            filter:prevState.filter,
            priority:prevState.priority,
        }))
    }

    

    useEffect(() => {
        setFiltered(appState.selectedTask.references.sort( (a,b) =>  a.dateAdded - b.dateAdded))
    }, [appState])

    return (

        <Grid container className={classes.root} spacing={1}>
            <Grid item xs={12} md={12} lg={12}>
                <Box className={classes.inputBar}>
                    <Typography
                    className={classes.addGroupTitle}
                    variant='h5'
                    color='textSecondary'
                    size='small'
                    placeholder='Title'>
                        Add refernce group:
                    </Typography>
                    
                    <TextField
                    value={newGroupTitle}
                    className={classes.addGroupInput}
                    variant='outlined'
                    label='group title'
                    margin='dense'
                    placeholder='Title'
                    onChange={e => setNewGroupTitle(e.target.value)}/>
                    <Button 
                    className={classes.addGroupButton}
                    variant='outlined'
                    size='medium'
                    onClick={() => addGroup()}>
                        Add
                    </Button>
                </Box>
            </Grid>
        {appState.selectedTask.references.length > 0? filtered.map(lg => {
            return (
            <Grid item xs={12} md={6} lg={6}>
                <RefernceGroup lg={lg}/>
            </Grid> 
            )})
        :
        <Box>
            <Typography
                variant='h3'
                color='textSecondary'
                style={{marginLeft:'1.5rem', marginTop:'1.5rem'}}> Add Group </Typography>
            <Typography
                variant='h6'
                color='textSecondary'
                style={{marginLeft:'1.5rem'}}> Then add references </Typography>
        </Box>
        }
        </Grid>
    )
}

export default Reading
