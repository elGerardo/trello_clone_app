import Badge from "@/components/badge";
import { ITask } from "@/contracts/tasks.interface";
import React from "react";
import { Draggable } from "react-beautiful-dnd";

const DraggableCard = ({
  item,
  index,
  parentOrder,
}: {
  item: ITask;
  index: number;
  parentOrder: number;
}) => {
  const draggableId = `${parentOrder}_${item.secuence}`;

  return (
    <Draggable
      key={item.secuence}
      draggableId={draggableId.toString()}
      index={index}
    >
      {(provided) => (
        <div
          className=""
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="rounded-md text-xs p-3 mt-2 mx-2 bg-white">
            <div className="flex justify-between">
              <p className="text-c-gray-300 text-base">{item.title}</p>
              <Badge text={item.priority.name} color={item.priority.color} />
            </div>
            <p className="text-c-gray-300 mt-3">
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
