import { Box, HStack, Text } from "@chakra-ui/react";
import ReactTimeAgo from "react-time-ago";
import type {
  ChakraStylesConfig,
  GroupBase,
  OptionProps,
} from "chakra-react-select";
import type { ConfigurationOption } from "../components/dialogs/add-configuration-dialog";

function Dot(props: { isValid: boolean }) {
  return (
    <Box
      height={2}
      width={2}
      bg={props.isValid ? "green" : "red"}
      borderRadius={5}
      p={1}
    />
  );
}

export function FormattedConfigurationOption(
  props: OptionProps<ConfigurationOption, false>
) {
  const { data, isSelected, innerProps } = props;
  const { label, createdAt } = data;
  return (
    <HStack
      p={2}
      flex={1}
      bg={isSelected ? "whiteAlpha.400" : "black"}
      _hover={{ background: "whiteAlpha.300", cursor: "pointer" }}
      {...innerProps}
    >
      <Dot isValid={data.valid} />
      <Text flex={2}>{label}</Text>
      <Text textColor={"whiteAlpha.600"}>
        <ReactTimeAgo date={createdAt} />
      </Text>
    </HStack>
  );
}

export const chakraSelectStyles: Partial<
  ChakraStylesConfig<ConfigurationOption, false, GroupBase<ConfigurationOption>>
> = {
  option: (provided, state) => ({
    ...provided,
  }),
  menuList: (provided) => ({
    ...provided,
    background: "black",
  }),
  container: (provided) => ({
    ...provided,
    width: "100%",
  }),
};
