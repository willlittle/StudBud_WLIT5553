import React from 'react';

import { createMuiTheme, makeStyles, ThemeProvider,  } from '@material-ui/core/styles';
import {CssBaseline, Typography, Paper} from '@material-ui/core'
import blue from '@material-ui/core/colors/blue';
import deepOrange from '@material-ui/core/colors/deepOrange';
import {StateProvider} from './Components/StateManager'
import ContentSwitcher from './Components/ContentSwitcher'

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: blue,
    secondary: deepOrange,
    background: {
      default: "#222222"
    },
    text:{
      primary: "rgb(230,235,235)"
    }
  },
  typography: {
    fontWeight:59
  }
});


const useStyles = makeStyles((theme) => ({
 root: {
    height: '100vh',
    background: 'rgb(30,30,30)'
 },
  paper: {
    height: '100%',
    width: '100vw',
    position: 'absolute'
  }
}))

export default function CustomStyles() {
  const classes = useStyles()
  return (
    <>
    <CssBaseline/>
      <StateProvider>
        <ThemeProvider theme={darkTheme}>
          <div className={classes.root}>
            <ContentSwitcher/>
          </div>
        </ThemeProvider>
    </StateProvider>
  </>
  );
}
            