import type { StackProps } from "@chakra-ui/react";
import {
  Button,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { omit } from "lodash-es";
import { MdErrorOutline, MdSave, MdSearch } from "react-icons/md";
import { useBrowserContent } from "./hooks/useBrowserContent";

type Props = {
  onSave?: () => void;
  onClickErrors?: () => void;
  searchValue: string;
  onSearchValueChanged: (newValue: string) => void;
} & StackProps;

export default function BrowserToolbar(props: Props) {
  const { errors } = useBrowserContent();
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
        {...stackProps}
      >
        <Button
          mx={2}
          leftIcon={<Icon as={MdSave} />}
          variant={"text"}
          onClick={props.onSave}
        >
          Save
        </Button>
        <Button
          leftIcon={
            errors && errors.length > 0 ? (
              <Icon as={MdErrorOutline} color={"red.500"} />
            ) : undefined
          }
          mx={2}
          onClick={props.onClickErrors}
          variant={"text"}
        >
          {errors && errors.length > 0 ? (
            <Text fontWeight={400}>{errors.length} Errors</Text>
          ) : (
            <Text color={"gray.500"}>No errors</Text>
          )}
        </Button>
        <InputGroup>
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
        </InputGroup>
      </Stack>
    </>
  );
}
