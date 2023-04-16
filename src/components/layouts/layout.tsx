import type { FlexProps } from "@chakra-ui/react";
import { Box, Flex } from "@chakra-ui/react";
import { omit } from "lodash-es";
import type { ReactElement, ReactNode } from "react";
import { navbarHeight } from "../../theme";
import BackgroundCollection from "../background-collection";
import Navbar from "../navbar";

type Props = FlexProps;

export default function Layout(props: Props) {
  return (
    <>
      {/* <BackgroundCollection
        count={20}
        imageWidth={50}
        imageHeight={50}
        minDistance={100}
      /> */}
      <Navbar height={navbarHeight} />
      <Flex
        minH={`calc(100vh - ${navbarHeight})`}
        justifyContent={"center"}
        width={"100%"}
        py={12}
        px={4}
        sx={{
          backgroundImage: `radial-gradient(#343a40 2px, transparent 2px), radial-gradient(#343a40 2px, transparent 2px)`,
          backgroundSize: "120px 120px",
          backgroundPosition: "0 0, 60px 60px",
          ...props.sx,
        }}
        {...omit(props, ["sx"])}
      >
        <Box maxW={"6xl"} w={"full"}>
          {props.children}
        </Box>
      </Flex>
    </>
  );
}
