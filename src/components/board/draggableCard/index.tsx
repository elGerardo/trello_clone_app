import React from "react";
import { Draggable } from "react-beautiful-dnd";
const DraggableCard = ({ item, index, parentOrder }: { item: any, index: any, parentOrder: any }) => {

    const draggableId = `${parentOrder}-${item.secuence}`

  return (
    <Draggable key={item.secuence} draggableId={draggableId.toString()} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="max-w-44 bg-white">
            <p>{item.description}</p>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default DraggableCard;

// <span className="priority">
// {item.Priority === 'High' ? (<RedArrow />) : item.Priority === 'Medium' ? (<YellowArrow />) : (<BlueArrow />)}
// </span>
// <div><CustomAvatar name={item.Assignee} isTable={false} size={16} /></div>
