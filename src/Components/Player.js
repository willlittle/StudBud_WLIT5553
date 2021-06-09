//Least function component. Due to the difficult and isolated nature of developign with youtube API, I have left a more detailed iteratio of this future 
// to future rounds of developemnt.

import React,{useState, useEffect} from 'react'
import YouTube from 'react-youtube';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles((theme) => ({
    inputBar:{
        display:'flex',
        alignItems:'center',
        marginLeft:theme.spacing(2)
    },
    videoCont:{
        display:'flex',
        alignContent:'center'
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
    link:{
        display:'flex',
        justifyContent:'space-between',
        padding:theme.spacing(1),
        margin:theme.spacing(1)
    }
}))

const links = [{
    title: 'PodCast - Lex Fridman',
    link: 'krB0enBeSiE'
},{
    title: 'Cool Song',
    link: '_cX56dEVHTI'
},{
    title: 'Lofi Mix',
    link: '73DvTWzdt2Y'
}]

const Player = () => {
    const [activeLink, setActiveLink] = useState('https://www.youtube.com/watch?v=WxfA1OSev4c')
    const [videoID, setVideoID] = useState('krB0enBeSiE')

    const opts = {
        height: '300',
        width: '500',
        playerVars: {
          autoplay: 1,
        },
      };
    
    

    const classes = useStyles()

    

    return (
        <Grid container className={classes.root} spacing={1}>
            <Grid item xs={5} md={5} lg={5} className={classes.videoCont}>
                <YouTube videoId={videoID} opts={opts}/>
            </Grid>
            <Grid item xs={12} md={7} lg={7}>
                <Box className={classes.inputBar}>
                    <Typography
                    className={classes.addGroupTitle}
                    variant='h5'
                    color='textSecondary'
                    size='small'
                    placeholder='Title'>
                        Add video
                    </Typography>
                    
                    <TextField
                    className={classes.addGroupInput}
                    variant='outlined'
                    label='group title'
                    margin='dense'
                    placeholder='Title'
                    />
                    <Button 
                    className={classes.addGroupButton}
                    variant='outlined'
                    size='medium'
                    >
                        Add
                    </Button>
                </Box>
                {links.map((l)=>(
                            
            <Paper className={classes.link}>
                <Box 
                    display='flex' 
                    alignItems='center'>
                    <Typography>
                        {l.title}
                    </Typography>
                </Box>
            <Button
                onClick={() => setVideoID(l.link)}> 
                open
            </Button>
            </Paper>
                            
                            ))}
            </Grid>

        </Grid>
    )
}

export default Player





