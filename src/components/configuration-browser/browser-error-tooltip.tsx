import type { TooltipProps } from "@chakra-ui/react";
import {
  HStack,
  Icon,
  StackDivider,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { omit } from "lodash-es";
import { MdErrorOutline } from "react-icons/md";

type Props = {
  errors: string[];
} & TooltipProps;

export default function BrowserErrorTooltip(props: Props) {
  return (
    <Tooltip
      bg={"black"}
      border={"1px solid"}
      borderColor={"whiteAlpha.300"}
      minW={225}
      p={0}
      label={
        props.errors.length > 0 ? (
          <VStack
            spacing={0}
            divider={<StackDivider />}
            align={"start"}
            flex={1}
          >
            <HStack w={"full"} justify={"start"} px={2} py={1}>
              <Icon as={MdErrorOutline} color={"red.600"} />
              <Text color={"red.600"}>
                {props.errors.length} error{props.errors.length > 1 ? `s` : ""}{" "}
                found
              </Text>
            </HStack>
            {props.errors.map((error, idx) => (
              <HStack
                spacing={2}
                w={"full"}
                justify={"start"}
                key={idx}
                px={2}
                py={2}
              >
                <Text color={"whiteAlpha.600"}>{idx + 1}</Text>
                <Text color={"whiteAlpha.800"}>{error}</Text>
              </HStack>
            ))}
          </VStack>
        ) : (
          ""
        )
      }
      {...omit(props, "errors")}
    >
      {props.children}
    </Tooltip>
  );
}
