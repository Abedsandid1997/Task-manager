"use client";
import { Pencil2Icon, Cross1Icon } from "@radix-ui/react-icons";
import { Card, Flex, Heading, Button, Spinner } from "@radix-ui/themes";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import dynamic from "next/dynamic";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { taskUpdateValidation } from "@/app/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@/components/index";
import toast, { Toaster } from "react-hot-toast";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type descriptionForm = z.infer<typeof taskUpdateValidation>;
const TaskEditDescription = ({
  description,
  id,
}: {
  description: string;
  id: string;
}) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<descriptionForm>({ resolver: zodResolver(taskUpdateValidation) });
  const [showEditor, setShowEditor] = useState(false);
  const router = useRouter();

  return (
    <div>
      {!showEditor && (
        <Card mt="2">
          <Flex justify="between">
            <Heading size="3">Description:</Heading>
            <Button
              onClick={() => setShowEditor(true)}
              className="!cursor-pointer"
            >
              <Pencil2Icon />
            </Button>
          </Flex>
          <Card className="prose max-w-full" mt="3">
            <ReactMarkdown>{description}</ReactMarkdown>
          </Card>
        </Card>
      )}
      {showEditor && (
        <>
          {" "}
          <Toaster />
          <Card mt="2">
            <Flex justify="between">
              <Heading size="3">Description:</Heading>
              <Button
                color="red"
                onClick={() => setShowEditor(false)}
                className="!cursor-pointer"
              >
                <Cross1Icon />
              </Button>
            </Flex>
            <form
              onSubmit={handleSubmit(async (data) => {
                try {
                  await axios.patch(`/api/task/${id}`, data);
                  router.refresh();

                  setShowEditor(false);
                } catch (error) {
                  toast.error(`Change could not been saved ${error}`);
                }
              })}
            >
              <Card className="prose max-w-full" mt="3">
                <Controller
                  defaultValue={description}
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <SimpleMDE placeholder="Description" {...field} />
                  )}
                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
              </Card>
              <Button
                disabled={isSubmitting}
                type="submit"
                mt="3"
                className="!cursor-pointer"
              >
                {" "}
                Edit description {isSubmitting && <Spinner />}
              </Button>
            </form>
          </Card>
        </>
      )}
    </div>
  );
};

export default TaskEditDescription;
