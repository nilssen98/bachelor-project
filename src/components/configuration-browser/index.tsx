import type { StackProps } from "@chakra-ui/react";
import {
  Box,
  Text,
  Card,
  CardBody,
  Stack,
  StackDivider,
} from "@chakra-ui/react";
import { useState } from "react";
import ConfigurationContent from "./configuration-content";
import ConfigurationNavigation from "./configuration-navigation";
import { useConfiguration } from "./configuration-provider";
import ConfigurationStatusBar from "./configuration-status-bar";
import ConfigurationToolbar from "./configuration-toolbar";

const defaultErrors = [
  "/metadata/ missing required property 'version'",
  "/metadata/ missing required property 'keywords'",
];

export default function ConfigurationBrowser(props: StackProps) {
  const [searchValue, setSearchValue] = useState<string>("");
  const { isValidPath } = useConfiguration();

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
      <Card>
        <CardBody p={0} overflow={"hidden"}>
          <Stack
            minH={"xl"}
            height={"100%"}
            divider={<StackDivider />}
            spacing={0}
            {...props}
          >
            <ConfigurationToolbar
              onSave={handleSave}
              searchValue={searchValue}
              onSearchValueChanged={(newValue) => setSearchValue(newValue)}
              onClickErrors={handleClickErrors}
            />
            <ConfigurationNavigation />
            <ConfigurationContent />
            <ConfigurationStatusBar />
          </Stack>
        </CardBody>
      </Card>
    </>
  );
}
