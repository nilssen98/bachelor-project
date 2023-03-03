import { Tag } from "@chakra-ui/tag";
import { HStack, Text, Tooltip } from "@chakra-ui/react";
import ValidationIcon from "./validation-icon";

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
        background={"black"}
        outlineColor={props.selected ? "white" : "whiteAlpha.400"}
        borderRadius={"full"}
        outlineOffset={0}
        px={0}
        cursor={"pointer"}
        onClick={props.onClick}
        sx={{
          transition: "all .1s ease-in-out",
        }}
      >
        <HStack
          spacing={1}
          paddingX={2}
          justifyContent={"center"}
          borderRadius={"full"}
        >
          <ValidationIcon validated={props.validated} />
          <Tooltip label={props.name}>
            <Text
              paddingBottom={0.5}
              textAlign={"center"}
              width={"80px"}
              noOfLines={1}
            >
              {props.name}
            </Text>
          </Tooltip>
        </HStack>
      </Tag>
    </>
  );
}
