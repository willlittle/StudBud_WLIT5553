import React,{useContext, useState} from 'react';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles';
import {StateManager} from './StateManager'
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '40ch',
    },
  },
}));

export default function FormPropsTextFields({submit}) {
  const classes = useStyles();
  const {tasks, state} = useContext(StateManager)
  const [aState, setaState] = state
  const [taskList, setTasks] = tasks
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [subject, setSubject] = useState('')
  const [taskType, setTaskType] = useState('')
  const [priority, setPriority] = useState('')
  const [hr, setHr] = useState('')
  const [min, setMin] = useState('')
  const [selectedDate, setSelectedDate] = React.useState(new Date('2021-06-18T21:11:54'));
  
  const handleDateChange = (date) => {
    setSelectedDate(date)
  };
  const handleSub = (title, description, subject,taskType,priority,hr,min,selectedDate) =>{
    if (title == ''){
      alert('You must enter a title')
      return
    } 
    if (description == ''){
      alert('You must enter a description')
      return
    } 
    if (subject == ''){
      alert('You must enter a subject')
      return
    } 
    if (taskType == ''){
      alert('You must enter a Task Type')
      return
    } 
    if (selectedDate == ''){
      alert('You must select a date')
      return
    } 
    let hour = 0
    let minute = 0
    let hrT = /^\d+$/.test(hr)
    let minT = /^\d+$/.test(min)
    // ^ taken fromhttps://stackoverflow.com/questions/1779013/check-if-string-contains-only-digits
    if (hrT && minT){
      hour = Number(hr)
      minute = Number(min)

    } else {
      alert('You must enter Hour and Minute as numbers')
      return
    }
    
    setTasks(pt =>(
      [{
          key: Math.floor(Math.random()*10000),
          title: title,
          description: description,
          subject: subject,
          dueDate: selectedDate,
          priority: priority,
          estTime: Number(hr)*60+Number(min),
          type: taskType,
          dateAdded: 123,
          subTasks: [],
          references: [],
          completed: false
      },...pt]
  ))
 
    setTitle('') 
    setDescription('')
    setSubject('')
    setTaskType('')
    setPriority('')
    setHr('')
    setMin('')
    setSelectedDate(new Date('2021-06-18T21:11:54'))
  }
  
  return (
    <div>
        <Typography variant='h4' color ='text.priamry'>Add Task</Typography>
        <form className={classes.root}>
            <div>
                <TextField id="outlined-basic" label="Title" variant="outlined" value={title} onChange={(e)=>(setTitle(e.target.value))}/>
            </div>
            <div>
                <TextField id="outlined-basic" label="Description" variant="outlined" value={description} onChange={(e)=>(setDescription(e.target.value))}/>
            </div>
            <div>
              <TextField
                value={subject} 
                onChange={(e)=>(setSubject(e.target.value))}
                id="standard-select-currency"
                select
                label="Subject"
              >
                {aState.subjects.map((subject) => (
                  <MenuItem  value={subject}>
                    {subject}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div>
              <TextField
                  value={taskType} 
                  onChange={(e)=>(setTaskType(e.target.value))}
                  id="standard-select-currency"
                  select
                  label="Type"
                >
                  {aState.taskTypes.map((t) => (
                    <MenuItem  value={t}>
                      {t}
                    </MenuItem>
                  ))}
              </TextField>
            </div>
            <div>
              <TextField
                  value={priority} 
                  onChange={(e)=>(setPriority(e.target.value))}
                  id="standard-select-currency"
                  select
                  label="Priority"
                >
                  {aState.priority.map((p) => (
                    <MenuItem  value={p[1]}>
                      {p}
                    </MenuItem>
                  ))}
              </TextField>
            </div>
            <div >
              <TextField 
                style={{width: 30}}
                label="Hr"
                value={hr}
                onChange={(e)=>{setHr(e.target.value)}}
              />
              <TextField 
                style={{width: 30}}
                label="Min"
                value={min}
                onChange={(e)=>{setMin(e.target.value)}}
              />
            </div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify="space-around">
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Date picker inline"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </Grid>
            </MuiPickersUtilsProvider>
            <div  style={{display:'flex',justifyContent:'center', marginTop:10}}>
            <Button 
              color='primary'
              size = 'large' 
              variant='contained'
              onClick={()=>(
                handleSub(title, description, subject,taskType,priority,hr,min,selectedDate))}
              >
                  Submit
              </Button>
            </div>
        </form>
    </div>
  );
}
