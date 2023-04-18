import { relativizeURL } from "next/dist/shared/lib/router/utils/relativize-url";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from "@chakra-ui/modal";
import NameInputField from "./name-input-field";
import React, { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";

type Props = {
  name: string;
  onSave: (name: string) => void;
  type?: "template" | "configuration";
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
            <NameInputField
              name={fileName}
              title={"Name: "}
              setName={setFileName}
              type={props.type || "template"}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme={"blue"}
              variant={"ghost"}
              mr={3}
              onClick={props.onClose}
            >
              Close
            </Button>
            <Button
              onClick={() => {
                props.onSave(fileName);
                props.onClose();
              }}
              isDisabled={isNameBlank()}
              colorScheme="blue"
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
