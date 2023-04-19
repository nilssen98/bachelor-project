import type { StackProps } from "@chakra-ui/react";
import { VStack, Stack, HStack, Box, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useBrowserContent } from "./hooks/useBrowserContent";

export default function BrowserSideNavigation(props: StackProps) {
  const { configurations, configuration } = useBrowserContent();

  const isSelected = (id: string) => {
    return id === configuration?.id;
  };

  return (
    <VStack w={"full"} h={"full"} spacing={0} {...props}>
      {configurations?.map((config, idx) => (
        <Stack key={idx} w={"full"}>
          <Link passHref href={`/configurations/${config.id}`}>
            <HStack
              transition={"all 0.1s ease-in-out"}
              background={isSelected(config.id) ? "whiteAlpha.300" : "inherit"}
              sx={{
                "&:hover": {
                  background: "whiteAlpha.200",
                },
              }}
              py={2}
              px={4}
            >
              <Text
                width={"full"}
                noOfLines={1}
                fontSize={"sm"}
                color={config.valid ? "whiteAlpha.800" : "red.600"}
              >
                {config.name}
              </Text>
              {!config.valid && (
                <Box
                  width={1.5}
                  height={1.5}
                  borderRadius={"full"}
                  bgColor={"red.600"}
                />
              )}
            </HStack>
          </Link>
        </Stack>
      ))}
    </VStack>
  );
}
