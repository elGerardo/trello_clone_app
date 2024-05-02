import Button from "@/components/button";
import Form from "@/components/form";
import Input from "@/components/input";
import MenuDropdown from "@/components/menuDropdown";
import React, { useRef, useState } from "react";

const COLOR_OPTIONS = [
  "#FFFFFF",
  "#FA94A5",
  "#DC6A7D",
  "#DCFCE6",
  "#C4F8B4",
  "#EDFBD5",
  "#D7F6A2",
  "#FEF9C3",
  "#FDF59B",
  "#DBEAFE",
  "#9CC6FC",
  "#FFC8FF",
  "#FF9DFF"
];

export default function PriorityForm({
  onSubmit,
  className = "",
}: {
  onSubmit?: (data: object) => void;
  className?: string;
}) {
  const [isSubmit, setIsSubmit] = useState(false);
  const name: any = useRef();
  const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0]);

  const handleOnClickColor = (color: string) => {
    setSelectedColor(color);
  };

  const handleOnsubmit = async (
    e: React.FormEvent<HTMLFormControlsCollection>
  ) => {
    e.preventDefault();
    if (onSubmit && isSubmit) {
      onSubmit({
        form: "priority",
        name: name.current.value,
        color: selectedColor,
      });
    }
  };

  return (
    <Form className={`w-full ${className}`} onSubmit={(e) => handleOnsubmit(e)}>
      <p className=" font-bold text-xl">Create a new Priority</p>
      <div className="md:flex">
        <div className="md:w-9/12">
          <Input
            inputRef={name}
            className="w-full px-4 py-2 my-2"
            placeholder="Priority name..."
            required
            label="Priority name"
          />
        </div>
        <div className="md:w-3/12 md:ml-4">
          <label>
            Color
            <span
              className={`inline-block rounded mx-2 -mb-1 h-5 w-5 ${
                selectedColor === "#FFFFFF" && "border"
              }`}
              style={{ backgroundColor: selectedColor }}
            />
          </label>
          <MenuDropdown
            className="mt-2"
            options={COLOR_OPTIONS}
            onClick={(color) => handleOnClickColor(color)}
          />
        </div>
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
