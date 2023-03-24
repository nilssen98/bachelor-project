import { VStack, Text, Input } from "@chakra-ui/react";

type Props = {
  type: "template" | "configuration";
  name: string;
  setName: (name: string) => void;
};

export default function RenameDialog(props: Props) {
  function isNameBlank() {
    return props.name.trim().length === 0;
  }

  return (
    <>
      <VStack alignItems={"flex-start"} spacing={2}>
        <Text>Choose a name for the template</Text>
        <Input
          value={props.name}
          placeholder={"Template name"}
          isInvalid={isNameBlank()}
          onChange={(e) => props.setName(e.target.value)}
        />
      </VStack>
    </>
  );
}
