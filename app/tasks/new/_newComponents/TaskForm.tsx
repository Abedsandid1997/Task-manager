"use client";
import { Button, Callout, Card, Spinner, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskValidation } from "@/app/validation";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { ErrorMessage } from "@/components/index";
type TaskFormData = z.infer<typeof taskValidation>;
const TaskForm = () => {
  const createTask = async (data: TaskFormData) => {
    try {
      await axios.post("/api/task", data);
      router.push("/tasks/list");
    } catch (error) {
      setError(`Unexpected error ${error}`);
    }
  };
  const router = useRouter();
  const [error, setError] = useState("");
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskValidation),
  });
  return (
    <>
      {error && (
        <Callout.Root color="red" className="mb-2">
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={handleSubmit(createTask)}>
        <Card className="space-y-3">
          <TextField.Root
            placeholder="New Task....."
            {...register("title")}
          ></TextField.Root>
          <ErrorMessage>{errors.title?.message} </ErrorMessage>
        </Card>
        <Card>
          {" "}
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <SimpleMDE placeholder="Description" {...field} />
            )}
          />
          <ErrorMessage>{errors.description?.message} </ErrorMessage>
        </Card>
        <Button disabled={isSubmitting} type="submit" variant="soft">
          Add task{isSubmitting && <Spinner />}{" "}
        </Button>
      </form>
    </>
  );
};

export default TaskForm;
