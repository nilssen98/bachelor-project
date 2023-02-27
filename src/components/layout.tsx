import { Box, Flex } from "@chakra-ui/react";
import type { ReactElement, ReactNode } from "react";
import BackgroundCollection from "./background-collection";
import Navbar from "./navbar";

export default function Layout({
  children,
}: {
  children: ReactElement | ReactNode;
}) {
  const navbarHeight = 52;

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
        minH={`calc(100vh - ${navbarHeight}px)`}
        justifyContent={"center"}
        width={"100%"}
        py={8}
        px={4}
        sx={{
          backgroundImage: `radial-gradient(#343a40 2px, transparent 2px), radial-gradient(#343a40 2px, transparent 2px)`,
          backgroundSize: "120px 120px",
          backgroundPosition: "0 0, 60px 60px",
        }}
      >
        <Box maxW={"5xl"} w={"full"}>
          {children}
        </Box>
      </Flex>
    </>
  );
}
