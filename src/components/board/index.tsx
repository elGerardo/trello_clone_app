import React, { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import DraggableCard from "./draggableCard";
import { ISteps } from "@/contracts/steps.interface";
import Delay from "@/app/helpers/delay";

export default function Board({
  steps = [],
  handleOnClick,
  handleColumnUpdated,
}: {
  handleColumnUpdated?: (columns: Array<object>) => void;
  handleOnClick?: () => void;
  steps: Array<ISteps>;
}) {
  const [columns, setColumns] = useState(steps);
  const [isUpdatingColumns, setIsUpdatingColumns] = useState(false);

  const onDragEnd = async (result: any, columns: any, setColumns: any) => {
    setIsUpdatingColumns(true);
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const newData = columns;
      const sourceColumn = newData[source.droppableId];
      const sourceItems = sourceColumn.tasks[source.index];
      const destinationColumn = newData[destination.droppableId];

      //Update secuence of source column
      newData[source.droppableId].tasks.splice(source.index, 1);
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

      newData[destination.droppableId].tasks[destination.index].step_id =
        destinationColumn.id;

      const payload = [
        ...newData[destination.droppableId].tasks,
        ...newData[source.droppableId].tasks,
      ];
      if (handleColumnUpdated) await handleColumnUpdated(payload);

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

      const payload = newColumns[destination.droppableId].tasks;

      if (handleColumnUpdated) await handleColumnUpdated(payload);

      setColumns(newColumns);
    }

    setIsUpdatingColumns(false);
  };

  const handleIsOnClick = () => {
    if (handleOnClick) handleOnClick();
  };

  return (
    <DragDropContext
      onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
    >
      <div className="flex mt-12 mx-4">
        <div className="flex w-full min-h-96">
          {columns.map(({ name, tasks, order }) => {
            return (
              <Droppable key={order - 1} droppableId={(order - 1).toString()}>
                {(provided) => (
                  <div
                    className="flex flex-col relative bg-secondary mx-1 w-72 rounded-md"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <h2 className="mx-2 mt-4 font-bold">{name}</h2>
                    <hr className="my-2 mx-2"/>
                    {tasks.map((item: any, index: number) => (
                      <DraggableCard
                        isUpdatingColumns={isUpdatingColumns}
                        key={`${item.title}-${index}`}
                        item={item}
                        index={index}
                        parentOrder={order}
                        handleIsOnClick={() => handleIsOnClick()}
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
