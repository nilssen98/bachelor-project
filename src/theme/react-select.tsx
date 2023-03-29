import { Box, HStack, Text } from "@chakra-ui/react";
import ReactTimeAgo from "react-time-ago";
import type {
  ChakraStylesConfig,
  GroupBase,
  OptionProps,
} from "chakra-react-select";
import type { ConfigurationOption } from "../components/add-configuration-dialog";

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
      bg={isSelected ? "blue.800" : "gray.700"}
      _hover={{ background: "gray.600" }}
      {...innerProps}
    >
      <Dot isValid={data.valid} />
      <Text flex={2}>{label}</Text>
      <Text textColor={"gray.400"}>
        <ReactTimeAgo color={"gray"} date={createdAt} />
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
    background: "gray.700",
  }),
  container: (provided) => ({
    ...provided,
    width: "100%",
  }),
};
