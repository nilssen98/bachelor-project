import { VStack, Text, Input, Heading } from "@chakra-ui/react";

type Props = {
  type: "schema" | "configuration" | "template";
  name: string;

  title?: string;
  setName: (name: string) => void;
};

export default function NameInputDialog(props: Props) {
  return (
    <>
      <VStack width={"full"} alignItems={"flex-start"} spacing={4}>
        <Text fontSize={"lg"}>Choose a new name</Text>
        <Input
          value={props.name}
          placeholder={`Name of the ${props.type}`}
          onChange={(e) => props.setName(e.target.value)}
        />
      </VStack>
    </>
  );
}
