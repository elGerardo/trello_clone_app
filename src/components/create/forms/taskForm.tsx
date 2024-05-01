import Button from "@/components/button";
import DropDown from "@/components/dropdown";
import Form from "@/components/form";
import Input from "@/components/input";
import Textarea from "@/components/textarea";
import { IDropdownData } from "@/contracts/dropdown.intreface";
import { IPriority } from "@/contracts/priority.interface";
import { ISteps } from "@/contracts/steps.interface";
import React, { useRef, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function TaskForm({
  onSubmit,
  catalog,
  className = "",
  onClose,
  stepDefault,
  priorityDefault,
  taskTitle = "",
  taskDescription = "",
  itemId,
  isUpdate = false,
}: {
  onSubmit?: (data: object) => void;
  onClose?: () => void;
  catalog: { steps: Array<ISteps>; priorities: Array<IPriority> };
  className?: string;
  stepDefault?: string;
  priorityDefault?: string;
  taskTitle?: string;
  taskDescription?: string;
  isUpdate?: boolean;
  itemId?: string;
}) {
  const [isSubmit, setIsSubmit] = useState(false);
  const title = useRef(taskTitle);
  const [description, setDescription]: any = useState(taskDescription);
  let defaultStepIndex = 0
  if(stepDefault != null) {
    defaultStepIndex = catalog.steps.findIndex(row => row.id === stepDefault)
  }
  let defaultPriorityIndex = 0
  if(priorityDefault != null) {
    defaultPriorityIndex = catalog.priorities.findIndex(row => row.id === priorityDefault)
  }
  const [stepId, setStepId] = useState(catalog.steps[defaultStepIndex].value);
  const [priorityId, setPriorityId] = useState(catalog.priorities[defaultPriorityIndex].value);

  const handleonChangeDescription = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(e.target.value);
  };

  const handleStepOnChange = (data: IDropdownData) => {
    setStepId(data.value);
  };

  const handlePrioritypOnChange = (data: IDropdownData) => {
    setPriorityId(data.value);
  };

  const handleOnsubmit = async (
    e: React.FormEvent<HTMLFormControlsCollection>
  ) => {
    e.preventDefault();
    let itemTitle: any = title;
    if (onSubmit && isSubmit) {
      console.log('alksdjalksdj')

      onSubmit({
        ...(isUpdate === true ? { form: "update_task" } : { form: "task" }),
        description,
        isSubmit,
        priority_id: priorityId,
        ...(itemId && { item_id: itemId }),
        step_id: stepId,
        ...(itemTitle.current.value != null && {
          title: itemTitle.current.value,
        }),
      });
    }
  };

  const handleOnClose = () => {
    if (onClose) onClose();
  };

  return (
    <Form className={`w-full ${className}`} onSubmit={(e) => handleOnsubmit(e)}>
      <div className="flex justify-between mb-4">
        <p className=" font-bold text-xl">Create a new Task</p>
        <XMarkIcon
          className="h-6 w-6 text-c-gray-300 cursor-pointer"
          onClick={() => handleOnClose()}
        />
      </div>
      <Input
        defaultValue={taskTitle}
        inputRef={title}
        className="w-full px-4 py-2 my-2"
        placeholder="Task title..."
        required
        label="Task Title"
      />
      <Textarea
        value={description}
        onChange={(value) => handleonChangeDescription(value)}
        className="w-full px-4 py-2 mb-2"
        placeholder="Description..."
        label="Task Description"
      />
      <div className="md:flex justify-around">
        <DropDown
          className="w-full"
          data={catalog.steps}
          onChange={(data: IDropdownData) => handleStepOnChange(data)}
          label="Choose an Step"
          defaultValue={stepDefault}
        />
        <DropDown
          data={catalog.priorities}
          onChange={(data: IDropdownData) => handlePrioritypOnChange(data)}
          className="md:ml-4 md:w-64"
          label="Choose a Priority"
          itemClassName="text-secondary"
          itemsClassName="text-secondary"
          defaultValue={priorityDefault}
        />
      </div>
      <Button
        kind="primary"
        onClick={() => setIsSubmit(true)}
        className="px-6 py-1.5 rounded my-4"
      >
        {!isUpdate ? "Save" : "Update"}
      </Button>
    </Form>
  );
}
