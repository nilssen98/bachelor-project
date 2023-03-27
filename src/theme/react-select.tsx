import { HStack, Text } from "@chakra-ui/react";
import ReactTimeAgo from "react-time-ago";
import type { ChakraStylesConfig, GroupBase } from "chakra-react-select";
import type { ConfigurationOption } from "../components/add-configuration-dialog";

export const formattedOptionLabel = ({
  label,
  createdAt,
}: ConfigurationOption) => (
  <HStack flex={1}>
    <Text flex={2}>{label}</Text>
    <Text textColor={"gray.400"}>
      <ReactTimeAgo color={"gray"} date={createdAt} />
    </Text>
  </HStack>
);

const dot = (isValid: boolean) => ({
  display: "flex",
  alignItems: "center",

  ":before": {
    backgroundColor: isValid ? "green" : "red",
    borderRadius: 10,
    content: '" "',
    display: "block",
    marginRight: 3,
    height: 2,
    width: 2,
  },
});

export const chakraSelectStyles: Partial<
  ChakraStylesConfig<ConfigurationOption, false, GroupBase<ConfigurationOption>>
> = {
  option: (provided, state) => ({
    ...provided,
    background: state.isSelected ? "blue.800" : "gray.700",
    color: "white",
    ...dot(state.data.valid),
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
