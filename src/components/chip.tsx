import { Tag } from "@chakra-ui/tag";
import {
  Button,
  Center,
  Divider,
  HStack,
  Icon,
  Menu,
  MenuButton,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { RiArrowDropDownLine } from "react-icons/ri";

interface Props {
  name: string;
}

export default function Chip(props: Props) {
  return (
    <>
      <Tag
        onClick={() => console.log("sad")}
        borderRadius={"full"}
        variant={"solid"}
        boxSize={"large"}
        px={0}
        cursor={"pointer"}
      >
        <HStack paddingLeft={3} alignItems={"center"} borderRadius={"full"}>
          <Icon />
          <Text>{props.name}</Text>
          <StackDivider />
          <Menu>
            <MenuButton
              sx={{ borderRadius: "full", borderLeftRadius: 0 }}
              as={Button}
            >
              <Center>
                <Icon as={RiArrowDropDownLine} />
              </Center>
            </MenuButton>
          </Menu>
        </HStack>
      </Tag>
    </>
  );
}
