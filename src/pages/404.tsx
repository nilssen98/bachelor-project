import { Center, Text, VStack } from "@chakra-ui/react";
import Animation from "../components/404animation";

export default function Custom404() {
  return (
    <Center
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "full",
      }}
    >
      <VStack>
        <Animation />
        <Text fontSize={"7xl"}>404 - Page Not Found</Text>
      </VStack>
    </Center>
  );
}
