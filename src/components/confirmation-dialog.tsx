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
  Text,
} from "@chakra-ui/react";

type Props = {
  title: string;
  body: string;
  onConfirmation: () => void;
} & Omit<AlertDialogProps, "children">;

export default function ConfirmationDialog(props: Props) {
  return (
    <>
      <AlertDialog isCentered {...props}>
        <AlertDialogOverlay backdropFilter={"auto"} backdropBlur={"5px"} />
        <AlertDialogContent>
          <AlertDialogHeader>{props.title}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <Text whiteSpace={"pre-line"}>{props.body}</Text>
          </AlertDialogBody>
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
