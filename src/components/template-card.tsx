import { useRef } from "react";
import {
  Card,
  HStack,
  Icon,
  VStack,
  Text,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  Tooltip,
} from "@chakra-ui/react";
import { CiEdit } from "react-icons/ci";
import { BiDotsVerticalRounded } from "react-icons/bi";
import ReactTimeAgo from "react-time-ago";
import GradientAvatar from "./gradient-avatar";
import { useDisclosure } from "@chakra-ui/react-use-disclosure";
import type { FocusableElement } from "@chakra-ui/utils";
import ConfirmationDialog from "./confirmation-dialog";
import EditDialog from "./edit-dialog";

interface Props {
  id: string;
  name: string;
  files: number;
  lastModified?: number | Date;
  onDelete: () => void;
  onClick?: () => void;
  onEdit: (name: string) => void;
}

export default function TemplateCard(props: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: renameIsOpen,
    onOpen: renameOnOpen,
    onClose: renameOnClose,
  } = useDisclosure();

  const cancelRef = useRef<FocusableElement | null>(null);

  return (
    <>
      <Card
        onClick={props.onClick}
        padding={4}
        size={"lg"}
        width={"100%"}
        userSelect={"none"}
        cursor={"pointer"}
        _hover={{ borderColor: "white" }}
      >
        <VStack spacing={0}>
          <HStack w={"full"}>
            <GradientAvatar
              id={props.id}
              // icon={<Icon boxSize={7} as={HiDocumentText} />}
            />
            <VStack spacing={0} flex={1} align={"start"}>
              <Tooltip label={props.name}>
                <Text noOfLines={1} fontSize={"xl"} maxWidth={"220px"}>
                  {props.name}
                </Text>
              </Tooltip>
              <Text textColor={"whiteAlpha.600"}>
                {`${props.files} configuration${props.files !== 1 ? "s" : ""}`}
              </Text>
            </VStack>
            <Menu>
              <MenuButton
                background={"none"}
                as={IconButton}
                onClick={(e) => {
                  e.stopPropagation();
                }}
                icon={<Icon boxSize={7} as={BiDotsVerticalRounded} />}
              />
              <MenuList
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <MenuItem onClick={renameOnOpen}>Edit</MenuItem>
                <MenuItem onClick={onOpen}>Delete</MenuItem>
              </MenuList>
            </Menu>
          </HStack>
          <HStack pt={4} w={"full"}>
            <Icon as={CiEdit} />
            <Text textColor={"whiteAlpha.600"}>
              {props.lastModified ? (
                <ReactTimeAgo date={props.lastModified} />
              ) : (
                "Couldn't fetch"
              )}
            </Text>
          </HStack>
        </VStack>
      </Card>
      <ConfirmationDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}
        onConfirmation={() => {
          props.onDelete();
          onClose();
        }}
        title={"Delete template?"}
        body={`Are you sure you want to delete template ${props.name}?
         All configurations belonging to this template will also be deleted!
         You can't undo this action afterwards.`}
      />
      <EditDialog
        name={props.name}
        onSave={props.onEdit}
        isOpen={renameIsOpen}
        onClose={renameOnClose}
      />
    </>
  );
}
