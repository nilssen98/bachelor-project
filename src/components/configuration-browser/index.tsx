import { Card, CardBody, Stack, StackDivider } from "@chakra-ui/react";
import { useState } from "react";
import ConfigurationContent from "./configuration-content";
import ConfigurationNavigation from "./configuration-navigation";
import ConfigurationStatusBar from "./configuration-status-bar";
import ConfigurationToolbar from "./configuration-toolbar";

const defaultErrors = [
  "/metadata/ missing required property 'version'",
  "/metadata/ missing required property 'keywords'",
];

export default function ConfigurationBrowser() {
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSave = () => {
    return;
  };

  const handleClickErrors = () => {
    return;
  };

  return (
    <>
      <Card>
        <CardBody p={0}>
          <Stack
            minH={"xl"}
            height={"100%"}
            divider={<StackDivider />}
            spacing={0}
          >
            <ConfigurationToolbar
              onSave={handleSave}
              searchValue={searchValue}
              onSearchValueChanged={(newValue) => setSearchValue(newValue)}
              errors={defaultErrors}
              onClickErrors={handleClickErrors}
            />
            <ConfigurationNavigation />
            <ConfigurationContent />
            <ConfigurationStatusBar errors={defaultErrors} />
          </Stack>
        </CardBody>
      </Card>
    </>
  );
}
