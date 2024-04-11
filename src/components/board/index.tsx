import React, { useState } from "react";
import { data } from "./testData";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import DraggableCard from "./draggableCard";

const Kanban = () => {
  const [columns, setColumns] = useState(data);

  const onDragEnd = (result: any, columns: any, setColumns: any) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      //change of droppable(column)
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
      <div className="flex">
        <div className="m-8 flex w-full min-h-80vh">
          {columns.map(({ tasks, order }) => {
            return (
              <Droppable key={order - 1} droppableId={(order - 1).toString()}>
                {(provided) => (
                  <div
                    className="min-h-100 flex flex-col bg-gray-200 min-w-56 rounded-lg p-15 m-45"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {tasks.map((item, index) => (
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
};

export default Kanban;
