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
} from "@chakra-ui/react";
import { CiEdit } from "react-icons/ci";
import { HiDocumentText } from "react-icons/hi";
import { BiDotsVerticalRounded } from "react-icons/bi";
import ReactTimeAgo from "react-time-ago";

interface Props {
  name: string;
  files: number;
  lastModified: Date;
}

export default function TemplateCard(props: Props) {
  return (
    <>
      <Card variant={"outline"} padding={4} size={"lg"} width={330}>
        <VStack alignItems={"start"}>
          <HStack w={"full"}>
            <HStack flex={1}>
              <Icon as={HiDocumentText} />
              <Text noOfLines={1} fontWeight={"bold"} fontSize={"lg"}>
                {props.name}
              </Text>
            </HStack>
            <Menu>
              <MenuButton
                background={"none"}
                boxSize={0}
                as={IconButton}
                icon={<Icon as={BiDotsVerticalRounded} />}
              />
              <MenuList>
                <MenuItem>Edit</MenuItem>
                <MenuItem>Delete</MenuItem>
              </MenuList>
            </Menu>
          </HStack>
          <Text paddingLeft={1} fontSize={"xs"} align={"left"}>
            {props.files} configuration files
          </Text>
          <HStack>
            <Icon as={CiEdit} />
            <Text fontSize={"xs"}>
              <ReactTimeAgo date={props.lastModified} />
            </Text>
          </HStack>
        </VStack>
      </Card>
    </>
  );
}
