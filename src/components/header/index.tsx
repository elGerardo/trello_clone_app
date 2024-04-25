import Input from "../input";
import Button from "../button";
import {
  PlusIcon,
 Cog6ToothIcon
} from "@heroicons/react/24/outline";
import Tooltip from "../tooltip";
import { IHeaderButtons } from "@/contracts/header.interface";
import { useState } from "react";

export default function Header({
  className,
  handleClick,
  userId = ""
}: {
  className: string;
  handleClick?: (data: IHeaderButtons) => void;
  userId?: string
}) {
  const handleOnClick = (data: IHeaderButtons) => {
    if (handleClick) handleClick(data);
  };

  return (
    <div className={`${className} flex justify-between`}>
      <div className="ml-4">
        <Input defaultValue={userId} className="py-2 pl-2 text-sm" />
        <Button kind="primary" className="py-2 px-1.5 text-sm" onClick={() => handleOnClick({ button: "download_id" })}>
          Download ID
        </Button>
        <span className="block text-xs text-c-gray-300">
          Download your ID to never lose your data
        </span>
      </div>
      <div className="mr-4">
        <Tooltip text="Create New Task" position="down" className="mr-4">
          <Button kind="secondary" className="p-2 rounded-lg" onClick={() => handleOnClick({ button: "create_task" })}>
            <PlusIcon className="w-6 h-6" />
          </Button>
        </Tooltip>
        <Tooltip text="Configuration" position="down">
          <Button kind="secondary" className="p-2 rounded-lg" onClick={() => handleOnClick({ button: "view_board" })}>
            <Cog6ToothIcon className="w-6 h-6" />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
}
