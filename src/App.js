import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import _, { keyBy } from "lodash";
import { v4 } from "uuid";
import {RiCloseCircleLine} from 'react-icons/ri'
// v4 is just used to generate random IDs.

const item = {
  id: v4(),
  name: "Eat",
};
const item2 = {
  id: v4(),
  name: "Sleep",
};
const item3 = {
  id: v4(),
  name: "Code",
};
console.log(item);
function App(todo,removeTodo) {
  //Creating data and a state hook that takes arguments of three columns.
  const [text, setText] = useState("");

  const [state, setState] = useState({
    todo: {
      title: "Todo",
      items: [item, item2, item3],
    },
    current: {
      title: "Current",
      items: [],
    },
    complete: {
      title: "Complete",
      items: [],
    },
  });

  //HandleDragEnd function for logic
  const handleDragEnd = ({ destination, source }) => {
    console.log("from", source);
    console.log("to", destination);

    if (!destination) {
      console.log("not dropped in droppable");
      return;
    }
    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    ) {
      console.log("dropped in the same place");

      return;
    }
    // Creating a copy of an item before removing from state
    const itemCopy = { ...state[source.droppableId].items[source.index] };
    setState((prev) => {
      prev = { ...prev };

      //Remove from previous items array
      prev[source.droppableId].items.splice(source.index, 1);

      //Adding to new items array location
      prev[destination.droppableId].items.splice(
        destination.index,
        0,
        itemCopy
      );

      return prev;
    });
  };

  //Function for adding a todo
  const addItem = () => {
    setState((prev) => {
      return {
        ...prev,
        todo: {
          title: "Todo",
          items: [
            {
              id: v4(),
              name: text,
            },
            ...prev.todo.items,
          ],
        },
      };
    });
    setText("");
  };

const removeTask =() =>{

}

  return (
    <div className="App">
      <div className='todo' >
        <input
        className= 'todo'
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
       
        <button onClick={addItem}>Add A Task</button>
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        {/*Use the lodash to load our arrays easy and simple with no redundancy */}
        {/* Callback Function*/}
        {/* key is the Droppable items*/}
        {/* Provided and snapshot are props provided by the api dnd*/}

        {_.map(state, (data, key) => {
          return (
            <div key={key} className="div column">
              {/* This is for the titles to be above the column*/}
              <h3>{data.title}
              </h3>
              <Droppable droppableId={key}>
                {(provided, snapshot) => {
                  console.log(snapshot);
                  return (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={"droppable-col"}
                    >
                      
                      {data.items.map((el, index) => {
                        return (
                          <Draggable
                            key={el.id}
                            index={index}
                            draggableId={el.id}
                          >
                            {(provided, snapshot) => {
                              console.log(snapshot);

                              return (
                                <div
                                  className={`item ${snapshot.isDragging && "dragging"}`}
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  {el.name}
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
          );
        })}
      </DragDropContext>
    </div>
  );
}

export default App;
