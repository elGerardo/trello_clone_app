import Button from "@/components/button";
import Form from "@/components/form";
import Input from "@/components/input";
import React, { useRef, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function StepForm({
  onSubmit,
  className = "",
  onClose,
}: {
  onSubmit?: (data: object) => Promise<boolean>;
  onClose?: () => void;
  className?: string;
}) {
  const [isSubmit, setIsSubmit] = useState(false);
  const name: any = useRef();


  const handleOnsubmit = async (
    e: React.FormEvent<HTMLFormControlsCollection>
  ) => {
    e.preventDefault();
    if (onSubmit && isSubmit) {
      const result = await onSubmit({
        form: "task",
        isSubmit,
      });

      if (result) {
        
      }
    }
  };

  const handleOnClose = () => {
    if (onClose) onClose();
  };

  return (
    <Form className={`w-full ${className}`} onSubmit={(e) => handleOnsubmit(e)}>
        <p className=" font-bold text-xl">Create a new Priority</p>
      <Input
        inputRef={name}
        className="w-full px-4 py-2 my-2"
        placeholder="Task title..."
        required
        label="Task Title"
      />
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
