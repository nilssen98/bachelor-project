import { Center, Text } from "@chakra-ui/react";

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
      <Text fontSize={"7xl"}>404 - Page Not Found</Text>
    </Center>
  );
}
