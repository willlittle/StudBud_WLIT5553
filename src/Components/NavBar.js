//simple Navbar using conditional rendering to only display back button when not on home page, and to only allow users to add task if @ home

import React,{useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import AddIcon from '@material-ui/icons/Add';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AddTask from './AddTask'
import {StateManager} from './StateManager'


const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function MenuAppBar({back, submit}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const {tasks, state} = useContext(StateManager)
  const [taskList, setTasks] = tasks
  const [appState, setAppState] = state

  const handleBack = () => {
      setAppState((prevState)=>({
        subjects: prevState.subjects,
        taskTypes: prevState.taskTypes,
        selectedTask:prevState.selectedTask,
        priority:prevState.priority,
        filter: prevState.filter,
        home: true
      }))
  }


  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const iconSwitcher = () =>{
    if (appState.home == false){
      return (
      <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <KeyboardBackspaceIcon fontSize = 'small' onClick={() => (handleBack())} />
      </IconButton>
      )  
  }
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.paper}>
        <Toolbar>
          {iconSwitcher()}
        <Typography variant="h6" className={classes.title}>
          StudBud
          </Typography>
          {appState.home?
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AddIcon/>
              </IconButton>
              <Menu
                id="menu-appbar"
                
                anchorEl={anchorEl}
                
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                  
                <MenuItem disableRipple={true} disableFocus={true}>
                    <AddTask />
                </MenuItem>
              </Menu>
            </div>
          :""}
        </Toolbar>
      </AppBar>
    </div>
  );
}