import type { StackProps } from "@chakra-ui/react";
import { HStack } from "@chakra-ui/react";
import { VStack } from "@chakra-ui/react";
import { Text, Stack, StackDivider } from "@chakra-ui/react";
import { useState } from "react";
import BrowserContent from "./browser-content";
import BrowserNavigation from "./browser-navigation";
import BrowserSideNavigation from "./browser-side-navigation";
import BrowserStatusBar from "./browser-status-bar";
import BrowserToolbar from "./browser-toolbar";
import { useBrowserContent } from "./hooks/useBrowserContent";

export default function ConfigurationBrowser(props: StackProps) {
  const [searchValue, setSearchValue] = useState<string>("");
  const { isValidPath, configurations } = useBrowserContent();

  const handleSave = () => {
    return;
  };

  const handleClickErrors = () => {
    return;
  };

  if (!isValidPath) {
    return <Text>Invalid path</Text>;
  }

  return (
    <>
      <Stack flex={1} divider={<StackDivider />} spacing={0} {...props}>
        <HStack spacing={0} divider={<StackDivider />} flex={1}>
          <Stack h={"full"} flex={0.2}>
            {configurations && configurations.length > 0 && (
              <BrowserSideNavigation bg={"whiteAlpha.200"} />
            )}
          </Stack>
          <VStack spacing={0} divider={<StackDivider />} h={"full"} flex={1}>
            <BrowserToolbar
              bg={"whiteAlpha.50"}
              onSave={handleSave}
              searchValue={searchValue}
              onSearchValueChanged={(newValue) => setSearchValue(newValue)}
              onClickErrors={handleClickErrors}
            />
            <BrowserNavigation bg={"whiteAlpha.50"} />
            <Stack overflow={"hidden"} bg={"whiteAlpha.50"} flex={1} w={"full"}>
              <BrowserContent />
            </Stack>
          </VStack>
        </HStack>
        <BrowserStatusBar bg={"whiteAlpha.200"} />
      </Stack>
    </>
  );
}
