"use client";
import Board from "@/components/board";
import ConfigsForm from "@/components/create/configsForm";
import TaskForm from "@/components/create/forms/taskForm";
import Header from "@/components/header";
import Modal from "@/components/modal";
import Spinner from "@/components/spinner/indes";
import { IHeaderButtons } from "@/contracts/header.interface";
import GenerateUser from "@/helpers/generateUser";
import CatalogService from "@/services/CatalogService";
import PriorityService from "@/services/PriorityService";
import StepService from "@/services/StepService";
import TaskService from "@/services/TaskService";
import UserService from "@/services/UserService";
import { useEffect, useState } from "react";

export default function Home() {
  const [modalForm, setModalForm]: any = useState(null);
  const [steps, setSteps] = useState([]);
  const [priorities, setpPriorities] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingSteps, setIsLoadSteps] = useState(true);
  const [userId, setUserId] = useState("");

  let catalogService: CatalogService = new CatalogService(userId);
  let taskService: TaskService = new TaskService(userId);
  let priorityService: PriorityService = new PriorityService(userId)
  let stepService: StepService = new StepService(userId)

  const createUser = async (userId: string) => {
    await UserService.store({ id: userId })
    taskService = new TaskService(userId)
    stepService = new StepService(userId)
    priorityService = new PriorityService(userId)
    catalogService = new CatalogService(userId)
    localStorage.setItem("userId", userId)
    setUserId(userId)
    fetchSteps();  
  }

  const fetchSteps = async () => {
    const { steps, priorities }: any = await catalogService.get();
    setSteps(steps);
    setpPriorities(priorities);
    setIsLoadSteps(false);
  };

  const handleOnClickHeader = (data: IHeaderButtons) => {
    forms[data.button]();
  };

  const handleColumnUpdated = async (data: Array<object>) => {
    await taskService.bulkUpdate(data);
  };

  const handleOnClickViewTask = () => {
    console.log("open modal to see task");
  };

  const handleOnCloseModal = () => {
    setIsModalOpen(false);
  };

  const formsSubmits: any = {
    task: async (data: object) => {
      const { status } = await taskService.store(data);
      if (status !== 201) return

      setIsLoadSteps(true);
      await fetchSteps();
      setIsModalOpen(false);
    },
    priority: async (data: object) => {
      const { status } = await priorityService.store(data)
      if (status !== 201) return

      setIsLoadSteps(true);
      await fetchSteps();
      setIsModalOpen(false);
    },
    step: async(data: object) => {
      const { status } = await stepService.store(data)
      if (status !== 201) return

      setIsLoadSteps(true);
      await fetchSteps();
      setIsModalOpen(false);
    }
  };

  const handleOnSubmit = async (data: any) => {
    await formsSubmits[data["form"]](data)
  };

  const forms = {
    create_task: () => {
      setModalForm(
        <TaskForm
          className={"mb-28 xl:px-56"}
          catalog={{ steps, priorities }}
          onSubmit={(data) => handleOnSubmit(data)}
          onClose={() => handleOnCloseModal()}
        />
      );
      setIsModalOpen(true);
    },
    download_id: () => {
      console.log("downloading id");
    },
    view_board: () => {
      setModalForm(
        <ConfigsForm onSubmit={(data: object) => handleOnSubmit(data)} catalog={{ steps: steps }} />
      );
      setIsModalOpen(true);
    },
  };

  useEffect(() => {
    const user = localStorage.getItem("userId")
    if(user == null) {
      const userGenerated = GenerateUser.handle()
      createUser(userGenerated)
      return
    }

    setUserId(user)
    taskService = new TaskService(user)
    stepService = new StepService(user)
    priorityService = new PriorityService(user)
    catalogService = new CatalogService(user)
    fetchSteps();
  }, []);

  return (
    <main className="max-w-screen-xl m-auto">
      <Modal isOpen={isModalOpen} handleOnClose={() => handleOnCloseModal()}>
        {modalForm}
      </Modal>
      <Header
        className="w-full mt-5"
        handleClick={(data: IHeaderButtons) => handleOnClickHeader(data)}
        userId={userId}
      />
      {isLoadingSteps && (
        <div className="w-full">
          <Spinner className="m-auto mt-14" />
        </div>
      )}
      {!isLoadingSteps && (
        <Board
          steps={steps}
          handleOnClick={() => handleOnClickViewTask()}
          handleColumnUpdated={(data) => handleColumnUpdated(data)}
        />
      )}
    </main>
  );
}
