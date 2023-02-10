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
import { IoIosClose, IoMdSettings } from "react-icons/io";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { FcCheckmark } from "react-icons/all";
type Props = {
  name: string;
  validated: boolean;
  lastModified: Date;
};

export default function ConfigurationCard(props: Props) {
  return (
    <>
      <Card variant={"outline"} padding={4} size={"lg"} width={300}>
        <VStack alignItems={"start"}>
          <HStack w={"full"}>
            <HStack flex={1}>
              <Icon as={IoMdSettings} />
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
          <HStack>
            <Icon
              as={props.validated ? FcCheckmark : IoIosClose}
              color={"red.500"}
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
