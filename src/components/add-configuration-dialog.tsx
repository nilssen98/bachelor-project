import { useState } from "react";
import {
  Box,
  Button,
  HStack,
  IconButton,
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
      <VStack
        key={step}
        flex={1}
        height={180}
        p={2}
        as={"button"}
        bg={"whiteAlpha.200"}
        borderRadius={8}
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
      </VStack>
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
                  Steps[key as keyof typeof Steps] !== Steps.ChooseAction
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
      <Modal isCentered {...props} size={"xl"}>
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
