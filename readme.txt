##Each component's fucntionality explained in commennts in first lines of component's
## The task “Final Exam” has all the placeholder content
This program was built with React.js and material UI(MuI). I leaned particularly hard on material UI, most all elements in the 
virtual DOM are from the material UI library, from UI elements to layout.

The navigation through the service is handled by conditional rendering. The conditions that define which component 
is rendered are stored within the state object, appState. This state is shared by all components using React's useContext state-managment API.
In addition to appState, the context prodiver also has the 'tasks' state object. This is an array of objects that represent each task added by the user. 
When a task is selected from the TaskList component, the corresponding task will be stored in the selectedTask property of the appState object.

This style of navigation allowed me to include all major navigation UI points within the service itself (like the back button on the appbar) 
This, I feel, results in a service that adheres to modern design protocols, and results in a user flow consisitent with sucessful modern singlepage webapps. 
I am also ahppy with the general naviagation layout, as all major functionality a user may need in a study session is one click away(in expanded task view)

This concept worked well in the early stages of developement, however when developing components such as SubTasks and ReadingList, it quickly became a problem, 
as any change made to the selectedTask property of the appState object had to be mirrored in the corresponding object in the taskList array. This quickly became 
a problem, as making any change to the selected task, such as adding a reference, required many lines of code, and made each component quite unreadable. 
In later rounds of development, I would refactor the state management to not be mainted by multiple state objects.

At this point the only non-functional/non-persistent component in this prototype is the Player component, specifically the 'Add video' input. This component 
serves as an indication as to the style of player that will be developed in later prototyping. Additionally, at this point, all features in the expanded task view are unable to be used concurrently, however this will be addressed in later development, as the key concept of this page, is having all functionality a user needs in a study session one click away.

Aside from that, I am quite happy with prototype. I feel it gives a good indication of my design goals. Almost everything in the app so far is fully functional, 
and all changes made are persitent thoughout the browser session(In future I will write functionality to backup the state objects to the server). The emphasis on datascience found in components like HomeInfo, as well as the minimal navigation required (all key functionality of service is found on 5 way tabbed switcher in each expanded task page) reflect my inital design goals. To make a service that can provide strong features to power users, yet still be simple enough to navigate for casual users, as well as those in the on-boarding phase. In terms of accuracy to the initial brief, a lot was sacrificed due to fesability and time constraints, expecially in terms of customisability, which I found to be highly desirable through user research. Things like the customisable home page may be added in later development. However some origional goals, like advanced filterring and information feedback, have been expressed in features like 'sort by',
and the HomeInfo(statistics found to the left of the tasklist on the homepage). These concepts will be a key focus moving forward.
Noted Bugs:
- Laggy "back" navigation (sometimes requires multiple clicks)
- Cant use the 'a' key in the add task components(this is due to its location in a MenuItem MuIelement, there is a keyboard listener that responds to the 'a' key)
- KanBan board scaling absolutely, not working well with XL screens
- cant add or rename columns to KanBan, would have been incredibly difficult with my current state management.
- Player module not functionional, cant add youtube videos, will add functionality later
