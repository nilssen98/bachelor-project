import { useState } from "react";
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
import { Button, Input, Text } from "@chakra-ui/react";
import type { FileContent } from "use-file-picker";

enum Steps {
  UploadFile = 0,
  SetName = 1,
}

type Props = {
  openFileSelector: () => void;
  uploadFile: () => void;
  clearFileSelection: () => void;
  fileContent: FileContent[];
} & Omit<ModalProps, "children">;

export default function AddTemplateDialog(props: Props) {
  const [step, setStep] = useState<Steps>(Steps.UploadFile);
  const [templateName, setTemplateName] = useState<string>("");

  function getTitle() {
    switch (step) {
      case Steps.UploadFile:
        return "Upload Template";
      case Steps.SetName:
        return "Set Template Name";
    }
  }

  function getBodyText() {
    switch (step) {
      case Steps.UploadFile:
        return "Upload a JSON schema file";
      case Steps.SetName:
        return "Choose a name for the template";
    }
  }

  function getBody() {
    switch (step) {
      case Steps.UploadFile:
        return (
          <>
            <Text>{getBodyText()}</Text>
            <Button onClick={props.openFileSelector}>Upload</Button>
          </>
        );
      case Steps.SetName:
        return (
          <>
            <Text>{getBodyText()}</Text>
            <Input
              placeholder={"Template Name"}
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
            />
          </>
        );
    }
  }

  function goBack() {
    setStep(step - 1);
  }

  function goNext() {
    setStep(step + 1);
  }

  function handleCancel() {
    setStep(Steps.UploadFile);
    props.onClose();
  }

  return (
    <>
      <Modal {...props}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{getTitle()}</ModalHeader>
          <ModalCloseButton onClick={handleCancel} />
          <ModalBody>{getBody()}</ModalBody>
          <ModalFooter>
            <Button
              colorScheme={"blue"}
              variant={"ghost"}
              mr={3}
              onClick={step === Steps.UploadFile ? handleCancel : goBack}
            >
              {step === Steps.UploadFile ? "Cancel" : "Back"}
            </Button>
            <Button
              colorScheme={"blue"}
              mr={3}
              isDisabled={props.fileContent.length === 0}
              onClick={step === Steps.UploadFile ? goNext : props.uploadFile}
            >
              {step === Steps.UploadFile ? "Next" : "Confirm"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
