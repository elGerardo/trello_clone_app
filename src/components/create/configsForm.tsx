import { ISteps } from "@/contracts/steps.interface";
import Tabs from "../tabs";
import PriorityForm from "./forms/priorityForm";
import StepForm from "./forms/stepForm";

export default function ConfigsForm({
  onSubmit,
  catalog = { steps: [] },
}: {
  onSubmit?: (data: object) => void;
  catalog?: { steps: Array<ISteps> };
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
              className={`mt-12 mb-24`}
            />
          ),
        },
        { title: "Step", component: <StepForm steps={catalog.steps} onSubmit={(data: object) => handleOnSubmit(data)} /> },
      ]}
    />
  );
}
