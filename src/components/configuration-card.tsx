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
import { IoMdClose, IoMdSettings } from "react-icons/io";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { FcCheckmark } from "react-icons/fc";
import ReactTimeAgo from "react-time-ago";

interface Props {
  name: string;
  validated: boolean;
  lastModified: Date;
  onDelete?: () => void;
  onClick?: () => void;
  onEdit?: () => void;
}

export default function ConfigurationCard(props: Props) {
  return (
    <>
      <Card
        onClick={props.onClick}
        variant={"outline"}
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
        <VStack alignItems={"start"} spacing={2}>
          <HStack w={"full"}>
            <HStack flex={1}>
              <Icon as={IoMdSettings} />
              <Tooltip label={props.name}>
                <Text
                  maxWidth={"220px"}
                  noOfLines={1}
                  fontWeight={"medium"}
                  fontSize={"2xl"}
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
          <HStack>
            <Icon
              as={props.validated ? FcCheckmark : IoMdClose}
              color={"red.500"}
              boxSize={5}
            />
            <Text textColor={"gray.400"} align={"left"}>
              {props.validated ? "validated" : "invalid"}
            </Text>
          </HStack>
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
