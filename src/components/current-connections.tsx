import { Box, Text, VStack } from "@chakra-ui/react";
import ConnectionCard from "./connection-card";

interface Props {
  providers: string[];
}

/**
 * Displays the currently used login connections
 */
export default function CurrentConnections(props: Props) {
  return (
    <>
      <Box width={"full"}>
        <Text fontSize={"2xl"} pb={2}>
          Current Connections
        </Text>
        <VStack alignItems={"flex-start"} spacing={2}>
          {Object.values(props.providers).map((provider) => (
            <ConnectionCard key={provider} provider={provider} />
          ))}
        </VStack>
      </Box>
    </>
  );
}
