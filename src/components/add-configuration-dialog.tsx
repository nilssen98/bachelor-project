import { Button } from "@chakra-ui/react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import type { ModalProps } from "@chakra-ui/modal";

type Props = Omit<ModalProps, "children">;

export default function AddConfigurationDialog(props: Props) {
  return (
    <>
      <Modal {...props}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create new configuration</ModalHeader>
          <ModalCloseButton onClick={props.onClose} />
          <ModalBody>Dialog body</ModalBody>
          <ModalFooter>
            <Button colorScheme={"blue"} onClick={props.onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
