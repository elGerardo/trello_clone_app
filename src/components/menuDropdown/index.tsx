import { Menu, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export default function MenuDropdown({
  className = "",
  options = [],
  onClick,
}: {
  className?: string;
  options?: Array<string>;
  onClick?: (color: string) => void;
}) {
  return (
    <div className="">
      <Menu
        as="div"
        className={`relative text-left border-2 border-secondary rounded  ${className}`}
      >
        <div>
          <Menu.Button className="flex w-full justify-between  rounded-md bg-white text-dark px-4 py-2 text-sm font-medium hover:bg-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary">
            Choose a Color...
            <ChevronDownIcon
              className="-mr-1 ml-2 h-5 w-5 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className="  ">
              {options.map((item, index) => {
                return (
                  <Menu.Item>
                    <div
                      key={`${index}-${item}`}
                      className={`inline-block rounded mx-1 my-1 h-10 w-10 cursor-pointer ${
                        item === "#FFFFFF" && "border"
                      }`}
                      style={{ backgroundColor: item }}
                      onClick={() => {
                        if (onClick) onClick(item);
                      }}
                    />
                  </Menu.Item>
                );
              })}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
