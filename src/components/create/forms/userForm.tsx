import Button from "@/components/button";
import Form from "@/components/form";
import Input from "@/components/input";
import React, { useRef } from "react";

export default function UserForm({
  onSubmit,
  className = "",
}: {
  onSubmit?: (data: object) => void;
  className?: string;
}) {
  const userId: any = useRef();

  const handleOnsubmit = async (
    e: React.FormEvent<HTMLFormControlsCollection>
  ) => {
    e.preventDefault();
    if (onSubmit)
      onSubmit({
        form: "priority",
        id: userId.current.value,
      });
  };

  return (
    <Form className={` ${className}`} onSubmit={(e) => handleOnsubmit(e)}>
      <p className=" font-bold text-xl text-center">Welcome!</p>
      <div className="md:flex">
        <div className="w-full flex justify-center my-2">
          <Input
            inputRef={userId}
            className=" px-4 py-2"
            placeholder="Priority name..."
            required
          />
        </div>
      </div>
      <Button kind="primary" className="px-6 py-1.5 rounded my-4">
        Get Started!
      </Button>
    </Form>
  );
}
