import { Button, HStack, Input, Text, VStack } from "@chakra-ui/react";

export default function TemplatesPage() {
  return (
    <>
      <VStack alignItems={"flex-start"} spacing={4} width={"100%"}>
        <Text fontSize={"5xl"}>Templates</Text>
        <HStack width={"100%"}>
          <Button>Add new</Button>
          <Input placeholder={"Search"} />
        </HStack>
      </VStack>
    </>
  );
}
