import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const AddButton = () => {
  return (
    <Button>
      <Link href="/admin/tasks/new">New task</Link>
    </Button>
  );
};

export default AddButton;
