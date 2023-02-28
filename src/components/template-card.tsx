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
import { HiDocumentText } from "react-icons/hi";
import { BiDotsVerticalRounded } from "react-icons/bi";
import ReactTimeAgo from "react-time-ago";

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
        transition={"background-color 200ms ease"}
        _hover={{
          bg: "#2a303c",
        }}
      >
        <VStack alignItems={"start"}>
          <HStack w={"full"}>
            <HStack flex={1}>
              <Icon boxSize={7} as={HiDocumentText} />
              <Tooltip label={props.name}>
                <Text
                  noOfLines={1}
                  fontWeight={"medium"}
                  fontSize={"2xl"}
                  maxWidth={"220px"}
                >
                  {props.name}
                </Text>
              </Tooltip>
            </HStack>
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
          <Text paddingLeft={1} textColor={"gray.400"} align={"left"}>
            {props.files} configuration files
          </Text>
          <HStack>
            <Icon as={CiEdit} />
            <Text textColor={"gray.400"}>
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
