"use client";
import Board from "@/components/board";
import ConfigsForm from "@/components/create/configsForm";
import TaskForm from "@/components/create/forms/taskForm";
import Header from "@/components/header";
import Modal from "@/components/modal";
import Spinner from "@/components/spinner/indes";
import { IHeaderButtons } from "@/contracts/header.interface";
import { ITask } from "@/contracts/tasks.interface";
import GenerateUser from "@/helpers/generateUser";
import CatalogService from "@/services/CatalogService";
import PriorityService from "@/services/PriorityService";
import StepService from "@/services/StepService";
import TaskService from "@/services/TaskService";
import UserService from "@/services/UserService";
import { stat } from "fs";
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
  let priorityService: PriorityService = new PriorityService(userId);
  let stepService: StepService = new StepService(userId);

  const createUser = async (userId: string) => {
    await UserService.store({ id: userId });
    taskService = new TaskService(userId);
    stepService = new StepService(userId);
    priorityService = new PriorityService(userId);
    catalogService = new CatalogService(userId);
    localStorage.setItem("userId", userId);
    setUserId(userId);
    fetchSteps();
  };

  const fetchSteps = async () => {
    const { steps, priorities, step_status }: any = await catalogService.get();
    setSteps(steps);
    setpPriorities(priorities);
    setIsLoadSteps(false);
    return step_status;
  };

  const handleOnClickHeader = async (data: IHeaderButtons) => {
    const result = await forms[data.button](data);
    return result;
  };

  const handleColumnUpdated = async (data: Array<object>) => {
    await taskService.bulkUpdate(data);
  };

  const handleOnClickCheckedItem = async (item_id: string) => {
    const { status } = await taskService.destroy(item_id);
    if (status != 204) return false;
    return true;
  };

  const handleOnClickViewTask = (item: ITask) => {
    setIsModalOpen(true);
    setModalForm(
      <TaskForm
        className={"mb-28 xl:px-56"}
        catalog={{ steps, priorities }}
        stepDefault={item.step_id}
        priorityDefault={item.priority.id}
        taskTitle={item.title}
        taskDescription={item.description}
        onSubmit={(data) => handleOnSubmit(data)}
        itemId={item.id}
        isUpdate={true}
      />
    );
  };

  const handleOnCloseModal = () => {
    setIsModalOpen(false);
  };

  const formsSubmits: any = {
    task: async (data: object) => {
      const { status } = await taskService.store(data);
      if (status !== 201) return;

      setIsLoadSteps(true);
      await fetchSteps();
      setIsModalOpen(false);
    },
    update_task: async (data: object) => {
      const { status } = await taskService.update(data);
      if (status !== 202) return;

      setIsLoadSteps(true);
      await fetchSteps();
      setIsModalOpen(false);
    },
    priority: async (data: object) => {
      const { status } = await priorityService.store(data);
      if (status !== 201) return;

      setIsLoadSteps(true);
      await fetchSteps();
      setIsModalOpen(false);
    },
    step: async (data: object) => {
      const { status } = await stepService.store(data);
      if (status !== 201) return;

      setIsLoadSteps(true);
      await fetchSteps();
      setIsModalOpen(false);
    },
  };

  const handleOnSubmit = async (data: any) => {
    await formsSubmits[data["form"]](data);
  };

  const handleStepsUpdate = async (
    data: Array<{ id: string; order: number }>
  ) => {
    setIsLoadSteps(true);
    await stepService.bulkUpdate(data);
    await fetchSteps();
    setIsModalOpen(false);
  };

  const handleDeleteTask = async (step_id: string) => {
    setIsLoadSteps(true);
    const { status } = await stepService.destroy(step_id);
    if (status === 204) await fetchSteps();
    setIsModalOpen(false);
  };

  const forms: any = {
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
    download_id: (data: any) => {
      const tempAnchor = document.createElement("a");
      const text = encodeURIComponent(data.user_id);
      tempAnchor.setAttribute("href", "data:text/plain;charset=utf-8," + text);
      tempAnchor.setAttribute("download", "MyId.txt");
      tempAnchor.style.display = "none";
      document.body.appendChild(tempAnchor);
      tempAnchor.click();
      document.body.removeChild(tempAnchor);
    },
    update_user: async (data: any) => {
      setIsLoadSteps(true);
      taskService = new TaskService(data.user_id);
      stepService = new StepService(data.user_id);
      priorityService = new PriorityService(data.user_id);
      catalogService = new CatalogService(data.user_id);
      const result = await fetchSteps();
      if (result === 200) {
        localStorage.setItem("userId", data.user_id);
        setUserId(data.user_id);
        setIsLoadSteps(false);
        return true;
      }

      setIsLoadSteps(true);
      taskService = new TaskService(userId);
      stepService = new StepService(userId);
      priorityService = new PriorityService(userId);
      catalogService = new CatalogService(userId);
      fetchSteps();
      return false;
    },
    view_board: () => {
      setModalForm(
        <ConfigsForm
          onSubmit={(data: object) => handleOnSubmit(data)}
          catalog={{ steps: steps }}
          onHandleStepsUpdate={(data: Array<{ id: string; order: number }>) =>
            handleStepsUpdate(data)
          }
          onHandleDeleteTask={(step_id: string) => handleDeleteTask(step_id)}
        />
      );
      setIsModalOpen(true);
    },
  };

  useEffect(() => {
    const user = localStorage.getItem("userId");
    if (user == null) {
      const userGenerated = GenerateUser.handle();
      createUser(userGenerated);
      return;
    }

    setUserId(user);
    taskService = new TaskService(user);
    stepService = new StepService(user);
    priorityService = new PriorityService(user);
    catalogService = new CatalogService(user);
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
          handleOnClick={(item: ITask) => handleOnClickViewTask(item)}
          handleColumnUpdated={(data) => handleColumnUpdated(data)}
          onClickCheckedItem={(item_id: string) =>
            handleOnClickCheckedItem(item_id)
          }
        />
      )}
    </main>
  );
}
