import { Box, HStack, Text } from "@chakra-ui/react";

interface Props {
  validated: boolean;
  includeText?: boolean;
}

export default function ValidationIcon(props: Props) {
  return (
    <>
      <HStack>
        <Box
          h={2}
          w={2}
          borderRadius={"full"}
          bg={props.validated ? "green" : "red"}
        />
        {props.includeText && (
          <Text>{props.validated ? "valid" : "invalid"}</Text>
        )}
      </HStack>
    </>
  );
}
