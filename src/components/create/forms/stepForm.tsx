import Form from "@/components/form";
import { ISteps } from "@/contracts/steps.interface";
import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import {
  PlusIcon,
  CheckIcon,
  XMarkIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
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
  handleStepsUpdate,
  steps = [],
  onDeleteTask,
}: {
  onSubmit?: (data: object) => void;
  handleStepsUpdate?: (data: Array<{ order: number; id: string }>) => void;
  onDeleteTask?: (step_id: string) => void;
  steps?: Array<ISteps>;
}) {
  const [isSubmit, setIsSubmit] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isAddingStep, setIsAddingStep] = useState(false);
  const [listFields, setListFields]: any = useState(steps);

  const [name, setName] = useState("");

  const handleOnSubmit = async (
    e: React.FormEvent<HTMLFormControlsCollection>
  ) => {
    e.preventDefault();
    if (onSubmit && isSubmit) {
      await onSubmit({
        form: "step",
        name,
      });
    }
  };

  const handleOnDragEnd = (result: any) => {
    setIsDragging(false);
    if (!result.destination) {
      return;
    }

    const reorderedItems: any = Array.from(listFields);
    const [reorderedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, reorderedItem);

    const payload: Array<{ order: number; id: string }> = [];

    for (const [index, { id }] of reorderedItems.entries()) {
      reorderedItems[index].order = index + 1;
      if (!reorderedItems[index].is_default) {
        payload.push({ order: index + 1, id });
      }
    }

    if (handleStepsUpdate) handleStepsUpdate(payload);

    setListFields(reorderedItems);
  };

  const handleIsAddingStep = (value: boolean) => {
    setIsAddingStep(value);
  };

  return (
    <Form className={`w-full relative`} onSubmit={(e) => handleOnSubmit(e)}>
      <p className="font-bold text-xl">Create a new Step</p>
      <DragDropContext
        onDragEnd={handleOnDragEnd}
        onDragStart={() => setIsDragging(true)}
      >
        <Droppable droppableId="droppable" direction="vertical">
          {(provided) => (
            <div ref={provided.innerRef} className="w-10/12 my-6 m-auto">
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
                        className={`border-2 border-secondary bg-white mb-2 px-2 py-1 rounded-md relative ${
                          snapshot.isDragging && "!shadow-xl"
                        }`}
                      >
                        {item.name}
                        <Button
                          kind="secondary"
                          className="absolute -top-0.5 p-2 rounded"
                          style={{ right: "-2.4em" }}
                          onClick={() => {
                            if (onDeleteTask) onDeleteTask(item.id);
                          }}
                        >
                          <TrashIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </Draggable>
                ) : (
                  <>
                    {!isDragging &&
                      listFields.length == index + 1 &&
                      !isAddingStep && (
                        <div className="relative mb-5 mt-5">
                          <hr className="h-1 bg-c-gray-200 border-c-gray-200 rounded-md" />
                          <Button
                            kind="secondary"
                            className="absolute -right-9 -top-3 p-2 rounded"
                            onClick={() => handleIsAddingStep(true)}
                          >
                            <PlusIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    {listFields.length == index + 1 && isAddingStep && (
                      <div className="flex mb-2">
                        <Input
                          value={name}
                          className="w-full px-2"
                          placeholder="Enter Step Name..."
                          onChange={(value) => setName(value)}
                        />
                        <Button
                          kind="secondary"
                          className="ml-2 py-2 px-2 rounded"
                          onClick={() => {
                            setIsSubmit(false);
                            setName("");
                            handleIsAddingStep(false);
                          }}
                        >
                          <XMarkIcon className="h-4 w-4 text-wrong" />
                        </Button>
                        <Button
                          kind="secondary"
                          className="ml-2 py-2 px-2 rounded"
                          disabled={name == "" ? true : false}
                          onClick={() => setIsSubmit(true)}
                        >
                          <CheckIcon className="h-4 w-4 text-success" />
                        </Button>
                      </div>
                    )}
                    {isDragging && listFields.length === index + 1 ? (
                      <>
                        <div
                          className={`border-2 border-secondary bg-secondary mb-2 px-2 py-1 rounded-md mt-14`}
                        >
                          {item.name}
                        </div>
                      </>
                    ) : (
                      <div
                        className={`border-2 border-secondary bg-secondary mb-2 px-2 py-1 rounded-md`}
                      >
                        {item.name}
                      </div>
                    )}
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
