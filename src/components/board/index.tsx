import React, { useState } from "react";
import { data } from "./testData";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import DraggableCard from "./draggableCard";

export default function Board() {
  const [columns, setColumns] = useState(data);

  const onDragEnd = (result: any, columns: any, setColumns: any) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const newData = columns;
      const sourceColumn = newData[source.droppableId];
      const sourceItems = sourceColumn.tasks[source.index];

      //Update secuence of source column
      newData[source.droppableId].tasks.splice(source.index, 1);
      console.log("after spliced", newData[source.droppableId]);
      for (
        let index = 0;
        index < newData[source.droppableId].tasks.length;
        index++
      ) {
        newData[source.droppableId].tasks[index].secuence = index + 1;
      }

      //Update secuence of destination column
      newData[destination.droppableId].tasks.splice(
        destination.index,
        0,
        sourceItems
      );
      for (
        let index = destination.index;
        index < newData[destination.droppableId].tasks.length;
        index++
      ) {
        newData[destination.droppableId].tasks[index].secuence = index + 1;
      }

      setColumns(newData);
    } else {
      const newData = columns[source.droppableId].tasks;
      const from = source.index;
      const to = destination.index;

      const dataFrom = newData[from];

      const newTo = to;
      const newFrom = from;

      if (to > from) {
        for (let index = newFrom; index < newTo; index++) {
          newData[index] = {
            ...columns[source.droppableId].tasks[index + 1],
            secuence: index + 1,
          };
        }

        newData[to] = { ...dataFrom, secuence: to + 1 };
      } else {
        for (let index = newFrom; index !== newTo; index--) {
          newData[index] = {
            ...columns[source.droppableId].tasks[index - 1],
            secuence: index + 1,
          };
        }

        newData[to] = { ...dataFrom, secuence: to + 1 };
      }

      const newColumns = columns;
      newColumns[source.droppableId].tasks = newData;

      setColumns(newColumns);
    }
  };
  return (
    <DragDropContext
      onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
    >
      <div className="flex mt-12">
        <div className="flex w-full min-h-96">
          {columns.map(({ name, tasks, order }) => {
            
            return (
                <Droppable key={order - 1} droppableId={(order - 1).toString()}>
                  {(provided) => (

                    <div
                      className="flex flex-col relative bg-c-gray-200 mx-1 w-72 rounded-md"
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      <h2 className="absolute -mt-8">{name}</h2>
                      {tasks.map((item: any, index: number) => (
                        <DraggableCard
                          key={`${item.title}-${index}`}
                          item={item}
                          index={index}
                          parentOrder={order}
                        />
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
            );
          })}
        </div>
      </div>
    </DragDropContext>
  );
}
