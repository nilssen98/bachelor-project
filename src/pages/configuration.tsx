import { type NextPage } from "next";
import { Button, HStack, Input, Text, VStack } from "@chakra-ui/react";

const ConfigurationPage: NextPage = () => {
  return (
    <>
      <VStack alignItems={"flex-start"} spacing={4} width={"full"}>
        <Text fontSize={"4xl"}>{"Some Template > Configurations"}</Text>
        <HStack width={"full"}>
          <Button>Add new</Button>
          <Input placeholder={"Search"} />
        </HStack>
      </VStack>
    </>
  );
};

export default ConfigurationPage;
