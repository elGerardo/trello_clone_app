import Badge from "@/components/badge";
import Check from "@/components/check";
import { ITask } from "@/contracts/tasks.interface";
import React from "react";
import { Draggable } from "react-beautiful-dnd";

const DraggableCard = ({
  item,
  index,
  parentOrder,
  isUpdatingColumns,
  handleIsOnClick,
  onClickChecked,
  isStepDone,
}: {
  item: ITask;
  index: number;
  parentOrder: number;
  isUpdatingColumns: boolean;
  handleIsOnClick?: (item: ITask) => void;
  onClickChecked?: (step_id: string, item_id: string) => void;
  isStepDone: boolean;
}) => {
  const draggableId = `${parentOrder}_${item.secuence}`;

  const handleOnClick = (item: ITask) => {
    if (handleIsOnClick) handleIsOnClick(item);
  };

  const handleOnClickChecked = (step_id: string, item_id: string) => {
    if (onClickChecked) onClickChecked(step_id, item_id);
  };

  return (
    <Draggable
      key={item.secuence}
      draggableId={draggableId.toString()}
      index={index}
    >
      {(provided, snapshot) => (
        <div
          className={`${
            isUpdatingColumns
              ? "pointer-events-none"
              : "pointer-events-auto max-w-72"
          } 
            `}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div
            className={`rounded-md text-xs p-3 mt-2 mx-2 max-w-72 
            ${isUpdatingColumns ? "bg-c-gray-200" : "bg-white"}              
            ${snapshot.isDragging && "!shadow-lg"}
            `}
          >
            <div className="flex justify-between">
              <Badge
                text={item.priority.name}
                color={item.priority.color}
                className="text-white"
              />
              {isStepDone && (
                <Check onClick={() => handleOnClickChecked(item.step_id ,item.id)} />
              )}
            </div>
            <div onClick={() => handleOnClick(item)} className=" cursor-pointer">
              <p className="text-base font-bold mt-3 max-w-72">{item.title}</p>
              <p className="text-c-gray-300 max-w-72">
                {item.description.length > 100
                  ? item.description.substring(0, 100) + "..."
                  : item.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default DraggableCard;
