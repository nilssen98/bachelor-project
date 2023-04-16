import type { FlexProps } from "@chakra-ui/react";
import { Box, Flex } from "@chakra-ui/react";
import { omit } from "lodash-es";
import { navbarHeight } from "../../theme";
import Navbar from "../navbar";

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
