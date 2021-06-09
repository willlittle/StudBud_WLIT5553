import React, { useState, useContext } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import {uuid} from "uuidv4";
import {StateManager} from './StateManager'
import Container from '@material-ui/core/Container'

function App() {
  
  const {tasks, state} = useContext(StateManager)
  const [taskList, setTasks] = tasks
  const [appState, setAppState] = state

  const col0 = []
  appState.selectedTask.subTasks.filter(sT => {
    if (sT.col == 0) {
        col0.push({id: uuid(), content: sT.title, key: sT.key})
    }})

    const col1 = []
  appState.selectedTask.subTasks.filter(sT => {
    if (sT.col == 1) {
        col1.push({id: uuid(), content: sT.title, key: sT.key})
    }})

    const col2 = []
  appState.selectedTask.subTasks.filter(sT => {
    if (sT.col == 2) {
        col2.push({id: uuid(), content: sT.title, key: sT.key})
    }})

    const col3 = []
  appState.selectedTask.subTasks.filter(sT => {
    if (sT.col == 3) {
        col3.push({id: uuid(), content: sT.title, key: sT.key})
    }})

    const setStates = (destCol, destItems) => {
         const newSubTs = appState.selectedTask.subTasks.filter(sT => {
                if (sT.key != destItems[0].key){
                    return sT
                }
         })
        let newTs = []
        taskList.forEach(task => {
            let found = false
            task.subTasks.forEach(st =>{
                if (st.key == destItems[0].key){
                    found = true
                }
            })
            if (!found){
                newTs.push(task)
            }
            })
         const newTasks = taskList.filter
            
        setTasks(pt =>(
            [{
                key: appState.selectedTask.key,
                title: appState.selectedTask.title,
                description: appState.selectedTask.description,
                subject: appState.selectedTask.subject,
                dueDate: appState.selectedTask.dueDate,
                priority: appState.selectedTask.priority,
                estTime: appState.selectedTask.estTime,
                type: appState.selectedTask.type,
                dateAdded: appState.selectedTask.dateAdded,
                subTasks: [{
                            key: destItems[0].key,
                            title: destItems[0].content,
                            col:destCol.key,
                            deleted:false}
                        , ...newSubTs],
                references: appState.selectedTask.refernces,
                completed: appState.selectedTask.completed
            },...newTs]
        ))
        setAppState((prevState)=>({
            home: false,
            subjects: prevState.subjects,
            taskTypes: prevState.taskTypes,
            selectedTask: {
                key: prevState.selectedTask.key,
                title: prevState.selectedTask.title,
                description: prevState.selectedTask.description,
                subject: prevState.selectedTask.subject,
                dueDate: prevState.selectedTask.dueDate,
                priority: prevState.selectedTask.priority,
                estTime: prevState.selectedTask.estTime,
                type: prevState.selectedTask.type,
                dateAdded: prevState.selectedTask.dateAdded,
                subTasks: [{
                        key: destItems[0].key,
                        title: destItems[0].content,
                        col:destCol.key,
                        deleted:false}
                    , ...newSubTs],
                references: prevState.selectedTask.references,
                completed: prevState.selectedTask.completed
            },
            filter: prevState.filter,
            priority:prevState.priority,
            }))
        }

    const onDragEnd = (result, columns, setColumns) => {
        if (!result.destination) return;
        const { source, destination } = result;
      
        if (source.droppableId !== destination.droppableId) {
          const sourceColumn = columns[source.droppableId];
          const destColumn = columns[destination.droppableId];
          const sourceItems = [...sourceColumn.items];
          const destItems = [...destColumn.items];
          const [removed] = sourceItems.splice(source.index, 1);
          destItems.splice(destination.index, 0, removed);
          setColumns({
            ...columns,
            [source.droppableId]: {
              ...sourceColumn,
              items: sourceItems
            },
            [destination.droppableId]: {
              ...destColumn,
              items: destItems
            }
          });
        //   console.log(destItems)
          setStates(destColumn, destItems)
        } else {
            // failState
          const column = columns[source.droppableId];
          const copiedItems = [...column.items];
          const [removed] = copiedItems.splice(source.index, 1);
          copiedItems.splice(destination.index, 0, removed);
          setColumns({
            ...columns,
            [source.droppableId]: {
              ...column,
              items: copiedItems
            }
          });
        }
      };

const columnsFromBackend = {
    [uuid()]: {
        key: 0,
        name: "Requested",
        items: col0
    },
    [uuid()]: {
        key: 1,
        name: "To do",
        items: col1
    },
    [uuid()]: {
        key: 2,
        name: "In Progress",
        items: col2
    },
    [uuid()]: {
        key: 3,
        name: "Done",
        items: col3
    }
  };
  const [columns, setColumns] = useState(columnsFromBackend);
  return (
    <Container overflow='automatic' style={{ display: "flex", justifyContent: "center", height: "100%", }}>
      <DragDropContext
        onDragEnd={result => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                
              }}
              key={columnId}
            >
              <h2>{column.name}</h2>
              <div style={{ margin: 2 }}>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "rgba(0,0,0,0)",
                          padding: 4,
                          width: '20vw',
                          minHeight: 200
                        }}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: "none",
                                      padding: 16,
                                      margin: "0 0 8px 0",
                                      minHeight: "50px",
                                      backgroundColor: snapshot.isDragging
                                        ? "#263B4A"
                                        : "#456C86",
                                      color: "white",
                                      ...provided.draggableProps.style
                                    }}
                                  >
                                    {item.content}
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
      
    </Container>
  );
}

export default App;
