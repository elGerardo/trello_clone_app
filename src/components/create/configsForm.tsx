import { ISteps } from "@/contracts/steps.interface";
import Tabs from "../tabs";
import PriorityForm from "./forms/priorityForm";
import StepForm from "./forms/stepForm";

export default function ConfigsForm({
  onSubmit,
  catalog = { steps: [] },
  onHandleStepsUpdate,
  onHandleDeleteTask,
}: {
  onSubmit?: (data: object) => void;
  catalog?: { steps: Array<ISteps> };
  onHandleStepsUpdate?: (data: Array<{ id: string; order: number }>) => void;
  onHandleDeleteTask?: (step_id: string) => void;
}) {
  const handleOnSubmit = (data: object) => {
    if (onSubmit) onSubmit(data);
  };

  return (
    <Tabs
      components={[
        {
          title: "Priority",
          component: (
            <PriorityForm
              onSubmit={(data: object) => handleOnSubmit(data)}
              className="mb-28"
            />
          ),
        },
        {
          title: "Step",
          component: (
            <StepForm
              steps={catalog.steps}
              onSubmit={(data: object) => handleOnSubmit(data)}
              handleStepsUpdate={(
                data: Array<{ id: string; order: number }>
              ) => {
                if (onHandleStepsUpdate) onHandleStepsUpdate(data);
              }}
              onDeleteTask={(step_id: string) => {
                if (onHandleDeleteTask) onHandleDeleteTask(step_id);
              }}
            />
          ),
        },
      ]}
    />
  );
}
