import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { makeStyles } from '@material-ui/core/styles';

import {StateManager} from './StateManager.js'


export default function FilterSub({type}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const {tasks, state} = React.useContext(StateManager)
  const [taskList, setTasks] = tasks
  const [appState, setAppState] = state



  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect= (sel) => {
    
    setAppState(prevState =>({
      subjects: prevState.subjects,
      taskTypes: prevState.taskTypes,
      selectedTask:prevState.selectedTask,
      priority:prevState.priority,
      filter:['filteredSub', sel.currentTarget.dataset.myValue],
      // ^ sel.currentTarget.dataset.myValue taken from https://stackoverflow.com/questions/43870814/get-value-of-menuitem-material-ui
      home: true
    }))
    console.log(sel)
    setAnchorEl(null);

  }
 


  return (
    
        
            <Container minWidth='lg'>
      <Button 
      aria-controls="simple-menu"
       aria-haspopup="true"
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon/>}>
        {appState.filter[0] == 'filteredSub'?appState.filter[1]:'Subject'}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {appState.subjects.map(s =>{
          return <MenuItem data-my-value={s} onClick={handleSelect}>{s}</MenuItem>
        })}
        
      </Menu>
      </Container>
      
    
  );
}