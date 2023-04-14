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
} & Omit<ModalProps, "children">;
export default function EditDialog(props: Props) {
  const [templateName, setTemplateName] = useState<string>(props.name);

  useEffect(() => {
    setTemplateName(props.name);
  }, []);

  return (
    <>
      <Modal isCentered={true} isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change name</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <NameInputField
              name={templateName}
              setName={setTemplateName}
              type={"template"}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={props.onClose}>
              Close
            </Button>
            <Button
              onClick={() => {
                props.onSave(templateName);
                props.onClose();
              }}
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
