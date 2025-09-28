import { AlertDialog, Button } from "@radix-ui/themes";
import React from "react";

interface Props {
  error: boolean;
  onClose: () => void;
}

const AlertDialogs = ({ error, onClose }: Props) => {
  return (
    <AlertDialog.Root open={error} onOpenChange={(open) => !open && onClose()}>
      <AlertDialog.Content>
        <AlertDialog.Title>ERROR</AlertDialog.Title>
        <AlertDialog.Description>
          The status could not be deleted
        </AlertDialog.Description>
        <Button mt="3" color="gray" variant="soft" onClick={onClose}>
          OK
        </Button>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default AlertDialogs;
