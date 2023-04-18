import { useEffect, useState } from "react";
import {
  Button,
  HStack,
  IconButton,
  Spacer,
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
import { Select } from "chakra-react-select";
import {
  chakraSelectStyles,
  FormattedConfigurationOption,
} from "../theme/react-select";
import { AiOutlineCopy, AiOutlineFileAdd } from "react-icons/ai";
import { BsFiletypeJson } from "react-icons/bs";
import type { FileContent } from "use-file-picker";
import type { Configuration } from "@prisma/client";
import DialogFileChooser from "./dialog-file-chooser";
import NameInputField from "./name-input-field";

// Custom type to represent a configuration option in the react-select dropdown
export type ConfigurationOption = Configuration & {
  value: string;
  label: string;
};

enum Step {
  ChooseAction = 0,
  CreateNew = 1,
  CloneExisting = 2,
  UploadFile = 3,
}

type Props = {
  openFileSelector: () => void;
  clearFileSelection: () => void;
  fileContent: FileContent[];
  uploadFile: (name: string) => void;
  createNew: (name: string) => void;
  configurations: Configuration[];
  cloneConfiguration: (id: string, name: string) => void;
} & Omit<ModalProps, "children">;

export default function AddConfigurationDialog(props: Props) {
  const [step, setStep] = useState<Step>(Step.ChooseAction);
  const [configurationName, setConfigurationName] = useState<string>("");
  const [selectedConfiguration, setSelectedConfiguration] =
    useState<ConfigurationOption | null>(null);

  useEffect(() => {
    setConfigurationName(props.fileContent[0]?.name.split(".json")[0] || "");
  }, [props.fileContent]);

  useEffect(() => {
    setConfigurationName(selectedConfiguration?.name || "");
  }, [selectedConfiguration]);

  function getTitle() {
    switch (step) {
      case Step.ChooseAction:
        return "Add Configuration";
      case Step.CreateNew:
        return "Create New Configuration";
      case Step.CloneExisting:
        return "Clone Configuration";
      case Step.UploadFile:
        return "Upload Configuration";
    }
  }

  function getCardButton(step: Step) {
    function getIcon() {
      switch (step) {
        case Step.CreateNew:
          return AiOutlineFileAdd;
        case Step.CloneExisting:
          return AiOutlineCopy;
        case Step.UploadFile:
          return BsFiletypeJson;
      }
    }

    function getText() {
      switch (step) {
        case Step.CreateNew:
          return "Create a new configuration from scratch";
        case Step.CloneExisting:
          return "Create a copy of an already existing configuration";
        case Step.UploadFile:
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
        <Text noOfLines={3}>{getText()}</Text>
      </Button>
    );
  }

  function getBody() {
    switch (step) {
      case Step.ChooseAction:
        return (
          <>
            <HStack>
              {Object.values(Step).reduce((acc: JSX.Element[], key) => {
                if (
                  typeof Step[key as keyof typeof Step] === "number" &&
                  Step[key as keyof typeof Step] !== Step.ChooseAction
                ) {
                  acc.push(getCardButton(Step[key as keyof typeof Step]));
                }
                return acc;
              }, [])}
            </HStack>
          </>
        );
      case Step.CreateNew:
        return (
          <>
            <NameInputField
              type={"configuration"}
              name={configurationName}
              setName={setConfigurationName}
            />
          </>
        );
      case Step.CloneExisting:
        return (
          <>
            <VStack alignItems={"flex-start"} spacing={2}>
              <Text>Choose a configuration to clone</Text>
              <Select<ConfigurationOption>
                useBasicStyles
                isMulti={false}
                isClearable
                colorScheme={"blue"}
                placeholder={"Select a configuration to clone"}
                chakraStyles={chakraSelectStyles}
                value={selectedConfiguration}
                onChange={(option) => setSelectedConfiguration(option)}
                components={{
                  Option: FormattedConfigurationOption,
                }}
                options={props.configurations.map((configuration) => ({
                  ...configuration,
                  value: configuration.id,
                  label: configuration.name,
                }))}
              />
              <Spacer py={1} />
              <NameInputField
                type={"configuration"}
                name={configurationName}
                setName={setConfigurationName}
              />
            </VStack>
          </>
        );
      case Step.UploadFile:
        return (
          <>
            <DialogFileChooser
              type={"configuration"}
              openFileSelector={props.openFileSelector}
              clearFileSelection={props.clearFileSelection}
              fileContent={props.fileContent}
            />
            <Spacer py={4} />
            <NameInputField
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
      case Step.CreateNew:
        return () => {
          props.createNew(configurationName);
          handleClose();
        };
      case Step.UploadFile:
        return () => {
          props.uploadFile(configurationName);
          handleClose();
        };
      case Step.CloneExisting:
        return () => {
          handleClone();
          handleClose();
        };
      default:
        return handleClose;
    }
  }

  function getFooterButton() {
    switch (step) {
      case Step.UploadFile:
      case Step.CloneExisting:
        return (
          <Button
            colorScheme={"blue"}
            isDisabled={
              isTemplateNameBlank() ||
              !(isFileSelected() || selectedConfiguration !== null)
            }
            onClick={getFooterAction()}
          >
            Submit
          </Button>
        );
      case Step.CreateNew:
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
          <Button colorScheme={"blue"} onClick={handleClose}>
            Close
          </Button>
        );
    }
  }

  function handleBack() {
    switch (step) {
      case Step.CreateNew:
        setStep(Step.ChooseAction);
        break;
      case Step.CloneExisting:
        setStep(Step.ChooseAction);
        setSelectedConfiguration(null);
        break;
      case Step.UploadFile:
        props.clearFileSelection();
        setStep(Step.ChooseAction);
        break;
    }
  }

  function handleClose() {
    setStep(Step.ChooseAction);
    setSelectedConfiguration(null);
    props.clearFileSelection();
    props.onClose();
  }

  function handleClone() {
    props.cloneConfiguration(
      selectedConfiguration?.id || "",
      configurationName
    );
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
        size={step === Step.ChooseAction ? "xl" : "md"}
        onCloseComplete={handleClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{getTitle()}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{getBody()}</ModalBody>
          <ModalFooter>
            <HStack spacing={2}>
              {step !== Step.ChooseAction && (
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
