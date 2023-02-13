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
import { IoMdClose, IoMdSettings } from "react-icons/io";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { FcCheckmark } from "react-icons/fc";
type Props = {
  name: string;
  validated: boolean;
  lastModified: Date;
};

export default function ConfigurationCard(props: Props) {
  return (
    <>
      <Card variant={"outline"} padding={4} size={"lg"} width={400}>
        <VStack alignItems={"start"} spacing={2}>
          <HStack w={"full"}>
            <HStack flex={1}>
              <Icon as={IoMdSettings} />
              <Text noOfLines={1} fontWeight={"bold"} fontSize={"lg"}>
                {props.name}
              </Text>
            </HStack>
            <Menu>
              <MenuButton
                background={"none"}
                as={IconButton}
                icon={<Icon as={BiDotsVerticalRounded} />}
              />
              <MenuList>
                <MenuItem>Edit</MenuItem>
                <MenuItem>Delete</MenuItem>
              </MenuList>
            </Menu>
          </HStack>
          <HStack>
            <Icon
              as={props.validated ? FcCheckmark : IoMdClose}
              color={"red.500"}
              boxSize={4}
            />
            <Text fontSize={"xs"} align={"left"}>
              {props.validated ? "validated" : "not validated"}
            </Text>
          </HStack>
          <HStack>
            <Icon as={CiEdit} />
            <Text fontSize={"xs"}>30m ago</Text>
          </HStack>
        </VStack>
      </Card>
    </>
  );
}
