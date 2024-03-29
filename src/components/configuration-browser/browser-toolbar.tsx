import type { StackProps } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { HStack, Spinner } from "@chakra-ui/react";
import { Button, Icon, Stack, StackDivider, Text } from "@chakra-ui/react";
import { omit } from "lodash-es";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { MdCheck, MdErrorOutline } from "react-icons/md";
import { useBrowserContent } from "./hooks/useBrowserContent";
import { useBrowserController } from "./hooks/useBrowserController";

type Props = {
  onSave?: () => void;
  searchValue: string;
  onSearchValueChanged: (newValue: string) => void;
} & StackProps;

export default function BrowserToolbar(props: Props) {
  const { errors, isUpdating } = useBrowserContent();
  const {
    toggleTreeView,
    showTreeView,
    showSchema,
    toggleSchema,
    toggleErrors,
    showBrowserView,
    toggleBrowserView,
  } = useBrowserController();

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
          leftIcon={<Icon as={showTreeView ? IoMdEye : IoMdEyeOff} />}
          onClick={toggleTreeView}
          fontWeight={400}
          bg={showTreeView ? "whiteAlpha.200" : "default"}
          variant={"ghost"}
          borderRadius={0}
          px={6}
        >
          Tree view
        </Button>
        <Button
          leftIcon={<Icon as={showBrowserView ? IoMdEye : IoMdEyeOff} />}
          onClick={toggleBrowserView}
          fontWeight={400}
          bg={showBrowserView ? "whiteAlpha.200" : "default"}
          variant={"ghost"}
          borderRadius={0}
          px={6}
        >
          Browser view
        </Button>
        <Button
          leftIcon={<Icon as={showSchema ? IoMdEye : IoMdEyeOff} />}
          onClick={toggleSchema}
          fontWeight={400}
          bg={showSchema ? "whiteAlpha.200" : "default"}
          variant={"ghost"}
          borderRadius={0}
          px={6}
        >
          Schema
        </Button>
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
        <Box flex={1} />
        {
          <HStack px={6} spacing={4}>
            {isUpdating ? (
              <Spinner size={"sm"} />
            ) : (
              <Icon as={MdCheck} boxSize={5} color={"green"} />
            )}
            <Text>{isUpdating ? "Saving..." : "Saved"}</Text>
          </HStack>
        }
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
