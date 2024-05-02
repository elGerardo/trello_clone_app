'use client'
import Input from "../input";
import Button from "../button";
import {
  PlusIcon,
 Cog6ToothIcon
} from "@heroicons/react/24/outline";
import Tooltip from "../tooltip";
import { IHeaderButtons } from "@/contracts/header.interface";
import { useEffect, useState } from "react";

export default function Header({
  className,
  handleClick,
  userId = ""
}: {
  className: string;
  handleClick?: (data: IHeaderButtons) => void;
  userId?: string
}) {
  const [userIdentificator, setUserIdentificator] = useState(userId)
  const [isThinking, setIsThinking] = useState(false)
  
  const handleOnClick = async (data: IHeaderButtons) => {
    if(isThinking && data.button == 'download_id') data = { button: 'update_user' , user_id: userIdentificator }
    if (handleClick) {
      const result: any = await handleClick(data)
      if(data.button == 'update_user' && result) setIsThinking(false)
    };
  };

  const handleOnChangeUserId = (value: string) => {
    setUserIdentificator(value)
    setIsThinking(true)
  }

  useEffect(() => {
    setUserIdentificator(userId)
  }, [userId])

  return (
    <div className={`${className} flex justify-between`}>
      <div className="ml-4">
        <Input value={userIdentificator} className="py-2 pl-2 text-sm" onChange={(value) => handleOnChangeUserId(value)}/>
        <Button kind="primary" className="py-2 px-1.5 text-sm" onClick={() => handleOnClick({ button: 'download_id' , user_id: userId })}>
        {!isThinking ? 'Download ID' : 'Load Data'}
        </Button>
        <span className="block text-xs text-c-gray-300">
          {!isThinking ? 'Download your ID to never lose your data' : 'Load your data based in your ID'}
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
