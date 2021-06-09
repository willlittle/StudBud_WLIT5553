import React,{useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Switch from '@material-ui/core/Switch';
import Pomodoro from './Pomodoro'
import Timer from './Timer'

const useStyles = makeStyles((theme) => ({
    inputBar:{
        display:'flex',
        alignItems:'center',
        marginLeft:theme.spacing(2),
        paddingTop:theme.spacing(1),
    },
    root:{
        padding:theme.spacing(1)
    }
}))



const TimingSwitcher = () => {
    const classes=useStyles()
    const [timeType, setTimeType] = useState(true)


    const switcher = () =>{
        switch(timeType){
            case true:
                 return  <Pomodoro/>
            case false:
                return  <Timer/>
        }
    }

    return (
        <Box className={classes.root}>
            <Box className={classes.inputBar}>
                <Switch
                    onChange={() =>(setTimeType(prevType => !prevType))}
                    color="primary"/>
                <Typography
                    className={classes.addGroupTitle}
                    variant='h5'
                    color='textSecondary'
                    size='small'
                    placeholder='Title'>
                    {timeType?'Pomodoro':'Timer'}
                </Typography>
            </Box>
            {switcher()}
        </Box>
        
    )
}

export default TimingSwitcher
