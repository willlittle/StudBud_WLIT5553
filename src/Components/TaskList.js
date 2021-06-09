import React,{useState, useContext, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Box from '@material-ui/core/Box';
import ListItem from '@material-ui/core/ListItem';
import CloseIcon from '@material-ui/icons/Close';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import {StateManager} from './StateManager.js'
import FolderIcon from '@material-ui/icons/Folder';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { Typography } from '@material-ui/core';
import FilterSub from './FilterSub'
import FilterType from './FilterType'
import ClassIcon from '@material-ui/icons/Class';

const useStyles = makeStyles((theme) => ({
  listItem: {
    marginBottom: theme.spacing(),
    background: 'linear-gradient(45deg, #303540 30%, #202830  90%)', 
  },
  liTextP:{
    
    color:'rgb(240,240,240)'
  },
  liTextS:{
      color:'rgb(200,200,200)'
  },
  filterUI:{
    display:'flex',
    alignItems:'center'
  },
  filterRoot:{
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center',
    marginLeft:theme.spacing(4),
    marginRight:theme.spacing(4)
  }
  
    
  
}));

export default function InteractiveList() {
    const classes = useStyles();
    const {tasks, state} = useContext(StateManager)
    const [taskList, setTasks] = tasks
    const [appState, setAppState] = state
    const [filtered, setFiltered] = useState((taskList.slice().sort()))


    const navToTask = (t) =>{
        setAppState(prevState =>({
          subjects: prevState.subjects,
          taskTypes: prevState.taskTypes,
          selectedTask:t,
          priority:prevState.priority,
          filter:prevState.filter,
          home: false
        }))
    }
   const handleClear = () =>{
    setAppState(prevState =>({
      subjects: prevState.subjects,
      taskTypes: prevState.taskTypes,
      selectedTask:prevState.selectedTask,
      priority:prevState.priority,
      filter:['none', ''],
      // ^ sel.currentTarget.dataset.myValue taken from https://stackoverflow.com/questions/43870814/get-value-of-menuitem-material-ui
      home: true
    }))}

    useEffect(() => {
      if (appState.filter[0] == 'none'){
        setFiltered(taskList.slice().sort())
      }
      if (appState.filter[0] == 'filteredSub'){
        console.log(appState.filter[0], appState.filter[1])
        setFiltered(taskList.filter(t =>{
          if (t.subject == appState.filter[1]){
            return t
          }
      }))
      }
      if (appState.filter[0] == 'filteredType'){
        console.log(appState.filter[0], appState.filter[1])
        setFiltered(taskList.filter(t =>{
          if (t.type == appState.filter[1]){
            return t
          }
      }))
      }
    }, [appState])

    useEffect(() => {
      setFiltered(taskList.slice().sort())
    }, [taskList])
  return (
    <Box>
    <Box className={classes.filterRoot}>
        <Typography 
          className={classes.filterItem}
          variant='subtitle1'
          style={{color:'rgb(200,200,200'}}
          noWrap={true}>Filter by:
        </Typography>
      <Box className={classes.filterUI}>
      
        <FilterSub className={classes.filterItem}/>
        <FilterType className={classes.filterItem}/>
        <IconButton 
          className={classes.filterItem} 
          color="primary" 
          aria-label="upload picture" 
          component="span" 
          onClick={handleClear}>
          <CloseIcon />
        </IconButton>
      </Box>  
    </Box>
        
      <List >
        {filtered.map((t) => (
          <ListItem className={classes.listItem}>
            <ListItemAvatar >
              <Avatar >
              <ClassIcon fontSize='medium'/>
              </Avatar>
            </ListItemAvatar>
            <ListItemText 
            
              primary={<Typography className={classes.liTextP} variant='h6'>{t.title}</Typography>}
              secondary={<Box>
              {/* <Typography className={classes.liTextS}>}</Typography> */}
              <Typography className={classes.liTextS}>Due: <b>{t.dueDate.toLocaleDateString()}</b> | subject: <b>{t.subject}</b> | type: <b>{t.type}</b></Typography>
              </Box>}/>
            
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick={(e)=>{navToTask(t)}}>
                <OpenInNewIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

// import * as React from 'react';
// import { DataGrid, GridToolbar } from '@material-ui/data-grid';
// import { useDemoData } from '@material-ui/x-grid-data-generator';

// export default function BasicFilteringGrid() {
//   const { data } = useDemoData({
//     dataSet: 'Commodity',
//     rowLength: 100,
//     maxColumns: 6,
//   });

//   return (
//     <div style={{ height: 400, width: '100%' }}>
//       <DataGrid
//         {...data}
//         components={{
//           Toolbar: GridToolbar,
//         }}
//         filterModel={{
//           items: [
//             { columnField: 'commodity', operatorValue: 'contains', value: 'rice' },
//           ],
//         }}
//       />
//     </div>
//   );
// }