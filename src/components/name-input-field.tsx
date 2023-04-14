import { VStack, Text, Input } from "@chakra-ui/react";

type Props = {
  type: "template" | "configuration";
  name: string;

  title?: string;
  setName: (name: string) => void;
};

export default function NameInputField(props: Props) {
  return (
    <>
      <VStack width={"full"} alignItems={"flex-start"} spacing={2}>
        <Text>{props.title || `Choose a name for the ${props.type}`}</Text>
        <Input
          value={props.name}
          placeholder={`Name of the ${props.type}`}
          onChange={(e) => props.setName(e.target.value)}
        />
      </VStack>
    </>
  );
}
