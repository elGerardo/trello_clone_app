import Badge from "@/components/badge";
import { ITask } from "@/contracts/tasks.interface";
import React from "react";
import { Draggable } from "react-beautiful-dnd";

const DraggableCard = ({
  item,
  index,
  parentOrder,
  isUpdatingColumns,
  handleIsOnClick,
}: {
  item: ITask;
  index: number;
  parentOrder: number;
  isUpdatingColumns: boolean;
  handleIsOnClick?: () => void;
}) => {
  const draggableId = `${parentOrder}_${item.secuence}`;

  const handleOnClick = () => {
    if (handleIsOnClick) handleIsOnClick();
  };

  return (
    <Draggable
      key={item.secuence}
      draggableId={draggableId.toString()}
      index={index}
    >
      {(provided) => (
        <div
          className={
            isUpdatingColumns ? "pointer-events-none" : "pointer-events-auto"
          }
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={handleOnClick}
        >
          <div
            className={`rounded-md text-xs p-3 mt-2 mx-2 ${
              isUpdatingColumns ? "bg-c-gray-100" : "bg-white"
            }`}
          >
            <Badge text={item.priority.name} color={item.priority.color}/>
            <p className="text-base font-bold mt-3">{item.title}</p>
            <p className="text-c-gray-300">
              {item.description.length > 100
                ? item.description.substring(0, 100) + "..."
                : item.description}
            </p>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default DraggableCard;
