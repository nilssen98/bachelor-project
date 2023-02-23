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
  Tooltip,
} from "@chakra-ui/react";
import { FcCheckmark } from "react-icons/fc";
import { IoMdClose } from "react-icons/io";

interface Props {
  name: string;
  validated: boolean;
  selected: boolean;
  onClick: () => void;
}

export default function Chip(props: Props) {
  return (
    <>
      <Tag
        width={"120px"}
        size={"lg"}
        borderRadius={"full"}
        variant={props.selected ? "solid" : "subtle"}
        px={0}
        cursor={"pointer"}
        onClick={props.onClick}
      >
        <HStack
          spacing={1}
          paddingX={2}
          justifyContent={"center"}
          borderRadius={"full"}
        >
          <Icon
            as={props.validated ? FcCheckmark : IoMdClose}
            color={props.validated ? "none" : "red.500"}
          />
          <Tooltip label={props.name}>
            <Text paddingBottom={0.5} width={"80px"} noOfLines={1}>
              {props.name}
            </Text>
          </Tooltip>
        </HStack>
      </Tag>
    </>
  );
}
