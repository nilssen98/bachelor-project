import { useEffect, useState } from "react";
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
import { Button, Input, Text, VStack } from "@chakra-ui/react";
import type { FileContent } from "use-file-picker";
import DialogFileChooser from "./dialog-file-chooser";

enum Steps {
  UploadFile = 0,
  SetName = 1,
}

type Props = {
  openFileSelector: () => void;
  uploadFile: (name: string) => void;
  clearFileSelection: () => void;
  fileContent: FileContent[];
} & Omit<ModalProps, "children">;

export default function AddTemplateDialog(props: Props) {
  const [step, setStep] = useState<Steps>(Steps.UploadFile);
  const [templateName, setTemplateName] = useState<string>("");

  useEffect(() => {
    if (step === Steps.SetName) {
      setTemplateName(props.fileContent[0]?.name.split(".")[0] || "");
    }
  }, [step, props.fileContent]);

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
      case Steps.SetName:
        return "Choose a name for the template";
    }
  }

  function getBody() {
    switch (step) {
      case Steps.UploadFile:
        return (
          <>
            <DialogFileChooser
              type={"schema"}
              openFileSelector={props.openFileSelector}
              clearFileSelection={props.clearFileSelection}
              fileContent={props.fileContent}
            />
          </>
        );
      case Steps.SetName:
        return (
          <>
            <VStack alignItems={"flex-start"} spacing={2}>
              <Text>{getBodyText()}</Text>
              <Input
                value={templateName}
                placeholder={"Template name"}
                isInvalid={isTemplateNameBlank()}
                onChange={(e) => setTemplateName(e.target.value)}
              />
            </VStack>
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

  function isFileSelected() {
    return props.fileContent.length > 0;
  }

  function isTemplateNameBlank() {
    return templateName.trim().length === 0;
  }

  function handleClose() {
    setStep(Steps.UploadFile);
    props.clearFileSelection();
    props.onClose();
  }

  function handleUpload() {
    props.uploadFile(templateName);
    setStep(Steps.UploadFile);
    props.clearFileSelection();
    props.onClose();
  }

  return (
    <>
      <Modal isCentered {...props} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{getTitle()}</ModalHeader>
          <ModalCloseButton onClick={handleClose} />
          <ModalBody>{getBody()}</ModalBody>
          <ModalFooter>
            <Button
              colorScheme={"blue"}
              variant={"ghost"}
              mr={3}
              onClick={step === Steps.UploadFile ? handleClose : goBack}
            >
              {step === Steps.UploadFile ? "Cancel" : "Back"}
            </Button>
            <Button
              colorScheme={"blue"}
              isDisabled={
                step === Steps.UploadFile
                  ? !isFileSelected()
                  : isTemplateNameBlank()
              }
              onClick={step === Steps.UploadFile ? goNext : handleUpload}
            >
              {step === Steps.UploadFile ? "Next" : "Confirm"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
