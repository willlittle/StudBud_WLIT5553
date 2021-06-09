// this is the main component in the conditional rendering based naviagtion between homescreen. 
//A switch case is used to to return either the task list of the expanded task view based on the 'home' property of appState
//navbar is also located here.
import React,{useState, useContext} from 'react';
import {StateManager} from './StateManager'
import Home from './Home'
import ExpandedTask from './ExpandedTask'
import NavBar from './NavBar'



const ContentSwitcher = () => {
    const {tasks, state} = useContext(StateManager)
    const [taskList, setTasks] = tasks
    const [appState, setAppState] = state

    const switcher = () =>{
        switch(appState.home){
            case true:
                 return  <Home/>
            case false:
                return  <ExpandedTask/>
        }
    }
    return (
        <>
        <NavBar/>
        {switcher()}
        </>
    )
}

export default ContentSwitcher
