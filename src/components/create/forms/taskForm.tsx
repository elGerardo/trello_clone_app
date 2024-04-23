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
}: {
  onSubmit?: (data: object) => void;
  onClose?: () => void;
  catalog: { steps: Array<ISteps>; priorities: Array<IPriority> };
  className?: string;
}) {
  const [isSubmit, setIsSubmit] = useState(false);
  const title: any = useRef();
  const [description, setDescription]: any = useState(null);
  const [stepId, setStepId] = useState(catalog.steps[0].value);
  const [priorityId, setPriorityId] = useState(catalog.priorities[0].value);

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
    if (onSubmit && isSubmit) {
      onSubmit({
        form: "task",
        description,
        isSubmit,
        priority_id: priorityId,
        step_id: stepId,
        ...(title.current.value != null && { title: title.current.value }),
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
      <div className="flex justify-around">
        <DropDown
          className="w-full"
          data={catalog.steps}
          onChange={(data: IDropdownData) => handleStepOnChange(data)}
          label="Choose an Step"
        />
        <DropDown
          data={catalog.priorities}
          onChange={(data: IDropdownData) => handlePrioritypOnChange(data)}
          className="ml-4 w-64"
          label="Choose a Priority"
        />
      </div>
      <Button
        kind="primary"
        onClick={() => setIsSubmit(true)}
        className="px-6 py-1.5 rounded my-4"
      >
        Save
      </Button>
    </Form>
  );
}
