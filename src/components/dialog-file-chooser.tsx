import {
  Button,
  HStack,
  IconButton,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import type { FileContent } from "use-file-picker";
import { BsFiletypeJson } from "react-icons/bs";
import { MdClear, MdFileUpload } from "react-icons/md";

type Props = {
  type: "schema" | "configuration";
  openFileSelector: () => void;
  clearFileSelection: () => void;
  fileContent: FileContent[];
};

export default function DialogFileChooser(props: Props) {
  function isFileSelected() {
    return props.fileContent.length > 0;
  }

  return (
    <>
      <VStack spacing={2} alignItems={"flex-start"}>
        <Text>{`Upload a JSON ${props.type} file`}</Text>
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
          <HStack width={"full"} pl={2} borderRadius={4} bg={"whiteAlpha.200"}>
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
}
