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
import {
  Button,
  HStack,
  Icon,
  IconButton,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import type { FileContent } from "use-file-picker";
import { BsFiletypeJson } from "react-icons/bs";
import { MdClear, MdFileUpload } from "react-icons/md";

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
            <VStack spacing={2} alignItems={"flex-start"}>
              <Text>{getBodyText()}</Text>
              <Button
                width={"full"}
                variant={"ghost"}
                leftIcon={<MdFileUpload />}
                onClick={props.openFileSelector}
                isDisabled={isFileSelected()}
              >
                Upload
              </Button>
              {isFileSelected() ? (
                <HStack
                  width={"full"}
                  pl={2}
                  borderRadius={4}
                  bg={"whiteAlpha.200"}
                >
                  <Icon as={BsFiletypeJson} />
                  <Text flex={1}>{props.fileContent[0]?.name || ""}</Text>
                  <IconButton
                    variant={"ghost"}
                    justifySelf={"flex-end"}
                    onClick={props.clearFileSelection}
                    aria-label={"Clear file selection"}
                    icon={<MdClear />}
                  />
                </HStack>
              ) : (
                <HStack width={"full"} justifyContent={"center"}>
                  <Text>No file selected</Text>
                </HStack>
              )}
            </VStack>
          </>
        );
      case Steps.SetName:
        return (
          <>
            <VStack alignItems={"flex-start"} spacing={2}>
              <Text>{getBodyText()}</Text>
              <Input
                placeholder={"Template Name"}
                value={templateName}
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

  function handleClose() {
    setStep(Steps.UploadFile);
    props.clearFileSelection();
    props.onClose();
  }

  function handleUpload() {
    props.uploadFile(templateName);
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
              isDisabled={!isFileSelected()}
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
