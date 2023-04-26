import {
  Avatar,
  Box,
  Button,
  HStack,
  Icon,
  IconButton,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import type { FileContent } from "use-file-picker";
import { MdCheck, MdDelete, MdFileUpload } from "react-icons/md";
import { IoMdDocument } from "react-icons/io";

type Props = {
  type: "schema" | "configuration";
  openFileSelector: () => void;
  clearFileSelection: () => void;
  fileContent: FileContent[];
  isLoading?: boolean;
};

export default function FileChooserDialog(props: Props) {
  const isFileSelected = props.fileContent.length > 0;

  const uploadButtonStatusText = () => {
    if (props.isLoading) {
      return "Upload in progress";
    } else if (isFileSelected) {
      return "File uploaded";
    } else {
      return "Upload a file";
    }
  };

  const uploadButtonStatusIcon = () => {
    if (props.isLoading) {
      return <Spinner />;
    } else if (isFileSelected) {
      return <Icon color={"green"} as={MdCheck} boxSize={5} />;
    } else {
      return <Icon as={MdFileUpload} boxSize={5} />;
    }
  };

  return (
    <>
      <VStack spacing={4} alignItems={"flex-start"}>
        <Text fontSize={"lg"} size={"md"}>{`Upload a new ${props.type}`}</Text>
        <Button
          width={"full"}
          leftIcon={uploadButtonStatusIcon()}
          onClick={props.openFileSelector}
          isDisabled={isFileSelected}
        >
          <Text>{uploadButtonStatusText()}</Text>
        </Button>
        {isFileSelected && (
          <HStack
            border={"1px solid"}
            borderRadius={6}
            p={3}
            borderColor={"whiteAlpha.400"}
            width={"full"}
            align={"center"}
            bg={"whiteAlpha.200"}
            spacing={3}
          >
            <Avatar
              bg={"whiteAlpha.100"}
              size={"sm"}
              icon={<Icon as={IoMdDocument} boxSize={4} />}
            />
            <Text>{props.fileContent[0]?.name || ""}</Text>
            <Box flex={1} />
            <IconButton
              colorScheme={"red"}
              size={"xs"}
              onClick={props.clearFileSelection}
              aria-label={"Clear file selection"}
              icon={<Icon as={MdDelete} boxSize={4} />}
            />
          </HStack>
        )}
      </VStack>
    </>
  );
}
