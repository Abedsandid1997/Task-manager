import React from "react";
import dynamic from "next/dynamic";
import FormSkeleton from "./FormSkeleton";

const TaskForm = dynamic(() => import("@/app/tasks/new/_newComponents/TaskForm"), {
  ssr: false,
  loading: () => <FormSkeleton />,
});
const DynamicTaskForm = () => {
  return <TaskForm />;
};

export default DynamicTaskForm;
