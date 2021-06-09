import { NoEncryptionOutlined } from '@material-ui/icons';
import {createContext, useState} from 'react'
import {uuid} from 'uuidv4'

export const StateManager = createContext();
    
export const StateProvider = props  => {
    var d = new Date('2021-12-04T21:11:54')
    const [tasks, setTasks] = useState([
        {
            key: 1,
            title: "Final Exam",
            description: "Info1110 finals",
            subject: 'INFO1110',
            dueDate: new Date('2021-09-07T21:11:54'),
            priority: (2, 'High'),
            estTime: 220,
            type: "Exam",
            dateAdded: new Date('2021-12-06T21:11:54'),
            subTasks:[{
                key: Math.floor(Math.random()*10000),
                title:'Study Session',
                col:1,
                deleted:false
            },{
                key: Math.floor(Math.random()*10000),
                title:'Review Tutorial',
                col:2,
                deleted:false
            }],
            
            references: [{
                groupKey: Math.floor(Math.random()*10000),
                groupTitle:'Twitter usage over time',
                links:[{
                    linkKey:Math.floor(Math.random()*10000),
                    title:'Twitter in 2012',
                    link:'https://www.webanalyticsworld.net/2012/03/twitter-stats-in-2012-infographic.html'
                },{
                    linkKey:Math.floor(Math.random()*10000),
                    title:'Twitter usage in 2013',
                    link:'https://www.statista.com/statistics/282087/number-of-monthly-active-twitter-users/'
                },{
                    linkKey:Math.floor(Math.random()*10000),
                    title:'2015 Twitter',
                    link:'https://blog.twitter.com/en_gb/a/en-gb/2015/yearontwitter-2015-0.html'
                },{
                    linkKey:Math.floor(Math.random()*10000),
                    title:'Twitter in 2013',
                    link:'https://www.huffpost.com/entry/obama-twitter-potus_n_7306724'
                }],
            },{
                groupKey: Math.floor(Math.random()*10000),
                groupTitle:'Student Study Patterns',
                links:[{
                    linkKey:Math.floor(Math.random()*10000),
                    title:'asdsad',
                    link:'https://www.webanalyticsworld.net/2012/03/twitter-stats-in-2012-infographic.html'
                },{
                    linkKey:Math.floor(Math.random()*10000),
                    title:'asdsad',
                    link:'https://www.webanalyticsworld.net/2012/03/twitter-stats-in-2012-infographic.html'
                }],
            }],
            completed: false
        },
        {
            key: 2,
            title: "Art History: Essay",
            description: "Explore the relationship of sound and vision",
            subject: 'ARIN360',
            dueDate: new Date('2021-06-14T21:11:54'),
            priority: (1, 'Medium'),
            estTime: 120,
            type: "Essay",
            dateAdded: new Date('2021-12-06T21:11:54'),
            subTasks:[{
                key: Math.floor(Math.random()*10000),
                title:'Study Session',
                col:1,
                deleted:false
            },{
                key: Math.floor(Math.random()*10000),
                title:'Review Tutorial',
                col: 0,
                deleted:false
            }],
            
            references: [],
            completed: false
        
        },
        {
            key: 3,
            title: "Design Infographic",
            description: "Design an infographic exploring given dataset",
            subject: 'DECO3100',
            dueDate: new Date('2021-07-12T21:11:54'),
            priority: (2, 'High'),
            estTime: 230,
            type: "Exam",
            dateAdded: new Date('2021-06-11T21:11:54'),
            subTasks:[{
                key: Math.floor(Math.random()*10000),
                title:'Study Session',
                deleted:false
            },{
                key: Math.floor(Math.random()*10000),
                title:'Review Tutorial',
                deleted:false
            }],
            references: [],
            completed: false
        },
        {
            key: 4,
            title: "Design webApp",
            description: "Design this program",
            subject: 'DECO2017',
            dueDate: new Date('2021-07-30T21:11:54'),
            priority: (2, 'High'),
            estTime: 2200,
            type: "Assignment",
            dateAdded:  new Date('2021-06-30T21:11:54'),
            subTasks: [],
            references: [],
            completed: false
        }
    ]);

    const [appState, setAppState]= useState({
        subjects: ['INFO1110', 'DECO3100', 'DECO2017','ARIN360'],
        taskTypes: ['Quiz', 'Design Project', 'Exam', 'Presentation', 'Essay', 'Portfolio', 'Other',"Assignment"],
        selectedTask: {},
        priority:[(0,'Low'),(1,'Medium'), (2,'High')],
        filter: ['none','DECO3100'],
        home: true
    })
return (
        <StateManager.Provider value={{tasks:[tasks, setTasks],state:[appState, setAppState]}}>
            {props.children}
        </StateManager.Provider>
    )
}

