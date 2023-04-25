import { useEffect, useState } from "react";
import { Button, Spacer } from "@chakra-ui/react";
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
import type { FileContent } from "use-file-picker";
import FileChooserDialog from "./file-chooser-dialog";
import NameInputDialog from "./name-input-dialog";

type Props = {
  openFileSelector: () => void;
  uploadFile: (name: string) => void;
  clearFileSelection: () => void;
  fileContent: FileContent[];
} & Omit<ModalProps, "children">;

export default function AddTemplateDialog(props: Props) {
  const [templateName, setTemplateName] = useState<string>("");

  useEffect(() => {
    setTemplateName(props.fileContent[0]?.name.split(".json")[0] || "");
  }, [props.fileContent]);

  function getBody() {
    return (
      <>
        <FileChooserDialog
          type={"schema"}
          openFileSelector={props.openFileSelector}
          clearFileSelection={props.clearFileSelection}
          fileContent={props.fileContent}
        />
        <Spacer py={4} />
        <NameInputDialog
          type={"template"}
          name={templateName}
          setName={setTemplateName}
        />
      </>
    );
  }

  function isFileSelected() {
    return props.fileContent.length > 0;
  }

  function isTemplateNameBlank() {
    return templateName.trim().length === 0;
  }

  function handleClose() {
    props.clearFileSelection();
    props.onClose();
  }

  function handleUpload() {
    props.uploadFile(templateName);
    props.clearFileSelection();
    props.onClose();
  }

  return (
    <>
      <Modal isCentered {...props} onCloseComplete={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload Template</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{getBody()}</ModalBody>
          <ModalFooter>
            <Button
              colorScheme={"blue"}
              variant={"ghost"}
              mr={3}
              onClick={handleClose}
            >
              Close
            </Button>
            <Button
              colorScheme={"blue"}
              isDisabled={isTemplateNameBlank() || !isFileSelected()}
              onClick={handleUpload}
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
