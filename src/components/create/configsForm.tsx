import Tabs from "../tabs";
import PriorityForm from "./forms/priorityForm";
import StepForm from "./forms/stepForm copy";

export default function ConfigsForm({
  onSubmit,
  className = ""
}: {
  onSubmit?: (data: object) => void;
  className?: string
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
        { title: "Step", component: <StepForm /> },
      ]}
    />
  );
}
