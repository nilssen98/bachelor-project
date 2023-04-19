import type { StackProps } from "@chakra-ui/react";
import { HStack, Stack, StackDivider, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import BrowserContent from "./browser-content";
import BrowserNavigation from "./browser-navigation";
import BrowserSideNavigation from "./browser-side-navigation";
import BrowserStatusBar from "./browser-status-bar";
import BrowserToolbar from "./browser-toolbar";
import BrowserTreeView from "./browser-tree-view";
import { useBrowserContent } from "./hooks/useBrowserContent";
import { useBrowserController } from "./hooks/useBrowserController";

export default function ConfigurationBrowser(props: StackProps) {
  const [searchValue, setSearchValue] = useState<string>("");
  const { isValidPath, configurations } = useBrowserContent();
  const { showTreeView, showSchema } = useBrowserController();

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
          <Stack spacing={0} h={"full"} w={300}>
            {configurations && configurations.length > 0 && (
              <BrowserSideNavigation bg={"whiteAlpha.100"} />
            )}
          </Stack>
          <VStack spacing={0} divider={<StackDivider />} h={"full"} flex={1}>
            <BrowserToolbar
              bg={"whiteAlpha.100"}
              onSave={handleSave}
              searchValue={searchValue}
              onSearchValueChanged={(newValue) => setSearchValue(newValue)}
              onClickErrors={handleClickErrors}
            />
            {!(showTreeView || showSchema) && (
              <BrowserNavigation bg={"whiteAlpha.50"} />
            )}
            <Stack
              spacing={0}
              bg={"whiteAlpha.50"}
              flex={1}
              w={"full"}
              position={"relative"}
              overflowY={"auto"}
              overflowX={"hidden"}
            >
              <BrowserContent />
              {(showTreeView || showSchema) && (
                <BrowserTreeView position={"absolute"} />
              )}
            </Stack>
          </VStack>
        </HStack>
        <BrowserStatusBar bg={"whiteAlpha.100"} />
      </Stack>
    </>
  );
}
