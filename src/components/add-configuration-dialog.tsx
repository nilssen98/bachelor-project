import { useState } from "react";
import { Button, HStack, Text } from "@chakra-ui/react";
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

enum Steps {
  ChooseAction = 0,
  CreateNew = 1,
  CloneExisting = 2,
  UploadFile = 3,
}

type Props = Omit<ModalProps, "children">;

export default function AddConfigurationDialog(props: Props) {
  const [step, setStep] = useState<Steps>(Steps.ChooseAction);

  function getTitle() {
    switch (step) {
      case Steps.ChooseAction:
        return "Add Configuration";
      case Steps.CreateNew:
        return "Create New Configuration";
      case Steps.CloneExisting:
        return "Clone Existing Configuration";
      case Steps.UploadFile:
        return "Upload Configuration";
    }
  }

  function getBody() {
    switch (step) {
      case Steps.ChooseAction:
        return (
          <>
            <HStack>
              <Button onClick={() => setStep(Steps.CreateNew)}>
                Create new
              </Button>
              <Button onClick={() => setStep(Steps.CloneExisting)}>
                Clone existing
              </Button>
              <Button onClick={() => setStep(Steps.UploadFile)}>
                Upload file
              </Button>
            </HStack>
          </>
        );
      case Steps.CreateNew:
        return (
          <>
            <Text>Create new</Text>
          </>
        );
      case Steps.CloneExisting:
        return (
          <>
            <Text>Clone existing</Text>
          </>
        );
      case Steps.UploadFile:
        return (
          <>
            <Text>Upload file</Text>
          </>
        );
    }
  }

  return (
    <>
      <Modal isCentered {...props}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{getTitle()}</ModalHeader>
          <ModalCloseButton onClick={props.onClose} />
          <ModalBody>{getBody()}</ModalBody>
          <ModalFooter>
            <HStack spacing={2}>
              {step !== Steps.ChooseAction && (
                <Button
                  variant={"ghost"}
                  onClick={() => setStep(Steps.ChooseAction)}
                >
                  Back
                </Button>
              )}
              <Button colorScheme={"blue"} onClick={props.onClose}>
                Close
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
