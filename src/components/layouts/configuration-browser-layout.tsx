import type { FlexProps } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import { omit } from "lodash-es";

type Props = FlexProps;

export default function ConfigurationBrowserLayout(props: Props) {
  return (
    <>
      <Flex
        h={`100vh`}
        width={"100%"}
        sx={{
          ...props.sx,
        }}
        {...omit(props, ["sx"])}
      >
        {props.children}
      </Flex>
    </>
  );
}
