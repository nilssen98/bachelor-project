import type { StackProps } from "@chakra-ui/react";
import { Button, Icon, Stack, StackDivider, Text } from "@chakra-ui/react";
import { omit } from "lodash-es";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { MdErrorOutline } from "react-icons/md";
import { useBrowserContent } from "./hooks/useBrowserContent";
import { useBrowserController } from "./hooks/useBrowserController";

type Props = {
  onSave?: () => void;
  searchValue: string;
  onSearchValueChanged: (newValue: string) => void;
} & StackProps;

export default function BrowserToolbar(props: Props) {
  const { errors } = useBrowserContent();
  const {
    toggleTreeView,
    showTreeView,
    showSchema,
    toggleSchema,
    toggleErrors,
  } = useBrowserController();

  const handleShowTreeView = () => {
    if (showSchema) {
      toggleSchema();
    }
    toggleTreeView();
  };

  const handleShowSchema = () => {
    if (showTreeView) {
      toggleTreeView();
    }
    toggleSchema();
  };

  const stackProps = omit(props, [
    "onSave",
    "onClickErrors",
    "searchValue",
    "onSearchValueChanged",
  ]);
  return (
    <>
      <Stack
        w={"full"}
        direction={"row"}
        divider={<StackDivider />}
        spacing={0}
        {...stackProps}
      >
        {/* <Button
          leftIcon={<Icon as={MdSave} />}
          onClick={props.onSave}
          fontWeight={400}
          variant={"ghost"}
          borderRadius={0}
          px={6}
        >
          Save
        </Button> */}
        <Button
          leftIcon={
            errors && errors.length > 0 ? (
              <Icon as={MdErrorOutline} color={"red.600"} />
            ) : undefined
          }
          onClick={toggleErrors}
          variant={"ghost"}
          borderRadius={0}
          px={6}
        >
          {errors && errors.length > 0 ? (
            <Text fontWeight={400}>{errors.length} Errors</Text>
          ) : (
            <Text color={"gray.500"}>No errors</Text>
          )}
        </Button>
        <Button
          leftIcon={<Icon as={showTreeView ? IoMdEye : IoMdEyeOff} />}
          onClick={handleShowTreeView}
          fontWeight={400}
          bg={showTreeView ? "whiteAlpha.200" : "default"}
          variant={"ghost"}
          borderRadius={0}
          px={6}
        >
          Tree view
        </Button>
        <Button
          leftIcon={<Icon as={showSchema ? IoMdEye : IoMdEyeOff} />}
          onClick={handleShowSchema}
          fontWeight={400}
          bg={showSchema ? "whiteAlpha.200" : "default"}
          variant={"ghost"}
          borderRadius={0}
          px={6}
        >
          Schema
        </Button>
        <Text></Text>
        {/* <InputGroup>
          <InputLeftElement
            pointerEvents={"none"}
            // eslint-disable-next-line react/no-children-prop
            children={<Icon as={MdSearch} color={"gray.600"} />}
          />
          <Input
            value={props.searchValue}
            onChange={(event) => props.onSearchValueChanged(event.target.value)}
            variant={"unstyled"}
            placeholder={"Search"}
          />
        </InputGroup> */}
      </Stack>
    </>
  );
}
