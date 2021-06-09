import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SubTasks from './SubTasks'
import TimingSwitcher from './TimingSwitcher'
import KanBan from './KanBan'
import ReadingList from './ReadingList'
import Player from './Player'
const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    background: 'linear-gradient(45deg, #303540 30%, #202830  90%)',
  },
  content:{
    height:'70vh'
  }
});


export default function CenteredTabs({addSubT}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const expandedTaskSwitch = () => {
    switch(value){
        case 0:
            return <SubTasks/>
        case 1:
            return <KanBan/>
        case 2:
            return <TimingSwitcher/>
        case 3:
            return <ReadingList/>
        case 4:
          return <Player/>
    }
}


  return (
        <>
            <Paper className={classes.root}>
  
            <Tabs 
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant='scrollable'
                centered>
                <Tab textColor='primary' label="SubTasks" />
                <Tab label="Kanban Board" />
                <Tab label="Timing"/>
                <Tab label="Reading List"/>
                <Tab label="Player"/>
            </Tabs>
            </Paper>
            <Box className={classes.content}>
                {expandedTaskSwitch()}
            </Box>
        </>
  );
}