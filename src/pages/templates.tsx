import { Button, HStack, Input, Text, VStack } from "@chakra-ui/react";
import { type NextPage } from "next";

const TemplatesPage: NextPage = () => {
  return (
    <>
      <VStack alignItems={"flex-start"} spacing={4} width={"full"}>
        <Text fontSize={"5xl"}>Templates</Text>
        <HStack width={"full"}>
          <Button>Add new</Button>
          <Input placeholder={"Search"} />
        </HStack>
      </VStack>
    </>
  );
};

export default TemplatesPage;
