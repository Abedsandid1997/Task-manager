"use client";
import { Task, User } from "@prisma/client";
import { Avatar, Select } from "@radix-ui/themes";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/index";
const AssigenToUser = ({ task }: { task: Task }) => {
  const { data: users, error, isLoading } = UserQuery();

  if (isLoading) return <Skeleton />;

  if (error) return null;
  return (
    <>
      <Select.Root
        defaultValue={task?.userId || "unassigned"}
        onValueChange={(user) =>
          axios
            .patch(`/api/task/${task.id}`, {
              userId: user === "unassigned" ? null : user,
            })
            .catch(() => {
              toast.error("Change could not be saved");
            })
        }
      >
        <Select.Trigger />
        <Select.Content>
          <Select.Group>
            <Select.Label>Users</Select.Label>
            <Select.Item value="unassigned">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                <Avatar
                  src={
                    user.image ??
                    "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
                  }
                  fallback={user.name![0].toUpperCase() ?? "?"}
                  radius="full"
                  className="cursor-pointer"
                  referrerPolicy="no-referrer"
                  size="1"
                  mr="2"
                />
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>

      <Toaster />
    </>
  );
};

const UserQuery = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/user").then((res) => res.data),
    staleTime: 1000 * 60,
    retry: 3,
  });

export default AssigenToUser;
