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
import { MdErrorOutline, MdSave, MdSearch } from "react-icons/md";

interface Props {
  onSave?: () => void;
  onClickErrors?: () => void;
  errors?: string[];
  searchValue: string;
  onSearchValueChanged: (newValue: string) => void;
}

export default function ConfigurationToolbar(props: Props) {
  return (
    <>
      <Stack direction={"row"} divider={<StackDivider />}>
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
            props.errors && props.errors.length > 0 ? (
              <Icon as={MdErrorOutline} color={"red.500"} />
            ) : undefined
          }
          mx={2}
          onClick={props.onClickErrors}
          variant={"text"}
        >
          {props.errors && props.errors.length > 0 ? (
            <Text fontWeight={400}>{props.errors.length} Errors</Text>
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
