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

interface Props {
  name: string;
  files: number;
  lastModified?: number | Date;
  onDelete?: () => void;
  onClick?: () => void;
  onEdit?: () => void;
}

export default function TemplateCard(props: Props) {
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
              id={props.name}
              // icon={<Icon boxSize={7} as={HiDocumentText} />}
            />
            <VStack spacing={0} flex={1} align={"start"}>
              <Tooltip label={props.name}>
                <Text noOfLines={1} fontSize={"xl"} maxWidth={"220px"}>
                  {props.name}
                </Text>
              </Tooltip>
              <Text textColor={"whiteAlpha.600"}>
                {props.files} configurations
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
                <MenuItem>Edit</MenuItem>
                <MenuItem onClick={props.onDelete}>Delete</MenuItem>
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
    </>
  );
}
