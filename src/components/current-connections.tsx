import { Box, Card, CardBody, HStack, Text, VStack } from "@chakra-ui/react";
import { getLogo } from "../pages/auth/signin";

interface Props {
  providers: string[];
}

/**
 * Displays the currently used login connections
 */
export default function CurrentConnections(props: Props) {
  return (
    <>
      <Box>
        <Text fontSize={"2xl"} pb={2}>
          Current Connections
        </Text>
        <VStack alignItems={"flex-start"} spacing={2}>
          {Object.values(props.providers).map((provider) => (
            <Card key={provider} width={200} height={16} variant={"outline"}>
              <CardBody>
                <HStack alignItems={"center"} spacing={2}>
                  {getLogo(provider)}
                  <Text
                    fontSize={"sm"}
                    fontWeight={"bold"}
                    sx={{
                      textTransform: "capitalize",
                    }}
                  >
                    {provider}
                  </Text>
                </HStack>
              </CardBody>
            </Card>
          ))}
        </VStack>
      </Box>
    </>
  );
}
