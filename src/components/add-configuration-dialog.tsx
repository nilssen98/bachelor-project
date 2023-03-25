import { useEffect, useState } from "react";
import {
  Button,
  HStack,
  IconButton,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
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
import { AiOutlineCopy, AiOutlineFileAdd } from "react-icons/ai";
import { BsFiletypeJson } from "react-icons/bs";
import { IoMdCopy } from "react-icons/io";
import type { FileContent } from "use-file-picker";
import type { Configuration } from "@prisma/client";
import DialogFileChooser from "./dialog-file-chooser";
import RenameDialog from "./rename-dialog";

enum Steps {
  ChooseAction = 0,
  CreateNew = 1,
  CloneExisting = 2,
  UploadFile = 3,
  NewName = 4,
  CloneName = 5,
  UploadName = 6,
}

type Props = {
  openFileSelector: () => void;
  clearFileSelection: () => void;
  fileContent: FileContent[];
  uploadFile: (name: string) => void;
  configurations: Configuration[];
} & Omit<ModalProps, "children">;

export default function AddConfigurationDialog(props: Props) {
  const [step, setStep] = useState<Steps>(Steps.ChooseAction);
  const [configurationName, setConfigurationName] = useState<string>("");

  useEffect(() => {
    if (step === Steps.UploadName) {
      setConfigurationName(props.fileContent[0]?.name.split(".json")[0] || "");
    }
  }, [step, props.fileContent]);

  function getTitle() {
    switch (step) {
      case Steps.ChooseAction:
        return "Add Configuration";
      case Steps.CreateNew:
        return "Create New Configuration";
      case Steps.CloneExisting:
        return "Clone Configuration";
      case Steps.UploadFile:
        return "Upload Configuration";
      case Steps.UploadName:
        return "Configuration Name";
    }
  }

  function getCardButton(step: Steps) {
    function getIcon() {
      switch (step) {
        case Steps.CreateNew:
          return AiOutlineFileAdd;
        case Steps.CloneExisting:
          // return IoMdCopy;
          return AiOutlineCopy;
        case Steps.UploadFile:
          return BsFiletypeJson;
      }
    }

    function getText() {
      switch (step) {
        case Steps.CreateNew:
          // return "New configuration from scratch";
          return "Create a new configuration from scratch";
        case Steps.CloneExisting:
          // return "Clone an already existing configuration";
          return "Create a copy of an already existing configuration";
        case Steps.UploadFile:
          return "Upload a configuration from a JSON file";
      }
    }

    return (
      <Button
        key={step}
        flex={1}
        p={2}
        height={180}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        whiteSpace={"break-spaces"}
        onClick={() => setStep(step)}
      >
        <IconButton
          flex={2}
          as={getIcon()}
          bg={"transparent"}
          aria-label={"Create new configuration"}
          _hover={{ bg: "transparent" }}
        />
        <Text>{getText()}</Text>
      </Button>
    );
  }

  function getBody() {
    switch (step) {
      case Steps.ChooseAction:
        return (
          <>
            <HStack>
              {Object.values(Steps).reduce((acc: JSX.Element[], key) => {
                if (
                  typeof Steps[key as keyof typeof Steps] === "number" &&
                  Steps[key as keyof typeof Steps] !== Steps.ChooseAction &&
                  Steps[key as keyof typeof Steps] < Steps.NewName
                ) {
                  acc.push(getCardButton(Steps[key as keyof typeof Steps]));
                }
                return acc;
              }, [])}
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
            <VStack alignItems={"flex-start"} spacing={2}>
              <Text>Clone an already existing configuration</Text>
              <Select placeholder={"Select option"}>
                {props.configurations.map((configuration) => (
                  <option key={configuration.id} value={configuration.id}>
                    {configuration.name}
                  </option>
                ))}
              </Select>
            </VStack>
          </>
        );
      case Steps.UploadFile:
        return (
          <>
            <DialogFileChooser
              type={"configuration"}
              openFileSelector={props.openFileSelector}
              clearFileSelection={props.clearFileSelection}
              fileContent={props.fileContent}
            />
          </>
        );
      case Steps.UploadName:
        return (
          <>
            <RenameDialog
              type={"configuration"}
              name={configurationName}
              setName={setConfigurationName}
            />
          </>
        );
    }
  }

  function getFooterAction() {
    switch (step) {
      case Steps.CloneExisting:
        return () => {
          setStep(Steps.CloneName);
        };
      case Steps.UploadFile:
        return () => {
          setStep(Steps.UploadName);
        };
      case Steps.UploadName:
        return () => {
          props.uploadFile(configurationName);
          handleClose();
        };
      default:
        return handleClose;
    }
  }

  function getFooterButton() {
    switch (step) {
      case Steps.ChooseAction:
        return (
          <Button colorScheme={"blue"} onClick={handleClose}>
            Close
          </Button>
        );
      case Steps.UploadFile:
      case Steps.CloneExisting:
        return (
          <Button
            colorScheme={"blue"}
            isDisabled={!isFileSelected()}
            onClick={getFooterAction()}
          >
            Next
          </Button>
        );
      case Steps.UploadName:
        return (
          <Button
            colorScheme={"blue"}
            isDisabled={isTemplateNameBlank()}
            onClick={getFooterAction()}
          >
            Submit
          </Button>
        );
      default:
        return (
          <Button colorScheme={"blue"} onClick={props.onClose}>
            Close
          </Button>
        );
    }
  }

  function handleBack() {
    switch (step) {
      case Steps.CreateNew:
      case Steps.CloneExisting:
      case Steps.UploadFile:
        props.clearFileSelection();
        setStep(Steps.ChooseAction);
        break;
      case Steps.UploadName:
        setStep(Steps.UploadFile);
        break;
    }
  }

  function handleClose() {
    setStep(Steps.ChooseAction);
    props.clearFileSelection();
    props.onClose();
  }

  function isFileSelected() {
    return props.fileContent.length > 0;
  }

  function isTemplateNameBlank() {
    return configurationName.trim().length === 0;
  }

  return (
    <>
      <Modal
        isCentered
        {...props}
        size={step === Steps.ChooseAction ? "xl" : "md"}
        onCloseComplete={handleClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{getTitle()}</ModalHeader>
          <ModalCloseButton onClick={handleClose} />
          <ModalBody>{getBody()}</ModalBody>
          <ModalFooter>
            <HStack spacing={2}>
              {step !== Steps.ChooseAction && (
                <Button variant={"ghost"} onClick={handleBack}>
                  Back
                </Button>
              )}
              {getFooterButton()}
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
