"use client";
import { AlertDialogs } from "@/components/index";
import { AlertDialog, Button, Flex, Spinner } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const DeleteButton = ({ id }: { id: string }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const deleteTask = async () => {
    try {
      setIsSubmitting(true);
      await axios.delete(`/api/task/${id}`);
      router.push("/admin/tasks/list");
    } catch (error) {
      setError(true);
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button
            disabled={isSubmitting}
            color="red"
            className="!cursor-pointer"
          >
            Delete task {isSubmitting && <Spinner />}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content maxWidth="450px">
          <AlertDialog.Title>Delete task</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Are you sure? This Task will be deleted
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray" className="!cursor-pointer">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button
                color="red"
                className="!cursor-pointer"
                onClick={deleteTask}
              >
                Delete Task
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialogs error={error} onClose={() => setError(false)} />
    </>
  );
};

export default DeleteButton;
