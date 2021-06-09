import React, { useEffect, useState, useContext } from "react";
import TextField from '@material-ui/core/TextField';import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid'
import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import {StateManager} from './StateManager';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
    listGroup:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-between',
        padding:theme.spacing(1),
        height:250
    },
    groupTitleBar:{
        display:'flex',
        justifyContent:'space-between',
        marginLeft:theme.spacing(2),
        marginRight:theme.spacing(2),
        marginBottom:theme.spacing(1)
    },
    links:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'flex-end'
    },
    linkRow:{
        display:'flex',
        alignItems:'center',
        justifyContent:'space-between',
        marginLeft:theme.spacing(1),      
        marginRight:theme.spacing(1),
    },
    linkRowLabel:{
        width:'30%'
    },
    linkRowLink:{
        width:'55%'
    },
    addLinkBar:{
        display:'flex',
        alignItems:'center',
        justifyContent:'space-between',
        marginTop:theme.spacing(0.5),
        marginLeft:theme.spacing(4),
        marginRight:theme.spacing(4),
        paddingTop:theme.spacing(0.5)
    },
    inputLabel:{
        width:'15%'
    },
    inputTitle:{
        width:'20%',
    },
    titleGroup1:{
        display:'flex',
        alignContent:'flex-start'

    },
    groupTitle:{
        marginLeft:theme.spacing(2)
    }
}))

const RefernceGroup = ({lg}) => {
    const classes = useStyles()
    const {tasks, state} = useContext(StateManager)
    const [taskList, setTasks] = tasks
    const [appState, setAppState] = state
    const [newLinkTitle, setNewLinkTitle] = useState('')
    const [newLink, setNewLink] = useState('')
    const [editting, setEditting] = useState(false)

    const delLink = (linkGroup, link) => {
        const newGroups = appState.selectedTask.references.filter(refGroup => {
            if (refGroup.groupKey != linkGroup.groupKey){
                return refGroup
            }
        })
        const links = linkGroup.links.filter(newLink => {
            if (newLink.linkKey != link.linkKey){
                return newLink
            }
        })

        const tasks = taskList.filter(t => {
            if (t.key != appState.selectedTask.key){
                return t
            }
        })
        setTasks(prevTasks => (
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
                references: [{
                    groupKey:linkGroup.groupKey,
                    groupTitle: linkGroup.groupTitle,
                    links: links,
                    dateAdded:linkGroup.dateAdded
                },...newGroups],
                completed: appState.selectedTask.completed
            }]
        ))
        setAppState(pState => ({
            home: false,
            subjects: pState.subjects,
            taskTypes: pState.taskTypes,
            selectedTask: {
                key: pState.selectedTask.key,
                title: pState.selectedTask.title,
                description: pState.selectedTask.description,
                subject: pState.selectedTask.subject,
                dueDate: pState.selectedTask.dueDate,
                priority: pState.selectedTask.priority,
                estTime: pState.selectedTask.estTime,
                type: pState.selectedTask.type,
                dateAdded: pState.selectedTask.dateAdded,
                subTasks: pState.selectedTask.subTasks,
                references: [{
                    groupKey:linkGroup.groupKey,
                    groupTitle: linkGroup.groupTitle,
                    links: links,
                    dateAdded:linkGroup.dateAdded
                },...newGroups],
                completed: pState.selectedTask.completed
            },
            filter:pState.filter,
            priority:pState.priority,
           }))
        
    }

    
    const addLink= (linkGroup) => {
        if (newLinkTitle == ''){
            alert('You must enter a title')
            return
        }
        if (newLink == ''){
            alert('You must enter a link')
            return
        } 
        const key = Math.floor(Math.random()*10000)
        const newGroups = appState.selectedTask.references.filter(refGroup => {
            if (refGroup.groupKey != linkGroup.groupKey){
                return refGroup
            }
        })
        const tasks = taskList.filter(t => {
            if (t.key != appState.selectedTask.key){
                return t
            }
        })

        setTasks(prevTasks => (
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
                references: [{
                    groupKey:linkGroup.groupKey,
                    groupTitle: linkGroup.groupTitle,
                    links: [{
                        linkKey:key,
                        title:newLinkTitle,
                        link:newLink
                    },...linkGroup.links],
                    dateAdded:linkGroup.dateAdded
                },...newGroups],
                completed: appState.selectedTask.completed
            }]
        ))
        setAppState(pState => ({
            home: false,
            subjects: pState.subjects,
            taskTypes: pState.taskTypes,
            selectedTask: {
                key: pState.selectedTask.key,
                title: pState.selectedTask.title,
                description: pState.selectedTask.description,
                subject: pState.selectedTask.subject,
                dueDate: pState.selectedTask.dueDate,
                priority: pState.selectedTask.priority,
                estTime: pState.selectedTask.estTime,
                type: pState.selectedTask.type,
                dateAdded: pState.selectedTask.dateAdded,
                subTasks: pState.selectedTask.subTasks,
                references: [{
                    groupKey:linkGroup.groupKey,
                    groupTitle: linkGroup.groupTitle,
                    links: [{
                        linkKey:key,
                        title:newLinkTitle,
                        link:newLink
                    },...linkGroup.links],
                    dateAdded:linkGroup.dateAdded
                },...newGroups],
                completed: pState.selectedTask.completed
            },
            filter:pState.filter,
            priority:pState.priority,
        }))
        setNewLink('')
        setNewLinkTitle('')
   }

const delGroup = (groupSel) => {
    const tasks = taskList.filter(t => {
        if (t.key != appState.selectedTask.key){
            return t
        }
    })
    
    const newGroups = appState.selectedTask.references.filter(refGroup => {
        if (refGroup.groupKey != groupSel.groupKey){
            return refGroup
        }
    })
    setTasks(prevTasks => (
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
            references: newGroups,
            completed: appState.selectedTask.completed
        }]
    ))
    setAppState(pState => ({
        home: false,
        subjects: pState.subjects,
        taskTypes: pState.taskTypes,
        selectedTask: {
            key: pState.selectedTask.key,
            title: pState.selectedTask.title,
            description: pState.selectedTask.description,
            subject: pState.selectedTask.subject,
            dueDate: pState.selectedTask.dueDate,
            priority: pState.selectedTask.priority,
            estTime: pState.selectedTask.estTime,
            type: pState.selectedTask.type,
            dateAdded: pState.selectedTask.dateAdded,
            subTasks: pState.selectedTask.subTasks,
            references: newGroups,
            completed: pState.selectedTask.completed
        },
        filter:pState.filter,
        priority:pState.priority,
       }))
   }

    return (


                <Paper className={classes.listGroup}>
                    <Box>
                        <Box className={classes.groupTitleBar}>
                            <Box className={classes.titleGroup1}>
                                <Button 
                                    color= {editting?'secondary' :'textSecondary'}
                                    variant='outlined'
                                    size='small'
                                    
                                    onClick={() => setEditting(!editting)}>
                                    {!editting?'edit':'done'}
                                </Button>
                                <Typography 
                                    className={classes.groupTitle}
                                    variant='h6'>
                                    {lg.groupTitle}
                            </Typography>
                            </Box>
                            
                            
                            <Button
                                color= {editting?'secondary' :'primary'}
                                startIcon={!editting?<OpenInNewIcon/>:<DeleteIcon/>}
                                variant='outlined'
                                size='small'
                                onClick={!editting?
                                    () => lg.links.forEach(l => window.open(l.link)):
                                    () => delGroup(lg)}>
                                {!editting?'all':'group'}
                            </Button>
                        </Box>
                        <Divider className={classes.divMain}/>
                    </Box>
                    <Box className={classes.links} overflow='auto'>
                    {lg.links.map(l=>{
                        return (
                            <Box className={classes.linkRow}>
                                <Box className={classes.linkRowLabel}>
                                    <Typography
                                    noWrap={true}
                                    variant='subtitle2'>
                                        {l.title}
                                    </Typography>
                                    
                                </Box >
                                <Box
                                overflow='hidden'
                                className={classes.linkRowLink}>
                                    <Typography
                                    noWrap={true}
                                    variant='subtitle2'>
                                        {l.link}
                                    </Typography>
                                </Box>
                            <Box 
                            className={classes.linkRowOpen}>
                                {!editting?
                                <IconButton 
                                    onClick={() => window.open(l.link, "_blank")}
                                    size='small'> 
                                    <OpenInNewIcon fontSize='small'/>
                                </IconButton>:
                                <IconButton size='small'> 
                                    <DeleteIcon 
                                        className={classes.delIcon}
                                        color='error'
                                        fontSize='small'
                                        onClick={e=> delLink(lg, l)}/>
                                </IconButton>}
                            </Box>
                        </Box> 
                        )
                        })}
                        </Box>
                        
                        <Box>
                        <Divider className={classes.divBottom}/>
                        <Box className={classes.addLinkBar}>
                            <Typography
                            className={classes.inputLabel}
                            noWrap
                            value={newLinkTitle}
                            onChange={e=>setNewLinkTitle(e.target.value)}
                            variant='subtitle'>
                                Add Link:
                            </Typography>
                            <TextField
                            placeholder='Title'
                            size='small'
                            className={classes.inputTitle}
                            value={newLinkTitle}
                            onChange={e=> setNewLinkTitle(e.target.value)}/>
                            <TextField
                            placeholder='URL'
                            size='small'
                            className={classes.inputLink}
                            value={newLink}
                            onChange={e=> setNewLink(e.target.value)}/>
                            <IconButton size='small'> 
                                <AddIcon 
                                    className={classes.inputIcon}
                                    color='primary'
                                    onClick={() => addLink(lg)}
                                    fontSize='small'/>
                            </IconButton>

                        </Box>
                        </Box>
                </Paper>
    )
}

export default RefernceGroup

