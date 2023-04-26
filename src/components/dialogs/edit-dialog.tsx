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
import NameInputDialog from "./name-input-dialog";
import React, { useEffect, useState } from "react";
import { Button, VStack } from "@chakra-ui/react";
import FileChooserDialog from "./file-chooser-dialog";
import type { FileContent } from "use-file-picker";

type Props = {
  name: string;
  onSave: (name: string) => void;
  type: "schema" | "configuration";
  openFileSelector: () => void;
  clearFileSelection: () => void;
  fileContent: FileContent[];
} & Omit<ModalProps, "children">;
export default function EditDialog(props: Props) {
  const [fileName, setFileName] = useState<string>(props.name);

  useEffect(() => {
    setFileName(props.name);
  }, []);

  function isNameBlank() {
    return fileName.trim().length === 0;
  }

  return (
    <>
      <Modal isCentered={true} isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={8} align={"stretch"}>
              <FileChooserDialog
                type={props.type}
                openFileSelector={props.openFileSelector}
                clearFileSelection={props.clearFileSelection}
                fileContent={props.fileContent}
              />
              <NameInputDialog
                name={fileName}
                title={`Choose a new name for the ${props.type || "template"} `}
                setName={setFileName}
                type={props.type || "schema"}
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant={"text"} mr={3} onClick={props.onClose}>
              Close
            </Button>
            <Button
              onClick={() => {
                props.onSave(fileName);
                props.onClose();
              }}
              isDisabled={isNameBlank()}
              variant={"solid"}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
