import Form from "@/components/form";
import { ISteps } from "@/contracts/steps.interface";
import React, { useRef, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { PlusIcon } from "@heroicons/react/24/solid";
import Tooltip from "@/components/tooltip";
import Button from "@/components/button";
import Input from "@/components/input";

const getItemStyle = (isDragging: any, draggableStyle: any, index: number) => ({
  ...draggableStyle,
  position: isDragging ? "absolute" : "relative",
  top: isDragging ? `${(index + 1).toString()}` : "",
  bottom: isDragging ? `${(index + 1).toString()}` : "",
  left: isDragging && "0",
  right: isDragging && "0",
});

export default function StepForm({
  onSubmit,
  steps = [],
}: {
  onSubmit?: (data: object) => Promise<boolean>;
  steps?: Array<ISteps>;
}) {
  const [isSubmit, setIsSubmit] = useState(false);
  const [isAddingStep, setIsAddingStep] = useState(false);
  const [listFields, setListFields]: any = useState(steps);

  const name: any = useRef();
  const order: any = useRef();

  const handleOnsubmit = async (
    e: React.FormEvent<HTMLFormControlsCollection>
  ) => {
    e.preventDefault();
    if (onSubmit && isSubmit) {
      await onSubmit({
        form: "step",
      });
    }
  };

  const handleOnDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const reorderedItems = Array.from(listFields);
    const [reorderedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, reorderedItem);

    setListFields(reorderedItems);
  };

  const handleAddStep = () => {

    setIsAddingStep(true)
  };

  return (
    <Form className={`w-full relative`} onSubmit={(e) => handleOnsubmit(e)}>
      <p className="font-bold text-xl">Create a new Step</p>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="droppable" direction="vertical">
          {(provided) => (
            <div ref={provided.innerRef} className="w-8/12 my-6 m-auto">
              {listFields.map((item: ISteps, index: number) => {
                return !item.is_default ? (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style,
                          index
                        )}
                        className={`border-2 border-secondary bg-white mb-2 px-2 py-1 rounded-md ${
                          snapshot.isDragging && "!shadow-xl"
                        }`}
                      >
                        {item.name}
                      </div>
                    )}
                  </Draggable>
                ) : (
                  <>
                    {listFields.length == index + 1 && !isAddingStep && (
                      <div className="relative mb-2">
                        <hr className="h-1 bg-c-gray-200 border-c-gray-200 rounded-md" />
                        <Button
                          kind="secondary"
                          className="absolute -right-8 -top-3 p-1 rounded"
                          onClick={() => handleAddStep()}
                        >
                          <PlusIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                    {listFields.length == index + 1 && isAddingStep && (
                      <Input />
                    )}
                    <div
                      className={`border-2 border-secondary bg-secondary mb-2 px-2 py-1 rounded-md`}
                    >
                      {item.name}
                    </div>
                  </>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Form>
  );
}
