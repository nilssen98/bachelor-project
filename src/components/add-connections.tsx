import { Button, Text, HStack, Tooltip, Box } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { useMemo } from "react";
import { getLogo } from "../pages/auth/signin";

interface Props {
  providers: string[];
  currentProviders: string[];
}

export default function AddConnections(props: Props) {
  const currentProviderSet = useMemo(() => {
    return new Set(props.currentProviders);
  }, [props.currentProviders]);

  function isProviderDisabled(provider: string) {
    return currentProviderSet.has(provider.toLowerCase());
  }

  return (
    <>
      <Box>
        <Text fontSize={"2xl"} pb={2}>
          Add Connections
        </Text>
        <HStack spacing={4}>
          {props.providers.map((provider) => {
            const disabled = isProviderDisabled(provider);
            return (
              <Tooltip
                key={provider}
                hasArrow
                label={
                  disabled
                    ? `Already connected to ${provider}`
                    : `Connect with ${provider}`
                }
              >
                <Button
                  isDisabled={disabled}
                  onClick={() => {
                    void signIn("discord");
                  }}
                  leftIcon={getLogo(provider)}
                >
                  {provider}
                </Button>
              </Tooltip>
            );
          })}
        </HStack>
      </Box>
    </>
  );
}
