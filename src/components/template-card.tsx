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
type Props = {
  name: string;
  files: number;
  lastModified: Date;
};

//TODO - Change icons when react-icons is installed, and modify size based on page

export default function TemplateCard(props: Props) {
  return (
    <>
      <Card variant={"outline"} padding={4} size={"lg"} width={300}>
        <VStack alignItems={"start"}>
          <HStack w={"full"}>
            <HStack flex={1}>
              <Icon as={HiDocumentText} />
              <Text fontWeight={"bold"} fontSize={"lg"}>
                {props.name}
              </Text>
            </HStack>
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<Icon as={BiDotsVerticalRounded} />}
              />
              <MenuList>
                <MenuItem>Edit</MenuItem>
                <MenuItem>Delete</MenuItem>
              </MenuList>
            </Menu>
          </HStack>
          <Text fontSize={"xs"} align={"left"}>
            {props.files} configuration files
          </Text>
          <HStack>
            <Icon as={CiEdit} />
            <Text fontSize={"xs"}>30m ago</Text>
          </HStack>
        </VStack>
      </Card>
    </>
  );
}
