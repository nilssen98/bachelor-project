import type { AlertDialogProps } from "@chakra-ui/react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";

type Props = {
  title: string;
  body: string;
  onConfirmation: () => void;
} & Omit<AlertDialogProps, "children">;

export default function ConfirmationDialog(props: Props) {
  return (
    <>
      <AlertDialog {...props}>
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>{props.title}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>{props.body}</AlertDialogBody>
          <AlertDialogFooter>
            <Button onClick={props.onClose}>No</Button>
            <Button colorScheme={"red"} ml={3} onClick={props.onConfirmation}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
